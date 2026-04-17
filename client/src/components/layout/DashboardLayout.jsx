import { NavLink, Outlet } from 'react-router-dom';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

const creatorNav = [
  { to: '/app', label: 'Overview' },
  { to: '/app/page-builder', label: 'My Page' },
  { to: '/app/links', label: 'Links' },
  { to: '/app/instagram', label: 'Instagram' },
  { to: '/app/crm', label: 'CRM' },
  { to: '/app/scheduler', label: 'Scheduler' },
  { to: '/app/automations', label: 'Automations' },
  { to: '/app/products', label: 'Products' },
  { to: '/app/orders', label: 'Orders' },
  { to: '/app/affiliate-links', label: 'Affiliate Links' },
  { to: '/app/analytics', label: 'Analytics' },
  { to: '/app/audience', label: 'Audience' },
  { to: '/app/media-library', label: 'Media Library' },
  { to: '/app/profile-customization', label: 'Profile' },
  { to: '/app/settings', label: 'Settings' }
];

const adminNav = [
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/creator-detail', label: 'Creator detail' },
  { to: '/admin/product-moderation', label: 'Moderation' },
  { to: '/admin/platform-analytics', label: 'Platform analytics' }
];

export default function DashboardLayout({ admin = false }) {
  const { user, logout } = useAuth();
  const links = admin ? adminNav : creatorNav;

  return (
    <div className="l_dashboard-shell">
      <aside className="l_sidebar">
        <div className="l_sidebar__brand">
          <span className="l_brand__mark">H</span>
          <div>
            <strong>Halo Studio</strong>
            <span>{admin ? 'Admin console' : 'Creator OS'}</span>
          </div>
        </div>
        <nav className="l_sidebar__nav">
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.to === '/app'}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="l_sidebar__footer">
          <div className="l_user-chip">
            <Avatar initials={user?.avatar || 'HS'} />
            <div>
              <strong>{user?.name}</strong>
              <span>{user?.email}</span>
            </div>
          </div>
          <Button variant="ghost" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>
      <section className="l_dashboard-main">
        <div className="l_dashboard-content">
          <Outlet />
        </div>
      </section>
    </div>
  );
}
