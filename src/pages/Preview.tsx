
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

  const shareLink = window.location.href;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Your Personalized Ballot | Kodigo Eleksyon 2025</title>
        <meta name="description" content="Preview and print your personalized ballot for the 2025 Philippine elections." />
        <meta name="robots" content="noindex" /> {/* Don't index preview pages */}
      </Helmet>
      
      <main className="flex-1 py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-8">
          <PreviewHeader cityName={cityParam} />
          
          <div className="relative">
            <div className="absolute -top-12 right-0 w-60 h-60 bg-ph-blue/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
            <div className="absolute -bottom-16 left-8 w-72 h-72 bg-ph-red/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
          
            <div className="mb-8">
              <BallotPreview 
                selectedCandidatesList={selectedCandidatesList}
                selectedPositions={selectedPositions}
                positions={positionsData}
                cityName={cityParam}
                shareLink={shareLink}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <ElectionReminder />
              
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
                <h3 className="text-sm font-medium mb-2 text-center">Kodigo Reminder</h3>
                <p className="text-xs text-muted-foreground text-center">
                  This is your personal ballot guide. Use it as reference when voting on Election Day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Preview;
