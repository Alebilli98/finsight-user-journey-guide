
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Headphones, 
  Puzzle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyTralisAI = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('why.ai-powered'),
      description: t('why.ai-powered.desc'),
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: t('why.real-time'),
      description: t('why.real-time.desc'),
      color: "text-green-600"
    },
    {
      icon: Shield,
      title: t('why.compliance'),
      description: t('why.compliance.desc'),
      color: "text-purple-600"
    },
    {
      icon: Zap,
      title: t('why.scalable'),
      description: t('why.scalable.desc'),
      color: "text-yellow-600"
    },
    {
      icon: Headphones,
      title: t('why.support'),
      description: t('why.support.desc'),
      color: "text-red-600"
    },
    {
      icon: Puzzle,
      title: t('why.integration'),
      description: t('why.integration.desc'),
      color: "text-indigo-600"
    }
  ];

  const benefits = [
    "Analytics predittivi avanzati",
    "Dashboard personalizzabile",
    "Report automatizzati",
    "Conformità normativa",
    "Sicurezza enterprise",
    "Supporto multilingue"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-tech-gradient text-white border-0 mb-6">
            <Brain className="h-4 w-4 mr-2" />
            {t('hero.badge')}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-dark-blue mb-6 font-inter">
            {t('why.title')}
          </h1>
          
          <p className="text-xl text-tech-gray max-w-3xl mx-auto mb-8 font-poppins">
            {t('why.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="tech-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-white shadow-lg flex items-center justify-center mb-4 ${feature.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-dark-blue font-inter">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-tech-gray text-center font-poppins">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark-blue mb-6 font-inter">
                {t('features.title')}
              </h2>
              <p className="text-tech-gray mb-8 font-poppins">
                {t('features.subtitle')}
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-tech-gray font-poppins">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-tech-gradient rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 font-inter">
                  {t('cta.title')}
                </h3>
                <p className="mb-6 font-poppins opacity-90">
                  {t('cta.subtitle')}
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 w-full font-inter"
                >
                  {t('cta.button')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="tech-card p-6">
            <h3 className="text-3xl font-bold text-primary mb-2 font-inter">500+</h3>
            <p className="text-tech-gray font-poppins">Startup Attive</p>
          </div>
          <div className="tech-card p-6">
            <h3 className="text-3xl font-bold text-primary mb-2 font-inter">€2M+</h3>
            <p className="text-tech-gray font-poppins">Finanziamenti Ottenuti</p>
          </div>
          <div className="tech-card p-6">
            <h3 className="text-3xl font-bold text-primary mb-2 font-inter">98%</h3>
            <p className="text-tech-gray font-poppins">Soddisfazione Cliente</p>
          </div>
          <div className="tech-card p-6">
            <h3 className="text-3xl font-bold text-primary mb-2 font-inter">24/7</h3>
            <p className="text-tech-gray font-poppins">Supporto Disponibile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyTralisAI;
