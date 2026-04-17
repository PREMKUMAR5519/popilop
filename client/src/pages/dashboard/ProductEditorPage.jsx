import { useState } from 'react';
import { productsApi } from '../../api/appApi';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import InputField from '../../components/common/InputField';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';

export default function ProductEditorPage() {
  const { toast } = useToast();
  const { refresh } = useAppData();
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    category: '',
    price: '',
    deliveryType: 'download'
  });
  const [saving, setSaving] = useState(false);

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSaving(true);
    try {
      await productsApi.create({
        ...form,
        price: Number(form.price || 0)
      });
      await refresh();
      toast('Product saved', 'success');
      setForm({
        title: '',
        slug: '',
        description: '',
        category: '',
        price: '',
        deliveryType: 'download'
      });
    } catch (error) {
      toast(error.response?.data?.message || 'Failed to save product', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="l_grid l_grid--2-1">
      <Card>
        <p className="c_eyebrow">Product editor</p>
        <h2>Create or update a product</h2>
        <form className="c_form-stack" onSubmit={handleSubmit}>
          <InputField label="Title" name="title" value={form.title} onChange={handleChange} />
          <InputField label="Slug" name="slug" value={form.slug} onChange={handleChange} />
          <InputField label="Category" name="category" value={form.category} onChange={handleChange} />
          <InputField label="Description" name="description" textarea rows="5" value={form.description} onChange={handleChange} />
          <div className="l_grid l_grid--2">
            <InputField label="Price" name="price" value={form.price} onChange={handleChange} />
            <label className="c_field">
              <span>Delivery type</span>
              <select className="c_input" name="deliveryType" value={form.deliveryType} onChange={handleChange}>
                <option value="download">Download</option>
                <option value="external-link">External link</option>
                <option value="course">Course</option>
                <option value="physical">Physical</option>
              </select>
            </label>
          </div>
          <Button type="submit">{saving ? 'Saving...' : 'Save product'}</Button>
        </form>
      </Card>
      <Card>
        <p className="c_eyebrow">Delivery structure</p>
        <div className="c_stack-list">
          <div className="c_list-panel">
            <strong>Cloudflare R2 upload</strong>
            <p>Uploads now require real R2 configuration. Missing credentials will return a clear backend error instead of fake success.</p>
          </div>
          <div className="c_list-panel">
            <strong>Course schema</strong>
            <p>Course modules and lessons are modeled server-side and can be extended without changing the route structure.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
