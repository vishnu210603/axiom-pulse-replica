import { Token } from '@/store/slices/tokensSlice';

export class MockWebSocketService {
  private listeners: Set<(data: { id: string; price: number; priceChange24h: number }) => void> = new Set();
  private interval: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];

  connect(tokens: Token[]) {
    this.tokens = tokens;
    this.startPriceUpdates();
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.listeners.clear();
  }

  subscribe(callback: (data: { id: string; price: number; priceChange24h: number }) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private startPriceUpdates() {
    if (this.interval) return;

    this.interval = setInterval(() => {
      if (this.tokens.length === 0) return;

      // Randomly select 1-3 tokens to update
      const numUpdates = Math.floor(Math.random() * 3) + 1;
      const tokensToUpdate = this.getRandomTokens(numUpdates);

      tokensToUpdate.forEach(token => {
        // Generate realistic price change (-5% to +5%)
        const changePercent = (Math.random() - 0.5) * 10;
        const newPrice = token.price * (1 + changePercent / 100);
        const newPriceChange = token.priceChange24h + changePercent;

        const update = {
          id: token.id,
          price: parseFloat(newPrice.toFixed(6)),
          priceChange24h: parseFloat(newPriceChange.toFixed(2)),
        };

        console.log('📊 Mock WebSocket: Updating token', token.symbol, 'Price:', update.price, 'Change:', update.priceChange24h + '%');
        this.listeners.forEach(listener => listener(update));
      });
    }, 2000); // Update every 2 seconds
  }

  private getRandomTokens(count: number): Token[] {
    const shuffled = [...this.tokens].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, this.tokens.length));
  }
}

export const mockWebSocket = new MockWebSocketService();
