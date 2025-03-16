
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  return (
    <section 
      ref={heroRef}
      className="px-6 pb-10"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Philippine National Elections 2025
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Your personal
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-ph-blue to-primary">
                election guide
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Create your own personalized election kodigo. Save your candidate choices 
              and share them with friends and family.
            </p>
          </div>
          
          <div className="relative opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-ph-blue/10 via-transparent to-ph-red/10 z-0"></div>
              
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-ph-red"></div>
                    <div className="w-3 h-3 rounded-full bg-ph-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-ph-blue"></div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">Kodigo 2025</div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">My Candidates</h3>
                  <div className="space-y-3">
                    {[
                      { position: "President", name: "Juan Dela Cruz" },
                      { position: "Vice President", name: "Elena Magsaysay" },
                      { position: "Senator", name: "Antonio Bautista" },
                      { position: "Senator", name: "Carmen Dizon" },
                      { position: "Senator", name: "Roberto Santos" }
                    ].map((item, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/60 animate-pulse-subtle"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className="text-xs text-muted-foreground">{item.position}</div>
                        <div className="text-sm font-medium">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="px-4 py-2 rounded-lg text-xs font-medium bg-primary text-white hover:bg-primary/90 transition-colors">
                    Share My Kodigo
                  </button>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-ph-yellow/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-[-30px] left-[-30px] w-60 h-60 bg-ph-blue/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
