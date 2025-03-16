
const BallotHeader = () => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-center">KODIGO ELEKSYON 2025</h1>
      <div className="text-center text-gray-600 max-w-2xl mx-auto space-y-2">
        <p className="text-sm">
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
