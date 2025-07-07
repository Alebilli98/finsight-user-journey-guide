
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, ArrowRight, Zap, Shield, BookOpen, MessageSquare,
  Calendar, Clock, Users, Play
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const integrations = [
    { id: "quickbooks", name: "QuickBooks", logo: "📊", popular: true },
    { id: "xero", name: "Xero", logo: "📈", popular: false },
    { id: "asana", name: "Asana", logo: "✅", popular: false },
    { id: "freshbooks", name: "FreshBooks", logo: "📋", popular: false },
    { id: "sage", name: "Sage", logo: "💼", popular: false },
    { id: "wave", name: "Wave", logo: "🌊", popular: false },
  ];

  const handleIntegrationSelect = (integrationId: string) => {
    setSelectedIntegration(integrationId);
    toast({
      title: "Integration Selected",
      description: `${integrations.find(i => i.id === integrationId)?.name} integration selected.`,
    });
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedIntegration) {
      toast({
        title: "Please select an integration",
        description: "Choose an accounting software to continue.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Welcome to FinSight!</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're here to empower your startup/company with cutting-edge financial analysis 
                and AI-powered advice. Let's get you set up to thrive.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Step 1: Select Integration</h3>
              <p className="text-gray-600">
                Choose your accounting software to securely link your accounts and import financial data.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                  <Card 
                    key={integration.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedIntegration === integration.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleIntegrationSelect(integration.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">{integration.logo}</div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      {integration.popular && (
                        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                          Popular
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Secure Account Linking</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your {integrations.find(i => i.id === selectedIntegration)?.name} account will be 
                securely connected to import your financial data and power personalized insights.
              </p>
            </div>

            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Security Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Bank-level encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Read-only access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">SOC 2 Type II compliant</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Clock className="h-12 w-12 text-blue-500 mx-auto animate-spin" />
              <h2 className="text-2xl font-bold text-gray-900">Initial Data Sync</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                FinSight is securely syncing and processing your historical financial information. 
                This will take just a moment...
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <Progress value={75} className="h-2" />
              <p className="text-sm text-gray-500 mt-2 text-center">Processing financial data...</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">Support Available</h4>
                  <p className="text-sm text-gray-600">Our consultants are ready to help</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Book Interview</h4>
                  <p className="text-sm text-gray-600">One-on-one introduction available</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <Play className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-900">Quick Tour</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get a brief, interactive introduction to the main sections of FinSight and 
                start exploring your financial insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "Financial Health Dashboard", desc: "Real-time financial overview", icon: "📊" },
                { title: "P&L and BS Analysis", desc: "Detailed financial statements", icon: "📈" },
                { title: "AI Analysis", desc: "Intelligent recommendations", icon: "🤖" },
                { title: "Process Automation", desc: "Streamline your workflows", icon: "⚡" },
                { title: "Reports & Analytics", desc: "Comprehensive reporting", icon: "📋" },
                { title: "Lending Solutions", desc: "Credit and funding guidance", icon: "💳" },
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-900">Setting up your account...</h2>
          <p className="text-gray-600">This will just take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-sm font-medium text-gray-500">
            Step {currentStep} of 4
          </h1>
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full ${
                  step <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <Progress value={(currentStep / 4) * 100} className="h-1" />
      </div>

      <Card>
        <CardContent className="p-8">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button onClick={handleNextStep} className="flex items-center space-x-2">
              <span>{currentStep === 4 ? 'Complete Setup' : 'Next'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
