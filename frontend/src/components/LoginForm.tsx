import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { PageHeader } from './PageHeader';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
    },
    onSuccess: () => {
      navigate('/');
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Login failed');
    },
  });

  const onChangePassword = (value: string) => {
    setPassword(value);
    if (value.length < 6) {
      setError('Password must be at least 6 characters long');

      return;
    }

    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="max-w-sm mx-auto mt-16 space-y-6">
      <PageHeader />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-sm mx-auto mt-16"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Logging in…' : 'Log In'}
        </Button>
      </form>
      <p className="text-sm text-center text-muted-foreground">
        Don’t have an account?{' '}
        <Link to="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
