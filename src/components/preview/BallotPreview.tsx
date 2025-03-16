
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BallotPositionCard from './BallotPositionCard';
import { positions, Candidate } from '@/lib/positions';

interface BallotPreviewProps {
  ballotData: Record<string, string[]> | null;
  isLoading: boolean;
}

const BallotPreview = ({ ballotData, isLoading }: BallotPreviewProps) => {
  const navigate = useNavigate();
  
  const getSelectedCandidatesForPosition = (positionId: string): Candidate[] => {
    if (!ballotData) return [];
    
    const selectedIds = ballotData[positionId] || [];
    const position = positions.find(p => p.id === positionId);
    
    if (!position) return [];
    
    return position.candidates.filter(candidate => 
      selectedIds.includes(candidate.id)
    );
  };
  
  return (
    <div className={cn(
      "rounded-xl border border-border overflow-hidden shadow-sm",
      "transform transition-all duration-500",
      isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
    )}>
      <div className="bg-card p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">My Selected Candidates</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Selections
          </Button>
        </div>
      </div>
      
      <div className="divide-y divide-border">
        {isLoading ? (
          // Loading skeleton
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="p-6 animate-pulse">
              <div className="h-5 bg-muted/50 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                {Array(index + 1).fill(0).map((_, i) => (
                  <div key={i} className="h-12 bg-muted/30 rounded"></div>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Actual content
          positions.map(position => (
            <BallotPositionCard 
              key={position.id}
              positionId={position.id}
              selectedCandidates={getSelectedCandidatesForPosition(position.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BallotPreview;
