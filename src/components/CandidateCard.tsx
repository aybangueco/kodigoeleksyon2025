
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Candidate } from '@/lib/positions';

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: (id: string) => void;
  selectionMode: 'single' | 'multiple';
}

const CandidateCard = ({ 
  candidate, 
  isSelected, 
  onSelect,
  selectionMode
}: CandidateCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl transition-all duration-300 ease-out transform",
        "border border-border p-4 cursor-pointer",
        isSelected 
          ? "bg-primary/5 border-primary/30 shadow-md" 
          : "bg-white hover:bg-secondary/30 hover:border-border/80",
        isSelected && "scale-[1.02]",
        selectionMode === 'multiple' ? "min-h-[140px]" : "min-h-[160px]"
      )}
      onClick={() => onSelect(candidate.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 text-primary animate-scale-up">
          <CheckCircle className="h-5 w-5" />
        </div>
      )}
      
      {/* Candidate Image or Placeholder */}
      <div className="mb-3 flex justify-center">
        <div className={cn(
          "w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center",
          "transition-all duration-300",
          isSelected ? "ring-2 ring-primary" : (isHovered ? "ring-1 ring-border" : "")
        )}>
          {candidate.image ? (
            <img 
              src={candidate.image} 
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-2xl font-medium text-muted-foreground">
              {candidate.name.charAt(0)}
            </span>
          )}
        </div>
      </div>
      
      {/* Candidate Details */}
      <div className="text-center">
        <h3 className={cn(
          "font-medium mb-1 transition-colors duration-300",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {candidate.name}
        </h3>
        <p className="text-xs text-muted-foreground">{candidate.party}</p>
      </div>
      
      {/* Selection Effect - Bottom Highlight */}
      <div className={cn(
        "absolute bottom-0 left-0 w-full h-1 bg-primary transform transition-transform duration-300",
        isSelected ? "scale-x-100" : "scale-x-0"
      )} />
    </div>
  );
};

export default CandidateCard;
