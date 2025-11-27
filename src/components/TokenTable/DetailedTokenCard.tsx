import { useState } from 'react';
import { Token } from '@/store/slices/tokensSlice';
import { Edit, Link2, Search, ThumbsUp, ThumbsDown, Flag, Users, Globe, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import PriceCell from './PriceCell';

interface DetailedTokenCardProps {
  token: Token;
  onClick: (token: Token) => void;
}

const DetailedTokenCard = ({ token, onClick }: DetailedTokenCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPercent = (num: number) => {
    const abs = Math.abs(num);
    return `${abs.toFixed(0)}%`;
  };

  const getPercentColor = (num: number) => {
    if (num > 0) return 'text-success';
    if (num < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getPercentBg = (num: number) => {
    if (num > 0) return 'bg-success/10';
    if (num < 0) return 'bg-destructive/10';
    return 'bg-muted/10';
  };

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    toast.success('Address copied to clipboard');
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Liked!');
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success('Disliked!');
  };

  const handleFlag = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info('Flagged for review');
  };

  return (
    <TooltipProvider delayDuration={300}>
      <div 
        className={cn(
          "bg-card border border-border transition-all duration-200 cursor-pointer",
          isHovered && "border-primary/50 shadow-lg shadow-primary/10"
        )}
        onClick={() => onClick(token)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Main Row */}
      <div className="flex items-center gap-3 p-3">
        {/* Token Image */}
        <div className="w-16 h-16 rounded border-2 border-primary/50 flex items-center justify-center text-2xl shrink-0 bg-background relative">
          {token.image}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-card" />
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm">{token.symbol}</span>
            <span className="text-xs text-muted-foreground truncate">{token.name}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleCopyAddress}
                  className="w-3 h-3 rounded-sm bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <span className="text-[8px]">📋</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>Copy address</TooltipContent>
            </Tooltip>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">{token.timeAgo}</span>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={(e) => { e.stopPropagation(); toast.info('Edit token'); }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Edit className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={(e) => { e.stopPropagation(); toast.info('Open link'); }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Link2 className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Open link</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={(e) => { e.stopPropagation(); toast.info('Search'); }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Search className="w-3 h-3" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Search</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 text-muted-foreground cursor-help">
                  <Users className="w-3 h-3" />
                  <span>{token.holders}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>{token.holders} holders</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={handleLike}
                    className="text-muted-foreground hover:text-success transition-colors"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <span className="text-muted-foreground">{token.likes}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Like this token</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={handleDislike}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                  <span className="text-muted-foreground">{token.dislikes}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>Dislike this token</TooltipContent>
            </Tooltip>
            
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-muted-foreground hover:text-warning transition-colors"
                >
                  <Flag className="w-3 h-3" />
                  <span>{token.flags}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Report this token</h4>
                  <p className="text-xs text-muted-foreground">
                    Flag suspicious activity or potential issues
                  </p>
                  <div className="space-y-1">
                    <button 
                      onClick={handleFlag}
                      className="w-full text-left text-xs p-2 rounded hover:bg-muted transition-colors"
                    >
                      Suspicious activity
                    </button>
                    <button 
                      onClick={handleFlag}
                      className="w-full text-left text-xs p-2 rounded hover:bg-muted transition-colors"
                    >
                      Scam or fraud
                    </button>
                    <button 
                      onClick={handleFlag}
                      className="w-full text-left text-xs p-2 rounded hover:bg-muted transition-colors"
                    >
                      Incorrect information
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Price Info */}
        <div className="text-right space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-xs text-muted-foreground cursor-help">
                MC <span className="text-primary font-medium">{formatNumber(token.marketCap)}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>Market Cap: ${token.marketCap.toLocaleString()}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm font-bold cursor-help">
                <span className={token.priceChange24h >= 0 ? 'text-success' : 'text-destructive'}>
                  V {formatNumber(token.volume24h)}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>24h Volume: ${token.volume24h.toLocaleString()}</TooltipContent>
          </Tooltip>
          <div className="flex justify-end">
            <PriceCell 
              price={token.price} 
              change={token.priceChange24h} 
              lastUpdate={token.lastUpdate} 
            />
          </div>
          <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
            <span>F =</span>
            <span>{token.feeRatio}</span>
            <span>TX {token.txCount}</span>
            <div className="w-8 h-1 bg-destructive/20" />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-3 px-3 pb-3 text-xs">
        <div className="w-16" /> {/* Spacer for alignment */}
        
        <div className="flex-1 flex items-center gap-3">
          {/* Percentage changes */}
          <div className="flex items-center gap-1">
            {token.priceChange24h < 0 ? (
              <TrendingDown className="w-3 h-3 text-destructive" />
            ) : (
              <TrendingUp className="w-3 h-3 text-success" />
            )}
            <span className={getPercentColor(token.priceChange24h)}>
              {formatPercent(token.priceChange24h)}
            </span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.change5m))}>
            {token.change5m > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : token.change5m < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span className={getPercentColor(token.change5m)}>
              {formatPercent(token.change5m)}
            </span>
            <span className="text-muted-foreground">5m</span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.change1m))}>
            {token.change1m > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : token.change1m < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span className={getPercentColor(token.change1m)}>
              {formatPercent(token.change1m)}
            </span>
            <span className="text-muted-foreground">43m</span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.change1h))}>
            {token.change1h > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : token.change1h < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Minus className="w-3 h-3" />
            )}
            <span className={getPercentColor(token.change1h)}>
              {formatPercent(token.change1h)}
            </span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.liquidityChange))}>
            <Globe className="w-3 h-3" />
            <span className={getPercentColor(token.liquidityChange)}>
              {formatPercent(token.liquidityChange)}
            </span>
          </div>

          <div className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded", getPercentBg(token.volumeChange))}>
            <TrendingUp className="w-3 h-3" />
            <span className={getPercentColor(token.volumeChange)}>
              {formatPercent(token.volumeChange)}
            </span>
          </div>
        </div>
      </div>

      {/* Address Row */}
      <div className="px-3 pb-2">
        <div className="text-[10px] text-muted-foreground font-mono">
          {token.address}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
};

export default DetailedTokenCard;
