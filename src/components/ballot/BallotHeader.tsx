
const BallotHeader = () => {
  return (
    <div className="mb-8 text-center">
      <div className="inline-block mb-4">
        <div className="relative">
          <div className="w-20 h-1 bg-accent absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2"></div>
          <h1 className="text-3xl md:text-4xl font-bold text-center relative px-6">
            KODIGO ELEKSYON 2025
          </h1>
          <div className="w-20 h-1 bg-accent absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2"></div>
        </div>
      </div>
      
      <div className="text-center text-gray-600 max-w-2xl mx-auto space-y-3">
        <p className="text-sm md:text-base">
          Select your preferred candidates for each position. Your selections are saved automatically
          in your browser, and you can print or share your kodigo after.
        </p>
        <p className="text-sm text-gray-500">
          This ballot maker helps you prepare before election day. Create your personalized voting guide, 
          save it to your device, or share it with friends and family to make the voting process faster and easier.
        </p>
      </div>
    </div>
  );
};

export default BallotHeader;
