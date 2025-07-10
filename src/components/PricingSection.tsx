
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Star, Zap, Crown, Shield, BarChart3, 
  Users, Clock, HeadphonesIcon, TrendingUp, Building2,
  Globe, Leaf, Brain, Calculator
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PricingSectionProps {
  onSignup: () => void;
}

const PricingSection = ({ onSignup }: PricingSectionProps) => {
  const { toast } = useToast();

  const packages = [
    {
      name: "Piano Gratuito",
      price: "€0",
      period: "per sempre",
      description: "Comprensione finanziaria di base per startup che iniziano",
      features: [
        "Dashboard finanziaria di base",
        "Ratio finanziari essenziali",
        "Report finanziari mensili (PDF)",
        "Visualizzazioni dati standard",
        "Supporto email",
        "Fino a 2 integrazioni dati",
        "Insights AI di base (5 al mese)",
        "Panoramica cash flow",
      ],
      limitations: [
        "Limitato a 3 mesi di dati storici",
        "Solo previsioni di base",
        "Nessuna analisi ESG",
        "Nessun report personalizzato",
      ],
      cta: "Piano Attuale",
      popular: false,
      current: true,
      icon: BarChart3,
      color: "gray"
    },
    {
      name: "Pacchetto Plus",
      price: "€79",
      period: "al mese",
      description: "Analisi finanziarie avanzate e previsioni powered by AI per aziende in crescita",
      features: [
        "Dashboard Salute Finanziaria Avanzata",
        "Analisi completa Bilancio & Conto Economico",
        "Ratio di redditività, efficienza e leva",
        "Previsioni cash flow powered by AI",
        "Analytics predittive & pianificazione scenari",
        "Report settimanali e mensili (PDF, Excel)",
        "Visualizzazioni dati avanzate",
        "Integrazioni dati illimitate",
        "Insights AI potenziati (100 al mese)",
        "Analisi investimenti e finanziamenti",
        "Report finanziari personalizzati",
        "Supporto email prioritario",
        "Accesso app mobile",
      ],
      limitations: [
        "12 mesi di dati storici",
        "Solo report ESG di base",
        "Nessun account manager dedicato",
      ],
      cta: "Aggiorna a Plus",
      popular: true,
      current: false,
      icon: Zap,
      color: "blue"
    },
    {
      name: "Pacchetto Premier",
      price: "€199",
      period: "al mese",
      description: "Piattaforma completa di intelligenza finanziaria con analisi ESG e consulenza esperta",
      features: [
        "Dashboard premium in tempo reale",
        "Analisi completa ecosistema finanziario",
        "Modelli predittivi AI avanzati",
        "Consultazioni e insights AI illimitati",
        "Analisi ESG completa (Ambientale, Sociale, Governance)",
        "Report e benchmarking performance ESG",
        "Previsioni e modellazione multi-scenario",
        "Valutazioni preparazione investimenti",
        "Strumenti preparazione finanziamenti",
        "Tutti i formati export (PDF, Excel, CSV, API)",
        "Accesso dati storici illimitato",
        "Moduli specifici per settore personalizzati",
        "Account manager dedicato",
        "Supporto telefono e chat",
        "Accesso API per integrazioni",
        "Report white-label",
      ],
      limitations: [],
      cta: "Aggiorna a Premier",
      popular: false,
      current: false,
      icon: Crown,
      color: "purple"
    },
  ];

  const aiServices = [
    {
      name: "Guida Riconciliazione AI",
      price: "Da €299/progetto",
      description: "Riconciliazione automatizzata con rilevamento anomalie powered by AI",
      icon: Calculator,
    },
    {
      name: "Recruiting Powered by AI",
      price: "Da €499/progetto", 
      description: "Soluzioni smart per assunzioni ruoli finanziari e operativi",
      icon: Users,
    },
    {
      name: "Elaborazione Fatture Automatizzata",
      price: "Da €199/mese",
      description: "Gestione ed elaborazione fatture guidata da AI",
      icon: Brain,
    },
    {
      name: "Servizi Consulenza ESG",
      price: "Da €899/progetto",
      description: "Analisi ESG completa e report sostenibilità",
      icon: Leaf,
    },
  ];

  const handleUpgrade = (packageName: string) => {
    toast({
      title: "Aggiornamento Avviato",
      description: `Aggiornamento a ${packageName}. Il nostro team di Dubai ti contatterà a breve.`,
    });
  };

  const handleServiceRequest = (serviceName: string) => {
    toast({
      title: "Richiesta Servizio Inviata",
      description: `Richiesta per ${serviceName} inviata. I nostri esperti ti contatteranno entro 24 ore.`,
    });
  };

  return (
    <div className="space-y-8 py-20">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Scegli il Tuo Pacchetto FinSight</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Democratizzando l'accesso a strumenti finanziari sofisticati. Dai insights fondamentali 
          all'intelligenza finanziaria completa con analisi ESG.
        </p>
        <div className="flex justify-center">
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            <Building2 className="h-3 w-3 mr-1" />
            Operativo da Dubai International Free Zone
          </Badge>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid lg:grid-cols-3 gap-8 container mx-auto px-4">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <Card 
              key={pkg.name}
              className={`relative ${
                pkg.popular ? 'ring-2 ring-blue-500 scale-105' : ''
              } ${pkg.current ? 'ring-2 ring-green-500' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-500 text-white px-3 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Più Popolare
                  </Badge>
                </div>
              )}
              
              {pkg.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    <Check className="h-3 w-3 mr-1" />
                    Piano Attuale
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 p-3 rounded-full ${
                  pkg.color === 'blue' ? 'bg-blue-100' :
                  pkg.color === 'purple' ? 'bg-purple-100' :
                  'bg-gray-100'
                }`}>
                  <Icon className={`h-8 w-8 ${
                    pkg.color === 'blue' ? 'text-blue-600' :
                    pkg.color === 'purple' ? 'text-purple-600' :
                    'text-gray-600'
                  }`} />
                </div>
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  {pkg.price}
                  <span className="text-lg text-gray-500 font-normal">/{pkg.period}</span>
                </div>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Funzionalità Incluse:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.limitations.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Limitazioni:</h4>
                    <ul className="space-y-2">
                      {pkg.limitations.map((limitation, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="h-4 w-4 rounded-full bg-gray-300 mt-0.5 flex-shrink-0"></div>
                          <span className="text-sm text-gray-500">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className="w-full"
                  variant={pkg.current ? "outline" : pkg.popular ? "default" : "outline"}
                  onClick={() => !pkg.current && (pkg.name === "Piano Gratuito" ? onSignup() : handleUpgrade(pkg.name))}
                  disabled={pkg.current}
                >
                  {pkg.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI Services Section */}
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span>Servizi AI Specializzati</span>
            </CardTitle>
            <CardDescription>
              Soluzioni AI su misura per specifiche esigenze di automazione business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {aiServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.name} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{service.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                            <p className="text-lg font-semibold text-blue-600">{service.price}</p>
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleServiceRequest(service.name)}
                        >
                          Richiedi Preventivo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enterprise Section */}
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="bg-white p-4 rounded-full inline-block mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Soluzioni Enterprise & Consulenza</h3>
              <p className="text-gray-600">
                Organizzazione grande o hai bisogno di soluzioni personalizzate? Il nostro team 
                di Dubai offre piattaforme di livello enterprise, infrastruttura dedicata e 
                servizi di consulenza finanziaria personalizzata.
              </p>
              <div className="flex justify-center space-x-4 pt-4">
                <Button variant="outline">
                  Prenota Consulenza
                </Button>
                <Button>
                  Contatta Ufficio Dubai
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PricingSection;
