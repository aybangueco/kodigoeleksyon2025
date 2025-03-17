
import React from 'react';
import { Position } from '@/lib/positions';
import { useIsMobile } from '@/hooks/use-mobile';
import { BallotCandidate } from '@/hooks/useBallotData';
import BallotPreview from '@/components/preview/BallotPreview';
import ElectionReminder from '@/components/preview/ElectionReminder';
import ShareSection from '@/components/preview/ShareSection';

interface PreviewContentProps {
  selectedCandidatesList: BallotCandidate[];
  selectedPositions: string[];
  positions: Position[];
  cityName: string;
  shareLink: string;
}

const PreviewContent: React.FC<PreviewContentProps> = ({
  selectedCandidatesList,
  selectedPositions,
  positions,
  cityName,
  shareLink
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="relative">
      <div className="absolute -top-12 right-0 w-60 h-60 bg-ph-blue/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
      <div className="absolute -bottom-16 left-8 w-72 h-72 bg-ph-red/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
    
      <div className="mb-6 md:mb-8">
        <BallotPreview 
          selectedCandidatesList={selectedCandidatesList}
          selectedPositions={selectedPositions}
          positions={positions}
          cityName={cityName}
          shareLink={shareLink}
        />
      </div>
      
      <div className="grid grid-cols-1 gap-5 md:gap-6">
        <ShareSection shareLink={shareLink} />
        
        <ElectionReminder />
        
        <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
          <h3 className="text-sm font-medium mb-2 text-center">Kodigo Reminder</h3>
          <p className="text-xs text-muted-foreground text-center">
            This is your personal ballot guide. Use it as reference when voting on Election Day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewContent;
