import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';

export default function AffiliateLinksPage() {
  const { links, loading } = useAppData();
  const affiliateLinks = links?.affiliateLinks || [];

  return (
    <Card>
      <div className="c_section-intro">
        <div>
          <p className="c_eyebrow">Affiliate manager</p>
          <h2>Track clicks and commission-driven recommendations</h2>
        </div>
      </div>
      <Table
        columns={[
          { key: 'title', label: 'Offer' },
          { key: 'category', label: 'Category' },
          { key: 'commissionLabel', label: 'Commission' },
          { key: 'clicks', label: 'Clicks' },
          { key: 'conversionRate', label: 'Conversion' }
        ]}
        rows={affiliateLinks}
      />
      {!loading && !affiliateLinks.length ? <EmptyState title="No affiliate links yet" description="Add partner links to start tracking outbound traffic and conversion performance." /> : null}
    </Card>
  );
}
