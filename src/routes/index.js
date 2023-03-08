import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import { PATH_DASHBOARD } from './paths';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname?.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <div
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed',
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'reset-password',
          element: (
            <GuestGuard>
              <ResetPassword />
            </GuestGuard>
          ),
        },
        {
          path: 'reset-password-verify/:token',
          element: (
            <GuestGuard>
              <ResetPasswordVerifyToken />
            </GuestGuard>
          ),
        },
      ],
    },

    // Dashboard Routes
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['Admin']}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        {
          path: 'user',
          children: [
            { path: PATH_DASHBOARD.user.root, element: <Navigate to="/dashboard/user/list" replace /> },
            { path: PATH_DASHBOARD.user.list, element: <User /> },
          ],
        },
        {
          path: 'attraction',
          children: [
            { path: PATH_DASHBOARD.attraction.root, element: <Navigate to="/dashboard/attraction/list" replace /> },
            { path: PATH_DASHBOARD.attraction.list, element: <Attraction /> },
            { path: PATH_DASHBOARD.attraction.newAttraction, element: <CreateAttraction /> },
            { path: PATH_DASHBOARD.attraction.edit, element: <CreateAttraction /> },
          ],
        },
      ],
    },

    // Main Routes
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="auth/login" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import('../pages/Login')));
const User = Loadable(lazy(() => import('../pages/User')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const DashboardLayout = Loadable(lazy(() => import('../layouts/dashboard')));
const LogoOnlyLayout = Loadable(lazy(() => import('../layouts/LogoOnlyLayout')));
const CreateAttraction = Loadable(lazy(() => import('../pages/CreateAttraction')));
const Attraction = Loadable(lazy(() => import('../pages/Attraction')));
const ResetPassword = Loadable(lazy(() => import('../pages/ResetPassword')));
const ResetPasswordVerifyToken = Loadable(lazy(() => import('../pages/ResetPasswordVerifyToken')));
