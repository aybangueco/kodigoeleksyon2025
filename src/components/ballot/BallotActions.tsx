import { ArrowRight, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

interface BallotActionsProps {
  hasSelections: boolean;
  onClear: () => void;
  onPreview: () => void;
}

const BallotActions = ({ hasSelections, onClear, onPreview }: BallotActionsProps) => {
  const handlePrint = async () => {
    toast.success("Preparing your Kodigo for printing...");
    
    try {
      // Find the ballot container
      const ballotElement = document.querySelector('.container.mx-auto.max-w-5xl') as HTMLElement;
      
      if (!ballotElement) {
        toast.error("Could not find ballot element to print");
        return;
      }
      
      // Create a canvas from the ballot element
      const canvas = await html2canvas(ballotElement, {
        scale: 2, // Higher resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      // Convert canvas to image data URL
      const imageData = canvas.toDataURL('image/png');
      
      // Open a new window with just the image
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        toast.error("Could not open print window. Please check your popup settings.");
        return;
      }
      
      // Write HTML content to the new window
      printWindow.document.write(`
        <html>
          <head>
            <title>Kodigo Eleksyon 2025</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
              }
              img {
                max-width: 100%;
                height: auto;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
              }
              @media print {
                body {
                  padding: 0;
                }
                img {
                  max-width: 100%;
                  box-shadow: none;
                }
              }
            </style>
          </head>
          <body>
            <img src="${imageData}" alt="Kodigo Ballot" />
          </body>
        </html>
      `);
      
      printWindow.document.close();
    } catch (error) {
      console.error("Error generating printable image:", error);
      toast.error("Failed to generate printable image. Please try again.");
    }
  };

  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
      <Button
        variant="outline"
        className="transition-all duration-300 print:hidden"
        onClick={() => {
          onClear();
          toast.success("Your selections have been cleared");
        }}
        disabled={!hasSelections}
      >
        Clear All Selections
      </Button>
      
      <div className="flex flex-col sm:flex-row gap-2 print:hidden">
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
