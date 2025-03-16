
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { positions } from '@/lib/positions';
import { encryptBallot } from '@/lib/encryption';
import { toast } from 'sonner';
import BallotHeader from './ballot/BallotHeader';
import ProgressBar from './ballot/ProgressBar';
import PositionList from './ballot/PositionList';
import BallotActions from './ballot/BallotActions';

interface BallotSectionProps {
  selectedCandidates: Record<string, string[]>;
  setSelectedCandidates: (value: Record<string, string[]> | ((prev: Record<string, string[]>) => Record<string, string[]>)) => void;
}

const BallotSection = ({ selectedCandidates, setSelectedCandidates }: BallotSectionProps) => {
  const navigate = useNavigate();
  const ballotRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading for smoother transition
  }, []);
  
  const handleCandidateSelect = (positionId: string, candidateId: string) => {
    setSelectedCandidates(prev => {
      const position = positions.find(p => p.id === positionId);
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
      
      return {
        ...prev,
        [positionId]: newSelections
      };
    });
  };
  
  const handlePreview = () => {
    const encryptedData = encryptBallot(selectedCandidates);
    navigate(`/preview?data=${encryptedData}`);
  };
  
  const handleClearSelections = () => {
    setSelectedCandidates({});
  };
  
  const hasSelections = Object.values(selectedCandidates).some(
    selections => selections.length > 0
  );

  return (
    <section 
      ref={ballotRef}
      className="py-12 px-6 bg-white mt-4"
    >
      <div className="container mx-auto max-w-5xl">
        <BallotHeader />
        <ProgressBar selectedCandidates={selectedCandidates} />
        <PositionList 
          selectedCandidates={selectedCandidates}
          onCandidateSelect={handleCandidateSelect}
          isLoading={isLoading}
        />
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
