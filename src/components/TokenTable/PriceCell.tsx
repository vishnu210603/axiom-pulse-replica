import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PriceCellProps {
  price: number;
  change: number;
  lastUpdate: number;
}

const PriceCell = ({ price, change, lastUpdate }: PriceCellProps) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [prevPrice, setPrevPrice] = useState(price);

  useEffect(() => {
    if (price !== prevPrice) {
      setIsFlashing(true);
      setPrevPrice(price);
      const timer = setTimeout(() => setIsFlashing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [price, prevPrice]);

  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-price-up' : 'text-price-down';
  const bgColorClass = isPositive ? 'bg-price-up/10' : 'bg-price-down/10';

  return (
    <div className="space-y-1">
      <div className={cn(
        'text-base font-semibold transition-all duration-300',
        isFlashing && (isPositive ? 'text-price-up' : 'text-price-down'),
        !isFlashing && 'text-foreground'
      )}>
        ${price.toFixed(6)}
      </div>
      <div className={cn(
        'flex items-center gap-1 text-sm font-medium px-2 py-0.5 rounded-md w-fit',
        colorClass,
        bgColorClass
      )}>
        {isPositive ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        {isPositive ? '+' : ''}{change.toFixed(2)}%
      </div>
    </div>
  );
};

export default PriceCell;
