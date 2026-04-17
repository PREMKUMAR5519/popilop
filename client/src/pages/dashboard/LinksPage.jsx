import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import Table from '../../components/common/Table';
import { useAppData } from '../../hooks/useAppData';

export default function LinksPage() {
  const { links, loading } = useAppData();
  const socialLinks = links?.socialLinks || [];
  const affiliateLinks = links?.affiliateLinks || [];

  if (loading && !socialLinks.length && !affiliateLinks.length) {
    return <Card>Loading links...</Card>;
  }

  return (
    <div className="c_page-stack">
      <Card>
        <div className="c_section-intro">
          <div>
            <p className="c_eyebrow">My links</p>
            <h2>Social links manager</h2>
            <p>Configure bio links, sort priorities, and track click performance.</p>
          </div>
          <Button>Add social link</Button>
        </div>
        <Table
          columns={[
            { key: 'platform', label: 'Platform' },
            { key: 'label', label: 'Label' },
            { key: 'clicks', label: 'Clicks' },
            { key: 'status', label: 'Status', render: () => <Badge tone="success">Live</Badge> }
          ]}
          rows={socialLinks}
        />
        {!socialLinks.length ? <EmptyState title="No social links yet" description="Create links in the dashboard to publish them on your creator page." /> : null}
      </Card>
      <Card>
        <div className="c_section-intro">
          <div>
            <p className="c_eyebrow">Affiliate links</p>
            <h2>Track partner inventory</h2>
          </div>
          <Button variant="ghost">Add affiliate link</Button>
        </div>
        <Table
          columns={[
            { key: 'title', label: 'Link' },
            { key: 'category', label: 'Category' },
            { key: 'clicks', label: 'Clicks' },
            { key: 'conversionRate', label: 'Conversion' }
          ]}
          rows={affiliateLinks}
        />
        {!affiliateLinks.length ? <EmptyState title="No affiliate links yet" description="Add partner links when you are ready to track outbound performance." /> : null}
      </Card>
    </div>
  );
}
