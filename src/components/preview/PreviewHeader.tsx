
import { Home, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useAnalytics from '@/hooks/useAnalytics';
import { useIsMobile } from '@/hooks/use-mobile';

interface PreviewHeaderProps {
  cityName?: string;
}

const PreviewHeader = ({ cityName = "Zamboanga City" }: PreviewHeaderProps) => {
  const { trackEvent } = useAnalytics();
  const isMobile = useIsMobile();
  
  const handleBackClick = () => {
    trackEvent('preview', 'back_to_ballot', 'Return to ballot builder');
  };

  // Determine the return path based on city name
  const returnPath = cityName.includes('Cebu') ? '/cebu-city' : '/';
  
  return (
    <div className="flex flex-col w-full gap-3 sm:gap-4 sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">Your Ballot Preview</h1>
        <p className="text-sm text-muted-foreground mb-3 sm:mb-0">
          Review, print, or download your selections for {cityName}
        </p>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          asChild
          onClick={handleBackClick}
          className="flex-1 sm:flex-none items-center gap-1 h-9 touch-manipulation"
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
          className="h-9 w-9 touch-manipulation"
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
