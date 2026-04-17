import { Link } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';
import { formatDateTime } from '../../utils/format';

export default function SchedulerPage() {
  const { scheduler, loading } = useAppData();

  return (
    <div className="c_page-stack">
      <Card>
        <div className="c_section-intro">
          <div>
            <p className="c_eyebrow">Post scheduler</p>
            <h2>Create and manage scheduled content</h2>
          </div>
          <div className="c_inline-actions">
            <Link to="/app/calendar">
              <Button variant="ghost">Calendar view</Button>
            </Link>
            <Button>New scheduled post</Button>
          </div>
        </div>
        <Table
          columns={[
            { key: 'title', label: 'Post' },
            { key: 'postType', label: 'Type' },
            { key: 'scheduledFor', label: 'Scheduled', render: row => formatDateTime(row.scheduledFor) },
            { key: 'status', label: 'Status', render: row => <Badge tone={row.status === 'scheduled' ? 'accent' : 'neutral'}>{row.status}</Badge> }
          ]}
          rows={scheduler || []}
        />
        {!loading && !(scheduler || []).length ? <EmptyState title="No scheduled posts yet" description="Create your first scheduled post to populate the calendar." /> : null}
      </Card>
    </div>
  );
}
