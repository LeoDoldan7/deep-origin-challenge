import { createBrowserRouter } from 'react-router-dom';
import { SignupForm } from '@/components/SignupForm';
import NotFound from './pages/NotFound';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginForm } from './components/LoginForm';
import Home from './pages/Home';

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
    path: '*',
    element: <NotFound />,
  },
]);
