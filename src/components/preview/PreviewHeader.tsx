
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Header component for the ballot preview page
 * Displays title and back button to return to the ballot
 */
const PreviewHeader: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-10">
      <Button
        variant="outline"
        size="sm"
        className="mb-4 hover:bg-secondary hover:text-primary transition-colors"
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
  );
};

export default PreviewHeader;
