
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeft, Copy, Edit, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { positions, Position, Candidate } from '@/lib/positions';
import { decryptBallot } from '@/lib/encryption';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
      navigate('/ballot');
      return;
    }
    
    // Decrypt the data
    const decryptedData = decryptBallot(encryptedData);
    
    if (!decryptedData) {
      toast.error('Invalid ballot data');
      navigate('/ballot');
      return;
    }
    
    // Set the decrypted data and share link
    setBallotData(decryptedData);
    setShareLink(window.location.href);
    
    // Simulate loading for smoother transition
    setTimeout(() => setIsLoading(false), 700);
  }, [location.search, navigate]);
  
  // Handle copy link button
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy link');
      console.error('Failed to copy link:', error);
    }
  };
  
  // Find selected candidates for each position
  const getSelectedCandidatesForPosition = (positionId: string): Candidate[] => {
    if (!ballotData) return [];
    
    const selectedIds = ballotData[positionId] || [];
    const position = positions.find(p => p.id === positionId);
    
    if (!position) return [];
    
    return position.candidates.filter(candidate => 
      selectedIds.includes(candidate.id)
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-32 pb-20 px-6 transition-opacity duration-500 ease-in-out">
        <div className="container mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="mb-10">
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/ballot')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ballot
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Kodigo Preview</h1>
            <p className="text-muted-foreground max-w-2xl">
              Review your selections and share them with friends and family.
            </p>
          </div>
          
          {/* Share Section */}
          <div className="mb-8 p-6 rounded-xl border border-border bg-card">
            <h2 className="text-xl font-medium mb-4">Share Your Kodigo</h2>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Share2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <input 
                  type="text" 
                  value={shareLink}
                  className="block w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-primary focus:border-primary text-sm"
                  readOnly
                />
              </div>
              
              <Button
                className="transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
                onClick={handleCopyLink}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              This link contains your encrypted ballot data. Anyone with this link can view your selections.
            </p>
          </div>
          
          {/* Ballot Preview */}
          <div className={cn(
            "rounded-xl border border-border overflow-hidden shadow-sm",
            "transform transition-all duration-500",
            isLoading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            <div className="bg-card p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium">My Selected Candidates</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/ballot')}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Selections
                </Button>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {isLoading ? (
                // Loading skeleton
                Array(4).fill(0).map((_, index) => (
                  <div key={index} className="p-6 animate-pulse">
                    <div className="h-5 bg-muted/50 rounded w-1/4 mb-4"></div>
                    <div className="space-y-3">
                      {Array(index + 1).fill(0).map((_, i) => (
                        <div key={i} className="h-12 bg-muted/30 rounded"></div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                // Actual content
                positions.map(position => {
                  const selectedCandidates = getSelectedCandidatesForPosition(position.id);
                  
                  return (
                    <div key={position.id} className="p-6">
                      <h3 className="font-medium mb-4">{position.title}</h3>
                      
                      {selectedCandidates.length > 0 ? (
                        <div className="space-y-3">
                          {selectedCandidates.map(candidate => (
                            <div 
                              key={candidate.id}
                              className="flex items-center p-3 rounded-lg bg-background border border-border"
                            >
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                <span className="font-medium text-primary">
                                  {candidate.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <div className="font-medium">{candidate.name}</div>
                                <div className="text-sm text-muted-foreground">{candidate.party}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 rounded-lg bg-muted/30 text-muted-foreground text-sm">
                          No candidates selected for this position
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          {/* Final Call to Action */}
          <div className="mt-12 p-6 rounded-xl bg-primary/10 border border-primary/20">
            <h3 className="font-medium mb-2">Remember for Election Day</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Make sure to prepare the following for a smooth voting experience:
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Valid ID for verification</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your precinct number and voting location information</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>This kodigo (printed or saved on your phone)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your own black/blue pen for a hygienic voting experience</span>
              </li>
            </ul>
            
            <Separator className="my-4" />
            
            <p className="text-sm text-center">
              Election day is an important opportunity to shape our nation's future.
              <br />
              Your vote matters!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Preview;
