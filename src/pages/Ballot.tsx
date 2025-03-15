
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PositionCard from '@/components/PositionCard';
import { positions } from '@/lib/positions';
import { encryptBallot } from '@/lib/encryption';
import useSessionStorage from '@/lib/useSessionStorage';
import { Button } from '@/components/ui/button';

const Ballot = () => {
  const navigate = useNavigate();
  const [selectedCandidates, setSelectedCandidates] = useSessionStorage<Record<string, string[]>>(
    'kodigo-selections', 
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  
  const [completedPositions, setCompletedPositions] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  // Calculate completed positions and progress
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
        // Partial selection also counts towards progress
        filledCount += selected.length / position.maxSelections;
      }
    });
    
    setCompletedPositions(completed);
    
    // Calculate progress percentage (0-100)
    const totalPositions = positions.length;
    setProgress(Math.round((filledCount / totalPositions) * 100));
  }, [selectedCandidates]);
  
  // Handle candidate selection
  const handleCandidateSelect = (positionId: string, candidateId: string) => {
    setSelectedCandidates(prev => {
      const position = positions.find(p => p.id === positionId);
      if (!position) return prev;
      
      const currentSelections = prev[positionId] || [];
      let newSelections: string[];
      
      // If single selection position (maxSelections === 1)
      if (position.maxSelections === 1) {
        // Toggle selection
        newSelections = currentSelections.includes(candidateId) ? [] : [candidateId];
      } else {
        // Multiple selection position
        if (currentSelections.includes(candidateId)) {
          // Remove if already selected
          newSelections = currentSelections.filter(id => id !== candidateId);
        } else {
          // Add if not at max limit yet
          if (currentSelections.length < position.maxSelections) {
            newSelections = [...currentSelections, candidateId];
          } else {
            // At limit, show a toast and don't change
            toast.warning(`You can only select ${position.maxSelections} candidates for ${position.title}`);
            return prev;
          }
        }
      }
      
      // Update the state with new selections
      return {
        ...prev,
        [positionId]: newSelections
      };
    });
  };
  
  // Handle preview navigation
  const handlePreview = () => {
    // Generate encrypted ballot data and navigate to preview page
    const encryptedData = encryptBallot(selectedCandidates);
    navigate(`/preview?data=${encryptedData}`);
  };
  
  // Check if any candidates are selected
  const hasSelections = Object.values(selectedCandidates).some(
    selections => selections.length > 0
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-6 transition-opacity duration-500 ease-in-out">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-10">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Kodigo</h1>
            <p className="text-muted-foreground max-w-2xl">
              Select your preferred candidates for each position. Your selections are saved automatically
              in your browser, and you can share them later via a special link.
            </p>
          </div>
          
          {/* Progress Indicator */}
          <div className="mb-10 bg-muted/30 p-5 rounded-xl border border-border">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium">Your Progress</h2>
              <span className="text-sm font-medium">{progress}% Complete</span>
            </div>
            
            <div className="w-full bg-muted/50 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <span>{completedPositions.size} of {positions.length} positions completed</span>
            </div>
          </div>
          
          {/* Ballot Form */}
          <div className={cn(
            "transition-opacity duration-500 ease-in-out",
            isLoading ? "opacity-0" : "opacity-100"
          )}>
            {positions.map(position => (
              <PositionCard
                key={position.id}
                position={position}
                selectedCandidates={selectedCandidates}
                onCandidateSelect={handleCandidateSelect}
              />
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-end">
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
            
            <Button
              className="group transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
              onClick={handlePreview}
              disabled={!hasSelections}
            >
              Preview and Share
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Ballot;
