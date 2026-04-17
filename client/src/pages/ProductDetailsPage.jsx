import { Link, useParams } from 'react-router-dom';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import { productsApi } from '../api/appApi';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCurrency } from '../utils/format';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { data: product, loading } = useAsyncData(() => productsApi.publicBySlug(slug), [slug]);

  if (loading) {
    return <div className="l_page">Loading product...</div>;
  }

  if (!product) {
    return <EmptyState title="Product not found" description="This product slug does not resolve to a published product." />;
  }

  return (
    <div className="l_page">
      <section className="p_product-detail">
        <Card className="p_product-detail__media" padded={false}>
          {product.thumbnail ? <img src={product.thumbnail} alt={product.title} /> : <div className="c_empty-state">No preview image</div>}
        </Card>
        <div className="p_product-detail__summary">
          <Badge tone="accent">{product.category || 'Product'}</Badge>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className="p_price-row">
            <strong>{formatCurrency(product.price)}</strong>
            {product.compareAtPrice ? <span>{formatCurrency(product.compareAtPrice)}</span> : null}
          </div>
          <div className="p_home__hero-actions">
            <Link to={`/checkout/${product.slug}`}>
              <Button>Buy now</Button>
            </Link>
            <Button variant="ghost">Preview delivery</Button>
          </div>
          <Card>
            <p className="c_overline">Delivery</p>
            <h3>{product.deliveryType === 'course' ? 'Course access' : 'Instant digital download'}</h3>
            <p>Checkout writes an order record to the database. Final payment capture still depends on your real payment provider integration.</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
