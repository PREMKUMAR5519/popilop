import InstagramConnection from '../models/InstagramConnection.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { getInstagramProvider } from '../integrations/instagram/providerFactory.js';

const serializeConnection = connection => {
  if (!connection) {
    return null;
  }

  return {
    id: connection._id,
    provider: connection.provider,
    accountId: connection.accountId,
    username: connection.username,
    scopes: connection.scopes,
    status: connection.status,
    lastSyncedAt: connection.lastSyncedAt,
    metadata: connection.metadata,
    createdAt: connection.createdAt,
    updatedAt: connection.updatedAt
  };
};

export const getInstagramConnectionController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const connection = await InstagramConnection.findOne({ creator: creator._id });
  const provider = getInstagramProvider(connection?.provider || 'meta-instagram');
  const status = await provider.getConnectionStatus(connection);
  res.json({ success: true, item: { connection: serializeConnection(connection), status } });
});

export const connectInstagramController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const provider = getInstagramProvider('meta-instagram');
  const data = await provider.connectAccount({
    code: req.body.code,
    state: req.body.state || creator._id.toString()
  });

  if (data.requiresRedirect) {
    return res.json({
      success: true,
      item: {
        status: 'pending',
        authUrl: data.authUrl,
        requiresRedirect: true
      }
    });
  }

  const connection = await InstagramConnection.findOneAndUpdate(
    { creator: creator._id },
    {
      creator: creator._id,
      provider: 'meta-instagram',
      ...data,
      lastSyncedAt: new Date()
    },
    { new: true, upsert: true }
  );

  res.json({
    success: true,
    item: serializeConnection(connection)
  });
});
