
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAnalytics from '@/hooks/useAnalytics';
import posthog from 'posthog-js';

/**
 * Component that automatically tracks page views when routes change
 * Place this component inside your Router setup
 */
const AnalyticsTracker = () => {
  const location = useLocation();
  const { trackPageView } = useAnalytics();
  
  useEffect(() => {
    // Track page view on location change
    trackPageView(location.pathname);
    
    // Update PostHog's internal URL for proper attribution
    // This is recommended in the PostHog React documentation
    posthog.register({
      current_url: window.location.href,
      current_path: location.pathname
    });
  }, [location, trackPageView]);
  
  // This component doesn't render anything
  return null;
};

export default AnalyticsTracker;
