
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useAnalytics from '@/hooks/useAnalytics';

/**
 * A component for testing PostHog analytics tracking
 * This component will only be visible in development mode
 */
const AnalyticsTest = () => {
  const { trackEvent, trackPageView } = useAnalytics();
  const [eventCount, setEventCount] = useState(0);
  
  // Function to trigger a test event
  const handleTestEvent = () => {
    trackEvent('test', 'button_click', 'Test Button', eventCount);
    setEventCount(prev => prev + 1);
  };
  
  // Function to trigger a test page view
  const handleTestPageView = () => {
    trackPageView('/test-page', 'Test Page View');
  };
  
  // Only show in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <Card className="mt-8 border-2 border-orange-300 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-800">PostHog Analytics Test</CardTitle>
        <CardDescription className="text-orange-700">
          Use these buttons to test if your PostHog integration is working properly.
          Check your browser console for debug output.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-white rounded border border-orange-200 text-sm text-orange-800">
          <p>To verify your PostHog integration:</p>
          <ol className="list-decimal list-inside ml-2 mt-1 space-y-1">
            <li>Click the test buttons below</li>
            <li>Check your browser console for PostHog debug logs</li>
            <li>Verify events appear in your PostHog dashboard</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-orange-200 pt-4">
        <p className="text-sm text-orange-700">Events triggered: {eventCount}</p>
        <div className="space-x-3">
          <Button 
            variant="outline" 
            className="border-orange-500 text-orange-700 hover:bg-orange-100"
            onClick={handleTestPageView}
          >
            Test Page View
          </Button>
          <Button 
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleTestEvent}
          >
            Test Event
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AnalyticsTest;
