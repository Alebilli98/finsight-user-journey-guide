
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

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("profitability");

  const profitabilityData = [
    { month: "Jan", grossMargin: 68, netMargin: 15, ebitda: 22 },
    { month: "Feb", grossMargin: 71, netMargin: 18, ebitda: 25 },
    { month: "Mar", grossMargin: 69, netMargin: 16, ebitda: 23 },
    { month: "Apr", grossMargin: 73, netMargin: 19, ebitda: 26 },
    { month: "May", grossMargin: 75, netMargin: 21, ebitda: 28 },
    { month: "Jun", grossMargin: 77, netMargin: 23, ebitda: 30 },
  ];

  const efficiencyData = [
    { metric: "Asset Turnover", current: 1.8, industry: 1.5, benchmark: 2.0 },
    { metric: "Inventory Turnover", current: 8.5, industry: 6.2, benchmark: 10.0 },
    { metric: "Receivables Turnover", current: 12.3, industry: 9.8, benchmark: 15.0 },
    { metric: "Working Capital", current: 2.1, industry: 1.8, benchmark: 2.5 },
  ];

  const leverageData = [
    { quarter: "Q1", debtToEquity: 0.35, debtToAssets: 0.25, interestCoverage: 8.5 },
    { quarter: "Q2", debtToEquity: 0.32, debtToAssets: 0.23, interestCoverage: 9.2 },
    { quarter: "Q3", debtToEquity: 0.30, debtToAssets: 0.22, interestCoverage: 9.8 },
    { quarter: "Q4", debtToEquity: 0.28, debtToAssets: 0.20, interestCoverage: 10.5 },
  ];

  const ratioCards = [
    { title: "Current Ratio", value: "2.45", change: "+0.12", status: "good" },
    { title: "Quick Ratio", value: "1.87", change: "+0.08", status: "good" },
    { title: "ROE", value: "18.5%", change: "+2.1%", status: "excellent" },
    { title: "ROA", value: "12.3%", change: "+1.5%", status: "good" },
  ];

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
                      : 'bg-blue-100 text-blue-800'
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
                      : 'text-blue-600 border-blue-300'
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
          <CardDescription>Comprehensive analysis across key performance areas</CardDescription>
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
                    <p className="text-2xl font-bold text-green-600">77%</p>
                    <p className="text-sm text-green-700">+2% vs last quarter</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Net Margin</h4>
                    <p className="text-2xl font-bold text-blue-600">23%</p>
                    <p className="text-sm text-blue-700">+3% vs last quarter</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">EBITDA Margin</h4>
                    <p className="text-2xl font-bold text-purple-600">30%</p>
                    <p className="text-sm text-purple-700">+2% vs last quarter</p>
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
                          <Badge className="bg-green-100 text-green-800">75%</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Meeting Benchmarks</span>
                          <Badge className="bg-blue-100 text-blue-800">50%</Badge>
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
                        <p>• Asset utilization is strong</p>
                        <p>• Inventory management improved</p>
                        <p>• Collection period optimized</p>
                        <p>• Working capital efficiency good</p>
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
                    <p className="text-2xl font-bold text-blue-600">0.28</p>
                    <p className="text-sm text-blue-700">Optimal range</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Interest Coverage</h4>
                    <p className="text-2xl font-bold text-green-600">10.5x</p>
                    <p className="text-sm text-green-700">Strong coverage</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">Debt-to-Assets</h4>
                    <p className="text-2xl font-bold text-purple-600">0.20</p>
                    <p className="text-sm text-purple-700">Conservative</p>
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
