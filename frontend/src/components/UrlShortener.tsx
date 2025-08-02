import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export function UrlShortener() {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (originalUrl: string) => {
      const response = await api.post('/urls', { originalUrl });

      return response.data.shortUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mutation.isPending) {
      setCopied(false);
      mutation.mutate(url);
    }
  };

  const handleCopy = () => {
    if (mutation.data) {
      navigator.clipboard.writeText(mutation.data).then(() => setCopied(true));
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardTitle>URL Shortener</CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="url">Enter the URL to shorten</Label>
              <Input
                id="url"
                placeholder="https://example.com/foo/bar/biz"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={mutation.isPending || !!mutation.data}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending || !!mutation.data}
            >
              {mutation.isPending ? 'Shortening…' : 'Shorten'}
            </Button>
          </form>

          {mutation.data && (
            <div className="mt-6 space-y-2">
              <p className="text-green-600 font-medium">
                Success! Here’s your short URL:
              </p>
              <div className="flex items-center space-x-2">
                <a
                  href={mutation.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600"
                >
                  {mutation.data}
                </a>
                <Button variant="outline" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-gray-500">Copied to clipboard!</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
