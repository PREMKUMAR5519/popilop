import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { instagramApi } from '../../api/appApi';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';

export default function InstagramPage() {
  const { instagram, refresh } = useAppData();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const handledCode = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (!code || handledCode.current) {
      return;
    }

    handledCode.current = true;

    instagramApi
      .connect({ code, state: params.get('state') || '' })
      .then(async () => {
        await refresh();
        toast('Instagram account connected', 'success');
        navigate('/app/instagram', { replace: true });
      })
      .catch(error => {
        toast(error.response?.data?.message || 'Instagram connection failed', 'error');
      });
  }, [location.search, navigate, refresh, toast]);

  const startConnection = async () => {
    try {
      const response = await instagramApi.connect({ state: 'creator-instagram' });
      if (response.authUrl) {
        window.location.href = response.authUrl;
      }
    } catch (error) {
      toast(error.response?.data?.message || 'Meta connection is not configured', 'error');
    }
  };

  return (
    <div className="l_grid l_grid--2">
      <Card>
        <p className="c_eyebrow">Instagram connection</p>
        <h2>{instagram?.connection?.username ? `Connected as @${instagram.connection.username}` : 'Connect your Instagram business account'}</h2>
        <p>
          This flow now depends on real Meta OAuth configuration. Set `META_APP_ID`, `META_APP_SECRET`, and `META_REDIRECT_URI`, then
          connect an Instagram business or creator account linked to a Facebook page.
        </p>
        <div className="c_inline-actions">
          <Badge tone={instagram?.status?.status === 'connected' ? 'success' : 'neutral'}>{instagram?.status?.status || 'not-connected'}</Badge>
          <Button onClick={startConnection}>{instagram?.connection ? 'Reconnect account' : 'Connect account'}</Button>
        </div>
      </Card>
      <Card>
        <p className="c_eyebrow">Capabilities</p>
        <div className="c_stack-list">
          <div className="c_list-row">
            <strong>Lead sync</strong>
            <Badge tone={instagram?.connection ? 'success' : 'neutral'}>{instagram?.connection ? 'Connected' : 'Pending'}</Badge>
          </div>
          <div className="c_list-row">
            <strong>Publishing</strong>
            <Badge>Permission dependent</Badge>
          </div>
          <div className="c_list-row">
            <strong>Comment-trigger DMs</strong>
            <Badge>Webhook + approval required</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
