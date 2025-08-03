import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { toast } from 'react-toastify';
import type { Url } from '@/types';
import { Input } from '@/components/ui/input';

export default function Dashboard() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSlug, setNewSlug] = useState('');

  const { data: urls, isLoading } = useQuery<Url[]>({
    queryKey: ['urls'],
    queryFn: async () => {
      const res = await api.get('/urls');

      return res.data;
    },
  });

  const updateSlug = useMutation({
    mutationFn: async ({
      id,
      shortCode,
    }: {
      id: string;
      shortCode: string;
    }) => {
      await api.patch(`/urls/${id}`, { shortCode });
    },
    onSuccess: () => {
      toast.success('Slug updated');
      setEditingId(null);
      setNewSlug('');
      queryClient.invalidateQueries({ queryKey: ['urls'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update slug');
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
                className="border rounded-md p-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start text-sm"
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

                  <p>
                    <span className="text-muted-foreground">Visits:</span>{' '}
                    {url.visitCount ?? 0}
                  </p>

                  {editingId === url.id && (
                    <form
                      className="flex items-center gap-2 mt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newSlug.trim()) return;
                        updateSlug.mutate({ id: url.id, shortCode: newSlug });
                      }}
                    >
                      <Input
                        value={newSlug}
                        onChange={(e) => setNewSlug(e.target.value)}
                        placeholder="New slug"
                        className="w-40"
                      />
                      <Button type="submit" size="sm">
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        type="button"
                        size="sm"
                        onClick={() => {
                          setEditingId(null);
                          setNewSlug('');
                        }}
                      >
                        Cancel
                      </Button>
                    </form>
                  )}
                </div>

                {!editingId && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingId(url.id);
                        setNewSlug(url.shortCode);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(url.id)}
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
