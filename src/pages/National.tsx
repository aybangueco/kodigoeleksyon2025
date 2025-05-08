
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import useSessionStorage from '@/lib/useSessionStorage';
import BallotSection from '@/components/BallotSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import useAnimationObserver from '@/hooks/useAnimationObserver';
import { nationalPositions } from '@/lib/nationalPositions';
import { Link } from "react-router-dom";

const National = () => {
  // Refs for animation targets
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const ballotRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Set up animation observer
  useAnimationObserver([howItWorksRef, ballotRef]);

  const [selectedCandidates, setSelectedCandidates] = useSessionStorage<Record<string, string[]>>(
    'kodigo-national-selections',
    {}
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip to content link - hidden visually but accessible to screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary"
      >
        Skip to main content
      </a>

      <Helmet>
        <title>Kodigo Eleksyon 2025 - National Election Ballot Builder</title>
        <meta name="description" content="Create your personalized Kodigo ballot for the 2025 Philippine National Elections. Make the voting process faster and easier." />
        <meta name="keywords" content="kodigo, eleksyon, 2025, philippines national elections, senators, party list, ballot builder, voting guide" />
        <link rel="canonical" href="https://kodigoeleksyon2025.netlify.app/national" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://kodigoeleksyon2025.netlify.app/national" />
        <meta property="og:title" content="Kodigo Eleksyon 2025 - National Election Ballot Builder" />
        <meta property="og:description" content="Create your personalized Kodigo ballot for the 2025 Philippine National Elections. Make the voting process faster and easier." />
        <meta property="og:image" content="https://kodigoeleksyon2025.netlify.app/kodigo-eleksyon.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://kodigoeleksyon2025.netlify.app/national" />
        <meta name="twitter:title" content="Kodigo Eleksyon 2025 - National Election Ballot Builder" />
        <meta name="twitter:description" content="Create your personalized Kodigo ballot for the 2025 Philippine National Elections. Make the voting process faster and easier." />
        <meta name="twitter:image" content="https://kodigoeleksyon2025.netlify.app/kodigo-eleksyon.png" />

        {/* Accessibility meta tags */}
        <html lang="en" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Kodigo Eleksyon 2025",
            "description": "Create your personalized Kodigo ballot for the 2025 Philippine National Elections.",
            "url": "https://kodigoeleksyon2025.netlify.app/national",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "PHP"
            },
            "audience": {
              "@type": "Audience",
              "name": "Filipino Voters"
            }
          })}
        </script>
      </Helmet>

      <main id="main-content" ref={mainContentRef}>
        <div className="container mx-auto max-w-6xl px-6 mt-24 mb-2">
          <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
            <h1 className="text-2xl font-bold text-orange-800 text-center">National Elections Ballot Builder</h1>
            <p className="text-orange-700 text-center mt-2">
              Create your personalized ballot for the National 2025 elections
            </p>
          </div>

          {/* Senator Match Tool Link */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4 mb-6">
            <h2 className="text-xl font-bold text-blue-800 text-center">Find Your Senator Matches in 2 Minutes</h2>
            <p className="text-blue-700 text-center mt-2 mb-3">
              Not sure which senators to vote for? Try this helpful matching tool
            </p>
            <div className="flex justify-center">
              <Link
                  to="https://senator-match.vercel.app?utm_source=kodigoeleksyon&utm_medium=website&utm_campaign=senatorial_election_2025_matching"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Find Your Senator Matches
              </Link>
            </div>
          </div>
        </div>

        {/* Ballot Section (always shown at the top) */}
        <BallotSection
          selectedCandidates={selectedCandidates}
          setSelectedCandidates={setSelectedCandidates}
          positions={nationalPositions}
          cityName="National"
        />

        {/* How it Works Section */}
        <HowItWorksSection />
      </main>

      <Footer />
    </div>
  );
};

export default National;

