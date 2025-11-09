import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface RequireRoleProps {
  roles: string[];
}

export const RequireRole = ({ roles }: RequireRoleProps) => {
  const hasRole = useAuthStore((state) => state.hasRole);

  if (!hasRole(roles)) {
    return <Navigate to="/errors/403" replace />;
  }

  return <Outlet />;
};
