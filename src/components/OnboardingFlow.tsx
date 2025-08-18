
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, Shield, CheckCircle, Building2, MapPin
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredIntegration, setHoveredIntegration] = useState<string | null>(null);

  const steps = [
    "Welcome to Tralis AI",
    "Connect Your Business Accounts",
    "Setup Complete"
  ];

  const financialIntegrations = [
    { 
      name: "QuickBooks", 
      description: "Connect your accounting data for comprehensive financial analysis.",
      icon: "📊",
      category: "accounting"
    },
    { 
      name: "Xero", 
      description: "Sync your financial records effortlessly for real-time insights.",
      icon: "💼",
      category: "accounting"
    },
    { 
      name: "Banking APIs", 
      description: "Integrate directly with your bank for real-time transaction data.",
      icon: "🏦",
      category: "banking"
    },
  ];

  const projectIntegrations = [
    { 
      name: "Asana", 
      description: "Integrate Asana for seamless project management and task tracking.",
      icon: "✅",
      category: "project"
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleIntegrationClick = (integrationName: string) => {
    // This would typically open a modal or redirect to OAuth flow
    console.log(`Connecting to ${integrationName}`);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Tralis AI</h2>
              <p className="text-lg text-gray-600 mb-4">Your AI-Powered Financial Intelligence Platform</p>
              <div className="flex justify-center">
                <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  Dubai, UAE Based
                </Badge>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
              <p className="text-gray-700 leading-relaxed">
                Empowering startups and SMEs to compete with larger companies through 
                cutting-edge financial analysis and AI-powered advice. Transform your 
                financial management and unlock your business potential.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Business Accounts</h2>
              <p className="text-gray-600">
                Securely link your business accounts to unlock personalized AI insights
              </p>
            </div>

            {/* Financial Data Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Financial Data</h3>
                <p className="text-sm text-gray-600 mb-4">Streamline your financial management.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {financialIntegrations.map((integration, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-blue-300 hover:bg-blue-50"
                    onMouseEnter={() => setHoveredIntegration(integration.name)}
                    onMouseLeave={() => setHoveredIntegration(null)}
                    onClick={() => handleIntegrationClick(integration.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="text-3xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {hoveredIntegration === integration.name 
                              ? integration.description 
                              : `Connect ${integration.name}`
                            }
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Connect {integration.name}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Project Management Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Project & Operations</h3>
                <p className="text-sm text-gray-600 mb-4">Optimize your workflow and gain operational clarity.</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {projectIntegrations.map((integration, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-blue-300 hover:bg-blue-50"
                    onMouseEnter={() => setHoveredIntegration(integration.name)}
                    onMouseLeave={() => setHoveredIntegration(null)}
                    onClick={() => handleIntegrationClick(integration.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className="text-3xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {hoveredIntegration === integration.name 
                              ? integration.description 
                              : `Connect ${integration.name}`
                            }
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Connect {integration.name}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Coming Soon Placeholder */}
                <Card className="opacity-60 border-dashed border-2">
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="text-3xl">⏳</div>
                      <div>
                        <h3 className="font-semibold text-gray-600">More Integrations</h3>
                        <p className="text-sm text-gray-500 mt-1">Coming Soon</p>
                      </div>
                      <Button size="sm" variant="outline" disabled className="w-full">
                        Coming Soon
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Explore More */}
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Explore More Integrations</h4>
              <p className="text-sm text-gray-600 mb-4">
                We're continuously expanding our integrations to support your business needs.
              </p>
              <Button variant="outline">
                View All Integrations →
              </Button>
            </div>

            {/* Trust Elements */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900">Enterprise-Grade Security</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your data is protected with bank-level encryption (AES-256) and stored in 
                      compliance with GDPR and Dubai Free Zone regulations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-900">Expert Support Available</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Need help? Our financial consultants are ready to assist with setup and 
                      can schedule a one-on-one introduction interview.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
              <p className="text-gray-600 mb-6">
                Your financial data is being synced. This may take a few moments.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• Explore your Financial Health Dashboard</li>
                <li>• Review AI-powered insights and recommendations</li>
                <li>• Access cash flow forecasting and predictive analytics</li>
                <li>• Generate professional financial reports</li>
                <li>• Discover ESG analysis tools (Premium users)</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Step {currentStep + 1} of {steps.length}
          </h1>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </span>
        </div>
        <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span
              key={index}
              className={`text-xs ${
                index <= currentStep ? "text-blue-600 font-medium" : "text-gray-400"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
      </div>

      <Card className="min-h-[500px]">
        <CardContent className="p-8">
          {renderStepContent()}
          
          <div className="flex justify-end mt-8">
            <Button onClick={nextStep} size="lg" className="px-8">
              {currentStep === steps.length - 1 ? "Enter Tralis AI" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
