
/**
 * Custom hook for analytics tracking with PostHog
 * Provides methods to track page views and events
 */
import posthog from 'posthog-js';
import { useCallback } from 'react';

/**
 * Hook for tracking analytics events and page views
 */
const useAnalytics = () => {
  /**
   * Track a page view
   * @param path - The path of the page being viewed
   * @param title - Optional title of the page being viewed
   */
  const trackPageView = useCallback((path: string, title?: string) => {
    try {
      // Capture page views with properties
      posthog.capture('$pageview', {
        $current_url: window.location.origin + path,
        page_title: title || document.title
      });
      
      if (import.meta.env.DEV) {
        console.log(`📊 Analytics: Page view tracked - ${path}`);
      }
    } catch (error) {
      console.warn('PostHog analytics error:', error);
    }
  }, []);

  /**
   * Track a custom event
   * @param category - The event category
   * @param action - The event action
   * @param label - Optional label for the event
   * @param value - Optional value for the event
   */
  const trackEvent = useCallback((
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
      
      if (import.meta.env.DEV) {
        console.log(`📊 Analytics: Event tracked - ${category} / ${action} ${label ? `/ ${label}` : ''}`);
      }
    } catch (error) {
      console.warn('PostHog analytics error:', error);
    }
  }, []);

  return {
    trackPageView,
    trackEvent
  };
};

export default useAnalytics;
