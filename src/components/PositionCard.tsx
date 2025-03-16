
import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Position } from '@/lib/positions';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CandidateCard from './CandidateCard';

interface PositionCardProps {
  position: Position;
  selectedCandidates: Record<string, string[]>;
  onCandidateSelect: (positionId: string, candidateId: string) => void;
}

const PositionCard = ({ 
  position, 
  selectedCandidates, 
  onCandidateSelect 
}: PositionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const positionSelections = selectedCandidates[position.id] || [];
  const selectionCount = positionSelections.length;
  const maxSelections = position.maxSelections;
  
  // Calculate how many candidates can still be selected
  const remainingSelections = maxSelections - selectionCount;
  
  const bgColorClass = position.id === 'senators' ? 'bg-[#e6f5e6]' : 
                       position.id === 'party-list' ? 'bg-[#e6f5e6]' :
                       position.id === 'vice-mayor-zamboanga' ? 'bg-[#d1e7e7]' : 'bg-[#e6f5e6]';
                       
  const headerBgColorClass = position.id === 'senators' ? 'bg-[#e6f5e6]' : 
                            position.id === 'party-list' ? 'bg-[#e6f5e6]' :
                            position.id === 'vice-mayor-zamboanga' ? 'bg-[#d1e7e7]' : 'bg-[#e6f5e6]';
      
  return (
    <div className={cn(
      "rounded-none border border-gray-400 shadow-sm transition-all duration-300 ease-in-out mb-4",
      isExpanded ? "mb-6" : "mb-2",
      bgColorClass
    )}>
      {/* Position Header */}
      <div 
        className={cn(
          "py-3 px-4 flex flex-col items-center justify-center cursor-pointer border-b border-gray-400",
          headerBgColorClass
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 mb-1 w-full justify-between">
          <h2 className="text-lg font-bold text-center flex-1 uppercase">
            {position.title} / Vote for {position.maxSelections}
          </h2>
          
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-700" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-700" />
          )}
        </div>
        
        <div className="text-sm text-center w-full">
          <span className="text-gray-700 italic">(Bumoto ng hindi hihigit sa {position.maxSelections})</span>
        </div>
      </div>
      
      {/* Position Content */}
      {isExpanded && (
        <>
          {/* Selection Reminder */}
          {remainingSelections > 0 && position.maxSelections > 1 && (
            <div className="px-4 py-2 bg-yellow-50 text-sm border-b border-gray-400">
              Select <span className="font-bold">{remainingSelections}</span> more candidate{remainingSelections !== 1 ? 's' : ''}
            </div>
          )}
          
          {/* Candidates Grid - Using table-like layout for ballot style */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {position.candidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={positionSelections.includes(candidate.id)}
                onSelect={(candidateId) => onCandidateSelect(position.id, candidateId)}
                selectionMode={position.maxSelections === 1 ? 'single' : 'multiple'}
                index={index + 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PositionCard;
