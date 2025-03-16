
import { Button } from '@/components/ui/button';
import { Trash2, Eye, Printer, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BallotActionsProps {
  hasSelections: boolean;
  onClear: () => void;
  onPreview: () => void;
}

const BallotActions = ({ hasSelections, onClear, onPreview }: BallotActionsProps) => {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className={cn(
      "sticky bottom-0 pt-4 pb-4 bg-white z-10 border-t border-gray-200 mt-8 no-print",
      "animate-fade-in transition-all duration-300 ease-in-out",
      "flex flex-col sm:flex-row justify-end items-center gap-3 sm:gap-4 w-full"
    )}>
      <Button
        variant="outline"
        className={cn(
          "flex items-center gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto order-1 sm:order-none",
          !hasSelections && "opacity-50 cursor-not-allowed"
        )}
        onClick={onClear}
        disabled={!hasSelections}
      >
        <Trash2 className="h-4 w-4" />
        Clear Selections
      </Button>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <Button
          variant="outline"
          className="flex items-center gap-2 border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 w-full sm:w-auto"
          onClick={handlePrint}
        >
          <Printer className="h-4 w-4" />
          Print
        </Button>
        
        <Button
          className={cn(
            "flex items-center gap-2 bg-primary hover:bg-primary/90 transition-transform hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto",
            !hasSelections && "opacity-50 cursor-not-allowed"
          )}
          onClick={onPreview}
          disabled={!hasSelections}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>
    </div>
  );
};

export default BallotActions;
