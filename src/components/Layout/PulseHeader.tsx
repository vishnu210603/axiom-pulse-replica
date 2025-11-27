import { Settings, Star, TrendingUp, Grid3x3, Volume2, Target, LayoutGrid, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PulseHeader() {
  const handleMenuClick = () => {
    toast.info('Menu opened');
  };

  const handleGridView = () => {
    toast.info('Grid view toggled');
  };

  const handleSettings = () => {
    toast.info('Settings opened');
  };

  const handleWatchlist = () => {
    toast.success('Added to watchlist');
  };

  const handleCommunity = () => {
    toast.info('Community page opened');
  };

  const handleSound = () => {
    toast.info('Sound notifications toggled');
  };

  const handleTarget = () => {
    toast.info('Price alerts configured');
  };

  return (
    <div className="border-b border-border bg-background px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Pulse</h1>
          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={handleMenuClick}>
            <div className="flex flex-col gap-0.5">
              <div className="w-4 h-0.5 bg-primary" />
              <div className="w-4 h-0.5 bg-primary" />
              <div className="w-4 h-0.5 bg-primary" />
            </div>
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8" onClick={handleGridView}>
            <Grid3x3 className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground" onClick={handleSettings}>
            <Settings className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 text-xs">
                <LayoutGrid className="w-4 h-4 mr-1" />
                Display
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info('Compact view selected')}>
                Compact View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Detailed view selected')}>
                Detailed View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Card view selected')}>
                Card View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-warning" onClick={handleWatchlist}>
            <Star className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground" onClick={handleCommunity}>
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground" onClick={handleSound}>
            <Volume2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground" onClick={handleTarget}>
            <Target className="w-4 h-4" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 text-xs border border-border">
                <TrendingUp className="w-4 h-4 mr-1" />
                1
                <div className="flex flex-col gap-0.5 ml-1">
                  <div className="w-2 h-0.5 bg-primary" />
                  <div className="w-2 h-0.5 bg-primary" />
                  <div className="w-2 h-0.5 bg-primary" />
                </div>
                0
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => toast.info('Filter: All tokens')}>
                All Tokens
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Filter: High volume')}>
                High Volume
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Filter: New listings')}>
                New Listings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Filter: Price up')}>
                Price Increasing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info('Filter: Price down')}>
                Price Decreasing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
