
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { ArrowRight, CheckSquare, Share2, Shield, Save, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { positions } from '@/lib/positions';
import { encryptBallot } from '@/lib/encryption';
import useSessionStorage from '@/lib/useSessionStorage';

const Index = () => {
  const navigate = useNavigate();
  // Refs for animation targets
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const ballotRef = useRef<HTMLDivElement>(null);
  
  const [selectedCandidates, setSelectedCandidates] = useSessionStorage<Record<string, string[]>>(
    'kodigo-selections', 
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  
  const [completedPositions, setCompletedPositions] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const [showBallot, setShowBallot] = useState(true);

  // Simple intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);
    if (ballotRef.current) observer.observe(ballotRef.current);

    return () => observer.disconnect();
  }, []);

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Ballot Section (now shown by default) */}
      <section 
        ref={ballotRef}
        className="py-12 px-6 bg-white mt-16"
      >
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
      </section>
      
      {/* Hero Section - now below the ballot */}
      <section 
        ref={heroRef}
        className="pt-16 pb-20 px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Philippine National Elections 2025
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Your personal
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-ph-blue to-primary">
                  election guide
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mb-8">
                Create your own personalized election kodigo. Save your candidate choices 
                and share them with friends and family.
              </p>
            </div>
            
            <div className="relative opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-ph-blue/10 via-transparent to-ph-red/10 z-0"></div>
                
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-ph-red"></div>
                      <div className="w-3 h-3 rounded-full bg-ph-yellow"></div>
                      <div className="w-3 h-3 rounded-full bg-ph-blue"></div>
                    </div>
                    <div className="text-xs font-medium text-muted-foreground">Kodigo 2025</div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">My Candidates</h3>
                    <div className="space-y-3">
                      {[
                        { position: "President", name: "Juan Dela Cruz" },
                        { position: "Vice President", name: "Elena Magsaysay" },
                        { position: "Senator", name: "Antonio Bautista" },
                        { position: "Senator", name: "Carmen Dizon" },
                        { position: "Senator", name: "Roberto Santos" }
                      ].map((item, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between p-2 rounded-lg bg-secondary/60 animate-pulse-subtle"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <div className="text-xs text-muted-foreground">{item.position}</div>
                          <div className="text-sm font-medium">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="px-4 py-2 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary/90 transition-colors">
                      Share My Kodigo
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-ph-yellow/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute bottom-[-30px] left-[-30px] w-60 h-60 bg-ph-blue/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 px-6 bg-secondary/30"
      >
        <div className="container mx-auto max-w-6xl opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple tools to help you prepare for the 2025 Philippine National Elections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckSquare,
                title: "Track Your Choices",
                description: "Easily select and track your preferred candidates for each national position."
              },
              {
                icon: Share2,
                title: "Shareable Link",
                description: "Generate a unique link to share your selections with friends and family."
              },
              {
                icon: Shield,
                title: "Privacy Focused",
                description: "Your selections are encrypted and not stored on any server."
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className={cn(
                  "p-6 rounded-xl bg-white border border-border shadow-sm",
                  "transform transition-all duration-500 hover:shadow-md hover:-translate-y-1",
                  "opacity-0 animate-fade-up"
                )}
                style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section 
        ref={howItWorksRef}
        className="py-20 px-6"
      >
        <div className="container mx-auto max-w-6xl opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to create and share your election kodigo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Ballot",
                description: "Select your preferred candidates for each national position."
              },
              {
                step: "02",
                title: "Review Your Choices",
                description: "Check your selections and make any necessary changes."
              },
              {
                step: "03",
                title: "Share Your Kodigo",
                description: "Generate a unique link to share with others."
              }
            ].map((step, i) => (
              <div 
                key={i}
                className="relative opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="absolute top-0 left-0 text-6xl font-bold text-primary/10">{step.step}</div>
                <div className="pt-10 pl-8">
                  <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 right-[-30px] text-muted/30 z-10">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button 
              size="lg"
              className="transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
              onClick={() => setShowBallot(true)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
