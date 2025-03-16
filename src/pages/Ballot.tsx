
import { useState } from 'react';
import Footer from '@/components/Footer';
import useSessionStorage from '@/lib/useSessionStorage';
import BallotSection from '@/components/BallotSection';

const Ballot = () => {
  const [selectedCandidates, setSelectedCandidates] = useSessionStorage<Record<string, string[]>>(
    'kodigo-selections', 
    {}
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <BallotSection 
        selectedCandidates={selectedCandidates}
        setSelectedCandidates={setSelectedCandidates}
      />
      <Footer />
    </div>
  );
};

export default Ballot;
