import { Header } from '@/components/Header';
import { UrlShortener } from '@/components/UrlShortener';

export default function Home() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <main className="flex-1 overflow-auto p-4 max-w-2xl mx-auto w-full">
        <UrlShortener />
      </main>
    </div>
  );
}
