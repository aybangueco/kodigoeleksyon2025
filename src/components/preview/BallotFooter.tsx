
import React from 'react';

const BallotFooter = () => {
  return (
    <div className="mt-6 sm:mt-8 print:mt-6 text-center text-xs text-muted-foreground">
      <div className="border-t-2 border-dashed border-gray-300 mb-3 sm:mb-4 print:border-gray-400"></div>
      <p className="print:text-gray-700 text-[10px] sm:text-xs">
        Generated at kodigoeleksyon2025.netlify.app • Election day: May 12, 2025
      </p>
    </div>
  );
};

export default BallotFooter;
