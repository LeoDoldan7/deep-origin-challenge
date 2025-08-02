import { UrlShortener } from '@/components/UrlShortener';
import NotFound from './pages/NotFound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UrlShortener />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
