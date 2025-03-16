
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import useSessionStorage from '@/lib/useSessionStorage';
import BallotSection from '@/components/BallotSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import useAnimationObserver from '@/hooks/useAnimationObserver';

const Index = () => {
  // Refs for animation targets
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const ballotRef = useRef<HTMLDivElement>(null);
  
  // Set up animation observer
  useAnimationObserver([howItWorksRef, ballotRef]);
  
  const [selectedCandidates, setSelectedCandidates] = useSessionStorage<Record<string, string[]>>(
    'kodigo-selections', 
    {}
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Kodigo Eleksyon 2025 - Ballot Builder for Zamboanga City</title>
        <meta name="description" content="Create your personalized Kodigo ballot for the 2025 Philippine elections in Zamboanga City. Make the voting process faster and easier." />
        <link rel="canonical" href="https://kodigoeleksyon2025.com/" />
      </Helmet>
      
      {/* Ballot Section (always shown at the top) */}
      <BallotSection 
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      
      {/* How it Works Section */}
      <HowItWorksSection />
      
      <Footer />
    </div>
  );
};

export default Index;
