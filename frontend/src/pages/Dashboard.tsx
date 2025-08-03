import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { toast } from 'react-toastify';

interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: string;
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const { data: urls, isLoading } = useQuery<Url[]>({
    queryKey: ['urls'],
    queryFn: async () => {
      const res = await api.get('/urls');

      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      setLoading(true);
      await api.delete(`/urls/${id}`);
    },
    onSuccess: () => {
      toast.success('URL deleted');
      queryClient.invalidateQueries({ queryKey: ['urls'] });
      setLoading(false);
    },
    onError: () => {
      toast.error('Failed to delete');
      setLoading(false);
    },
  });

  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-6">
        <h1 className="text-2xl font-bold">Your URLs</h1>

        {isLoading ? (
          <p>Loading…</p>
        ) : urls?.length === 0 ? (
          <p className="text-muted-foreground">
            No URLs yet. Try shortening one.
          </p>
        ) : (
          <ul className="space-y-4">
            {urls?.map((url) => (
              <li
                key={url.id}
                className="border rounded-md p-4 flex justify-between items-start text-sm"
              >
                <div className="space-y-1 break-all">
                  <p>
                    <span className="text-muted-foreground">Original:</span>{' '}
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {url.originalUrl}
                    </a>
                  </p>
                  <p>
                    <span className="text-muted-foreground">Short:</span>{' '}
                    <a
                      href={`${window.location.origin}/r/${url.shortCode}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600"
                    >
                      {window.location.origin}/r/{url.shortCode}
                    </a>
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(url.id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
