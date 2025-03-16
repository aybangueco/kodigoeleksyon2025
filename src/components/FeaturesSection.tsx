
import { useRef } from 'react';
import { CheckSquare, Share2, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const FeaturesSection = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={featuresRef}
      className="py-10 px-6 bg-secondary/30"
    >
      <div className="container mx-auto max-w-6xl opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple tools to help you prepare for the 2025 Philippine National Elections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: CheckSquare,
              title: "Track Your Choices",
              description: "Easily select and track your preferred candidates for each national position."
            },
            {
              icon: Share2,
              title: "Shareable Link",
              description: "Generate a unique link to share your selections with friends and family."
            },
            {
              icon: Shield,
              title: "Privacy Focused",
              description: "Your selections are encrypted and not stored on any server."
            }
          ].map((feature, i) => (
            <div 
              key={i}
              className={cn(
                "p-6 rounded-xl bg-white border border-border shadow-sm",
                "transform transition-all duration-500 hover:shadow-md hover:-translate-y-1",
                "opacity-0 animate-fade-up"
              )}
              style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
