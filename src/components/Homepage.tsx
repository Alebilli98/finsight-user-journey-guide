import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, Shield, Brain, Users, Play, 
  BarChart3, FileText, Zap, Star, ArrowRight, Menu, X 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import WhyTralisAI from "./WhyTralisAI";

interface HomepageProps {
  onLogin: () => void;
  onSignup: () => void;
}

const Homepage = ({ onLogin, onSignup }: HomepageProps) => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navigationItems = [
    { id: "home", label: "HOME" },
    { id: "product", label: t('nav.product') },
    { id: "solutions", label: t('nav.solutions') },
    { id: "why", label: t('nav.why') },
    { id: "resources", label: t('nav.resources') },
    { id: "pricing", label: t('nav.pricing') }
  ];

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
      icon: TrendingUp,
      title: t('features.funding.title'),
      description: t('features.funding.desc')
    }
  ];

  const videoCards = [
    {
      title: t('video.card1.title'),
      description: t('video.card1.desc'),
      duration: "2:30"
    },
    {
      title: t('video.card2.title'),
      description: t('video.card2.desc'),
      duration: "3:15"
    },
    {
      title: t('video.card3.title'),
      description: t('video.card3.desc'),
      duration: "2:45"
    }
  ];

  const testimonials = [
    {
      quote: t('testimonials.quote1'),
      author: "Marco Rossi",
      role: "CEO, TechStart",
      avatar: "/lovable-uploads/62c27d0c-77d9-443f-9571-3f00422c3ac8.png"
    },
    {
      quote: t('testimonials.quote2'),
      author: "Laura Bianchi",
      role: "CFO, InnovateCorp",
      avatar: "/lovable-uploads/75cd2fc8-828e-472f-a023-c73b62d70d27.png"
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "why":
        return <WhyTralisAI />;
      case "home":
      default:
        return (
          <>
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
              
              <div className="container mx-auto px-4 text-center relative z-10">
                <Badge variant="secondary" className="bg-tech-gradient text-white border-0 mb-6 animate-pulse">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {t('hero.badge')}
                </Badge>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark-blue mb-6 font-inter leading-tight">
                  {t('hero.title')}{' '}
                  <span className="bg-tech-gradient bg-clip-text text-transparent">
                    {t('hero.title.highlight')}
                  </span>
                  <br />
                  {t('hero.title.end')}
                </h1>
                
                <p className="text-xl md:text-2xl text-tech-gray max-w-4xl mx-auto mb-8 font-poppins leading-relaxed">
                  {t('hero.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Button 
                    onClick={onSignup}
                    size="lg" 
                    className="tech-button text-white border-0 text-lg px-8 py-3 font-inter transform hover:scale-105 transition-all duration-200"
                  >
                    {t('hero.cta.primary')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={onLogin}
                    variant="outline" 
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-3 font-inter"
                  >
                    {t('hero.cta.secondary')}
                  </Button>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
              <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute top-1/2 left-20 w-16 h-16 bg-purple-200 rounded-full opacity-30 animate-ping"></div>
            </section>

            {/* Video Section */}
            <section className="py-20 bg-white">
              
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-6 font-inter">
                    {t('video.title')}
                  </h2>
                  <p className="text-xl text-tech-gray max-w-3xl mx-auto font-poppins">
                    {t('video.subtitle')}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center tech-card">
                      <div className="text-center">
                        <Button size="lg" className="rounded-full w-20 h-20 tech-button mb-4">
                          <Play className="h-8 w-8 text-white" />
                        </Button>
                        <h3 className="text-xl font-bold text-dark-blue mb-2 font-inter">
                          {t('video.tutorial.title')}
                        </h3>
                        <p className="text-tech-gray font-poppins">
                          {t('video.tutorial.duration')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {videoCards.map((card, index) => (
                      <Card key={index} className="tech-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-dark-blue font-inter">
                              {card.title}
                            </CardTitle>
                            <CardDescription className="text-tech-gray font-poppins">
                              {card.description}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary" className="ml-4">
                            {card.duration}
                          </Badge>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
              
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-6 font-inter">
                    {t('features.title')}
                  </h2>
                  <p className="text-xl text-tech-gray max-w-3xl mx-auto font-poppins">
                    {t('features.subtitle')}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card key={index} className="tech-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <CardHeader className="text-center">
                          <div className="w-16 h-16 mx-auto rounded-full bg-tech-gradient flex items-center justify-center mb-4">
                            <Icon className="h-8 w-8 text-white" />
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
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
              
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-dark-blue mb-6 font-inter">
                    {t('testimonials.title')}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="tech-card border-0 shadow-lg">
                      <CardHeader>
                        <div className="flex items-center space-x-4 mb-4">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.author}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-bold text-dark-blue font-inter">{testimonial.author}</p>
                            <p className="text-tech-gray text-sm font-poppins">{testimonial.role}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-tech-gray italic font-poppins">"{testimonial.quote}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-tech-gradient text-white">
              
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-inter">
                  {t('cta.title')}
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 font-poppins">
                  {t('cta.subtitle')}
                </p>
                <Button 
                  onClick={onSignup}
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-3 font-inter"
                >
                  {t('cta.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/3649b85f-a01b-4935-b35c-c20278d06f18.png" 
                alt="Tralis AI Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-tech-gradient bg-clip-text text-transparent font-inter">
                Tralis AI
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`text-sm font-medium transition-colors font-inter ${
                    activeSection === item.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-tech-gray hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <div className="hidden lg:flex space-x-3">
                <Button 
                  onClick={onLogin}
                  variant="ghost" 
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
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary/20">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left py-2 px-4 rounded transition-colors font-inter ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10"
                        : "text-tech-gray hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="flex space-x-3 px-4 pt-3 border-t border-primary/20">
                  <Button 
                    onClick={() => {
                      onLogin();
                      setMobileMenuOpen(false);
                    }}
                    variant="ghost" 
                    size="sm"
                    className="text-tech-gray hover:text-primary font-inter"
                  >
                    {t('nav.login')}
                  </Button>
                  <Button 
                    onClick={() => {
                      onSignup();
                      setMobileMenuOpen(false);
                    }}
                    size="sm"
                    className="tech-button text-white border-0 font-inter"
                  >
                    {t('nav.signup')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="pt-16">
        {renderContent()}
      </div>
    </div>
  );
};

export default Homepage;
