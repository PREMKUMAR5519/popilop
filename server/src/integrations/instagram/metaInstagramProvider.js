import env from '../../config/env.js';
import ApiError from '../../utils/apiError.js';

const META_SCOPES = [
  'pages_show_list',
  'instagram_basic'
];

const ensureMetaConfig = () => {
  if (!env.meta.appId || !env.meta.appSecret || !env.meta.redirectUri) {
    throw new ApiError(
      503,
      'Meta Instagram integration is not configured. Set META_APP_ID, META_APP_SECRET, and META_REDIRECT_URI.'
    );
  }
};

const graphUrl = path => `https://graph.facebook.com/${env.meta.graphVersion}${path}`;

const readJson = async response => {
  const payload = await response.json();
  if (!response.ok || payload.error) {
    throw new ApiError(
      response.status || 502,
      payload.error?.message || 'Meta API request failed',
      payload.error || payload
    );
  }
  return payload;
};

export default class MetaInstagramProvider {
  async getConnectionStatus(connection) {
    if (!connection) {
      return {
        status: 'not-connected',
        lastSyncedAt: null
      };
    }

    return {
      status: connection.status,
      lastSyncedAt: connection.lastSyncedAt || null,
      username: connection.username || null
    };
  }

  getAuthorizationUrl({ state }) {
    ensureMetaConfig();
    const params = new URLSearchParams({
      client_id: env.meta.appId,
      redirect_uri: env.meta.redirectUri,
      scope: META_SCOPES.join(','),
      response_type: 'code',
      state
    });

    return `https://www.facebook.com/${env.meta.graphVersion}/dialog/oauth?${params.toString()}`;
  }

  async exchangeCodeForToken(code) {
    const params = new URLSearchParams({
      client_id: env.meta.appId,
      client_secret: env.meta.appSecret,
      redirect_uri: env.meta.redirectUri,
      code
    });

    const response = await fetch(`${graphUrl('/oauth/access_token')}?${params.toString()}`);
    return readJson(response);
  }

  async exchangeForLongLivedToken(accessToken) {
    const params = new URLSearchParams({
      grant_type: 'fb_exchange_token',
      client_id: env.meta.appId,
      client_secret: env.meta.appSecret,
      fb_exchange_token: accessToken
    });

    const response = await fetch(`${graphUrl('/oauth/access_token')}?${params.toString()}`);
    return readJson(response);
  }

  async getAccounts(accessToken) {
    const params = new URLSearchParams({
      fields: 'id,name,access_token,instagram_business_account{id,username,profile_picture_url}',
      access_token: accessToken
    });
    const response = await fetch(`${graphUrl('/me/accounts')}?${params.toString()}`);
    return readJson(response);
  }

  async connectAccount({ code, state }) {
    if (!code) {
      return {
        requiresRedirect: true,
        authUrl: this.getAuthorizationUrl({ state }),
        status: 'pending'
      };
    }

    ensureMetaConfig();

    const shortLived = await this.exchangeCodeForToken(code);
    const longLived = await this.exchangeForLongLivedToken(shortLived.access_token);
    const accounts = await this.getAccounts(longLived.access_token);
    const page = accounts.data?.find(item => item.instagram_business_account);

    if (!page?.instagram_business_account) {
      throw new ApiError(
        400,
        'No Instagram business account was found on the connected Meta pages. Connect a business or creator account linked to a Facebook page.'
      );
    }

    return {
      provider: 'meta-instagram',
      accountId: page.instagram_business_account.id,
      username: page.instagram_business_account.username,
      accessToken: longLived.access_token,
      refreshToken: '',
      scopes: META_SCOPES,
      status: 'connected',
      metadata: {
        pageId: page.id,
        pageName: page.name,
        profilePictureUrl: page.instagram_business_account.profile_picture_url || null,
        tokenExpiresIn: longLived.expires_in || null
      }
    };
  }

  async publishPost(post) {
    if (!post) {
      throw new ApiError(400, 'Scheduled post is required');
    }

    throw new ApiError(
      501,
      'Instagram publishing requires a fully configured publishing workflow and approved Meta permissions for the connected account.'
    );
  }

  async triggerDm() {
    throw new ApiError(
      501,
      'Instagram DM automation requires webhook setup and approved messaging permissions on your Meta app.'
    );
  }
}
