import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';
import { formatCurrency, formatDateTime } from '../../utils/format';

export default function OrdersPage() {
  const { orders, loading } = useAppData();

  return (
    <Card>
      <div className="c_section-intro">
        <div>
          <p className="c_eyebrow">Orders</p>
          <h2>Sales and delivery records</h2>
        </div>
      </div>
      <Table
        columns={[
          { key: 'customerName', label: 'Customer' },
          { key: 'product', label: 'Product', render: row => row.product?.title || '-' },
          { key: 'amount', label: 'Amount', render: row => formatCurrency(row.amount) },
          { key: 'status', label: 'Status', render: row => <Badge tone={row.status === 'fulfilled' ? 'success' : 'accent'}>{row.status}</Badge> },
          { key: 'createdAt', label: 'Date', render: row => formatDateTime(row.createdAt) }
        ]}
        rows={orders || []}
      />
      {!loading && !(orders || []).length ? <EmptyState title="No orders yet" description="Completed checkouts will appear here with delivery and status history." /> : null}
    </Card>
  );
}
