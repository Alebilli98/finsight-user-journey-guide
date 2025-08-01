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

  const dashboardFeatures = [
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
          <div className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  {t('nav.product')}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Scopri tutte le funzionalità della dashboard che avrai a disposizione dopo la registrazione
                </p>
              </div>
              
              {/* Dashboard Preview */}
              <div className="mb-16">
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 mb-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-4xl">
                      <div className="flex items-center justify-between mb-4 pb-4 border-b">
                        <h3 className="text-xl font-semibold">Dashboard Principale</h3>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 mb-4">
                        <div className="col-span-1 bg-gray-100 p-2 rounded text-xs text-center">Overview</div>
                        <div className="col-span-1 bg-gray-100 p-2 rounded text-xs text-center">Statements</div>
                        <div className="col-span-1 bg-gray-100 p-2 rounded text-xs text-center">Analytics</div>
                        <div className="col-span-1 bg-gray-100 p-2 rounded text-xs text-center">DuPont</div>
                        <div className="col-span-1 bg-gray-100 p-2 rounded text-xs text-center">AI Solution</div>
                        <div className="col-span-1 bg-gray-100 p-2 rounded text-xs text-center">AI Insights</div>
                        <div className="col-span-1 bg-gray-100 p-2 rounded text-xs text-center">Custom</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-3 rounded">
                          <div className="text-xs text-blue-600 mb-1">Revenue</div>
                          <div className="font-bold">€125,000</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded">
                          <div className="text-xs text-green-600 mb-1">Profit</div>
                          <div className="font-bold">€35,000</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded">
                          <div className="text-xs text-purple-600 mb-1">Cash Flow</div>
                          <div className="font-bold">€22,000</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Features */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dashboardFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
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
          <div className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  PERCHÉ FINSK.AI?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  La nostra missione è democratizzare l'intelligenza finanziaria per startup e PMI
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>La Nostra Missione</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Crediamo che ogni startup meriti di avere accesso agli stessi strumenti finanziari avanzati delle grandi aziende. La nostra piattaforma powered by AI livella il campo di gioco.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>La Nostra Visione</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Un mondo dove ogni imprenditore può prendere decisioni finanziarie informate e guidare la crescita sostenibile attraverso dati e insights intelligenti.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Il Nostro Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
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
          <div className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {t('nav.resources')}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {t('resources.subtitle')}
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{t('nav.glossary')}</CardTitle>
                    <CardDescription>{t('glossary.description')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">{t('glossary.financial.title')}</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li><strong>ROI:</strong> {t('glossary.roi')}</li>
                          <li><strong>EBITDA:</strong> {t('glossary.ebitda')}</li>
                          <li><strong>Cash Flow:</strong> {t('glossary.cashflow')}</li>
                          <li><strong>Liquidity:</strong> {t('glossary.liquidity')}</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">{t('glossary.metrics.title')}</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li><strong>KPI:</strong> {t('glossary.kpi')}</li>
                          <li><strong>Gross Margin:</strong> {t('glossary.grossmargin')}</li>
                          <li><strong>Debt Ratio:</strong> {t('glossary.debtratio')}</li>
                          <li><strong>Working Capital:</strong> {t('glossary.workingcapital')}</li>
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
            <section className="py-20">
              <div className="container mx-auto px-4 text-center">
                <Badge className="mb-6 bg-blue-100 text-blue-800">
                  <Building2 className="h-3 w-3 mr-1" />
                  {t('hero.badge')}
                </Badge>
                <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-100/50 to-blue-50/30 px-6 py-4 rounded-lg">
                  {t('hero.title')} <span className="text-blue-600 drop-shadow-sm">{t('hero.title.highlight')}</span> {t('hero.title.end')}
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  {t('hero.subtitle')}
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    size="lg" 
                    onClick={onSignup}
                    className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-3"
                  >
                    {t('hero.cta.primary')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={onLogin}>
                    {t('hero.cta.secondary')}
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {t('features.title')}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    {t('features.subtitle')}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {t('testimonials.title')}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <CardDescription className="text-base italic">
                          "{testimonial.quote}"
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <p className="font-semibold text-gray-900">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  {t('cta.title')}
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  {t('cta.subtitle')}
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={onSignup}
                  className="px-8 py-3"
                >
                  {t('cta.button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </section>
          </>
        );
    }
  };

  const dashboardFeatures = [
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl shadow-lg">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Finsk.Ai</h1>
                <p className="text-xs text-blue-600 font-medium">{t('footer.tagline')}</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection('product')}
                className={`transition-colors ${activeSection === 'product' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {t('nav.product')}
              </button>
              <button 
                onClick={() => setActiveSection('why')}
                className={`transition-colors ${activeSection === 'why' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {t('nav.why')}
              </button>
              <button 
                onClick={() => setActiveSection('resources')}
                className={`transition-colors ${activeSection === 'resources' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {t('nav.resources')}
              </button>
              <button 
                onClick={() => setActiveSection('pricing')}
                className={`transition-colors ${activeSection === 'pricing' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                {t('nav.pricing')}
              </button>
            </nav>

            <div className="flex items-center space-x-3">
              <LanguageSelector />
              <Button 
                variant="outline" 
                onClick={() => setActiveSection('contact')}
                className="hidden sm:inline-flex border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                {t('nav.contact')}
              </Button>
              <Button variant="ghost" onClick={onLogin}>
                {t('nav.login')}
              </Button>
              <Button onClick={onSignup} className="bg-gradient-to-r from-blue-600 to-green-600">
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Finsk.Ai</h3>
                  <p className="text-xs text-gray-400">{t('footer.tagline')}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                {t('footer.description')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Dashboard</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Analytics</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">AI Insights</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Report</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveSection('about')} className="hover:text-white transition-colors">{t('nav.about')}</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Carriere</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">{t('nav.contact')}</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Supporto</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termini di Servizio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 Finsk.Ai. Tutti i diritti riservati. Dubai International Free Zone Authority (IFZA)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
