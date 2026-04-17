import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import StatCard from '../../components/common/StatCard';
import { useAppData } from '../../hooks/useAppData';
import { formatCurrency, formatNumber } from '../../utils/format';

export default function AnalyticsPage() {
  const { dashboard, loading } = useAppData();

  if (loading && !dashboard) {
    return <Card>Loading analytics...</Card>;
  }

  if (!dashboard) {
    return <EmptyState title="No analytics yet" description="Traffic, clicks, and purchases will populate this area after real usage begins." />;
  }

  return (
    <div className="c_page-stack">
      <div className="l_grid l_grid--4">
        <StatCard label="Total views" value={formatNumber(dashboard.stats?.views || 0)} />
        <StatCard label="Link clicks" value={formatNumber(dashboard.stats?.clicks || 0)} />
        <StatCard label="Sales" value={formatCurrency(dashboard.stats?.sales || 0)} />
        <StatCard label="Conversion rate" value={`${dashboard.stats?.conversionRate || 0}%`} />
      </div>
      <Card>
        <p className="c_eyebrow">Multi-metric analytics</p>
        <h2>Traffic, clicks, and sales</h2>
        <div className="c_chart">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dashboard.series || []}>
              <CartesianGrid stroke="#ece8e1" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="clicks" fill="#1f7aff" radius={[8, 8, 0, 0]} />
              <Bar dataKey="sales" fill="#0ea67f" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
