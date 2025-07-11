
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Shield, Zap, Globe, Users, CheckCircle,
  BarChart3, Brain, CreditCard, ArrowRight, Star, Building2, Play
} from "lucide-react";
import PricingSection from "./PricingSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";

interface HomepageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const Homepage = ({ onLogin, onSignup }: HomepageProps) => {
  const [activeSection, setActiveSection] = useState<'home' | 'pricing' | 'about' | 'contact'>('home');

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard in Tempo Reale",
      description: "Monitora la salute finanziaria della tua azienda con visualizzazioni intuitive e indicatori chiave di performance."
    },
    {
      icon: Brain,
      title: "Insights Powered by AI",
      description: "Ricevi raccomandazioni personalizzate e analisi predittive su misura per la tua attività."
    },
    {
      icon: Shield,
      title: "Sicuro e Conforme",
      description: "Sicurezza di livello enterprise con piena conformità GDPR e regolamenti Dubai Free Zone."
    },
    {
      icon: CreditCard,
      title: "Preparazione Finanziamenti",
      description: "Preparati per gli investimenti con report finanziari completi e proiezioni."
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      company: "TechStart Milano",
      quote: "FinSight ha rivoluzionato il modo in cui gestiamo le nostre finanze. Gli insights AI sono incredibilmente accurati.",
      rating: 5
    },
    {
      name: "Sarah Al-Ahmad",
      company: "Dubai Innovations",
      quote: "Finalmente, una piattaforma finanziaria costruita specificamente per le startup. Le dashboard sono incredibili!",
      rating: 5
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'pricing':
        return <PricingSection onSignup={onSignup} />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="py-20">
              <div className="container mx-auto px-4 text-center">
                <Badge className="mb-6 bg-blue-100 text-blue-800">
                  <Building2 className="h-3 w-3 mr-1" />
                  Basato a Dubai, UAE
                </Badge>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Libera il Potenziale <span className="text-blue-600">Finanziario</span> della Tua Startup
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Diamo potere alle startup e PMI per competere con aziende più grandi attraverso 
                  analisi finanziarie all'avanguardia e consigli powered by AI. Trasforma la tua 
                  gestione finanziaria e sblocca il potenziale del tuo business.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    size="lg" 
                    onClick={onSignup}
                    className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-3"
                  >
                    Inizia Prova Gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={onLogin}>
                    Accedi al Tuo Account
                  </Button>
                </div>
              </div>
            </section>

            {/* Video Tutorial Section */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Scopri FinSight in Azione
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Guarda come FinSight trasforma la gestione finanziaria della tua azienda 
                    con un tour completo della piattaforma.
                  </p>
                </div>

                <div className="max-w-4xl mx-auto">
                  <Card className="overflow-hidden">
                    <div className="relative bg-gradient-to-br from-blue-600 to-green-600 aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Play className="h-16 w-16 mx-auto mb-4 bg-white/20 rounded-full p-4" />
                          <h3 className="text-xl font-semibold mb-2">Tutorial Completo FinSight</h3>
                          <p className="text-blue-100 mb-4">Durata: 8 minuti</p>
                          <Button 
                            variant="secondary" 
                            size="lg"
                            className="bg-white text-blue-600 hover:bg-gray-100"
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Guarda il Video
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Dashboard Finanziaria</h4>
                      <p className="text-sm text-gray-600">Visualizza KPI e metriche in tempo reale</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">AI Analytics</h4>
                      <p className="text-sm text-gray-600">Insights predittivi e raccomandazioni</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CreditCard className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold mb-1">Report Avanzati</h4>
                      <p className="text-sm text-gray-600">Documenti pronti per investitori</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Tutto Quello che Ti Serve per Padroneggiare le Tue Finanze
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    La nostra piattaforma completa fornisce tutti gli strumenti e insights necessari 
                    per prendere decisioni finanziarie informate e guidare la crescita.
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
                    Scelto da Aziende in Crescita
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
                  Pronto a Trasformare la Tua Gestione Finanziaria?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Unisciti a centinaia di startup che già usano FinSight per guidare la crescita e prendere decisioni migliori.
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={onSignup}
                  className="px-8 py-3"
                >
                  Inizia Oggi
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </section>
          </>
        );
    }
  };

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
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinSight</h1>
                <p className="text-xs text-gray-500">La Tua Guida Finanziaria</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection('home')}
                className={`transition-colors ${activeSection === 'home' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveSection('about')}
                className={`transition-colors ${activeSection === 'about' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Chi Siamo
              </button>
              <button 
                onClick={() => setActiveSection('pricing')}
                className={`transition-colors ${activeSection === 'pricing' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Prezzi
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className={`transition-colors ${activeSection === 'contact' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Contatti
              </button>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onLogin}>
                Accedi
              </Button>
              <Button onClick={onSignup} className="bg-gradient-to-r from-blue-600 to-green-600">
                Registrati Gratis
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
                  <h3 className="font-bold">FinSight</h3>
                  <p className="text-xs text-gray-400">La Tua Guida Finanziaria</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Diamo potere alle startup e PMI con intelligenza finanziaria powered by AI.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Prodotto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Dashboard</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Analytics</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">AI Insights</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Report</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Azienda</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveSection('about')} className="hover:text-white transition-colors">Chi Siamo</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Carriere</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Contatti</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Supporto</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legale</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termini di Servizio</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 FinSight. Tutti i diritti riservati. Dubai International Free Zone Authority (IFZA)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
