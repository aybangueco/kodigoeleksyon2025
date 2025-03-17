
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BallotHeaderProps {
  cityName?: string;
}

const BallotHeader = ({ cityName = "Zamboanga City" }: BallotHeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "transition-all duration-500 ease-in-out transform",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
    )}>
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
          <span className="inline-block relative">
            Kodigo
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </span>
          <span className="text-gray-800"> Eleksyon</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xl sm:text-2xl md:text-3xl rounded ml-2">
            2025
          </span>
        </h1>
        <p className="text-gray-600 mt-3 text-lg sm:text-xl">
          Create your personalized ballot for {cityName}
        </p>
        <div className="mt-4 flex justify-center space-x-2 text-sm text-gray-500">
          <span>🗳️ Select your candidates below</span>
          <span>➡️</span>
          <span>📋 Generate your printable kodigo</span>
        </div>
      </div>
    </div>
  );
};

export default BallotHeader;
