import { Navigate, Outlet } from 'react-router-dom';
import { parseJwt } from '../../utils';

export const isExpired = (token: string | null) => {
  if (!token) {
    return true;
  }
  const { exp } = parseJwt(token);
  return (exp as unknown as number) * 1000 < Date.now();
};

export const AuthWrapper = () => {
  return isExpired(localStorage.getItem('auth_token')) ? (
    <Navigate to="/project-management-app/SignIn" replace />
  ) : (
    <Outlet />
  );
};
