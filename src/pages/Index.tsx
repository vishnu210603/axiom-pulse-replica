import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { useAppDispatch } from '@/store/hooks';
import { setTokens, updateTokenPrice } from '@/store/slices/tokensSlice';
import { generateMockTokens } from '@/utils/mockData';
import { mockWebSocket } from '@/services/mockWebSocket';
import TokenColumn from '@/components/TokenTable/TokenColumn';
import TopNav from '@/components/Layout/TopNav';
import PulseHeader from '@/components/Layout/PulseHeader';
import { Toaster } from '@/components/ui/sonner';

function TokenDashboard() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Initial load with delay to show skeleton
    setTimeout(() => {
      const tokens = generateMockTokens();
      dispatch(setTokens(tokens));
      mockWebSocket.connect(tokens);
    }, 1500);

    // Subscribe to WebSocket updates
    const unsubscribe = mockWebSocket.subscribe((update) => {
      console.log('💰 Received price update:', update);
      dispatch(updateTokenPrice(update));
    });

    return () => {
      unsubscribe();
      mockWebSocket.disconnect();
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNav />
      <PulseHeader />

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-0">
          <TokenColumn title="New Pairs" status="new" />
          <TokenColumn title="Final Stretch" status="final-stretch" />
          <TokenColumn title="Migrated" status="migrated" />
        </div>
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

const Index = () => {
  return (
    <Provider store={store}>
      <TokenDashboard />
    </Provider>
  );
};

export default Index;
