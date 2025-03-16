
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t border-border mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Kodigo 2025</h3>
            <p className="text-sm text-muted-foreground">
              A simple tool to help you prepare for the Philippine national elections.
              Create your voting guide and share it with others.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Disclaimer</h3>
            <p className="text-sm text-muted-foreground">
              This tool is for educational purposes only. The creators of this website 
              do not endorse any particular candidate. Candidate information is based 
              on publicly available data.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Kodigo 2025. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
