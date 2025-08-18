
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PricingSectionProps {
  onSignup: () => void;
}

const PricingSection = ({ onSignup }: PricingSectionProps) => {
  const { t } = useLanguage();

  const plans = [
    {
      name: "Piano Gratuito",
      price: "€0",
      period: "per sempre",
      description: "Perfetto per progetti personali, esplorando nuove idee e startup in fase iniziale.",
      popular: false,
      features: [
        "Dashboard finanziaria di base",
        "Ratio finanziari essenziali",
        "Report finanziari mensili (PDF)",
        "Visualizzazioni dati standard",
        "Supporto email",
        "Fino a 2 integrazioni dati"
      ],
      buttonText: "Inizia Gratis",
      color: "green"
    },
    {
      name: "Pro",
      price: "€79",
      period: "al mese",
      description: "Pronto per scalare con maggiore retention, supporto di base e prezzi basati sull'utilizzo.",
      popular: true,
      features: [
        "Dashboard Salute Finanziaria Avanzata",
        "Analisi completa Bilancio & Conto Economico",
        "Previsioni cash flow powered by AI",
        "Analytics predittive & pianificazione scenari",
        "Report settimanali e mensili personalizzati",
        "Integrazioni illimitate"
      ],
      buttonText: "Inizia Prova Gratuita",
      color: "blue"
    },
    {
      name: "Advanced",
      price: "€199",
      period: "al mese",
      description: "Ideale per scalare o casi d'uso critici con supporto 24/7 e plugin Enterprise inclusi.",
      popular: false,
      features: [
        "Dashboard premium in tempo reale",
        "Analisi completa ecosistema finanziario",
        "Modelli predittivi AI avanzati",
        "Consultazioni e insights AI illimitati",
        "Analisi ESG completa",
        "Previsioni e modellazione multi-scenario"
      ],
      buttonText: "Contatta Vendite",
      color: "purple"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Un'offerta a servizio completo per aziende con sicurezza, conformità e requisiti di distribuzione.",
      popular: false,
      features: [
        "Tutte le funzionalità Advanced",
        "Infrastruttura dedicata",
        "Conformità e sicurezza Enterprise",
        "Implementazione personalizzata",
        "Training e onboarding dedicato"
      ],
      buttonText: "Contatta Vendite",
      color: "orange"
    }
  ];

  return (
    <div className="py-20 relative">
      <div className="absolute inset-0 tech-pattern opacity-30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-tech-gradient rounded-2xl mb-6 floating-element">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-dark-blue mb-4 font-inter">
            Scegli il Tuo Pacchetto Tralis AI
          </h2>
          <p className="text-lg text-tech-gray max-w-2xl mx-auto font-poppins mb-6">
            Democratizzando l'accesso a strumenti finanziari sofisticati. Dai insights fondamentali all'intelligenza finanziaria completa.
          </p>
          <Badge className="bg-tech-gradient text-white border-0 px-4 py-2 shadow-lg">
            <Building2 className="h-4 w-4 mr-2" />
            Operated from Dubai International Free Zone
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`tech-card relative hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0 ${
                plan.popular ? 'ring-2 ring-primary shadow-2xl' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-tech-gradient text-white border-0 px-4 py-1 shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Più Popolare
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 p-3 rounded-xl w-fit ${
                  plan.color === 'green' ? 'bg-green-100' :
                  plan.color === 'blue' ? 'bg-blue-100' :
                  plan.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  {plan.color === 'green' && <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">📊</div>}
                  {plan.color === 'blue' && <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">⚡</div>}
                  {plan.color === 'purple' && <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">👑</div>}
                  {plan.color === 'orange' && <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">🏢</div>}
                </div>
                
                <CardTitle className="text-xl text-dark-blue font-inter mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-dark-blue">{plan.price}</span>
                  {plan.period && <span className="text-tech-gray ml-1">/{plan.period}</span>}
                </div>
                <CardDescription className="text-tech-gray font-poppins leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-dark-blue mb-3 font-inter">Included Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-tech-gray font-poppins">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  onClick={onSignup}
                  className={`w-full mt-6 font-inter ${
                    plan.popular 
                      ? 'tech-button text-white border-0' 
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-tech-gray mb-4 font-poppins">
            Hai bisogno di funzionalità personalizzate o hai domande sui prezzi?
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-inter"
          >
            Contatta il nostro team vendite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
