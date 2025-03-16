
import { useRef, useState } from 'react';
import Footer from '@/components/Footer';
import useSessionStorage from '@/lib/useSessionStorage';
import BallotSection from '@/components/BallotSection';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import useAnimationObserver from '@/hooks/useAnimationObserver';

const Index = () => {
  // Refs for animation targets
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const ballotRef = useRef<HTMLDivElement>(null);
  
  // Set up animation observer
  useAnimationObserver([heroRef, featuresRef, howItWorksRef, ballotRef]);
  
  const [selectedCandidates, setSelectedCandidates] = useSessionStorage<Record<string, string[]>>(
    'kodigo-selections', 
    {}
  );
  
  const [showBallot, setShowBallot] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* How it Works Section */}
      <HowItWorksSection onGetStarted={() => setShowBallot(true)} />
      
      {/* Ballot Section (shown when user clicks Get Started) */}
      {showBallot && (
        <BallotSection 
          selectedCandidates={selectedCandidates}
          setSelectedCandidates={setSelectedCandidates}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Index;
