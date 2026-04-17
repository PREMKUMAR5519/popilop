import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import InputField from '../components/common/InputField';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', slug: '', password: '' });
  const [saving, setSaving] = useState(false);

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSaving(true);
    try {
      await signup(form);
      toast('Creator workspace created', 'success');
      navigate('/app');
    } catch (error) {
      toast(error.response?.data?.message || 'Signup failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p_auth">
      <Card className="p_auth__card">
        <p className="c_eyebrow">Start free</p>
        <h1>Create your creator workspace</h1>
        <form className="c_form-stack" onSubmit={handleSubmit}>
          <InputField label="Full name" name="name" value={form.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <InputField label="Creator slug" name="slug" value={form.slug} onChange={handleChange} />
          <InputField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          <Button type="submit">{saving ? 'Creating...' : 'Create account'}</Button>
        </form>
      </Card>
    </div>
  );
}
