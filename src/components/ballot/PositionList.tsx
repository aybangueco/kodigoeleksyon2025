
import { cn } from '@/lib/utils';
import { positions } from '@/lib/positions';

interface PositionListProps {
  selectedCandidates: Record<string, string[]>;
  onCandidateSelect: (positionId: string, candidateId: string) => void;
  isLoading: boolean;
}

const PositionList = ({ selectedCandidates, onCandidateSelect, isLoading }: PositionListProps) => {
  return (
    <div className={cn(
      "transition-opacity duration-500 ease-in-out border-2 border-black print:border",
      isLoading ? "opacity-0" : "opacity-100"
    )}>
      <div className="bg-white">
        {positions.map(position => (
          <div key={position.id} className="mb-0 last:mb-0">
            <div className={cn(
              "py-3 px-4 flex flex-col items-center justify-center border-b-2 border-black",
              position.id === 'vice-president' ? "bg-[#d1e7e7]" : "bg-[#e6f5e6]"
            )}>
              <h2 className="text-lg font-bold uppercase text-center">
                {position.title} / Vote for {position.maxSelections}
              </h2>
              <p className="text-sm text-center italic">
                (Bumoto ng hindi hihigit sa {position.maxSelections})
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {position.candidates.map((candidate, index) => {
                const isSelected = (selectedCandidates[position.id] || []).includes(candidate.id);
                return (
                  <div 
                    key={candidate.id} 
                    className="border border-gray-400 p-2 cursor-pointer hover:bg-gray-50"
                    onClick={() => onCandidateSelect(position.id, candidate.id)}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border border-gray-400 flex items-center justify-center">
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-1">
                          <span className="font-medium">{index + 1}.</span>
                          <span className="font-medium uppercase">{candidate.name}</span>
                        </div>
                        <div className="text-xs text-gray-600">({candidate.party})</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionList;
