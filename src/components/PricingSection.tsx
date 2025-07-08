
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface PricingSectionProps {
  onSignup: () => void;
}

const PricingSection = ({ onSignup }: PricingSectionProps) => {
  const plans = [
    {
      name: "Free Tier",
      price: "€0",
      period: "forever",
      description: "Perfect for getting started with basic financial insights",
      features: [
        "Basic financial dashboard",
        "Monthly financial reports",
        "Up to 3 projects",
        "Email support",
        "Basic data visualization"
      ],
      limitations: [
        "No AI-powered insights",
        "No cash flow forecasting",
        "No ESG analysis",
        "Limited integrations"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Plus Package",
      price: "€49",
      period: "per month",
      description: "Advanced tools for growing businesses and financial analysis",
      features: [
        "Everything in Free Tier",
        "AI-powered financial insights",
        "Advanced cash flow forecasting",
        "Balance Sheet & P&L analysis",
        "Profitability & efficiency ratios",
        "Real-time data visualization",
        "Priority email support",
        "Mobile app access",
        "Up to 10 projects"
      ],
      limitations: [
        "No ESG reporting",
        "Limited custom reports"
      ],
      popular: true,
      cta: "Start Plus Trial"
    },
    {
      name: "Enterprise",
      price: "€199",
      period: "per month",
      description: "Complete financial intelligence platform for established businesses",
      features: [
        "Everything in Plus Package",
        "ESG analysis & reporting",
        "Investment & financing analysis",
        "Custom financial reporting",
        "AI-powered business insights",
        "Dedicated account manager",
        "Phone & video support",
        "Unlimited projects",
        "API access",
        "Custom integrations"
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Financial Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. Every plan includes our core financial analysis tools 
            to help you make better business decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-green-700 mb-3">Included:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-500 mb-3">Not included:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, idx) => (
                        <li key={idx} className="flex items-start">
                          <X className="h-4 w-4 text-gray-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-400">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-green-600' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={onSignup}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include 14-day free trial • No setup fees • Cancel anytime
          </p>
          <p className="text-sm text-gray-500">
            Prices exclude VAT where applicable. Enterprise plans include custom pricing for large organizations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
