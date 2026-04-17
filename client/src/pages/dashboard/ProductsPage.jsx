import { Link } from 'react-router-dom';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import EmptyState from '../../components/common/EmptyState';
import { useAppData } from '../../hooks/useAppData';
import { formatCurrency } from '../../utils/format';

export default function ProductsPage() {
  const { products, loading } = useAppData();
  const items = products?.items || [];

  if (loading && !items.length) {
    return <Card>Loading products...</Card>;
  }

  return (
    <div className="c_page-stack">
      <div className="c_section-intro">
        <div>
          <p className="c_eyebrow">Products</p>
          <h2>Digital, affiliate, and custom product catalog</h2>
        </div>
        <Link to="/app/products/new">
          <Button>Create product</Button>
        </Link>
      </div>
      {!items.length ? (
        <EmptyState title="No products yet" description="Create your first product and it will appear in both the dashboard and the public storefront." />
      ) : (
        <div className="l_grid l_grid--3">
          {items.map(product => (
            <Card key={product._id} className="c_product-card">
              {product.thumbnail ? <img src={product.thumbnail} alt={product.title} /> : null}
              <div className="c_product-card__body">
                <div className="c_inline-actions">
                  <Badge tone={product.publishedState === 'published' ? 'success' : 'neutral'}>{product.publishedState}</Badge>
                  {product.featured ? <Badge tone="accent">Featured</Badge> : null}
                </div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="c_product-card__footer">
                  <strong>{formatCurrency(product.price)}</strong>
                  <Link to={`/product/${product.slug}`}>Preview</Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
