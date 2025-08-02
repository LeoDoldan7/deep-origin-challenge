import { cn } from '@/lib/utils';

export function PageHeader({
  orientation = 'vertical',
}: {
  orientation?: 'vertical' | 'horizontal';
}) {
  return (
    <h1 className="text-2xl font-bold text-center text-primary tracking-tight mb-6">
      Deep Origin Challenge
      <span
        className={cn('text-muted-foreground text-sm', {
          'ml-4': orientation === 'horizontal',
        })}
      >
        {orientation === 'vertical' && <br />}
        by Leo Doldan
      </span>
    </h1>
  );
}
