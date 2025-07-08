
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, Shield, Zap, Globe, Users, CheckCircle,
  Building2, MapPin, Target, Eye, Heart
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Welcome to FinSight",
    "Our Mission & Vision", 
    "Connect Your Data",
    "Setup Complete"
  ];

  const integrations = [
    { name: "QuickBooks", description: "Connect your accounting data", icon: "📊" },
    { name: "Xero", description: "Sync financial records", icon: "💼" },
    { name: "Asana", description: "Project management integration", icon: "✅" },
    { name: "Banking APIs", description: "Real-time transaction data", icon: "🏦" },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
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
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to FinSight</h2>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission & Vision</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span>Our Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To unleash the full potential of startups and SMEs, fostering their growth 
                    through integrated technological solutions and solid financial advice, enabling 
                    them to compete effectively with larger companies.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-green-600" />
                    <span>Our Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To be the leading AI-powered financial intelligence platform that empowers 
                    every startup and SME to achieve financial mastery and sustainable growth.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <span>Our Core Values</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { name: "Innovation", icon: Zap, color: "text-yellow-600" },
                    { name: "Client Empowerment", icon: Users, color: "text-blue-600" },
                    { name: "Integrity & Trust", icon: Shield, color: "text-green-600" },
                    { name: "Accessibility", icon: Globe, color: "text-purple-600" },
                    { name: "Excellence", icon: CheckCircle, color: "text-red-600" },
                  ].map((value) => {
                    const Icon = value.icon;
                    return (
                      <div key={value.name} className="text-center p-3">
                        <Icon className={`h-6 w-6 ${value.color} mx-auto mb-2`} />
                        <p className="text-sm font-medium text-gray-900">{value.name}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Connect Your Financial Data</h2>
              <p className="text-gray-600">
                Securely link your business accounts to unlock personalized AI insights
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {integrations.map((integration, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-blue-300">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{integration.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
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
                <Building2 className="h-5 w-5 text-green-600 mt-0.5" />
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
        );

      case 3:
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
              {currentStep === steps.length - 1 ? "Enter FinSight" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
