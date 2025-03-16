
/**
 * Custom hook for analytics tracking
 * Provides methods to track page views and events
 */

// Window interface extension to include Google Analytics
interface WindowWithAnalytics extends Window {
  gtag?: (
    command: string,
    action: string,
    params?: {
      [key: string]: any;
    }
  ) => void;
}

declare const window: WindowWithAnalytics;

/**
 * Hook for tracking analytics events and page views
 */
const useAnalytics = () => {
  /**
   * Track a page view
   * @param path - The path of the page being viewed
   * @param title - The title of the page being viewed
   */
  const trackPageView = (path: string, title?: string) => {
    if (!window.gtag) {
      console.warn('Google Analytics not loaded');
      return;
    }

    window.gtag('config', 'G-MEASUREMENT_ID', {
      page_path: path,
      page_title: title
    });

    console.log(`📊 Analytics: Page view tracked - ${path}`);
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
    if (!window.gtag) {
      console.warn('Google Analytics not loaded');
      return;
    }

    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });

    console.log(`📊 Analytics: Event tracked - ${category} / ${action} ${label ? `/ ${label}` : ''}`);
  };

  return {
    trackPageView,
    trackEvent
  };
};

export default useAnalytics;
