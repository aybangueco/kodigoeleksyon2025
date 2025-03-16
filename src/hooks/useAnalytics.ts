
/**
 * Custom hook for analytics tracking with PostHog
 * Provides methods to track page views and events
 */
import posthog from 'posthog-js';

/**
 * Hook for tracking analytics events and page views
 */
const useAnalytics = () => {
  /**
   * Track a page view
   * @param path - The path of the page being viewed
   * @param title - Optional title of the page being viewed
   */
  const trackPageView = (path: string, title?: string) => {
    try {
      // PostHog automatically captures page views, but we can force a capture with properties
      posthog.capture('$pageview', {
        $current_url: path,
        page_title: title
      });
      
      console.log(`📊 Analytics: Page view tracked - ${path}`);
    } catch (error) {
      console.warn('PostHog analytics error:', error);
    }
  };

  /**
   * Track a custom event
   * @param category - The event category
   * @param action - The event action
   * @param label - Optional label for the event
   * @param value - Optional value for the event
   */
  const trackEvent = (
    category: string,
    action: string,
    label?: string,
    value?: number
  ) => {
    try {
      posthog.capture(action, {
        category,
        label,
        value,
        // Include the full event name in properties for easier querying
        event_name: `${category}_${action}${label ? `_${label}` : ''}`
      });
      
      console.log(`📊 Analytics: Event tracked - ${category} / ${action} ${label ? `/ ${label}` : ''}`);
    } catch (error) {
      console.warn('PostHog analytics error:', error);
    }
  };

  return {
    trackPageView,
    trackEvent
  };
};

export default useAnalytics;
