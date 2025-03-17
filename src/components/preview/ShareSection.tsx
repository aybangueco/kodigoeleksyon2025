
import { Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

/**
 * Props for the ShareSection component
 */
export interface ShareSectionProps {
  /** URL that contains the encrypted ballot data */
  shareLink: string;
}

/**
 * Component that displays a section for sharing the ballot preview URL
 */
const ShareSection: React.FC<ShareSectionProps> = ({ shareLink }) => {
  /**
   * Copies the share link to the clipboard
   */
  const handleCopyLink = async (): Promise<void> => {
    try {
      // Ensure we're copying exactly what we display
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy link');
      console.error('Failed to copy link:', error);
    }
  };

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
        <Share2 className="h-5 w-5 text-muted-foreground" />
        Share Your Kodigo
      </h2>
      
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
          <Copy className="h-4 w-4" />
          Copy Link
        </Button>
      </div>
      
      <p className="mt-4 text-sm text-muted-foreground">
        This link contains your encrypted ballot data. Anyone with this link can view your selections.
      </p>
    </div>
  );
};

export default ShareSection;
