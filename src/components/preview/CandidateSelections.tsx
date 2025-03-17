
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Position, Candidate } from '@/lib/positions';

interface CandidateSelectionsProps {
  selectedPositions: string[];
  positions: Position[];
  getCandidatesForPosition: (positionId: string) => Candidate[];
  isPrinting: boolean;
}

const CandidateSelections = ({ 
  selectedPositions, 
  positions, 
  getCandidatesForPosition,
  isPrinting
}: CandidateSelectionsProps) => {
  return (
    <div className={cn(
      "space-y-4 sm:space-y-6 print:space-y-2",
      isPrinting ? "opacity-70" : "opacity-100"
    )}>
      {selectedPositions.length > 0 ? (
        positions
          .filter(position => selectedPositions.includes(position.id))
          .map(position => {
            const candidatesForPosition = getCandidatesForPosition(position.id);
            
            return (
              <div key={position.id} className="print:page-break-inside-avoid group">
                <div className="bg-muted/60 print:bg-gray-200 px-3 sm:px-4 py-2 rounded-md print:rounded-none">
                  <h3 className="font-medium text-gray-800 print:text-black text-sm sm:text-base">
                    {position.title}
                  </h3>
                </div>
                
                <div className="mt-2 sm:mt-3 ml-2 sm:ml-3 space-y-1.5 sm:space-y-2 print:mt-1">
                  {candidatesForPosition.map(candidate => (
                    <div key={candidate.id} className="flex items-center gap-2 p-1.5 rounded-md group-hover:bg-muted/30 transition-colors duration-150">
                      <div className="w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full bg-primary print:bg-black flex-shrink-0"></div>
                      <span className="font-medium text-sm sm:text-base">{candidate.name}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground print:text-gray-600 max-w-[180px] overflow-hidden text-ellipsis">
                        ({candidate.party})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
      ) : (
        <div className="py-12 sm:py-16 text-center text-muted-foreground">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted mb-3">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
          </div>
          <p className="text-sm">No candidates selected. Go back to make your selections.</p>
        </div>
      )}
    </div>
  );
};

export default CandidateSelections;
