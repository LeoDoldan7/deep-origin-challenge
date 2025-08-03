import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api';

export default function RedirectPage() {
  const { code } = useParams();
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;

    const fetchRedirectUrl = async () => {
      try {
        const res = await api.get(`/r/${code}`);
        const targetUrl = res.data?.url;
        if (targetUrl) {
          window.location.href = targetUrl;
        } else {
          setError('Invalid redirect target.');
        }
      } catch {
        setError('Short URL not found or invalid.');
      }
    };

    fetchRedirectUrl();
  }, [code]);

  return (
    <div className="h-screen flex items-center justify-center text-sm text-muted-foreground text-center px-4">
      {error ? error : 'Redirecting…'}
    </div>
  );
}
