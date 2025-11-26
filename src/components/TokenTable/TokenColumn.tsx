import { memo, useMemo, useState } from 'react';
import { Token } from '@/store/slices/tokensSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSortBy } from '@/store/slices/tokensSlice';
import DetailedTokenCard from './DetailedTokenCard';
import TokenModal from './TokenModal';
import LoadingSkeleton from './LoadingSkeleton';
import ColumnHeader from './ColumnHeader';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface TokenColumnProps {
  title: string;
  status: 'new' | 'final-stretch' | 'migrated';
}

const TokenColumn = memo(({ title, status }: TokenColumnProps) => {
  const dispatch = useAppDispatch();
  const { tokens, sortBy, sortOrder, isLoading } = useAppSelector(state => state.tokens);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredAndSortedTokens = useMemo(() => {
    const filtered = tokens.filter(t => t.status === status);
    
    return [...filtered].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  }, [tokens, status, sortBy, sortOrder]);

  const handleSort = (key: keyof Token) => {
    dispatch(setSortBy(key));
  };

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
    setModalOpen(true);
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-full bg-background border border-border">
        <ColumnHeader title={title} />

        <div className="flex-1 overflow-y-auto space-y-2 p-2">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            filteredAndSortedTokens.map(token => (
              <DetailedTokenCard
                key={token.id}
                token={token}
                onClick={handleTokenClick}
              />
            ))
          )}
        </div>

        <TokenModal
          token={selectedToken}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </ErrorBoundary>
  );
});

TokenColumn.displayName = 'TokenColumn';

export default TokenColumn;
