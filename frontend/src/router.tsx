import { createBrowserRouter } from 'react-router-dom';
import { SignupForm } from '@/components/SignupForm';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginForm } from './components/LoginForm';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
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
