import { Link } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';
import { formatDateTime } from '../../utils/format';

export default function CrmPage() {
  const { crm, loading } = useAppData();
  const leads = crm?.items || [];

  if (loading && !leads.length) {
    return <Card>Loading CRM...</Card>;
  }

  return (
    <div className="c_page-stack">
      <Card>
        <div className="c_section-intro">
          <div>
            <p className="c_eyebrow">Instagram CRM</p>
            <h2>Leads, tags, notes, and pipeline</h2>
          </div>
          <div className="c_inline-actions">
            <Button variant="ghost">Filter</Button>
            <Button>Add lead</Button>
          </div>
        </div>
        <Table
          columns={[
            { key: 'name', label: 'Lead', render: row => <Link to={`/app/crm/${row._id}`}>{row.name || row.instagramHandle || 'Untitled lead'}</Link> },
            { key: 'instagramHandle', label: 'Handle' },
            { key: 'source', label: 'Source' },
            { key: 'status', label: 'Status', render: row => <Badge tone={row.status === 'converted' ? 'success' : 'neutral'}>{row.status}</Badge> },
            { key: 'lastInteraction', label: 'Last touch', render: row => (row.lastInteraction ? formatDateTime(row.lastInteraction) : '-') }
          ]}
          rows={leads}
        />
        {!leads.length ? (
          <EmptyState title="No leads yet" description="Leads will appear here when forms, imports, or Instagram automation flows start writing to the database." />
        ) : null}
      </Card>
    </div>
  );
}
