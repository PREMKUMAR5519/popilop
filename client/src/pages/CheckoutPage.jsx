import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ordersApi, productsApi } from '../api/appApi';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import InputField from '../components/common/InputField';
import { useAsyncData } from '../hooks/useAsyncData';
import { useToast } from '../hooks/useToast';
import { formatCurrency } from '../utils/format';

export default function CheckoutPage() {
  const { slug } = useParams();
  const { data: product, loading } = useAsyncData(() => productsApi.publicBySlug(slug), [slug]);
  const { toast } = useToast();
  const [form, setForm] = useState({ customerName: '', customerEmail: '', notes: '' });

  if (loading) {
    return <div className="l_page">Loading checkout...</div>;
  }

  if (!product) {
    return <EmptyState title="Product not found" description="Checkout cannot continue because the product slug is invalid." />;
  }

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleCheckout = async () => {
    try {
      const response = await ordersApi.checkout({
        productId: product._id,
        customerName: form.customerName,
        customerEmail: form.customerEmail
      });
      toast(`Order created: ${response.item._id}`, 'success');
    } catch (error) {
      toast(error.response?.data?.message || 'Checkout failed', 'error');
    }
  };

  return (
    <div className="l_page">
      <section className="p_checkout">
        <Card>
          <h1>Checkout</h1>
          <p>This checkout writes a real order record. Payment gateway capture still needs your production payment provider.</p>
          <div className="l_grid l_grid--2">
            <InputField label="Full name" name="customerName" value={form.customerName} onChange={handleChange} />
            <InputField label="Email" name="customerEmail" type="email" value={form.customerEmail} onChange={handleChange} />
          </div>
          <InputField label="Notes" name="notes" textarea rows="4" value={form.notes} onChange={handleChange} />
          <Button onClick={handleCheckout}>Create checkout session</Button>
        </Card>
        <Card>
          <p className="c_overline">Order summary</p>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <div className="c_summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(product.price)}</strong>
          </div>
          <div className="c_summary-row">
            <span>Delivery</span>
            <strong>{product.deliveryType}</strong>
          </div>
        </Card>
      </section>
    </div>
  );
}
