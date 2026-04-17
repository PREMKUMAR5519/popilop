import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';
import { formatDateTime } from '../../utils/format';

export default function AudiencePage() {
  const { crm } = useAppData();
  const audience = (crm?.items || []).filter(item => item.email);

  if (!audience.length) {
    return <EmptyState title="No email audience yet" description="Audience records will appear here when visitors submit email capture forms or lead data with email addresses." />;
  }

  return (
    <Card>
      <div className="c_section-intro">
        <div>
          <p className="c_eyebrow">Audience</p>
          <h2>Email leads and audience capture</h2>
        </div>
      </div>
      <Table
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'source', label: 'Source' },
          { key: 'status', label: 'Status' },
          { key: 'createdAt', label: 'Joined', render: row => formatDateTime(row.createdAt) }
        ]}
        rows={audience}
      />
    </Card>
  );
}
