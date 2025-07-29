
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, MessageSquare, TrendingUp, Lightbulb, Target, 
  Zap, ArrowRight, CheckCircle, AlertTriangle, Bot
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AIAssistant from "./ai/AIAssistant";
import ScenarioAnalysis from "./ai/ScenarioAnalysis";

interface AISolutionProps {
  financialData?: any;
}

const AISolution = ({ financialData }: AISolutionProps) => {
  const [chatMessage, setChatMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const aiInsights = [
    {
      type: "opportunity",
      title: "Revenue Growth Opportunity",
      description: "Your Q2 revenue growth rate of 15% is above industry average. Consider scaling your top-performing products.",
      impact: "Potential +$25K monthly revenue",
      priority: "high",
      action: "Increase marketing spend on Product Line A by 20%"
    },
    {
      type: "cost-reduction",
      title: "Cost Optimization",
      description: "Office expenses have increased 32% vs last quarter. Review subscription services and negotiate better rates.",
      impact: "Potential savings: $8K/month",
      priority: "medium",
      action: "Audit and renegotiate vendor contracts"
    },
    {
      type: "efficiency",
      title: "Operational Efficiency",
      description: "Accounts receivable collection period is 45 days. Industry benchmark is 30 days.",
      impact: "Improve cash flow by $15K",
      priority: "high",
      action: "Implement automated payment reminders"
    },
    {
      type: "risk",
      title: "Cash Flow Risk",
      description: "Current cash runway is 8 months. Consider diversifying revenue streams or raising capital.",
      impact: "Extend runway to 12+ months",
      priority: "urgent",
      action: "Explore additional funding options"
    }
  ];

  const chatHistory = [
    {
      type: "user",
      message: "What are the main factors affecting my profitability?",
      timestamp: "2 minutes ago"
    },
    {
      type: "ai",
      message: "Based on your financial data, your profitability is primarily affected by: 1) Gross margin improvement (+5% YoY) 2) Increased operational efficiency 3) Higher customer acquisition costs. I recommend focusing on customer lifetime value optimization.",
      timestamp: "2 minutes ago"
    },
    {
      type: "user",
      message: "How can I improve my cash flow?",
      timestamp: "5 minutes ago"
    },
    {
      type: "ai",
      message: "Your cash flow can be improved by: 1) Reducing payment terms from 45 to 30 days 2) Implementing automated invoicing 3) Offering early payment discounts. These changes could improve cash flow by approximately $20K monthly.",
      timestamp: "5 minutes ago"
    }
  ];

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsAnalyzing(false);
      setChatMessage("");
      toast({
        title: "AI Analysis Complete",
        description: "Your question has been processed. Check the response below.",
      });
    }, 2000);
  };

  const handleApplyRecommendation = (title: string) => {
    toast({
      title: "Recommendation Applied",
      description: `Action plan for "${title}" has been added to your tasks.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI-Powered Solutions</h1>
          <p className="text-gray-600">Intelligent recommendations and insights tailored to your business</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          AI Powered
        </Badge>
      </div>

      <Tabs defaultValue="assistant" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat AI
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Scenario Analysis
          </TabsTrigger>
        </TabsList>

        {/* AI Assistant Tab */}
        <TabsContent value="assistant" className="space-y-4">
          <AIAssistant financialData={financialData} />
        </TabsContent>

        {/* Chat Interface */}
        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span>Ask FinSight AI</span>
              </CardTitle>
              <CardDescription>
                Get instant answers to your financial questions and receive actionable insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Chat History */}
                <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        chat.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border text-gray-900'
                      }`}>
                        <p className="text-sm">{chat.message}</p>
                        <p className={`text-xs mt-1 ${
                          chat.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {chat.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Ask me about your financial performance, recommendations, or any specific questions..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1"
                    rows={2}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isAnalyzing}
                    className="flex items-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Brain className="h-4 w-4" />
                    )}
                    <span>{isAnalyzing ? 'Analyzing...' : 'Send'}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights */}
        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Personalized Recommendations</span>
              </CardTitle>
              <CardDescription>
                AI-generated insights based on your current financial data and industry benchmarks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiInsights.map((insight, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-2">
                              {insight.type === 'opportunity' && <TrendingUp className="h-4 w-4 text-green-600" />}
                              {insight.type === 'cost-reduction' && <Target className="h-4 w-4 text-blue-600" />}
                              {insight.type === 'efficiency' && <Zap className="h-4 w-4 text-purple-600" />}
                              {insight.type === 'risk' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                              <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                            </div>
                            <Badge 
                              variant={insight.priority === 'urgent' ? 'destructive' : 'secondary'}
                              className={
                                insight.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                                insight.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                                'bg-blue-100 text-blue-800'
                              }
                            >
                              {insight.priority}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{insight.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Impact:</span>
                              <span className="text-sm text-green-600 font-medium">{insight.impact}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-gray-700">Recommended Action:</span>
                              <span className="text-sm text-gray-600">{insight.action}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleApplyRecommendation(insight.title)}
                          className="ml-4 flex items-center space-x-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          <span>Apply</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scenario Analysis */}
        <TabsContent value="scenarios" className="space-y-4">
          <ScenarioAnalysis financialData={financialData} />
        </TabsContent>
      </Tabs>

      {/* Quick Analysis Tools */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Predictive Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">Forecast future performance based on current trends</p>
            <Button variant="outline" size="sm" className="flex items-center space-x-1 mx-auto">
              <span>Run Analysis</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Benchmark Analysis</h3>
            <p className="text-sm text-gray-600 mb-4">Compare your metrics against industry standards</p>
            <Button variant="outline" size="sm" className="flex items-center space-x-1 mx-auto">
              <span>Compare</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Process Automation</h3>
            <p className="text-sm text-gray-600 mb-4">Automate repetitive financial tasks and workflows</p>
            <Button variant="outline" size="sm" className="flex items-center space-x-1 mx-auto">
              <span>Setup</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AISolution;
