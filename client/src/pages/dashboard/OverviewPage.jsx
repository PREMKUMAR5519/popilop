import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import SectionIntro from '../../components/common/SectionIntro';
import StatCard from '../../components/common/StatCard';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';
import { formatCurrency, formatDateTime, formatNumber } from '../../utils/format';

export default function OverviewPage() {
  const { dashboard, loading } = useAppData();

  if (loading && !dashboard) {
    return <Card>Loading dashboard...</Card>;
  }

  if (!dashboard) {
    return <EmptyState title="No dashboard data yet" description="Connect channels and create records to populate your live workspace." />;
  }

  const stats = [
    { id: 'views', label: 'Total views', value: formatNumber(dashboard.stats?.views || 0) },
    { id: 'clicks', label: 'Link clicks', value: formatNumber(dashboard.stats?.clicks || 0) },
    { id: 'sales', label: 'Sales', value: formatCurrency(dashboard.stats?.sales || 0) },
    { id: 'conversionRate', label: 'Conversion rate', value: `${dashboard.stats?.conversionRate || 0}%` }
  ];

  return (
    <div className="c_page-stack">
      <div className="l_grid l_grid--4">
        {stats.map(item => (
          <StatCard key={item.id} {...item} />
        ))}
      </div>

      <div className="l_grid l_grid--2-1">
        <Card>
          <SectionIntro eyebrow="Performance" title="Revenue and traffic this week" />
          <div className="c_chart">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={dashboard.series || []}>
                <defs>
                  <linearGradient id="viewsFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b57" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#ff6b57" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ece8e1" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#ff6b57" fill="url(#viewsFill)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <SectionIntro eyebrow="Quick actions" title="Operational focus" />
          <div className="c_stack-list">
            <div className="c_list-panel">
              <strong>Complete your page structure</strong>
              <p>Publish the landing page and add conversion blocks before driving traffic.</p>
            </div>
            <div className="c_list-panel">
              <strong>Connect Meta credentials</strong>
              <p>Instagram connection, publishing, and DM flows only work after valid Meta app setup.</p>
            </div>
            <div className="c_list-panel">
              <strong>Upload sellable assets</strong>
              <p>Configure Cloudflare R2 so digital products can be delivered from production storage.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="l_grid l_grid--2">
        <Card>
          <SectionIntro eyebrow="Top products" title="Best revenue drivers" />
          <Table
            columns={[
              { key: 'title', label: 'Product' },
              { key: 'price', label: 'Price', render: row => formatCurrency(row.price) },
              { key: 'revenue', label: 'Revenue', render: row => formatCurrency(row.stats?.revenue || 0) }
            ]}
            rows={dashboard.topProducts || []}
          />
        </Card>
        <Card>
          <SectionIntro eyebrow="Recent leads" title="Latest CRM activity" />
          <Table
            columns={[
              { key: 'name', label: 'Lead' },
              { key: 'status', label: 'Status' },
              { key: 'lastInteraction', label: 'Last touch', render: row => (row.lastInteraction ? formatDateTime(row.lastInteraction) : '-') }
            ]}
            rows={dashboard.recentLeads || []}
          />
        </Card>
      </div>

      <Card>
        <SectionIntro eyebrow="Upcoming content" title="Scheduled queue" />
        <Table
          columns={[
            { key: 'title', label: 'Post' },
            { key: 'postType', label: 'Type' },
            { key: 'scheduledFor', label: 'Scheduled for', render: row => formatDateTime(row.scheduledFor) },
            { key: 'status', label: 'Status' }
          ]}
          rows={dashboard.recentPosts || []}
        />
      </Card>
    </div>
  );
}
