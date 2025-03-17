
import { useState, useEffect } from 'react';
import { positions as defaultPositions, Position } from '@/lib/positions';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  selectedCandidates: Record<string, string[]>;
  positions?: Position[];
}

const ProgressBar = ({ selectedCandidates, positions = defaultPositions }: ProgressBarProps) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const calculateProgress = () => {
      // Total number of positions that require selections
      const totalPositions = positions.length;
      
      // Count positions where at least one candidate is selected
      const filledPositions = positions.filter(position => {
        const selections = selectedCandidates[position.id] || [];
        return selections.length > 0;
      }).length;
      
      // Calculate percentage
      return Math.round((filledPositions / totalPositions) * 100);
    };
    
    setProgress(calculateProgress());
  }, [selectedCandidates, positions]);
  
  return (
    <div className="mt-4 mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Your ballot completion</span>
        <span className="text-sm font-medium text-primary">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full transition-all duration-500 ease-out",
            progress < 50 ? "bg-red-400" : progress < 100 ? "bg-yellow-400" : "bg-green-500"
          )}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Ballot completion percentage"
        ></div>
      </div>
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>Not started</span>
        <span>In progress</span>
        <span>Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
