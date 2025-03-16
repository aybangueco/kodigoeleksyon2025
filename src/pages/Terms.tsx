
import { Helmet } from "react-helmet-async";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Terms of Use - Kodigo Eleksyon 2025</title>
        <meta name="description" content="Terms of use for the Kodigo Eleksyon 2025 ballot builder application." />
        <link rel="canonical" href="https://eleksyon2025ballot.netlify.app/terms" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto max-w-4xl px-6 py-12 flex-grow mt-16">
        <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Agreement to Terms</h2>
          <p>By accessing or using the Kodigo Eleksyon 2025 ballot builder application ("the Service"), you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you may not access the Service.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Description of Service</h2>
          <p>Kodigo Eleksyon 2025 provides a digital tool for users to create a personalized sample ballot for the 2025 Philippine national elections. The Service is currently available for Zamboanga City only.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Educational Use Only</h2>
          <p>The Service is provided for educational and informational purposes only. The information presented about candidates is based on publicly available data and is not intended to be comprehensive or completely up-to-date.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Disclaimer of Endorsement</h2>
          <p>The creators and operators of Kodigo Eleksyon 2025 do not endorse any particular candidate or political party. The inclusion of a candidate in the Service does not imply an endorsement or recommendation.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are owned by Kodigo Eleksyon 2025 and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">User Responsibilities</h2>
          <p>When using the Service, you agree to:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Use the Service only for lawful purposes and in accordance with these Terms</li>
            <li>Not use the Service in any way that could damage or impair the operation of the Service</li>
            <li>Not attempt to gain unauthorized access to any part of the Service</li>
            <li>Not use the Service for any commercial purposes without our express written consent</li>
          </ul>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Kodigo Eleksyon 2025 shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the Service.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Accuracy of Information</h2>
          <p>While we strive to provide accurate information about candidates, we cannot guarantee that all information is completely accurate, up-to-date, or comprehensive. Users should verify any critical information from official sources.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Governing Law</h2>
          <p>These Terms shall be governed by and defined following the laws of the Philippines. Kodigo Eleksyon 2025 and yourself irrevocably consent that the courts of the Philippines shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="my-2"><a href="mailto:aljhoenilw@gmail.com" className="text-blue-600 hover:underline">aljhoenilw@gmail.com</a></p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
