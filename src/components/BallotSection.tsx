
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { positions, Position } from '@/lib/positions';
import { encryptBallot } from '@/lib/encryption';
import { toast } from 'sonner';
import BallotHeader from './ballot/BallotHeader';
import ProgressBar from './ballot/ProgressBar';
import BallotActions from './ballot/BallotActions';
import useAnalytics from '@/hooks/useAnalytics';
import PositionCard from './PositionCard';

interface BallotSectionProps {
  selectedCandidates: Record<string, string[]>;
  setSelectedCandidates: (value: Record<string, string[]> | ((prev: Record<string, string[]>) => Record<string, string[]>)) => void;
  positions?: Position[];
  cityName?: string;
}

const BallotSection = ({ 
  selectedCandidates, 
  setSelectedCandidates,
  positions: customPositions,
  cityName = "Zamboanga City"
}: BallotSectionProps) => {
  const navigate = useNavigate();
  const ballotRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { trackEvent } = useAnalytics();
  const positionsToUse = customPositions || positions;

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading for smoother transition
  }, []);
  
  const handleCandidateSelect = (positionId: string, candidateId: string) => {
    setSelectedCandidates(prev => {
      const position = positionsToUse.find(p => p.id === positionId);
      if (!position) return prev;
      
      const currentSelections = prev[positionId] || [];
      let newSelections: string[];
      
      if (position.maxSelections === 1) {
        newSelections = currentSelections.includes(candidateId) ? [] : [candidateId];
      } else {
        if (currentSelections.includes(candidateId)) {
          newSelections = currentSelections.filter(id => id !== candidateId);
        } else {
          if (currentSelections.length < position.maxSelections) {
            newSelections = [...currentSelections, candidateId];
          } else {
            toast.warning(`You can only select ${position.maxSelections} candidates for ${position.title}`);
            return prev;
          }
        }
      }

      const candidate = position.candidates.find(c => c.id === candidateId);
      const action = newSelections.includes(candidateId) ? 'select' : 'deselect';
      trackEvent('ballot', `${action}_candidate`, `${position.title} - ${candidate?.name || candidateId}`);
      
      return {
        ...prev,
        [positionId]: newSelections
      };
    });
  };
  
  const handlePreview = () => {
    const encryptedData = encryptBallot(selectedCandidates);
    
    const totalSelections = Object.values(selectedCandidates).reduce(
      (sum, selections) => sum + selections.length, 0
    );
    trackEvent('ballot', 'preview_ballot', 'Generate preview', totalSelections);
    
    navigate(`/preview?data=${encryptedData}&city=${encodeURIComponent(cityName)}`);
  };
  
  const handleClearSelections = () => {
    trackEvent('ballot', 'clear_selections', 'Clear all selections');
    setSelectedCandidates({});
  };
  
  const hasSelections = Object.values(selectedCandidates).some(
    selections => selections.length > 0
  );

  return (
    <section 
      ref={ballotRef}
      className="py-12 px-6 min-h-screen bg-gradient-to-b from-white to-gray-50"
      aria-label="Ballot selection section"
    >
      <div className="container mx-auto max-w-5xl">
        <BallotHeader cityName={cityName} />
        <ProgressBar 
          selectedCandidates={selectedCandidates} 
          positions={positionsToUse}
        />
        
        <div className="space-y-6 mt-8 animate-fade-in" role="list" aria-label="Election positions">
          {!isLoading && positionsToUse.map(position => (
            <PositionCard 
              key={position.id}
              position={position}
              selectedCandidates={selectedCandidates}
              onCandidateSelect={handleCandidateSelect}
            />
          ))}
        </div>
        
        <BallotActions 
          hasSelections={hasSelections}
          onClear={handleClearSelections}
          onPreview={handlePreview}
        />
      </div>
    </section>
  );
};

export default BallotSection;
