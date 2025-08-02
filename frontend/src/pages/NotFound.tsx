import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-muted-foreground text-lg mb-6">Page not found.</p>
      <Button className="cursor-pointer" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  );
}
