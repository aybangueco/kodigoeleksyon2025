
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { decryptBallot } from '@/lib/encryption';
import { positions as zamboangaPositions } from '@/lib/positions';
import { cebuCityPositions } from '@/lib/cebuCityPositions';
import { Position, Candidate } from '@/lib/positions';
import Footer from '@/components/Footer';
import BallotPreview from '@/components/preview/BallotPreview';
import PreviewHeader from '@/components/preview/PreviewHeader';
import ElectionReminder from '@/components/preview/ElectionReminder';
import ShareSection from '@/components/preview/ShareSection';
import useAnalytics from '@/hooks/useAnalytics';

type BallotCandidate = {
  position: Position;
  candidate: Candidate;
};

const Preview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCandidatesList, setSelectedCandidatesList] = useState<BallotCandidate[]>([]);
  const { trackEvent } = useAnalytics();

  const encryptedData = searchParams.get('data');
  const cityParam = searchParams.get('city') || 'Zamboanga City';
  
  // Select position data based on city
  const positionsData = cityParam.includes('Cebu') ? cebuCityPositions : zamboangaPositions;
  
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
  
  const selectedPositions = Array.from(
    new Set(selectedCandidatesList.map(item => item.position.id))
  );

  // Generate the current URL for the share link
  const shareLink = window.location.href;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Your Personalized Ballot | Kodigo Eleksyon 2025</title>
        <meta name="description" content="Preview and print your personalized ballot for the 2025 Philippine elections." />
        <meta name="robots" content="noindex" /> {/* Don't index preview pages */}
      </Helmet>
      
      <main className="flex-1 py-24">
        <div className="container mx-auto max-w-5xl px-4 space-y-8">
          <PreviewHeader cityName={cityParam} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <BallotPreview 
                selectedCandidatesList={selectedCandidatesList}
                selectedPositions={selectedPositions}
                positions={positionsData}
                cityName={cityParam}
              />
            </div>
            
            <div className="lg:col-span-4 space-y-6">
              <ElectionReminder />
              <ShareSection shareLink={shareLink} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Preview;
