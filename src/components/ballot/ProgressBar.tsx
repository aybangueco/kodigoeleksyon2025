
import { useState, useEffect } from 'react';
import { positions } from '@/lib/positions';

interface ProgressBarProps {
  selectedCandidates: Record<string, string[]>;
}

const ProgressBar = ({ selectedCandidates }: ProgressBarProps) => {
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
    <div className="mb-6 bg-white p-4 rounded-lg border border-gray-300">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-medium">Your Progress</h2>
        <span className="text-sm font-medium">{progress}% Complete</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="mt-2 text-sm text-gray-600">
        <span>{completedPositions.size} of {positions.length} positions completed</span>
      </div>
    </div>
  );
};

export default ProgressBar;
