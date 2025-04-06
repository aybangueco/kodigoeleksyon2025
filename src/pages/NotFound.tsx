
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found - Kodigo Eleksyon 2025</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to the Kodigo Eleksyon 2025 ballot builder." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4"
        style={{ 
          backgroundImage: "radial-gradient(circle at 1px 1px, #f0f0f0 1px, transparent 0)",
          backgroundSize: "40px 40px" 
        }}
      >
        <div 
          className={`w-full max-w-md text-center transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <Card className="border-none shadow-xl overflow-hidden bg-white/90 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-red-500/10 to-blue-500/10 h-2" />
            <CardContent className="pt-10 pb-8 px-8">
              <div className="rounded-full bg-red-100 p-3 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>

              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent animate-pulse-subtle">
                404
              </h1>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Oops! Page Not Found
              </h2>
              
              <p className="text-gray-600 mb-8">
                We couldn't find the page you were looking for. 
                It might have been moved or doesn't exist.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="default" 
                  size="lg"
                  className="gap-2 shadow-md hover:shadow-lg transition-all animate-scale-up"
                  asChild
                >
                  <Link to="/">
                    <Home className="h-4 w-4" /> 
                    Back to Home
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.history.back()}
                  className="gap-2 animate-scale-up"
                >
                  <ArrowLeft className="h-4 w-4" /> 
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <p className="mt-6 text-sm text-gray-500 animate-fade-in">
            If you think this is an error, please contact support
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
