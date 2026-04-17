import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import InputField from '../components/common/InputField';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M18 9a9 9 0 1 0-10.406 8.892V11.6H5.309V9h2.285V7.017c0-2.255 1.343-3.501 3.4-3.501.985 0 2.015.175 2.015.175v2.215h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.6H10.407v6.292A9.003 9.003 0 0 0 18 9Z" fill="#1877F2"/>
    </svg>
  );
}

// Helper: after login decide where to send the user
function getPostLoginPath(user) {
  if (user.role === 'admin') return '/admin/users';
  if (!user.username) return '/username-setup';
  return '/app';
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [saving, setSaving] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = e =>
    setForm(cur => ({ ...cur, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const user = await login(form);
      toast('Signed in successfully', 'success');
      navigate(getPostLoginPath(user));
    } catch (error) {
      toast(error.response?.data?.message || 'Login failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  const handleGoogle = () => {
    window.location.href = `${API_BASE}/auth/google`;
  };

  const handleSocial = provider => {
    toast(`${provider} login coming soon`, 'error');
  };

  return (
    <div className="p_auth">
      <Card className="p_auth__card p_auth__card--login">

        {/* Brand mark */}
        <div className="p_auth__brand">
          <span className="l_brand__mark">H</span>
        </div>

        <div className="p_auth__heading">
          <p className="c_eyebrow">Welcome back</p>
          <h1>Sign in to Halo Studio</h1>
        </div>

        {/* Social login */}
        <div className="p_auth__social">
          <button
            type="button"
            className="p_auth__social-btn"
            onClick={handleGoogle}
          >
            <GoogleIcon />
            Continue with Google
          </button>
          <button
            type="button"
            className="p_auth__social-btn"
            onClick={() => handleSocial('Facebook')}
          >
            <FacebookIcon />
            Continue with Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="p_auth__divider">
          <span>or continue with email</span>
        </div>

        {/* Email / password form */}
        <form className="c_form-stack" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button type="submit" disabled={saving}>
            {saving ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <div className="p_auth__footer">
          <Link to="/forgot-password">Forgot password?</Link>
          <Link to="/signup">Create account</Link>
        </div>

      </Card>
    </div>
  );
}
