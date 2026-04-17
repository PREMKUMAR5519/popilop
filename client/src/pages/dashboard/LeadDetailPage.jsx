import { useParams } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import { crmApi } from '../../api/appApi';
import { useAsyncData } from '../../hooks/useAsyncData';
import { formatDateTime } from '../../utils/format';

export default function LeadDetailPage() {
  const { leadId } = useParams();
  const { data, loading } = useAsyncData(() => crmApi.detail(leadId), [leadId]);
  const lead = data?.lead;
  const activities = data?.activities || [];

  if (loading) {
    return <Card>Loading lead...</Card>;
  }

  if (!lead) {
    return <EmptyState title="Lead not found" description="This lead does not exist or is no longer accessible." />;
  }

  return (
    <div className="l_grid l_grid--2-1">
      <Card>
        <p className="c_eyebrow">Lead detail</p>
        <h2>{lead.name || 'Untitled lead'}</h2>
        <p>{lead.instagramHandle || '-'}</p>
        <div className="c_tag-row">
          {(lead.tags || []).map(tag => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="c_stack-list">
          <div className="c_summary-row">
            <span>Status</span>
            <strong>{lead.status || '-'}</strong>
          </div>
          <div className="c_summary-row">
            <span>DM status</span>
            <strong>{lead.dmStatus || '-'}</strong>
          </div>
          <div className="c_summary-row">
            <span>Campaign</span>
            <strong>{lead.campaignAttribution || '-'}</strong>
          </div>
        </div>
      </Card>
      <Card>
        <p className="c_eyebrow">Activity timeline</p>
        <div className="c_stack-list">
          {activities.map(activity => (
            <div key={activity._id || activity.id} className="c_timeline-item">
              <strong>{activity.message}</strong>
              <span>{formatDateTime(activity.createdAt || activity.at)}</span>
            </div>
          ))}
          {!activities.length ? <p>No CRM activity recorded yet.</p> : null}
        </div>
      </Card>
    </div>
  );
}
