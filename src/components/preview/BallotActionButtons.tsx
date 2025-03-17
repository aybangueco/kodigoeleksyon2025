
import { useState } from 'react';
import { Download, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FacebookShareButton, 
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon 
} from 'react-share';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface BallotActionButtonsProps {
  isPrinting: boolean;
  shareLink?: string;
  cityName: string;
  onPrint: () => void;
  onDownload: () => void;
}

const BallotActionButtons = ({ 
  isPrinting, 
  shareLink, 
  cityName,
  onPrint, 
  onDownload 
}: BallotActionButtonsProps) => {
  const isMobile = useIsMobile();
  
  const handleCopyLink = async () => {
    if (!shareLink) return;
    
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Failed to copy link');
    }
  };
  
  const shareTitle = `My Kodigo Eleksyon 2025 ${cityName} Ballot`;

  // Instagram doesn't have a direct API for sharing like Facebook and Twitter
  const handleInstagramShare = () => {
    // Instagram doesn't have a direct web sharing mechanism
    // We'll simply copy the link and show a toast with instructions
    handleCopyLink();
    toast.info('Link copied! Paste it in your Instagram post or story');
  };
  
  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      <Button
        variant="outline"
        size={isMobile ? "sm" : "default"}
        className="text-xs flex items-center gap-1 h-9 px-3 sm:px-4 bg-white hover:bg-muted/20 touch-manipulation"
        onClick={onPrint}
        disabled={isPrinting}
      >
        <Printer className="h-3.5 w-3.5" />
        <span>Print</span>
      </Button>
      
      <Button
        variant="default"
        size={isMobile ? "sm" : "default"}
        className="text-xs flex items-center gap-1 h-9 px-3 sm:px-4 touch-manipulation"
        onClick={onDownload}
        disabled={isPrinting}
      >
        <Download className="h-3.5 w-3.5" />
        <span>Download</span>
      </Button>
      
      {shareLink && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="secondary"
              size={isMobile ? "sm" : "default"}
              className="text-xs flex items-center gap-1 h-9 px-3 sm:px-4 touch-manipulation"
              disabled={isPrinting}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="center">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-center mb-2">Share via</h4>
              <div className="flex gap-3 justify-center">
                <FacebookShareButton url={shareLink} title={shareTitle}>
                  <FacebookIcon size={36} round className="touch-manipulation" />
                </FacebookShareButton>

                <TwitterShareButton url={shareLink} title={shareTitle}>
                  <TwitterIcon size={36} round className="touch-manipulation" />
                </TwitterShareButton>

                <Button 
                  variant="ghost" 
                  className="p-0 h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500"
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
              <div className="mt-3 pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs py-5 touch-manipulation"
                  onClick={handleCopyLink}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default BallotActionButtons;
