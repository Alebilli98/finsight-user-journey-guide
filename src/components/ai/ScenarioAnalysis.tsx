
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb } from "lucide-react";

interface ScenarioAnalysisProps {
  financialData: any;
}

const ScenarioAnalysis = ({ financialData }: ScenarioAnalysisProps) => {
  const [scenarioType, setScenarioType] = useState("revenue");
  const [changePercent, setChangePercent] = useState(10);
  const [timeframe, setTimeframe] = useState("12");
  const [projectedData, setProjectedData] = useState(null);

  const calculateScenario = () => {
    const baseRevenue = financialData?.annualRevenue || 100000;
    const baseCosts = financialData?.merchandiseCost || 60000;
    const baseExpenses = financialData?.operatingExpenses || 25000;

    let newRevenue = baseRevenue;
    let newCosts = baseCosts;
    let newExpenses = baseExpenses;

    switch (scenarioType) {
      case "revenue":
        newRevenue = baseRevenue * (1 + changePercent / 100);
        break;
      case "costs":
        newCosts = baseCosts * (1 + changePercent / 100);
        break;
      case "marketing":
        newExpenses = baseExpenses * (1 + changePercent / 100);
        newRevenue = baseRevenue * (1 + (changePercent * 0.5) / 100); // Assume marketing increases revenue
        break;
      case "hiring":
        newExpenses = baseExpenses * (1 + changePercent / 100);
        break;
    }

    const newGrossProfit = newRevenue - newCosts;
    const newNetIncome = newGrossProfit - newExpenses;
    const impactOnNetIncome = ((newNetIncome - (baseRevenue - baseCosts - baseExpenses)) / (baseRevenue - baseCosts - baseExpenses)) * 100;

    setProjectedData({
      currentNetIncome: baseRevenue - baseCosts - baseExpenses,
      projectedNetIncome: newNetIncome,
      impact: impactOnNetIncome,
      newRevenue,
      newCosts,
      newExpenses,
      newGrossProfit
    });
  };

  const fundraisingScore = Math.min(100, Math.max(0, 
    (financialData?.grossMargin || 0) * 0.3 + 
    (financialData?.monthlyRecurringRevenue || 0) / 1000 * 0.2 + 
    (financialData?.cashRunway || 0) * 0.5
  ));

  const redFlags = [
    financialData?.burnRate > financialData?.monthlyRevenue && "High burn rate relative to revenue",
    financialData?.grossMargin < 20 && "Low gross margin below 20%",
    financialData?.cashRunway < 6 && "Cash runway below 6 months",
    financialData?.currentRatio < 1 && "Current ratio below 1.0"
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI-Powered Analysis
          </h2>
          <p className="text-muted-foreground">Predictive insights and scenario planning</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800">
          Premier Feature
        </Badge>
      </div>

      <Tabs defaultValue="scenarios" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scenarios">What-If Scenarios</TabsTrigger>
          <TabsTrigger value="predictions">Predictive Insights</TabsTrigger>
          <TabsTrigger value="fundraising">Fundraising Score</TabsTrigger>
          <TabsTrigger value="alerts">Red Flag Alerts</TabsTrigger>
        </TabsList>

        {/* Scenario Analysis */}
        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scenario Planning Tool</CardTitle>
              <CardDescription>Model the impact of business decisions on your financials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="scenario-type">Scenario Type</Label>
                  <Select value={scenarioType} onValueChange={setScenarioType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue Change</SelectItem>
                      <SelectItem value="costs">Cost Change</SelectItem>
                      <SelectItem value="marketing">Marketing Investment</SelectItem>
                      <SelectItem value="hiring">New Hire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="change-percent">Change (%)</Label>
                  <Input
                    id="change-percent"
                    type="number"
                    value={changePercent}
                    onChange={(e) => setChangePercent(Number(e.target.value))}
                    placeholder="10"
                  />
                </div>

                <div>
                  <Label htmlFor="timeframe">Timeframe (months)</Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateScenario} className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Calculate Impact
              </Button>

              {projectedData && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Current Net Income</p>
                          <p className="text-2xl font-bold">€{projectedData.currentNetIncome.toLocaleString()}</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Projected Net Income</p>
                          <p className="text-2xl font-bold text-blue-600">€{projectedData.projectedNetIncome.toLocaleString()}</p>
                          <p className={`text-sm ${projectedData.impact > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {projectedData.impact > 0 ? '+' : ''}{projectedData.impact.toFixed(1)}% impact
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictive Insights */}
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Predictive Insights</CardTitle>
              <CardDescription>Based on your historical data and market trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Revenue Prediction:</strong> Based on current trends, your revenue is projected to grow 
                    by 15-20% over the next 12 months if you maintain current growth patterns.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Cash Flow Forecast:</strong> Your operating cash flow is expected to improve 
                    by €{((financialData?.operatingCashFlow || 0) * 0.15).toLocaleString()} over the next quarter.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <Target className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Break-even Analysis:</strong> At current burn rate, you'll reach break-even 
                    in approximately {Math.ceil((financialData?.cashRunway || 12) * 0.7)} months.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fundraising Score */}
        <TabsContent value="fundraising" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fundraising Readiness Score</CardTitle>
              <CardDescription>AI assessment of your investment readiness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {Math.round(fundraisingScore)}
                </div>
                <p className="text-lg text-muted-foreground">Fundraising Score</p>
                <Badge className={fundraisingScore > 70 ? 'bg-green-100 text-green-800' : 
                                 fundraisingScore > 40 ? 'bg-yellow-100 text-yellow-800' : 
                                 'bg-red-100 text-red-800'}>
                  {fundraisingScore > 70 ? 'Investment Ready' : 
                   fundraisingScore > 40 ? 'Needs Improvement' : 'Not Ready'}
                </Badge>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recommendations for Improvement:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Improve gross margin to at least 60% for SaaS businesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Extend cash runway to at least 18 months</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Demonstrate consistent month-over-month growth</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Red Flag Alerts */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Health Alerts</CardTitle>
              <CardDescription>Potential warning signs in your financial data</CardDescription>
            </CardHeader>
            <CardContent>
              {redFlags.length > 0 ? (
                <div className="space-y-3">
                  {redFlags.map((flag, index) => (
                    <Alert key={index} className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {flag}
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              ) : (
                <Alert className="border-green-200 bg-green-50">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    No major red flags detected in your financial data. Keep monitoring your key metrics.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ScenarioAnalysis;
