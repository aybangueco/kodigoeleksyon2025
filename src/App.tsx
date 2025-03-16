
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Preview from "./pages/Preview";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Ballot from "./pages/Ballot";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Header from "./components/Header";
import AnalyticsTracker from "./components/analytics/AnalyticsTracker";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { AlertTriangle } from "lucide-react";

const queryClient = new QueryClient();

// Create a layout component that includes the Header and disclaimer
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto max-w-6xl px-6 mt-24 mb-2">
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-800" />
          <AlertTitle className="text-yellow-800">Important Note</AlertTitle>
          <AlertDescription className="text-yellow-700">
            This tool is currently available for <strong>Zamboanga City</strong> only. 
            If you want something similar for your city, please email{' '}
            <a href="mailto:aljhoenilw@gmail.com" className="font-medium underline hover:text-yellow-900">
              aljhoenilw@gmail.com
            </a>
          </AlertDescription>
        </Alert>
      </div>
      {children}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker />
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/ballot" element={<Layout><Ballot /></Layout>} />
            <Route path="/preview" element={<Layout><Preview /></Layout>} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
