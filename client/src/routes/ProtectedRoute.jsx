import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, user, authReady } = useAuth();

  if (!authReady) {
    return <div className="c_route-loading">Loading workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={user.role === 'admin' ? '/admin/users' : '/app'} replace />;
  }

  return <Outlet />;
}
