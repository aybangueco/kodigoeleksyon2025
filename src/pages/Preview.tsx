
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { positions as zamboangaPositions } from '@/lib/positions';
import { cebuCityPositions } from '@/lib/cebuCityPositions';
import Footer from '@/components/Footer';
import PreviewHeader from '@/components/preview/PreviewHeader';
import PreviewContent from '@/components/preview/PreviewContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { useBallotData } from '@/hooks/useBallotData';
import { makatiCityPositions } from '@/lib/makatiCityPositions';

const Preview = () => {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  
  // Extract URL parameters
  const encryptedData = searchParams.get('data');
  const cityParam = searchParams.get('city') || 'Zamboanga City';
  
  // Determine positions data based on city
  // TODO: refactor later on
  const positionsData = cityParam.includes('Cebu') ? cebuCityPositions : cityParam.includes('Makati') ? makatiCityPositions : zamboangaPositions;
  
  // Get ballot data using custom hook
  const { selectedCandidatesList, selectedPositions } = useBallotData({
    encryptedData,
    positionsData
  });

  // Current full URL for sharing
  const shareLink = window.location.href;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Helmet>
        <title>Your Personalized Ballot | Kodigo Eleksyon 2025</title>
        <meta name="description" content="Preview and print your personalized ballot for the 2025 Philippine elections." />
        <meta name="robots" content="noindex" /> {/* Don't index preview pages */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>
      
      <main className={`flex-1 ${isMobile ? 'py-24 px-3' : 'py-16 md:py-20 px-4'}`}>
        <div className="container mx-auto max-w-5xl space-y-6 md:space-y-8">
          <PreviewHeader cityName={cityParam} />
          
          <PreviewContent
            selectedCandidatesList={selectedCandidatesList}
            selectedPositions={selectedPositions}
            positions={positionsData}
            cityName={cityParam}
            shareLink={shareLink}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Preview;
