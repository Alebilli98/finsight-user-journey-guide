
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Star, Zap, Crown, Shield, BarChart3, 
  Users, Clock, HeadphonesIcon, TrendingUp, Building2,
  Globe, Leaf, Brain, Calculator
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Packages = () => {
  const { toast } = useToast();

  const packages = [
    {
      name: "Free Tier",
      price: "$0",
      period: "forever",
      description: "Basic financial understanding for startups getting started",
      features: [
        "Basic financial dashboard",
        "Essential financial ratios",
        "Monthly financial reports (PDF)",
        "Standard data visualizations",
        "Email support",
        "Up to 2 data source integrations",
        "Basic AI insights (5 per month)",
        "Cash flow overview",
      ],
      limitations: [
        "Limited to 3 months historical data",
        "Basic forecasting only",
        "No ESG analysis",
        "No custom reports",
      ],
      cta: "Current Plan",
      popular: false,
      current: true,
      icon: BarChart3,
      color: "gray"
    },
    {
      name: "Plus Package",
      price: "$79",
      period: "per month",
      description: "Advanced financial analysis and AI-powered forecasting for growing businesses",
      features: [
        "Advanced Financial Health Dashboard",
        "Complete Balance Sheet & P&L analysis",
        "Profitability, efficiency & leverage ratios",
        "AI-powered cash flow forecasting",
        "Predictive analytics & scenario planning",
        "Weekly & monthly reports (PDF, Excel)",
        "Advanced data visualizations",
        "Unlimited data source integrations",
        "Enhanced AI insights (100 per month)",
        "Investment & financing analysis",
        "Custom financial reporting",
        "Priority email support",
        "Mobile app access",
      ],
      limitations: [
        "12 months historical data",
        "Basic ESG reporting only",
        "No dedicated account manager",
      ],
      cta: "Upgrade to Plus",
      popular: true,
      current: false,
      icon: Zap,
      color: "blue"
    },
    {
      name: "Premier Package",
      price: "$199",
      period: "per month",
      description: "Complete financial intelligence platform with ESG analysis and expert advisory",
      features: [
        "Premium real-time dashboard",
        "Complete financial ecosystem analysis",
        "Advanced AI-driven predictive modeling",
        "Unlimited AI consultations & insights",
        "Full ESG (Environmental, Social, Governance) analysis",
        "ESG performance reporting & benchmarking",
        "Multi-scenario forecasting & modeling",
        "Investment readiness assessments",
        "Funding preparation tools",
        "All export formats (PDF, Excel, CSV, API)",
        "Unlimited historical data access",
        "Custom industry-specific modules",
        "Dedicated account manager",
        "Phone & chat support",
        "API access for integrations",
        "White-label reporting",
      ],
      limitations: [],
      cta: "Upgrade to Premier",
      popular: false,
      current: false,
      icon: Crown,
      color: "purple"
    },
  ];

  const aiServices = [
    {
      name: "AI Reconciliation Guidance",
      price: "From $299/project",
      description: "Automated reconciliation with AI-powered anomaly detection",
      icon: Calculator,
    },
    {
      name: "AI-Powered Recruitment",
      price: "From $499/project", 
      description: "Smart hiring solutions for financial and operational roles",
      icon: Users,
    },
    {
      name: "Automated Invoice Processing",
      price: "From $199/month",
      description: "AI-driven invoice management and processing automation",
      icon: Brain,
    },
    {
      name: "ESG Consulting Services",
      price: "From $899/project",
      description: "Comprehensive ESG analysis and sustainability reporting",
      icon: Leaf,
    },
  ];

  const handleUpgrade = (packageName: string) => {
    toast({
      title: "Upgrade Initiated",
      description: `Upgrading to ${packageName}. Our Dubai-based team will contact you shortly.`,
    });
  };

  const handleServiceRequest = (serviceName: string) => {
    toast({
      title: "Service Request Submitted",
      description: `Request for ${serviceName} submitted. Our experts will reach out within 24 hours.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your FinSight Package</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Democratizing access to sophisticated financial tools. From foundational insights 
          to comprehensive financial intelligence with ESG analysis.
        </p>
        <div className="flex justify-center">
          <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
            <Building2 className="h-3 w-3 mr-1" />
            Operated from Dubai International Free Zone
          </Badge>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid lg:grid-cols-3 gap-8">
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
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {pkg.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-3 py-1">
                    <Check className="h-3 w-3 mr-1" />
                    Current Plan
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
                  <h4 className="font-medium text-gray-900">Included Features:</h4>
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
                    <h4 className="font-medium text-gray-900">Limitations:</h4>
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
                  onClick={() => !pkg.current && handleUpgrade(pkg.name)}
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>Specialized AI Services</span>
          </CardTitle>
          <CardDescription>
            Tailored AI-driven solutions for specific business automation needs
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
                        Request Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enterprise Section */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100">
        <CardContent className="p-8 text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white p-4 rounded-full inline-block mb-4">
              <Globe className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Enterprise & Consulting Solutions</h3>
            <p className="text-gray-600">
              Large organization or need custom solutions? Our Dubai-based team offers 
              enterprise-grade platforms, dedicated infrastructure, and personalized 
              financial consulting services.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <Button variant="outline">
                Schedule Consultation
              </Button>
              <Button>
                Contact Dubai Office
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Packages;
