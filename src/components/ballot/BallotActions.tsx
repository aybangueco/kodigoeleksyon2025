
import { ArrowRight, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BallotActionsProps {
  hasSelections: boolean;
  onClear: () => void;
  onPreview: () => void;
}

const BallotActions = ({ hasSelections, onClear, onPreview }: BallotActionsProps) => {
  const handlePrint = () => {
    // Add a class to the document body before printing
    document.body.classList.add('is-printing');
    
    // Wait a moment for styles to apply
    setTimeout(() => {
      // Trigger print
      window.print();
      
      // Remove the class after print dialog closes
      setTimeout(() => {
        document.body.classList.remove('is-printing');
      }, 500);
    }, 100);
    
    toast.success("Preparing your Kodigo for printing");
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
      <Button
        variant="outline"
        className="transition-all duration-300"
        onClick={() => {
          onClear();
          toast.success("Your selections have been cleared");
        }}
        disabled={!hasSelections}
      >
        Clear All Selections
      </Button>
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          className="gap-2"
          onClick={handlePrint}
          disabled={!hasSelections}
        >
          <Printer className="h-4 w-4" />
          Print Kodigo
        </Button>
        
        <Button
          className="group transition-all duration-300"
          onClick={onPreview}
          disabled={!hasSelections}
        >
          Share Kodigo
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default BallotActions;
