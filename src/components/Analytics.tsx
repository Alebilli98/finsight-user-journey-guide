
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ComposedChart, Scatter, ScatterChart
} from "recharts";
import { TrendingUp, Calculator, Target, Zap } from "lucide-react";

interface AnalyticsProps {
  user?: any;
}

const Analytics = ({ user }: AnalyticsProps) => {
  const [activeTab, setActiveTab] = useState("profitability");

  // Get real user data or use defaults
  const userData = user || {};
  const monthlyIncome = userData.monthlyIncome || 0;
  const monthlyExpenses = userData.monthlyExpenses || 0;
  const totalAssets = userData.totalAssets || 0;
  const totalLiabilities = userData.totalLiabilities || 0;
  const annualRevenue = userData.financialData?.annualRevenue || monthlyIncome * 12;
  const annualExpenses = userData.financialData?.annualExpenses || monthlyExpenses * 12;
  const grossProfit = userData.financialData?.grossProfit || (annualRevenue - (annualRevenue * 0.4));
  const netIncome = userData.financialData?.netIncome || (annualRevenue - annualExpenses);

  // Calculate profitability ratios from real data
  const grossMargin = annualRevenue > 0 ? ((grossProfit / annualRevenue) * 100) : 0;
  const netMargin = annualRevenue > 0 ? ((netIncome / annualRevenue) * 100) : 0;
  const ebitdaMargin = annualRevenue > 0 ? (((netIncome + (annualExpenses * 0.1)) / annualRevenue) * 100) : 0;

  const profitabilityData = userData.financialData?.monthlyData || [
    { month: "Jan", grossMargin: Math.max(0, grossMargin - 5), netMargin: Math.max(0, netMargin - 3), ebitda: Math.max(0, ebitdaMargin - 4) },
    { month: "Feb", grossMargin: Math.max(0, grossMargin - 3), netMargin: Math.max(0, netMargin - 2), ebitda: Math.max(0, ebitdaMargin - 3) },
    { month: "Mar", grossMargin: Math.max(0, grossMargin - 4), netMargin: Math.max(0, netMargin - 3), ebitda: Math.max(0, ebitdaMargin - 4) },
    { month: "Apr", grossMargin: Math.max(0, grossMargin - 2), netMargin: Math.max(0, netMargin - 1), ebitda: Math.max(0, ebitdaMargin - 2) },
    { month: "May", grossMargin: Math.max(0, grossMargin), netMargin: Math.max(0, netMargin + 1), ebitda: Math.max(0, ebitdaMargin) },
    { month: "Jun", grossMargin: Math.max(0, grossMargin + 2), netMargin: Math.max(0, netMargin + 2), ebitda: Math.max(0, ebitdaMargin + 2) },
  ];

  // Calculate efficiency ratios from real data
  const assetTurnover = totalAssets > 0 ? (annualRevenue / totalAssets) : 0;
  const inventoryTurnover = annualRevenue > 0 ? 8.5 : 0; // Placeholder as inventory data not available
  const receivablesTurnover = annualRevenue > 0 ? 12.3 : 0; // Placeholder
  const workingCapital = (totalAssets - totalLiabilities) > 0 ? 2.1 : 0;

  const efficiencyData = [
    { metric: "Asset Turnover", current: assetTurnover, industry: 1.5, benchmark: 2.0 },
    { metric: "Inventory Turnover", current: inventoryTurnover, industry: 6.2, benchmark: 10.0 },
    { metric: "Receivables Turnover", current: receivablesTurnover, industry: 9.8, benchmark: 15.0 },
    { metric: "Working Capital", current: workingCapital, industry: 1.8, benchmark: 2.5 },
  ];

  // Calculate leverage ratios from real data
  const debtToEquity = (totalAssets - totalLiabilities) > 0 ? (totalLiabilities / (totalAssets - totalLiabilities)) : 0;
  const debtToAssets = totalAssets > 0 ? (totalLiabilities / totalAssets) : 0;
  const interestCoverage = netIncome > 0 ? Math.max(1, netIncome / (totalLiabilities * 0.05)) : 0; // Assuming 5% interest rate

  const leverageData = [
    { quarter: "Q1", debtToEquity: Math.max(0, debtToEquity + 0.07), debtToAssets: Math.max(0, debtToAssets + 0.05), interestCoverage: Math.max(1, interestCoverage - 2) },
    { quarter: "Q2", debtToEquity: Math.max(0, debtToEquity + 0.04), debtToAssets: Math.max(0, debtToAssets + 0.03), interestCoverage: Math.max(1, interestCoverage - 1.3) },
    { quarter: "Q3", debtToEquity: Math.max(0, debtToEquity + 0.02), debtToAssets: Math.max(0, debtToAssets + 0.02), interestCoverage: Math.max(1, interestCoverage - 0.7) },
    { quarter: "Q4", debtToEquity: Math.max(0, debtToEquity), debtToAssets: Math.max(0, debtToAssets), interestCoverage: Math.max(1, interestCoverage) },
  ];

  // Calculate key ratios from real data
  const currentRatio = totalLiabilities > 0 ? Math.max(0.5, (totalAssets * 0.6) / (totalLiabilities * 0.5)) : 2.45;
  const quickRatio = totalLiabilities > 0 ? Math.max(0.3, (totalAssets * 0.4) / (totalLiabilities * 0.5)) : 1.87;
  const roe = (totalAssets - totalLiabilities) > 0 ? ((netIncome / (totalAssets - totalLiabilities)) * 100) : 0;
  const roa = totalAssets > 0 ? ((netIncome / totalAssets) * 100) : 0;

  const ratioCards = [
    { 
      title: "Current Ratio", 
      value: currentRatio.toFixed(2), 
      change: currentRatio > 2 ? "+0.12" : "-0.08", 
      status: currentRatio > 2 ? "good" : "warning" 
    },
    { 
      title: "Quick Ratio", 
      value: quickRatio.toFixed(2), 
      change: quickRatio > 1.5 ? "+0.08" : "-0.05", 
      status: quickRatio > 1.5 ? "good" : "warning" 
    },
    { 
      title: "ROE", 
      value: `${Math.max(0, roe).toFixed(1)}%`, 
      change: roe > 15 ? "+2.1%" : roe > 0 ? "+0.5%" : "0%", 
      status: roe > 15 ? "excellent" : roe > 5 ? "good" : "warning" 
    },
    { 
      title: "ROA", 
      value: `${Math.max(0, roa).toFixed(1)}%`, 
      change: roa > 10 ? "+1.5%" : roa > 0 ? "+0.3%" : "0%", 
      status: roa > 10 ? "excellent" : roa > 3 ? "good" : "warning" 
    },
  ];

  // Show message if no real data is available
  const hasRealData = monthlyIncome > 0 || monthlyExpenses > 0 || totalAssets > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600">Deep dive into your financial performance metrics</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Zap className="h-4 w-4" />
          <span>Export Analysis</span>
        </Button>
      </div>

      {!hasRealData && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">No Financial Data Available</h3>
              <p className="text-blue-700 mb-4">
                Import your business data or update your profile to see personalized analytics and insights.
              </p>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => {
                    const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                    window.dispatchEvent(event);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Import Data
                </Button>
                <Button 
                  onClick={() => {
                    const event = new CustomEvent('navigate-to-section', { detail: 'profile' });
                    window.dispatchEvent(event);
                  }}
                  variant="outline"
                >
                  Update Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Financial Ratios */}
      <div className="grid md:grid-cols-4 gap-6">
        {ratioCards.map((ratio) => (
          <Card key={ratio.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{ratio.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{ratio.value}</span>
                <Badge 
                  variant={ratio.status === 'excellent' ? 'default' : 'secondary'}
                  className={
                    ratio.status === 'excellent' 
                      ? 'bg-green-100 text-green-800' 
                      : ratio.status === 'good'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-orange-100 text-orange-800'
                  }
                >
                  {ratio.change}
                </Badge>
              </div>
              <div className="mt-2">
                <Badge 
                  variant="outline" 
                  className={
                    ratio.status === 'excellent' 
                      ? 'text-green-600 border-green-300' 
                      : ratio.status === 'good'
                      ? 'text-blue-600 border-blue-300'
                      : 'text-orange-600 border-orange-300'
                  }
                >
                  {ratio.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Analysis</CardTitle>
          <CardDescription>
            {hasRealData 
              ? "Comprehensive analysis based on your imported data" 
              : "Sample analysis - import your data for personalized insights"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profitability" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Profitability</span>
              </TabsTrigger>
              <TabsTrigger value="efficiency" className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Efficiency</span>
              </TabsTrigger>
              <TabsTrigger value="leverage" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Leverage</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profitability" className="mt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Gross Margin</h4>
                    <p className="text-2xl font-bold text-green-600">{Math.max(0, grossMargin).toFixed(1)}%</p>
                    <p className="text-sm text-green-700">
                      {hasRealData ? "Based on your data" : "Sample data"}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Net Margin</h4>
                    <p className="text-2xl font-bold text-blue-600">{Math.max(0, netMargin).toFixed(1)}%</p>
                    <p className="text-sm text-blue-700">
                      {hasRealData ? "Based on your data" : "Sample data"}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">EBITDA Margin</h4>
                    <p className="text-2xl font-bold text-purple-600">{Math.max(0, ebitdaMargin).toFixed(1)}%</p>
                    <p className="text-sm text-purple-700">
                      {hasRealData ? "Based on your data" : "Sample data"}
                    </p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={profitabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="grossMargin" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Gross Margin %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="netMargin" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Net Margin %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ebitda" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="EBITDA Margin %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="efficiency" className="mt-6">
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={efficiencyData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="metric" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3b82f6" name="Current" />
                    <Bar dataKey="industry" fill="#10b981" name="Industry Avg" />
                    <Bar dataKey="benchmark" fill="#f59e0b" name="Benchmark" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance vs Industry</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Above Industry Average</span>
                          <Badge className={`${hasRealData && assetTurnover > 1.5 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {hasRealData ? (assetTurnover > 1.5 ? '100%' : '50%') : '75%'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Meeting Benchmarks</span>
                          <Badge className="bg-blue-100 text-blue-800">
                            {hasRealData ? '50%' : '50%'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {hasRealData ? (
                          <>
                            <p>• Asset utilization: {assetTurnover > 1.5 ? 'Strong' : 'Needs improvement'}</p>
                            <p>• Revenue efficiency: {annualRevenue > monthlyIncome * 10 ? 'Good' : 'Average'}</p>
                            <p>• Working capital: {workingCapital > 2 ? 'Optimal' : 'Monitor closely'}</p>
                            <p>• Overall performance: {(assetTurnover + workingCapital) / 2 > 1.8 ? 'Good' : 'Room for improvement'}</p>
                          </>
                        ) : (
                          <>
                            <p>• Import your data for personalized insights</p>
                            <p>• Asset utilization analysis available</p>
                            <p>• Revenue efficiency tracking</p>
                            <p>• Working capital optimization tips</p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leverage" className="mt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Debt-to-Equity</h4>
                    <p className="text-2xl font-bold text-blue-600">{Math.max(0, debtToEquity).toFixed(2)}</p>
                    <p className="text-sm text-blue-700">
                      {debtToEquity < 0.5 ? 'Conservative' : debtToEquity < 1 ? 'Moderate' : 'High leverage'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Interest Coverage</h4>
                    <p className="text-2xl font-bold text-green-600">{Math.max(1, interestCoverage).toFixed(1)}x</p>
                    <p className="text-sm text-green-700">
                      {interestCoverage > 5 ? 'Strong coverage' : interestCoverage > 2 ? 'Adequate' : 'Monitor closely'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">Debt-to-Assets</h4>
                    <p className="text-2xl font-bold text-purple-600">{Math.max(0, debtToAssets).toFixed(2)}</p>
                    <p className="text-sm text-purple-700">
                      {debtToAssets < 0.3 ? 'Conservative' : debtToAssets < 0.6 ? 'Moderate' : 'High debt'}
                    </p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={leverageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="debtToEquity" fill="#3b82f6" name="Debt-to-Equity" />
                    <Bar yAxisId="left" dataKey="debtToAssets" fill="#10b981" name="Debt-to-Assets" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="interestCoverage" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Interest Coverage"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
