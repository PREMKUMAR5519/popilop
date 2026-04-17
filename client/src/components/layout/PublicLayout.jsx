import { Link, NavLink, Outlet } from 'react-router-dom';
import Button from '../common/Button';

export default function PublicLayout() {
  return (
    <div className="l_public-shell">
      <header className="l_marketing-header">
        <Link className="l_brand" to="/">
          <span className="l_brand__mark">H</span>
          <span>Halo Studio</span>
        </Link>
        <nav className="l_marketing-nav">
          <NavLink to="/features">Features</NavLink>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/login">Creator login</NavLink>
        </nav>
        <div className="l_marketing-actions">
          <Link className="c_button c_button--ghost c_button--md" to="/login">
            Login
          </Link>
          <Link to="/signup">
            <Button>Start free</Button>
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
