
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Star, Zap, Crown, Shield, BarChart3, 
  Users, Clock, HeadphonesIcon, TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Packages = () => {
  const { toast } = useToast();

  const packages = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with basic financial insights",
      features: [
        "Basic financial dashboard",
        "Monthly reports (PDF)",
        "Standard financial ratios",
        "Email support",
        "Up to 3 integrations",
        "Basic AI insights (5 per month)",
      ],
      limitations: [
        "Limited historical data (3 months)",
        "No custom reports",
        "No advanced analytics",
      ],
      cta: "Current Plan",
      popular: false,
      current: true,
      icon: BarChart3,
      color: "gray"
    },
    {
      name: "Plus",
      price: "$49",
      period: "per month",
      description: "Enhanced features for growing businesses with deeper analysis needs",
      features: [
        "Advanced financial dashboard",
        "Weekly & monthly reports (PDF, Excel)",
        "Comprehensive ratio analysis",
        "Industry benchmarking",
        "Unlimited integrations",
        "Advanced AI insights (50 per month)",
        "Cash flow forecasting",
        "Custom financial reports",
        "Priority email support",
        "Automated alerts & notifications",
      ],
      limitations: [
        "12 months historical data",
        "No ESG reporting",
      ],
      cta: "Upgrade to Plus",
      popular: true,
      current: false,
      icon: Zap,
      color: "blue"
    },
    {
      name: "Premier",
      price: "$149",
      period: "per month",
      description: "Complete financial management solution for established businesses",
      features: [
        "Premium dashboard with real-time data",
        "Daily, weekly, monthly, yearly reports",
        "All export formats (PDF, Excel, CSV, API)",
        "Advanced forecasting & modeling",
        "Unlimited AI consultations",
        "ESG reporting & sustainability metrics",
        "Multi-entity consolidation",
        "Custom KPI tracking",
        "Dedicated account manager",
        "Phone & chat support",
        "API access",
        "White-label reports",
        "Unlimited historical data",
      ],
      limitations: [],
      cta: "Upgrade to Premier",
      popular: false,
      current: false,
      icon: Crown,
      color: "purple"
    },
  ];

  const addOns = [
    {
      name: "Dedicated Account Manager",
      price: "$299/month",
      description: "Personal financial expert for strategic guidance",
      icon: Users,
    },
    {
      name: "Real-time Data Sync",
      price: "$99/month", 
      description: "Instant data updates from all connected sources",
      icon: Clock,
    },
    {
      name: "24/7 Priority Support",
      price: "$199/month",
      description: "Around-the-clock phone and chat support",
      icon: HeadphonesIcon,
    },
    {
      name: "Advanced Forecasting",
      price: "$149/month",
      description: "Multi-scenario financial modeling and predictions",
      icon: TrendingUp,
    },
  ];

  const handleUpgrade = (packageName: string) => {
    toast({
      title: "Upgrade Initiated",
      description: `Upgrading to ${packageName} plan. You'll receive a confirmation email shortly.`,
    });
  };

  const handleAddOn = (addOnName: string) => {
    toast({
      title: "Add-on Selected",
      description: `${addOnName} has been added to your cart.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Package</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan for your business needs. Upgrade anytime as you grow.
        </p>
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

      {/* Add-ons Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>Premium Add-ons</span>
          </CardTitle>
          <CardDescription>
            Enhance your plan with additional features and services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {addOns.map((addOn) => {
              const Icon = addOn.icon;
              return (
                <Card key={addOn.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{addOn.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{addOn.description}</p>
                          <p className="text-lg font-semibold text-blue-600">{addOn.price}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddOn(addOn.name)}
                      >
                        Add
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
              <Crown className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Enterprise Solution</h3>
            <p className="text-gray-600">
              Need something more? Our enterprise solution offers custom features, 
              dedicated infrastructure, and personalized support for large organizations.
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <Button variant="outline">
                Request Demo
              </Button>
              <Button>
                Contact Sales
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Packages;
