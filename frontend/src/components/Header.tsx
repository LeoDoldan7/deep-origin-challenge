import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from './PageHeader';

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="w-full p-4 flex items-center justify-between border-b border-border">
      <PageHeader orientation="horizontal" />
      <Button variant="outline" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
