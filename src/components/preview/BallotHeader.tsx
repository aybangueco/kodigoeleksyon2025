
import React from 'react';

interface BallotHeaderProps {
  cityName: string;
}

const BallotHeader = ({ cityName }: BallotHeaderProps) => {
  return (
    <div className="text-center mb-6 sm:mb-8 print:mb-4 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-ph-blue via-ph-yellow to-ph-red rounded-full print:hidden"></div>
      
      <h1 className="text-xl sm:text-2xl font-bold text-primary print:text-black">
        KODIGO ELEKSYON 2025
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground print:text-gray-700 mt-1">
        Your personalized ballot guide for {cityName}
      </p>
      <div className="border-b-2 border-dashed border-gray-300 my-3 sm:my-4 print:border-gray-400"></div>
    </div>
  );
};

export default BallotHeader;
