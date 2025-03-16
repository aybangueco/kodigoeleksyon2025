
import { createRoot } from 'react-dom/client';
import posthog from 'posthog-js';
import App from './App.tsx';
import './index.css';

// Get PostHog API key from environment variables
const posthogApiKey = import.meta.env.VITE_POSTHOG_API_KEY || 'phc_YOUR_PROJECT_API_KEY';

// Initialize PostHog at the entry point of the application
posthog.init(posthogApiKey, {
  api_host: 'https://app.posthog.com',
  // Enable debug mode in development
  loaded: (posthog) => {
    if (import.meta.env.DEV) posthog.debug();
  }
});

createRoot(document.getElementById("root")!).render(<App />);
