
import { Share2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  FacebookShareButton, 
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  RedditShareButton,
  RedditIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from 'react-share';

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

  // Instagram doesn't have a direct API for sharing like Facebook and Twitter
  const handleInstagramShare = () => {
    // Instagram doesn't have a direct web sharing mechanism
    // We'll simply copy the link and show a toast with instructions
    handleCopyLink();
    toast.info('Link copied! Paste it in your Instagram post or story');
  };

  const shareTitle = 'My Kodigo Eleksyon 2025 Ballot';

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
        <Share2 className="h-5 w-5 text-muted-foreground" />
        Share Your Kodigo
      </h2>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
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
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <FacebookShareButton url={shareLink} title={shareTitle}>
          <FacebookIcon size={40} round className="touch-manipulation" />
        </FacebookShareButton>

        <TwitterShareButton url={shareLink} title={shareTitle}>
          <TwitterIcon size={40} round className="touch-manipulation" />
        </TwitterShareButton>

        <RedditShareButton url={shareLink} title={shareTitle}>
          <RedditIcon size={40} round className="touch-manipulation" />
        </RedditShareButton>

        <Button 
          variant="ghost" 
          className="p-0 h-10 w-10 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500"
          onClick={handleInstagramShare}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-5 w-5"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        This link contains your encrypted ballot data. Anyone with this link can view your selections.
      </p>
    </div>
  );
};

export default ShareSection;
