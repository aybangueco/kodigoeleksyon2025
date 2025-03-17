
import { Home, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useAnalytics from '@/hooks/useAnalytics';

interface PreviewHeaderProps {
  cityName?: string;
}

const PreviewHeader = ({ cityName = "Zamboanga City" }: PreviewHeaderProps) => {
  const { trackEvent } = useAnalytics();
  
  const handleBackClick = () => {
    trackEvent('preview', 'back_to_ballot', 'Return to ballot builder');
  };

  // Determine the return path based on city name
  const returnPath = cityName.includes('Cebu') ? '/cebu-city' : '/';
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Your Ballot Preview</h1>
        <p className="text-muted-foreground">
          Review, print, or download your selections for {cityName}
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm" 
          asChild
          onClick={handleBackClick}
          className="flex items-center gap-1"
        >
          <Link to={returnPath}>
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Ballot</span>
          </Link>
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="h-8 w-8"
        >
          <Link to="/" title="Home">
            <Home className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PreviewHeader;
