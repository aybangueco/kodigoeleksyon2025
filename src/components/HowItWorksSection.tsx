
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface HowItWorksSectionProps {
  onGetStarted?: () => void;
}

const HowItWorksSection = ({ onGetStarted }: HowItWorksSectionProps) => {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={howItWorksRef}
      className="py-16 px-6 bg-secondary/30"
      id="how-it-works"
    >
      <div className="container mx-auto max-w-6xl animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to create and share your election kodigo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create Your Ballot",
              description: "Select your preferred candidates for each national position."
            },
            {
              step: "02",
              title: "Review Your Choices",
              description: "Check your selections and make any necessary changes."
            },
            {
              step: "03",
              title: "Share Your Kodigo",
              description: "Generate a unique link to share with others."
            }
          ].map((step, i) => (
            <div 
              key={i}
              className="relative bg-white p-6 rounded-lg shadow-sm animate-fade-up"
              style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="absolute top-0 left-0 text-6xl font-bold text-primary/10 -mt-6 ml-2">{step.step}</div>
              <div className="pt-10 pl-8">
                <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {i < 2 && (
                <div className="hidden md:block absolute top-12 right-[-30px] text-muted/30 z-10">
                  <ArrowRight className="h-8 w-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
