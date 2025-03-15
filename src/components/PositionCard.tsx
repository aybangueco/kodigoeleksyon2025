
import { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import CandidateCard from './CandidateCard';
import { Position } from '@/lib/positions';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  
  // Grid column count based on screen size
  const gridColClass = 
    position.maxSelections === 1 
      ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" 
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
      
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card shadow-sm transition-all duration-500 ease-in-out",
      "overflow-hidden",
      isExpanded ? "mb-8" : "mb-4"
    )}>
      {/* Position Header */}
      <div 
        className={cn(
          "p-5 flex items-center justify-between cursor-pointer",
          "transition-colors duration-300",
          isExpanded ? "bg-card" : "bg-muted/30 hover:bg-muted/50"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-medium text-foreground">
            {position.title}
          </h2>
          
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <button 
                  className="inline-flex items-center justify-center rounded-full p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{position.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className={selectionCount > 0 ? "text-primary font-medium" : "text-muted-foreground"}>
              {selectionCount}
            </span>
            <span className="text-muted-foreground mx-1">of</span>
            <span className="text-muted-foreground">{maxSelections}</span>
            <span className="text-muted-foreground ml-1">selected</span>
          </div>
          
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {/* Position Content */}
      {isExpanded && (
        <div className="p-5 border-t border-border">
          {/* Selection Limit Indicator */}
          <div className={cn(
            "mb-4 px-4 py-2 rounded-lg text-sm",
            remainingSelections > 0 
              ? "bg-blue-50 text-blue-700 border border-blue-100" 
              : "bg-green-50 text-green-700 border border-green-100"
          )}>
            {remainingSelections > 0 ? (
              <>Select <span className="font-medium">{remainingSelections}</span> more candidate{remainingSelections !== 1 ? 's' : ''}</>
            ) : (
              <>Maximum selection reached</>
            )}
          </div>
          
          {/* Candidates Grid */}
          <div className={cn(
            "grid gap-4",
            gridColClass
          )}>
            {position.candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={positionSelections.includes(candidate.id)}
                onSelect={(candidateId) => onCandidateSelect(position.id, candidateId)}
                selectionMode={position.maxSelections > 1 ? 'multiple' : 'single'}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PositionCard;
