
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Shield, Zap, Globe, Users, CheckCircle,
  BarChart3, Brain, CreditCard, ArrowRight, Star, Building2
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
      title: "Real-time Dashboard",
      description: "Monitor your financial health with intuitive visualizations and key performance indicators."
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations and predictive analytics tailored to your business."
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security with full GDPR compliance and Dubai Free Zone regulations."
    },
    {
      icon: CreditCard,
      title: "Funding Readiness",
      description: "Prepare for investment with comprehensive financial reports and projections."
    }
  ];

  const testimonials = [
    {
      name: "Marco Rossi",
      company: "TechStart Milano",
      quote: "FinSight has revolutionized how we manage our finances. The AI insights are incredibly accurate.",
      rating: 5
    },
    {
      name: "Sarah Al-Ahmad",
      company: "Dubai Innovations",
      quote: "Finally, a financial platform built specifically for startups. The dashboards are amazing!",
      rating: 5
    }
  ];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
                  Dubai, UAE Based
                </Badge>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Unleash Your <span className="text-blue-600">Startup's</span> Financial Potential
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Empowering startups and SMEs to compete with larger companies through 
                  cutting-edge financial analysis and AI-powered advice. Transform your 
                  financial management and unlock your business potential.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    size="lg" 
                    onClick={onSignup}
                    className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-3"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" onClick={onLogin}>
                    Login to Account
                  </Button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Everything You Need to Master Your Finances
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Our comprehensive platform provides all the tools and insights you need 
                    to make informed financial decisions and drive growth.
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
                    Trusted by Growing Companies
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
                  Ready to Transform Your Financial Management?
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  Join hundreds of startups already using FinSight to drive growth and make better decisions.
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={onSignup}
                  className="px-8 py-3"
                >
                  Get Started Today
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
                <p className="text-xs text-gray-500">Your Financial Guide</p>
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
                About
              </button>
              <button 
                onClick={() => setActiveSection('pricing')}
                className={`transition-colors ${activeSection === 'pricing' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Pricing
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className={`transition-colors ${activeSection === 'contact' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
              >
                Contact
              </button>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onLogin}>
                Login
              </Button>
              <Button onClick={onSignup} className="bg-gradient-to-r from-blue-600 to-green-600">
                Sign Up Free
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
                  <p className="text-xs text-gray-400">Your Financial Guide</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering startups and SMEs with AI-powered financial intelligence.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Dashboard</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Analytics</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">AI Insights</button></li>
                <li><button onClick={() => setActiveSection('home')} className="hover:text-white transition-colors">Reports</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => setActiveSection('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Careers</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Contact</button></li>
                <li><button onClick={() => setActiveSection('contact')} className="hover:text-white transition-colors">Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 FinSight. All rights reserved. Dubai International Free Zone Authority (IFZA)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
