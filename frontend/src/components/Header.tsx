import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { PageHeader } from './PageHeader';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className="w-full p-4 flex items-center justify-between border-b border-border">
      <PageHeader orientation="horizontal" />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(isDashboard ? '/' : '/dashboard')}
        >
          {isDashboard ? 'Shortener' : 'Dashboard'}
        </Button>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
