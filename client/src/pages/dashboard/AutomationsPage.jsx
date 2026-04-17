import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';
import { formatDateTime } from '../../utils/format';

export default function AutomationsPage() {
  const { automations, loading } = useAppData();
  const items = automations?.automations || [];
  const logs = automations?.logs || [];

  return (
    <div className="c_page-stack">
      <Card>
        <div className="c_section-intro">
          <div>
            <p className="c_eyebrow">Auto DM builder</p>
            <h2>Comment-trigger automations</h2>
          </div>
          <Button>Create automation</Button>
        </div>
        <Table
          columns={[
            { key: 'name', label: 'Automation' },
            { key: 'matchMode', label: 'Mode' },
            { key: 'targetContentId', label: 'Target content' },
            { key: 'isActive', label: 'Status', render: row => <Badge tone={row.isActive ? 'success' : 'neutral'}>{row.isActive ? 'active' : 'paused'}</Badge> }
          ]}
          rows={items}
        />
        {!loading && !items.length ? <EmptyState title="No automations yet" description="Create automation rules once your Meta webhook and messaging permissions are in place." /> : null}
      </Card>
      <Card>
        <p className="c_eyebrow">Response logs</p>
        <Table
          columns={[
            { key: 'lead', label: 'Lead', render: row => row.lead?.instagramHandle || row.lead?.name || '-' },
            { key: 'sendStatus', label: 'Send status' },
            { key: 'responseMessage', label: 'Note' },
            { key: 'createdAt', label: 'At', render: row => formatDateTime(row.createdAt) }
          ]}
          rows={logs}
        />
      </Card>
    </div>
  );
}
