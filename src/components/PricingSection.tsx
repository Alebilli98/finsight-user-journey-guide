
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
      description: "Perfetto per progetti personali, esplorando nuove idee e startup in fase iniziale.",
      features: [
        "Dashboard finanziaria di base",
        "Ratio finanziari essenziali",
        "Report finanziari mensili (PDF)",
        "Visualizzazioni dati standard",
        "Supporto email",
        "Fino a 2 integrazioni dati",
      ],
      cta: "Inizia Gratis",
      popular: false,
      current: true,
      badgeText: "Gratuito per sempre",
      badgeColor: "bg-gray-100 text-gray-800"
    },
    {
      name: "Pro",
      price: "€79",
      period: "al mese",
      description: "Pronto per scalare con maggiore retention, supporto di base e prezzi basati sull'utilizzo.",
      features: [
        "Dashboard Salute Finanziaria Avanzata",
        "Analisi completa Bilancio & Conto Economico",
        "Previsioni cash flow powered by AI",
        "Analytics predittive & pianificazione scenari",
        "Report settimanali e mensili",
        "Visualizzazioni dati avanzate",
        "Integrazioni dati illimitate",
        "Insights AI potenziati (100 al mese)",
        "Supporto email prioritario",
        "Accesso app mobile",
      ],
      cta: "Inizia",
      popular: true,
      current: false,
      badgeText: "Mensile",
      badgeColor: "bg-blue-100 text-blue-800"
    },
    {
      name: "Advanced",
      price: "€199",
      period: "al mese",
      description: "Ideale per scalare o casi d'uso critici con supporto 24x7 e plugin Enterprise inclusi.",
      features: [
        "Dashboard premium in tempo reale",
        "Analisi completa ecosistema finanziario",
        "Modelli predittivi AI avanzati",
        "Consultazioni e insights AI illimitati",
        "Analisi ESG completa",
        "Previsioni e modellazione multi-scenario",
        "Valutazioni preparazione investimenti",
        "Tutti i formati export",
        "Accesso dati storici illimitato",
        "Account manager dedicato",
        "Supporto 24/7",
        "Accesso API per integrazioni",
      ],
      cta: "Inizia",
      popular: false,
      current: false,
      badgeText: "Mensile",
      badgeColor: "bg-purple-100 text-purple-800"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Un'offerta a servizio completo per aziende con sicurezza, conformità e requisiti di distribuzione.",
      features: [
        "Tutte le funzionalità Advanced",
        "Infrastruttura dedicata",
        "Conformità e sicurezza Enterprise",
        "Implementazione personalizzata",
        "Training e onboarding dedicato",
        "SLA garantito",
        "Supporto prioritario",
        "Integrazioni personalizzate",
      ],
      cta: "Contattaci",
      popular: false,
      current: false,
      badgeText: "Contratto",
      badgeColor: "bg-orange-100 text-orange-800"
    },
  ];

  const handleUpgrade = (packageName: string) => {
    if (packageName === "Enterprise") {
      toast({
        title: "Richiesta Enterprise",
        description: "Il nostro team Enterprise ti contatterà entro 24 ore per discutere le tue esigenze.",
      });
    } else {
      toast({
        title: "Aggiornamento Avviato",
        description: `Aggiornamento a ${packageName}. Il nostro team ti contatterà a breve.`,
      });
    }
  };

  return (
    <div className="space-y-8 py-20">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Scegli il Tuo Pacchetto FinSight</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Democratizzando l'accesso a strumenti finanziari sofisticati. Dai insights fondamentali 
          all'intelligenza finanziaria completa.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="grid lg:grid-cols-4 gap-6 container mx-auto px-4 max-w-6xl">
        {packages.map((pkg) => (
          <Card 
            key={pkg.name}
            className={`relative border rounded-lg ${
              pkg.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
            } ${pkg.current ? 'border-green-500' : ''} hover:shadow-md transition-shadow`}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white px-3 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Più Popolare
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="mb-2">
                <Badge className={pkg.badgeColor}>
                  {pkg.badgeText}
                </Badge>
              </div>
              <CardTitle className="text-xl font-semibold">{pkg.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600 min-h-[3rem]">
                {pkg.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">
                  {pkg.name === "Enterprise" ? "Da" : ""}
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {pkg.price}
                  {pkg.period && <span className="text-lg text-gray-500 font-normal">/{pkg.period}</span>}
                </div>
              </div>

              <div className="space-y-3">
                <ul className="space-y-2">
                  {pkg.features.slice(0, 6).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                  {pkg.features.length > 6 && (
                    <li className="text-sm text-gray-500 italic">
                      E molto altro...
                    </li>
                  )}
                </ul>
              </div>

              <Button 
                className={`w-full ${
                  pkg.name === "Enterprise" 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : pkg.popular 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => !pkg.current && (pkg.name === "Piano Gratuito" ? onSignup() : handleUpgrade(pkg.name))}
                disabled={pkg.current}
              >
                {pkg.current ? "Piano Attuale" : pkg.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enterprise Contact Section */}
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
