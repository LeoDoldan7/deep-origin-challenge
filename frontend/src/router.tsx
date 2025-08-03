import { createBrowserRouter } from 'react-router-dom';
import { SignupForm } from '@/components/SignupForm';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginForm } from './components/LoginForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RedirectPage from './pages/RedirectPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  { path: '/r/:code', element: <RedirectPage /> },
  {
    path: '/signup',
    element: <SignupForm />,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
