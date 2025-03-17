
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { cn } from '@/lib/utils';
import { Position, Candidate } from '@/lib/positions';
import useAnalytics from '@/hooks/useAnalytics';
import { useIsMobile } from '@/hooks/use-mobile';
import BallotActionButtons from './BallotActionButtons';
import CandidateSelections from './CandidateSelections';
import BallotHeader from './BallotHeader';
import BallotFooter from './BallotFooter';

type BallotCandidate = {
  position: Position;
  candidate: Candidate;
};

interface BallotPreviewProps {
  selectedCandidatesList: BallotCandidate[];
  selectedPositions: string[];
  positions: Position[];
  cityName?: string;
  shareLink?: string;
}

const BallotPreview = ({ 
  selectedCandidatesList, 
  selectedPositions,
  positions,
  cityName = "Zamboanga City",
  shareLink
}: BallotPreviewProps) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const ballotRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useAnalytics();
  const isMobile = useIsMobile();
  
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
        scale: isMobile ? 1 : 2,
        useCORS: true,
        logging: false,
      });
      
      const dataUrl = canvas.toDataURL('image/png');
      
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
    <div className="bg-white rounded-lg border overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="border-b p-3 sm:p-4 bg-gradient-to-r from-background to-muted/30">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-3">Your Kodigo Ballot</h2>
        
        <BallotActionButtons
          isPrinting={isPrinting}
          shareLink={shareLink}
          cityName={cityName}
          onPrint={handlePrint}
          onDownload={handleDownload}
        />
      </div>
      
      <div 
        ref={ballotRef}
        className="p-4 sm:p-6 pt-6 sm:pt-8 print:p-0 bg-white transition-opacity relative"
      >
        <BallotHeader cityName={cityName} />
        
        <CandidateSelections
          selectedPositions={selectedPositions}
          positions={positions}
          getCandidatesForPosition={getCandidatesForPosition}
          isPrinting={isPrinting}
        />
        
        <BallotFooter />
      </div>
    </div>
  );
};

export default BallotPreview;
