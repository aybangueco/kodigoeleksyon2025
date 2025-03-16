
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { decryptBallot } from '@/lib/encryption';
import PreviewHeader from '@/components/preview/PreviewHeader';
import ShareSection from '@/components/preview/ShareSection';
import BallotPreview from '@/components/preview/BallotPreview';
import ElectionReminder from '@/components/preview/ElectionReminder';

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ballotData, setBallotData] = useState<Record<string, string[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shareLink, setShareLink] = useState('');
  
  useEffect(() => {
    setIsLoading(true);
    
    // Extract encrypted data from URL
    const params = new URLSearchParams(location.search);
    const encryptedData = params.get('data');
    
    if (!encryptedData) {
      toast.error('No ballot data found');
      navigate('/');
      return;
    }
    
    // Decrypt the data
    const decryptedData = decryptBallot(encryptedData);
    
    if (!decryptedData) {
      toast.error('Invalid ballot data');
      navigate('/');
      return;
    }
    
    // Set the decrypted data and share link
    setBallotData(decryptedData);
    setShareLink(window.location.href);
    
    // Simulate loading for smoother transition
    setTimeout(() => setIsLoading(false), 700);
  }, [location.search, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Preview Your Kodigo - Eleksyon 2025 Ballot</title>
        <meta name="description" content="Review and share your personalized Kodigo ballot selections for the 2025 Philippine elections in Zamboanga City." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-6 transition-opacity duration-500 ease-in-out">
        <div className="container mx-auto max-w-4xl">
          <PreviewHeader />
          <ShareSection shareLink={shareLink} />
          <BallotPreview ballotData={ballotData} isLoading={isLoading} />
          <ElectionReminder />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Preview;
