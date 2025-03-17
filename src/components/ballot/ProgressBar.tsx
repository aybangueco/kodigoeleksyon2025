
import { useState, useEffect } from 'react';
import { Position } from '@/lib/positions';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  selectedCandidates: Record<string, string[]>;
  positions: Position[];
}

const ProgressBar = ({ selectedCandidates, positions }: ProgressBarProps) => {
  const [completedPositions, setCompletedPositions] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const completed = new Set<string>();
    let filledCount = 0;
    
    positions.forEach(position => {
      const selected = selectedCandidates[position.id] || [];
      if (selected.length >= position.maxSelections) {
        completed.add(position.id);
        filledCount++;
      } else if (selected.length > 0) {
        filledCount += selected.length / position.maxSelections;
      }
    });
    
    setCompletedPositions(completed);
    
    const totalPositions = positions.length;
    setProgress(Math.round((filledCount / totalPositions) * 100));
  }, [selectedCandidates]);

  return (
    <div className="mb-8 bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
        <h2 className="text-lg font-semibold">Your Progress</h2>
        <div className="flex items-center gap-2">
          <div className={cn(
            "inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium",
            progress === 100 
              ? "bg-green-100 text-green-800" 
              : progress > 50 
                ? "bg-blue-100 text-blue-800"
                : "bg-yellow-100 text-yellow-800"
          )}>
            {progress}% Complete
          </div>
          <span className="text-sm text-gray-600">
            {completedPositions.size} of {positions.length} positions completed
          </span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className={cn(
            "h-3 rounded-full transition-all duration-700 ease-out",
            progress === 100 
              ? "bg-green-500" 
              : progress > 50 
                ? "bg-blue-500"
                : "bg-yellow-500"
          )}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
        {positions.map(position => {
          const selectedCount = selectedCandidates[position.id]?.length || 0;
          const isComplete = selectedCount >= position.maxSelections;
          const percentage = Math.round((selectedCount / position.maxSelections) * 100);
          
          return (
            <div key={position.id} className="text-xs">
              <div className="flex justify-between mb-1">
                <span className="font-medium truncate" title={position.title}>
                  {position.title.length > 20 ? `${position.title.substring(0, 20)}...` : position.title}
                </span>
                <span className={isComplete ? "text-green-600 font-medium" : "text-gray-600"}>
                  {selectedCount}/{position.maxSelections}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div 
                  className={cn(
                    "h-1.5 rounded-full",
                    isComplete ? "bg-green-500" : "bg-blue-400"
                  )}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
