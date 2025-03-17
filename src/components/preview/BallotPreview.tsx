
import { useRef, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Position, Candidate } from '@/lib/positions';
import html2canvas from 'html2canvas';
import useAnalytics from '@/hooks/useAnalytics';

type BallotCandidate = {
  position: Position;
  candidate: Candidate;
};

interface BallotPreviewProps {
  selectedCandidatesList: BallotCandidate[];
  selectedPositions: string[];
  positions: Position[];
  cityName?: string;
}

const BallotPreview = ({ 
  selectedCandidatesList, 
  selectedPositions,
  positions,
  cityName = "Zamboanga City"
}: BallotPreviewProps) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const ballotRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useAnalytics();
  
  const getCandidatesForPosition = (positionId: string) => {
    return selectedCandidatesList
      .filter(item => item.position.id === positionId)
      .map(item => item.candidate);
  };
  
  const handlePrint = () => {
    trackEvent('preview', 'print_ballot', 'Print ballot');
    window.print();
  };
  
  const handleDownload = async () => {
    if (!ballotRef.current) return;
    
    setIsPrinting(true);
    
    try {
      const canvas = await html2canvas(ballotRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: 'white',
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `kodigo-eleksyon-${cityName.toLowerCase().replace(/\s+/g, '-')}-ballot.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      trackEvent('preview', 'download_ballot', 'Download ballot image');
    } catch (error) {
      console.error('Error generating ballot image:', error);
    } finally {
      setIsPrinting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-md">
      {/* Preview Header */}
      <div className="border-b p-4 space-y-2">
        <h2 className="text-xl font-bold text-center">Your Kodigo Ballot</h2>
        
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </Button>
          
          <Button
            variant="default"
            size="sm"
            className="text-xs flex items-center gap-1"
            onClick={handleDownload}
            disabled={isPrinting}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download</span>
          </Button>
        </div>
      </div>
      
      {/* Ballot Preview Section */}
      <div 
        ref={ballotRef}
        className={cn(
          "p-6 pt-8 print:p-0 bg-white transition-opacity",
          isPrinting ? "opacity-70" : "opacity-100"
        )}
      >
        {/* Ballot Header */}
        <div className="text-center mb-6 print:mb-4">
          <h1 className="text-2xl font-bold text-primary print:text-black">
            KODIGO ELEKSYON 2025
          </h1>
          <p className="text-sm text-muted-foreground print:text-gray-700 mt-1">
            Your personalized ballot guide for {cityName}
          </p>
          <div className="border-b-2 border-dashed border-gray-300 my-4 print:border-gray-400"></div>
        </div>
        
        {/* Ballot Positions and Selections */}
        <div className="space-y-6 print:space-y-2">
          {selectedPositions.length > 0 ? (
            positions
              .filter(position => selectedPositions.includes(position.id))
              .map(position => {
                const candidatesForPosition = getCandidatesForPosition(position.id);
                
                return (
                  <div key={position.id} className="print:page-break-inside-avoid">
                    <div className="bg-gray-100 print:bg-gray-200 px-4 py-2 rounded-md print:rounded-none">
                      <h3 className="font-medium text-gray-800 print:text-black">
                        {position.title}
                      </h3>
                    </div>
                    
                    <div className="mt-2 ml-2 space-y-1 print:mt-1">
                      {candidatesForPosition.map(candidate => (
                        <div key={candidate.id} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary print:bg-black"></div>
                          <span className="font-medium">{candidate.name}</span>
                          <span className="text-sm text-muted-foreground print:text-gray-600">
                            ({candidate.party})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No candidates selected. Go back to make your selections.
            </div>
          )}
        </div>
        
        {/* Footer note */}
        <div className="mt-8 print:mt-6 text-center text-xs text-muted-foreground">
          <div className="border-t-2 border-dashed border-gray-300 mb-4 print:border-gray-400"></div>
          <p className="print:text-gray-700">
            Generated at kodigoeleksyon2025.netlify.app • Election day: May 12, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default BallotPreview;
