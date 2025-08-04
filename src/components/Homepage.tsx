
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Shield, Zap, Globe, Users, CheckCircle,
  BarChart3, Brain, CreditCard, ArrowRight, Star, Building2, 
  FileText, Calculator, Bot, Settings, Droplets
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import PricingSection from "./PricingSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

interface HomepageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const Homepage = ({ onLogin, onSignup }: HomepageProps) => {
  const [activeSection, setActiveSection] = useState<'home' | 'product' | 'why' | 'pricing' | 'resources' | 'contact' | 'about'>('home');
  const { t } = useLanguage();

  const features = [
    {
      icon: BarChart3,
      title: t('features.dashboard.title'),
      description: t('features.dashboard.desc')
    },
    {
      icon: Brain,
      title: t('features.ai.title'),
      description: t('features.ai.desc')
    },
    {
      icon: Shield,
      title: t('features.security.title'),
      description: t('features.security.desc')
    },
    {
      icon: CreditCard,
      title: t('features.funding.title'),
      description: t('features.funding.desc')
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      company: "TechStart Milano",
      quote: t('testimonials.quote1'),
      rating: 5
    },
    {
      name: "Sarah Al-Ahmad",
      company: "Dubai Innovations",
      quote: t('testimonials.quote2'),
      rating: 5
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'product':
        return (
          <div className="py-20 relative">
            <div className="absolute inset-0 tech-pattern opacity-30"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-tech-gradient rounded-2xl mb-6 floating-element">
                  <Building2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-dark-blue mb-4 font-inter">
                  {t('nav.product')}
                </h2>
                <p className="text-lg text-tech-gray max-w-2xl mx-auto font-poppins">
                  Scopri tutte le funzionalità della dashboard che avrai a disposizione dopo la registrazione
                </p>
              </div>
              
              {/* Dashboard Preview */}
              <div className="mb-16">
                <div className="tech-gradient-subtle rounded-3xl p-8 mb-8 border border-primary/20">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-4xl border border-primary/10">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/20">
                        <h3 className="text-xl font-semibold text-dark-blue font-inter">Dashboard Principale</h3>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse-soft"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse-soft"></div>
                          <div className="w-3 h-3 bg-primary rounded-full animate-pulse-soft"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        <div className="col-span-1 bg-tech-gradient-subtle p-2 rounded-lg text-xs text-center font-medium text-primary">Overview</div>
                        <div className="col-span-1 bg-tech-gradient-subtle p-2 rounded-lg text-xs text-center font-medium text-primary">Statements</div>
                        <div className="col-span-1 bg-tech-gradient-subtle p-2 rounded-lg text-xs text-center font-medium text-primary">Analytics</div>
                        <div className="col-span-1 bg-tech-gradient-subtle p-2 rounded-lg text-xs text-center font-medium text-primary">DuPont</div>
                        <div className="col-span-1 bg-tech-gradient-subtle p-2 rounded-lg text-xs text-center font-medium text-primary">AI Solution</div>
                        <div className="col-span-1 bg-tech-gradient-subtle p-2 rounded-lg text-xs text-center font-medium text-primary">AI Insights</div>
                        <div className="col-span-1 bg-tech-gradient-subtle p-2 rounded-lg text-xs text-center font-medium text-primary">Custom</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                          <div className="text-xs text-primary mb-2 font-semibold">Revenue</div>
                          <div className="font-bold text-lg text-dark-blue">€125,000</div>
                        </div>
                        <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                          <div className="text-xs text-accent mb-2 font-semibold">Profit</div>
                          <div className="font-bold text-lg text-dark-blue">€35,000</div>
                        </div>
                        <div className="bg-electric-blue/10 p-4 rounded-xl border border-electric-blue/20">
                          <div className="text-xs text-electric-blue mb-2 font-semibold">Cash Flow</div>
                          <div className="font-bold text-lg text-dark-blue">€22,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: TrendingUp,
                    title: "Overview Dashboard",
                    description: "Real-time financial health monitoring with key performance indicators"
                  },
                  {
                    icon: FileText,
                    title: "Financial Statements",
                    description: "Complete Income Statement, Balance Sheet, and Cash Flow analysis"
                  },
                  {
                    icon: BarChart3,
                    title: "Advanced Analytics",
                    description: "In-depth financial analytics with trend analysis and forecasting"
                  },
                  {
                    icon: Calculator,
                    title: "DuPont Analysis",
                    description: "Break down ROE components for comprehensive profitability analysis"
                  },
                  {
                    icon: Bot,
                    title: "AI Solution",
                    description: "Intelligent financial recommendations and automated insights"
                  },
                  {
                    icon: Brain,
                    title: "AI Insights",
                    description: "Scenario analysis and predictive financial modeling"
                  },
                  {
                    icon: Settings,
                    title: "Custom Dashboard",
                    description: "Personalized metrics tracking and goal management system"
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="tech-card hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                      <CardHeader className="text-center">
                        <div className="mx-auto mb-4 p-4 bg-tech-gradient rounded-2xl w-fit shadow-lg">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                        <CardTitle className="text-lg text-dark-blue font-inter">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-tech-gray font-poppins">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case 'why':
        return (
          <div className="py-20 relative">
            <div className="absolute inset-0 tech-pattern opacity-20"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-tech-gradient rounded-2xl mb-6 floating-element">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-dark-blue mb-4 font-inter">
                  PERCHÉ FINSK.AI?
                </h2>
                <p className="text-lg text-tech-gray max-w-2xl mx-auto font-poppins">
                  La nostra missione è democratizzare l'intelligenza finanziaria per startup e PMI
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="tech-card border-0 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-tech-gradient rounded-xl flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-dark-blue font-inter">La Nostra Missione</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-tech-gray font-poppins">
                      Crediamo che ogni startup meriti di avere accesso agli stessi strumenti finanziari avanzati delle grandi aziende. La nostra piattaforma powered by AI livella il campo di gioco.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="tech-card border-0 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-tech-gradient rounded-xl flex items-center justify-center mb-4">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-dark-blue font-inter">La Nostra Visione</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-tech-gray font-poppins">
                      Un mondo dove ogni imprenditore può prendere decisioni finanziarie informate e guidare la crescita sostenibile attraverso dati e insights intelligenti.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="tech-card border-0 hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-tech-gradient rounded-xl flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-dark-blue font-inter">Il Nostro Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-tech-gray font-poppins">
                      Un gruppo diversificato di esperti finanziari, ingegneri AI e imprenditori seriali con sede a Dubai, il cuore dell'innovazione MENA.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'pricing':
        return <PricingSection onSignup={onSignup} />;
      case 'resources':
        return (
          <div className="py-20 relative">
            <div className="absolute inset-0 tech-pattern opacity-20"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-tech-gradient rounded-2xl mb-6 floating-element">
                  <FileText className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-dark-blue mb-4 font-inter">
                  {t('nav.resources')}
                </h2>
                <p className="text-lg text-tech-gray max-w-2xl mx-auto font-poppins">
                  {t('resources.subtitle')}
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <Card className="tech-card border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-xl text-dark-blue font-inter">{t('nav.glossary')}</CardTitle>
                    <CardDescription className="text-tech-gray font-poppins">{t('glossary.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-primary font-inter">{t('glossary.financial.title')}</h4>
                        <ul className="space-y-3 text-sm text-tech-gray font-poppins">
                          <li><strong className="text-dark-blue">ROI:</strong> {t('glossary.roi')}</li>
                          <li><strong className="text-dark-blue">EBITDA:</strong> {t('glossary.ebitda')}</li>
                          <li><strong className="text-dark-blue">Cash Flow:</strong> {t('glossary.cashflow')}</li>
                          <li><strong className="text-dark-blue">Liquidity:</strong> {t('glossary.liquidity')}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-accent font-inter">{t('glossary.metrics.title')}</h4>
                        <ul className="space-y-3 text-sm text-tech-gray font-poppins">
                          <li><strong className="text-dark-blue">KPI:</strong> {t('glossary.kpi')}</li>
                          <li><strong className="text-dark-blue">Gross Margin:</strong> {t('glossary.grossmargin')}</li>
                          <li><strong className="text-dark-blue">Debt Ratio:</strong> {t('glossary.debtratio')}</li>
                          <li><strong className="text-dark-blue">Working Capital:</strong> {t('glossary.workingcapital')}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return <ContactSection />;
      case 'about':
        return <AboutSection />;
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="py-24 relative overflow-hidden">
              <div className="absolute inset-0 tech-pattern opacity-30"></div>
              <div className="absolute top-20 right-20 w-32 h-32 bg-electric-blue/20 rounded-full blur-3xl floating-element"></div>
              <div className="absolute bottom-20 left-20 w-48 h-48 bg-cyan-accent/20 rounded-full blur-3xl floating-element"></div>
              
              <div className="container mx-auto px-4 text-center relative z-10">
                <Badge className="mb-8 bg-tech-gradient text-white border-0 px-6 py-2 shadow-lg">
                  <Building2 className="h-4 w-4 mr-2" />
                  {t('hero.badge')}
                </Badge>
                <h1 className="text-6xl font-bold text-dark-blue mb-8 font-inter leading-tight">
                  {t('hero.title')} <span className="bg-tech-gradient bg-clip-text text-transparent">{t('hero.title.highlight')}</span> {t('hero.title.end')}
                </h1>
                <p className="text-xl text-tech-gray mb-12 max-w-3xl mx-auto font-poppins leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                <div className="flex justify-center space-x-6">
                  <Button 
                    size="lg" 
                    onClick={onSignup}
                    className="tech-button text-white px-10 py-4 text-lg font-semibold border-0 font-inter"
                  >
                    {t('hero.cta.primary')}
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={onLogin}
                    className="px-10 py-4 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-inter"
                  >
                    {t('hero.cta.secondary')}
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white relative">
              <div className="absolute inset-0 tech-pattern opacity-20"></div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                  <h2 className="text-4xl font-bold text-dark-blue mb-6 font-inter">
                    {t('features.title')}
                  </h2>
                  <p className="text-xl text-tech-gray max-w-2xl mx-auto font-poppins">
                    {t('features.subtitle')}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card key={index} className="tech-card text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
                        <CardHeader>
                          <div className="mx-auto mb-6 p-4 bg-tech-gradient rounded-2xl w-fit shadow-lg">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <CardTitle className="text-lg text-dark-blue font-inter">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-tech-gray font-poppins">{feature.description}</CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 tech-gradient-subtle relative">
              <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                  <h2 className="text-4xl font-bold text-dark-blue mb-6 font-inter">
                    {t('testimonials.title')}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="tech-card border-0 shadow-xl">
                      <CardHeader>
                        <div className="flex items-center space-x-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <CardDescription className="text-base italic text-tech-gray font-poppins leading-relaxed">
                          "{testimonial.quote}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <p className="font-semibold text-dark-blue font-inter">{testimonial.name}</p>
                          <p className="text-sm text-primary font-poppins">{testimonial.company}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-tech-gradient text-white relative overflow-hidden">
              <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl font-bold mb-6 font-inter">
                  {t('cta.title')}
                </h2>
                <p className="text-xl mb-12 opacity-90 font-poppins">
                  {t('cta.subtitle')}
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={onSignup}
                  className="px-12 py-4 text-lg font-semibold bg-white text-dark-blue hover:bg-gray-100 transition-all duration-300 shadow-lg font-inter"
                >
                  {t('cta.button')}
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary relative">
      {/* Navigation */}
      <header className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div 
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => setActiveSection('home')}
            >
              <div className="group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/lovable-uploads/62c27d0c-77d9-443f-9571-3f00422c3ac8.png" 
                  alt="Finsk.Ai Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-tech-gradient bg-clip-text text-transparent font-inter">Finsk.Ai</h1>
                <p className="text-xs text-primary font-medium font-poppins">{t('footer.tagline')}</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveSection('product')}
                className={`transition-all duration-300 font-semibold font-inter ${activeSection === 'product' ? 'text-primary border-b-2 border-primary' : 'text-tech-gray hover:text-primary'}`}
              >
                {t('nav.product')}
              </button>
              <button 
                onClick={() => setActiveSection('why')}
                className={`transition-all duration-300 font-semibold font-inter ${activeSection === 'why' ? 'text-primary border-b-2 border-primary' : 'text-tech-gray hover:text-primary'}`}
              >
                PERCHÉ FINSK.AI?
              </button>
              <button 
                onClick={() => setActiveSection('resources')}
                className={`transition-all duration-300 font-semibold font-inter ${activeSection === 'resources' ? 'text-primary border-b-2 border-primary' : 'text-tech-gray hover:text-primary'}`}
              >
                {t('nav.resources')}
              </button>
              <button 
                onClick={() => setActiveSection('pricing')}
                className={`transition-all duration-300 font-semibold font-inter ${activeSection === 'pricing' ? 'text-primary border-b-2 border-primary' : 'text-tech-gray hover:text-primary'}`}
              >
                {t('nav.pricing')}
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button 
                variant="outline" 
                onClick={() => setActiveSection('contact')}
                className="hidden sm:inline-flex border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-inter"
              >
                {t('nav.contact')}
              </Button>
              <Button 
                variant="ghost" 
                onClick={onLogin}
                className="text-tech-gray hover:text-primary font-inter"
              >
                {t('nav.login')}
              </Button>
              <Button 
                onClick={onSignup} 
                className="tech-button text-white border-0 font-inter"
              >
                {t('nav.signup')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-16 relative">
        <div className="absolute inset-0 tech-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/lovable-uploads/62c27d0c-77d9-443f-9571-3f00422c3ac8.png" 
                  alt="Finsk.Ai Logo" 
                  className="h-8 w-auto"
                />
                <div>
                  <h3 className="font-bold text-xl font-inter">Finsk.Ai</h3>
                  <p className="text-xs text-cyan-accent font-poppins">{t('footer.tagline')}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm font-poppins leading-relaxed">
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-cyan-accent font-inter">{t('footer.product')}</h4>
              <ul className="space-y-3 text-sm text-gray-300 font-poppins">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-cyan-accent transition-colors">Dashboard</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-cyan-accent transition-colors">Analytics</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-cyan-accent transition-colors">AI Insights</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-cyan-accent transition-colors">Report</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-cyan-accent font-inter">{t('footer.company')}</h4>
              <ul className="space-y-3 text-sm text-gray-300 font-poppins">
                <li><button onClick={() => setActiveSection('about')} className="hover:text-cyan-accent transition-colors">{t('nav.about')}</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-cyan-accent transition-colors">Carriere</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-cyan-accent transition-colors">{t('nav.contact')}</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-cyan-accent transition-colors">Supporto</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-cyan-accent font-inter">{t('footer.legal')}</h4>
              <ul className="space-y-3 text-sm text-gray-300 font-poppins">
                <li><a href="#" className="hover:text-cyan-accent transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-accent transition-colors">Termini di Servizio</a></li>
                <li><a href="#" className="hover:text-cyan-accent transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400 font-poppins">
            <p>© 2024 Finsk.Ai. Tutti i diritti riservati. Dubai International Free Zone Authority (IFZA)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
