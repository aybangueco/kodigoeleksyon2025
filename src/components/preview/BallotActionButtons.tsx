
import { useState } from 'react';
import { Download, Printer, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon
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
                <WhatsappShareButton url={shareLink} title={shareTitle}>
                  <WhatsappIcon size={36} round className="touch-manipulation" />
                </WhatsappShareButton>
                <TelegramShareButton url={shareLink} title={shareTitle}>
                  <TelegramIcon size={36} round className="touch-manipulation" />
                </TelegramShareButton>
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
