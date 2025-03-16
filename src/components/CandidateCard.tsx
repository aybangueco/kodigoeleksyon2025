
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
      className="border border-gray-300 p-2 hover:bg-gray-50 cursor-pointer"
      onClick={() => onSelect(candidate.id)}
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border border-gray-400 flex items-center justify-center">
          {isSelected && (
            <div className="w-3 h-3 rounded-full bg-primary"></div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-1">
            <span className="font-medium">{index}.</span>
            <span className="font-medium uppercase">{candidate.name}</span>
          </div>
          <div className="text-xs text-gray-600">({candidate.party})</div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
