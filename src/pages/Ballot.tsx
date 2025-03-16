import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, Save, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PositionCard from '@/components/PositionCard';
import { positions } from '@/lib/positions';
import { encryptBallot } from '@/lib/encryption';
import useSessionStorage from '@/lib/useSessionStorage';
import { Button } from '@/components/ui/button';
import CandidateCard from '@/components/CandidateCard';

const Ballot = () => {
  const navigate = useNavigate();
  const [selectedCandidates, setSelectedCandidates] = useSessionStorage<Record<string, string[]>>(
    'kodigo-selections', 
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  
  const [completedPositions, setCompletedPositions] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading for smoother transition
    
    const completed = new Set<string>();
    let filledCount = 0;
    
    positions.forEach(position => {
      const selected = selectedCandidates[position.id] || [];
      if (selected.length >= position.maxSelections) {
        completed.add(position.id);
        filledCount++;
      } else if (selected.length > 0) {
        filledCount += selected.length / position.maxSelections;
      }
    });
    
    setCompletedPositions(completed);
    
    const totalPositions = positions.length;
    setProgress(Math.round((filledCount / totalPositions) * 100));
  }, [selectedCandidates]);
  
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
  
  const hasSelections = Object.values(selectedCandidates).some(
    selections => selections.length > 0
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 transition-opacity duration-500 ease-in-out">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">KODIGO ELEKSYON 2025</h1>
            <p className="text-center text-gray-600 max-w-2xl mx-auto text-sm">
              Select your preferred candidates for each position. Your selections are saved automatically
              in your browser, and you can print or share your kodigo after.
            </p>
          </div>
          
          <div className="mb-6 bg-white p-4 rounded-lg border border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-medium">Your Progress</h2>
              <span className="text-sm font-medium">{progress}% Complete</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="mt-2 text-sm text-gray-600">
              <span>{completedPositions.size} of {positions.length} positions completed</span>
            </div>
          </div>
          
          <div className={cn(
            "transition-opacity duration-500 ease-in-out border-2 border-black print:border",
            isLoading ? "opacity-0" : "opacity-100"
          )}>
            <div className="bg-white">
              {positions.map(position => (
                <div key={position.id} className="mb-0 last:mb-0">
                  <div className={cn(
                    "py-3 px-4 flex flex-col items-center justify-center border-b-2 border-black",
                    position.id === 'vice-president' ? "bg-[#d1e7e7]" : "bg-[#e6f5e6]"
                  )}>
                    <h2 className="text-lg font-bold uppercase text-center">
                      {position.title} / Vote for {position.maxSelections}
                    </h2>
                    <p className="text-sm text-center italic">
                      (Bumoto ng hindi hihigit sa {position.maxSelections})
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {position.candidates.map((candidate, index) => {
                      const isSelected = (selectedCandidates[position.id] || []).includes(candidate.id);
                      return (
                        <div 
                          key={candidate.id} 
                          className="border border-gray-400 p-2 cursor-pointer hover:bg-gray-50"
                          onClick={() => handleCandidateSelect(position.id, candidate.id)}
                        >
                          <div className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border border-gray-400 flex items-center justify-center">
                              {isSelected && (
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex gap-1">
                                <span className="font-medium">{index + 1}.</span>
                                <span className="font-medium uppercase">{candidate.name}</span>
                              </div>
                              <div className="text-xs text-gray-600">({candidate.party})</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
            <Button
              variant="outline"
              className="transition-all duration-300"
              onClick={() => {
                setSelectedCandidates({});
                toast.success("Your selections have been cleared");
              }}
              disabled={!hasSelections}
            >
              Clear All Selections
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.print()}
                disabled={!hasSelections}
              >
                <Printer className="h-4 w-4" />
                Print Kodigo
              </Button>
              
              <Button
                className="group transition-all duration-300"
                onClick={handlePreview}
                disabled={!hasSelections}
              >
                Share Kodigo
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ballot;
