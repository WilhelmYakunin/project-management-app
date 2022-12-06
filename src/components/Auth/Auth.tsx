import { Navigate, Outlet } from 'react-router-dom';
import { parseJwt } from '../../utils';

export const isTokenExpired = () => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return true;
  }
  const { exp } = parseJwt(token);
  return (exp as unknown as number) * 1000 < Date.now();
};

export const AuthWrapper = () => {
  return isTokenExpired() ? (
    <Navigate to="/project-management-app/SignIn" replace />
  ) : (
    <Outlet />
  );
};
