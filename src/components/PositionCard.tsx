
import { useState, KeyboardEvent } from 'react';
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
  
  const getPositionColor = () => {
    switch(position.id) {
      case 'senators':
        return 'from-blue-50 to-blue-100 border-blue-200';
      case 'party-list':
        return 'from-purple-50 to-purple-100 border-purple-200';
      default:
        return 'from-green-50 to-green-100 border-green-200';
    }
  };
  
  const getHeaderColor = () => {
    switch(position.id) {
      case 'senators':
        return 'bg-blue-100 border-blue-200';
      case 'party-list':
        return 'bg-purple-100 border-purple-200';
      default:
        return 'bg-green-100 border-green-200';
    }
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };
      
  return (
    <div className={cn(
      "rounded-lg border shadow-sm transition-all duration-300 ease-in-out overflow-hidden",
      isExpanded ? "mb-6" : "mb-2",
      getPositionColor(),
      "bg-gradient-to-br"
    )}
    role="region"
    aria-label={`${position.title} selection panel`}
    >
      {/* Position Header */}
      <div 
        className={cn(
          "py-4 px-4 sm:px-5 flex flex-col items-center justify-center cursor-pointer border-b",
          getHeaderColor()
        )}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-controls={`position-content-${position.id}`}
      >
        <div className="flex items-center gap-2 mb-1 w-full justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full p-1"
                  aria-label={`Information about ${position.title}`}
                >
                  <Info className="h-4 w-4 text-gray-500 hover:text-gray-700 cursor-help" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">{position.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <h2 className="text-base sm:text-lg font-bold text-center flex-1 uppercase" id={`position-title-${position.id}`}>
            {position.title}
          </h2>
          
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-700" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-700" aria-hidden="true" />
          )}
        </div>
        
        <div className="text-xs sm:text-sm text-center w-full flex flex-wrap justify-center items-center gap-2">
          <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm">
            Vote for {position.maxSelections}
          </span>
          <span className="text-gray-700 italic text-xs sm:text-sm">(Bumoto ng hindi hihigit sa {position.maxSelections})</span>
        </div>
      </div>
      
      {/* Position Content */}
      {isExpanded && (
        <div id={`position-content-${position.id}`}>
          {/* Selection Reminder */}
          {remainingSelections > 0 && position.maxSelections > 1 && (
            <div 
              className="px-3 py-2 bg-yellow-50 text-xs sm:text-sm border-b border-yellow-200 font-medium"
              aria-live="polite"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full" aria-hidden="true"></span>
                Select <span className="font-bold">{remainingSelections}</span> more candidate{remainingSelections !== 1 ? 's' : ''}
                <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full" aria-hidden="true"></span>
              </div>
            </div>
          )}
          
          {/* Candidates Grid - Using table-like layout for ballot style */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5 p-0.5 bg-white"
            role={position.maxSelections === 1 ? "radiogroup" : "group"}
            aria-labelledby={`position-title-${position.id}`}
            aria-describedby={`position-description-${position.id}`}
          >
            <div id={`position-description-${position.id}`} className="sr-only">
              You can select up to {position.maxSelections} candidate{position.maxSelections !== 1 ? 's' : ''} for {position.title}. 
              Current selections: {selectionCount}.
            </div>
            
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
        </div>
      )}
    </div>
  );
};

export default PositionCard;
