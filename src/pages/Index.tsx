import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, CheckSquare, Share2, Shield, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  // Refs for animation targets
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  // Simple intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (howItWorksRef.current) observer.observe(howItWorksRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      {/* Disclaimer Alert - Moved to top */}
      <div className="container mx-auto max-w-6xl px-6 mt-24">
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-800" />
          <AlertTitle className="text-yellow-800">Important Note</AlertTitle>
          <AlertDescription className="text-yellow-700">
            This tool is currently available for <strong>Zamboanga City</strong> only. 
            If you want something similar for your city, please email{' '}
            <a href="mailto:aljhoenilw@gmail.com" className="font-medium underline hover:text-yellow-900">
              aljhoenilw@gmail.com
            </a>
          </AlertDescription>
        </Alert>
      </div>
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="pt-16 pb-20 px-6"
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
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/ballot">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto group transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
                  >
                    Create Your Kodigo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
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
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 px-6 bg-secondary/30"
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
      
      {/* How it Works Section */}
      <section 
        ref={howItWorksRef}
        className="py-20 px-6"
      >
        <div className="container mx-auto max-w-6xl opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
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
                className="relative opacity-0 animate-fade-up"
                style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <div className="absolute top-0 left-0 text-6xl font-bold text-primary/10">{step.step}</div>
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
          
          <div className="mt-16 text-center">
            <Link to="/ballot">
              <Button 
                size="lg"
                className="transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/90 to-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for the 2025 Elections?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Create your personalized election kodigo now and be prepared when election day comes.
          </p>
          <Link to="/ballot">
            <Button 
              variant="secondary"
              size="lg"
              className="transition-all duration-300 transform hover:translate-y-[-2px] active:translate-y-0"
            >
              Create Your Kodigo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
