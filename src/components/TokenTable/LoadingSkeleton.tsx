import { memo } from 'react';

const LoadingSkeleton = memo(() => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-card border border-border animate-pulse">
          <div className="flex items-center gap-3 p-3">
            <div className="w-16 h-16 rounded bg-muted/50 shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-24 bg-muted/50 rounded shimmer" />
              <div className="h-3 w-32 bg-muted/30 rounded shimmer" />
            </div>
            <div className="space-y-2 text-right">
              <div className="h-3 w-20 bg-muted/50 rounded shimmer ml-auto" />
              <div className="h-4 w-24 bg-muted/50 rounded shimmer ml-auto" />
              <div className="h-3 w-16 bg-muted/30 rounded shimmer ml-auto" />
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 pb-3">
            <div className="w-16" />
            <div className="flex-1 flex gap-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-6 w-16 bg-muted/30 rounded shimmer" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;
