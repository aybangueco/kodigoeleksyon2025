
import { cn } from '@/lib/utils';
import { Candidate } from '@/lib/positions';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (id: string) => void;
  selectionMode: 'single' | 'multiple';
  index: number;
}

const CandidateCard = ({ 
  candidate, 
  isSelected, 
  onSelect,
  selectionMode,
  index
}: CandidateCardProps) => {
  return (
    <div
      className={cn(
        "border border-gray-300 p-2 hover:bg-gray-50 cursor-pointer",
        isSelected ? "bg-gray-100 !print:bg-gray-300" : ""
      )}
      onClick={() => onSelect(candidate.id)}
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border border-gray-400 flex items-center justify-center print:border-2 print:border-black">
          {isSelected && (
            <div className="w-3 h-3 rounded-full bg-primary print:bg-black"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-1">
            <span className="font-medium">{index}.</span>
            <span className={cn(
              "font-medium uppercase",
              isSelected && "print:font-bold"
            )}>
              {candidate.name}</span>
          </div>
          <div className="text-xs text-gray-600">({candidate.party})</div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
