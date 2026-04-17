import Card from '../../components/common/Card';
import StatCard from '../../components/common/StatCard';
import { useAppData } from '../../hooks/useAppData';

export default function PlatformAnalyticsPage() {
  const { adminOverview } = useAppData();

  return (
    <div className="c_page-stack">
      <div className="l_grid l_grid--4">
        <StatCard label="Users" value={adminOverview?.users || 0} />
        <StatCard label="Creators" value={adminOverview?.creators || 0} />
        <StatCard label="Products" value={adminOverview?.products || 0} />
        <StatCard label="Revenue" value={adminOverview?.revenue || 0} />
      </div>
      <Card>
        <p className="c_eyebrow">Platform analytics</p>
        <h2>Live platform totals</h2>
        <p>This page now reads aggregate counts from the admin API instead of showing seeded mock charts.</p>
      </Card>
    </div>
  );
}
