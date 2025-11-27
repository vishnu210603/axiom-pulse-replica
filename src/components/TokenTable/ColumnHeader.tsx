import { Zap, LayoutGrid, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

interface ColumnHeaderProps {
  title: string;
}

export default function ColumnHeader({ title }: ColumnHeaderProps) {
  const [activePreset, setActivePreset] = useState<'P1' | 'P2' | 'P3'>('P1');

  const handleQuickTrade = () => {
    toast.success('Quick trade enabled for this column');
  };

  const handleLayoutToggle = () => {
    toast.info('Layout view toggled');
  };

  const handlePresetChange = (preset: 'P1' | 'P2' | 'P3') => {
    setActivePreset(preset);
    toast.info(`Preset ${preset} activated`);
  };

  const handleSettings = () => {
    toast.info(`Settings for ${title} column`);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-card border-b border-border">
      <h3 className="text-sm font-medium">{title}</h3>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-xs text-muted-foreground hover:text-primary"
          onClick={handleQuickTrade}
        >
          <Zap className="w-3 h-3 mr-1" />
          0
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-xs text-muted-foreground hover:text-primary"
          onClick={handleLayoutToggle}
        >
          <LayoutGrid className="w-3 h-3" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-6 px-2 text-xs ${activePreset === 'P1' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => handlePresetChange('P1')}
        >
          P1
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-6 px-2 text-xs ${activePreset === 'P2' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => handlePresetChange('P2')}
        >
          P2
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-6 px-2 text-xs ${activePreset === 'P3' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
          onClick={() => handlePresetChange('P3')}
        >
          P3
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 px-2 text-xs text-muted-foreground hover:text-primary"
          onClick={handleSettings}
        >
          <Settings className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
