import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

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
    <div className="h-full w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-md px-6 py-8 shadow-md rounded-xl">
        <CardTitle className="text-2xl font-bold text-center mb-4">
          URL Shortener
        </CardTitle>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium">
                Enter the URL to shorten
              </Label>
              <Input
                id="url"
                placeholder="https://example.com/foo/bar"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={mutation.isPending || !!mutation.data}
              />
            </div>

            <Button
              type="submit"
              className="cursor-pointer w-full text-base"
              disabled={mutation.isPending || !url}
            >
              {mutation.isPending ? 'Shortening…' : 'Shorten'}
            </Button>
          </form>

          {mutation.data && (
            <div className="mt-6 space-y-2">
              <p className="text-green-600 font-semibold text-sm">
                Success! Here’s your short URL:
              </p>

              <div className="flex items-center justify-between bg-muted px-4 py-2 rounded-md text-sm">
                <a
                  href={mutation.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {mutation.data}
                </a>

                <button
                  onClick={handleCopy}
                  aria-label="Copy"
                  className="ml-4 p-2 rounded-md hover:bg-accent transition text-muted-foreground"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              {copied && (
                <p className="text-xs text-gray-500">Copied to clipboard!</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
