import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, MessageSquare, Lightbulb, Settings, 
  TrendingUp, BarChart3, Brain, Zap,
  ArrowRight, Sparkles
} from "lucide-react";
import AIAssistant from "./ai/AIAssistant";
import ScenarioAnalysis from "./ai/ScenarioAnalysis";

const AISolution = () => {
  const [activeTab, setActiveTab] = useState("assistant");

  // Mock financial data for ScenarioAnalysis
  const mockFinancialData = {
    annualRevenue: 500000,
    merchandiseCost: 300000,
    operatingExpenses: 120000,
    grossMargin: 40,
    monthlyRecurringRevenue: 25000,
    cashRunway: 18,
    burnRate: 15000,
    monthlyRevenue: 41667,
    operatingCashFlow: 80000,
    currentRatio: 1.5
  };

  const aiFeatures = [
    {
      icon: Bot,
      title: "AI Assistant",
      description: "Assistente intelligente per analisi finanziarie",
      color: "blue"
    },
    {
      icon: MessageSquare,
      title: "Chat AI",
      description: "Conversazione naturale con l'AI",
      color: "green"
    },
    {
      icon: Lightbulb,
      title: "AI Insights",
      description: "Insights automatici sui tuoi dati",
      color: "purple"
    },
    {
      icon: Settings,
      title: "Scenario Analysis",
      description: "Analisi di scenari what-if",
      color: "orange"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-tech-gradient rounded-2xl mb-4">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-dark-blue mb-4 font-inter">AI-Powered Solutions</h1>
        <p className="text-lg text-tech-gray max-w-2xl mx-auto font-poppins">
          Intelligent recommendations and insights tailored to your business
        </p>
        <Badge className="mt-4 bg-tech-gradient text-white border-0" variant="secondary">
          <Sparkles className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      {/* AI Features Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {aiFeatures.map((feature, index) => {
          const Icon = feature.icon;
          const isActive = (feature.title === "AI Assistant" && activeTab === "assistant") ||
                          (feature.title === "Scenario Analysis" && activeTab === "scenario");
          
          return (
            <Card 
              key={index} 
              className={`tech-card cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:scale-105 border-2 ${
                isActive ? 'border-primary bg-primary/5' : 'border-transparent hover:border-primary/20'
              }`}
              onClick={() => {
                if (feature.title === "AI Assistant") setActiveTab("assistant");
                if (feature.title === "Scenario Analysis") setActiveTab("scenario");
              }}
            >
              <CardHeader className="text-center pb-2">
                <div className={`mx-auto mb-3 p-3 rounded-xl w-fit ${
                  feature.color === 'blue' ? 'bg-blue-100' :
                  feature.color === 'green' ? 'bg-green-100' :
                  feature.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    feature.color === 'blue' ? 'text-blue-600' :
                    feature.color === 'green' ? 'text-green-600' :
                    feature.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>
                <CardTitle className="text-lg text-dark-blue font-inter">{feature.title}</CardTitle>
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

      {/* Main Content Area */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="assistant" className="font-inter">AI Assistant</TabsTrigger>
          <TabsTrigger value="scenario" className="font-inter">Scenario Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-6">
          <Card className="tech-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-dark-blue font-inter flex items-center">
                    <Bot className="h-5 w-5 mr-2 text-primary" />
                    Assistente AI Tralis AI
                  </CardTitle>
                  <CardDescription className="text-tech-gray font-poppins">
                    Analisi automatica e comandi intelligenti per la tua azienda
                  </CardDescription>
                </div>
                <Badge className="bg-tech-gradient text-white border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  AI Avanzata
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <AIAssistant />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scenario" className="space-y-6">
          <Card className="tech-card border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-dark-blue font-inter flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-primary" />
                    Scenario Analysis
                  </CardTitle>
                  <CardDescription className="text-tech-gray font-poppins">
                    Analisi di scenari what-if
                  </CardDescription>
                </div>
                <Badge className="bg-tech-gradient text-white border-0">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Predictive
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ScenarioAnalysis financialData={mockFinancialData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Capabilities */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="tech-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-dark-blue font-inter flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Intelligent Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-tech-gray font-poppins">
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                <span>Automated financial health assessment</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                <span>Cash flow forecasting and predictions</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                <span>Risk analysis and recommendations</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="tech-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-dark-blue font-inter flex items-center">
              <Brain className="h-5 w-5 mr-2 text-primary" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-tech-gray font-poppins">
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                <span>Personalized business insights</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                <span>Growth opportunity identification</span>
              </li>
              <li className="flex items-start space-x-2">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5" />
                <span>Strategic planning assistance</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AISolution;
