
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Privacy Policy - Kodigo Eleksyon 2025</title>
        <meta name="description" content="Privacy policy for the Kodigo Eleksyon 2025 ballot builder application." />
        <link rel="canonical" href="https://eleksyon2025ballot.netlify.app/privacy" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto max-w-4xl px-6 py-12 flex-grow mt-16">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Introduction</h2>
          <p>This Privacy Policy explains how Kodigo Eleksyon 2025 ("we", "us", or "our") collects, uses, and shares your information when you use our Sample Ballot Builder application ("the Service").</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
          <p>The Kodigo Eleksyon 2025 ballot builder application is designed to minimize data collection. We collect the following types of information:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Usage Data:</strong> We may collect anonymous information about how you use our Service, such as which features you access and how long you spend on the application.</li>
            <li><strong>Ballot Selections:</strong> Your candidate selections are stored locally on your device using session storage. This information is not transmitted to our servers.</li>
            <li><strong>Device Information:</strong> Basic information about your device and browser may be collected for analytical and troubleshooting purposes.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Provide and maintain our Service</li>
            <li>Improve and optimize our Service</li>
            <li>Understand how users interact with our Service</li>
            <li>Detect and address technical issues</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Data Storage and Security</h2>
          <p>Your ballot selections are stored locally in your browser's session storage. This means:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>We do not store your ballot selections on our servers</li>
            <li>Your selections will be cleared when you close your browser session</li>
            <li>No personally identifiable information is associated with your ballot</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Cookies and Tracking</h2>
          <p>We may use cookies or similar tracking technologies to enhance your experience with our Service. You can set your browser to refuse all or some browser cookies, but this may affect certain functions of the Service.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Third-Party Services</h2>
          <p>We may employ third-party services to facilitate our Service, such as hosting providers or analytics services. These third parties have access to your data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Children's Privacy</h2>
          <p>Our Service is not intended for use by children under the age of 13. We do not knowingly collect personally identifiable information from children under 13.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="my-2"><a href="mailto:aljhoenilw@gmail.com" className="text-blue-600 hover:underline">aljhoenilw@gmail.com</a></p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Privacy;
