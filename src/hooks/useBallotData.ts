
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decryptBallot } from '@/lib/encryption';
import { Position, Candidate } from '@/lib/positions';
import useAnalytics from '@/hooks/useAnalytics';

export type BallotCandidate = {
  position: Position;
  candidate: Candidate;
};

interface UseBallotDataProps {
  encryptedData: string | null;
  positionsData: Position[];
}

export function useBallotData({ encryptedData, positionsData }: UseBallotDataProps) {
  const [selectedCandidatesList, setSelectedCandidatesList] = useState<BallotCandidate[]>([]);
  const navigate = useNavigate();
  const { trackEvent } = useAnalytics();
  
  useEffect(() => {
    if (!encryptedData) {
      navigate('/');
      return;
    }

    try {
      const decryptedData = decryptBallot(encryptedData);
      
      if (!decryptedData || Object.keys(decryptedData).length === 0) {
        navigate('/');
        return;
      }
      
      const candidates: BallotCandidate[] = [];
      
      Object.entries(decryptedData).forEach(([positionId, candidateIds]) => {
        const position = positionsData.find(p => p.id === positionId);
        
        if (position) {
          candidateIds.forEach(candidateId => {
            const candidate = position.candidates.find(c => c.id === candidateId);
            if (candidate) {
              candidates.push({ position, candidate });
            }
          });
        }
      });
      
      setSelectedCandidatesList(candidates);
      trackEvent('preview', 'view_preview', 'View ballot preview', candidates.length);
      
    } catch (error) {
      console.error('Error decrypting ballot data:', error);
      navigate('/');
    }
  }, [encryptedData, navigate, trackEvent, positionsData]);

  // Computed values
  const selectedPositions = Array.from(
    new Set(selectedCandidatesList.map(item => item.position.id))
  );

  return {
    selectedCandidatesList,
    selectedPositions
  };
}
