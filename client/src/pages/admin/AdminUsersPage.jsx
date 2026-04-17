import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';

export default function AdminUsersPage() {
  const { adminUsers, loading } = useAppData();

  return (
    <Card>
      <div className="c_section-intro">
        <div>
          <p className="c_eyebrow">Users</p>
          <h2>Platform accounts</h2>
        </div>
      </div>
      <Table
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status', render: row => <Badge tone="success">{row.status}</Badge> }
        ]}
        rows={adminUsers || []}
      />
      {!loading && !(adminUsers || []).length ? <EmptyState title="No platform users yet" description="User records from the production database will appear here." /> : null}
    </Card>
  );
}
