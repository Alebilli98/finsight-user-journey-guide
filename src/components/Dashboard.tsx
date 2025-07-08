
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, 
  AlertCircle, CheckCircle, Calendar, Leaf, Building2, 
  Globe, Target, Zap, Brain, Shield
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const Dashboard = () => {
  const kpiData = [
    { name: "Jan", revenue: 65000, expenses: 48000, profit: 17000, cashFlow: 22000 },
    { name: "Feb", revenue: 72000, expenses: 52000, profit: 20000, cashFlow: 25000 },
    { name: "Mar", revenue: 68000, expenses: 49000, profit: 19000, cashFlow: 21000 },
    { name: "Apr", revenue: 78000, expenses: 56000, profit: 22000, cashFlow: 28000 },
    { name: "May", revenue: 85000, expenses: 61000, profit: 24000, cashFlow: 32000 },
    { name: "Jun", revenue: 92000, expenses: 64000, profit: 28000, cashFlow: 35000 },
  ];

  const expenseData = [
    { name: "Payroll", value: 45, color: "#3b82f6" },
    { name: "Operations", value: 25, color: "#10b981" },
    { name: "Marketing", value: 15, color: "#f59e0b" },
    { name: "Technology", value: 10, color: "#ef4444" },
    { name: "Other", value: 5, color: "#8b5cf6" },
  ];

  const healthMetrics = [
    { name: "Profitability Ratio", value: 85, status: "healthy", trend: "up" },
    { name: "Efficiency Ratio", value: 78, status: "healthy", trend: "up" },
    { name: "Leverage Ratio", value: 45, status: "healthy", trend: "down" },
    { name: "Liquidity Position", value: 72, status: "warning", trend: "stable" },
  ];

  const aiInsights = [
    {
      title: "Cash Flow Prediction",
      insight: "AI forecasts 15% increase in cash flow next quarter based on current trends",
      confidence: 87,
      type: "positive"
    },
    {
      title: "Cost Optimization",
      insight: "Identified $12K monthly savings opportunity in operational expenses", 
      confidence: 92,
      type: "opportunity"
    },
    {
      title: "Investment Readiness",
      insight: "Financial metrics indicate 78% readiness for Series A funding",
      confidence: 81,
      type: "neutral"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Intelligence Dashboard</h1>
          <p className="text-gray-600">AI-powered insights for startup financial mastery</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-800">
            <Building2 className="h-3 w-3 mr-1" />
            Dubai Licensed
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Last updated: Today, 2:30 PM</span>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$92,000</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$28,000</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +16.7% margin improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cash Flow</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$35,000</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              Strong liquidity position
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funding Readiness</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">78%</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Investment ready score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>AI-Powered Financial Insights</span>
          </CardTitle>
          <CardDescription>Personalized recommendations based on your financial data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  insight.type === 'positive' ? 'bg-green-50 border-green-200' :
                  insight.type === 'opportunity' ? 'bg-blue-50 border-blue-200' :
                  'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-gray-700">{insight.insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Cash Flow Trend</CardTitle>
            <CardDescription>6-month financial performance with predictive forecasting</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={kpiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="cashFlow" 
                  stackId="2"
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Distribution Analysis</CardTitle>
            <CardDescription>Current month breakdown with optimization suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Financial Health Ratios */}
      <Card>
        <CardHeader>
          <CardTitle>Key Financial Ratios & Health Metrics</CardTitle>
          <CardDescription>Essential profitability, efficiency, and leverage indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric) => (
              <div key={metric.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{metric.name}</span>
                  <Badge 
                    variant={metric.status === 'healthy' ? 'default' : 'secondary'}
                    className={
                      metric.status === 'healthy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <Progress value={metric.value} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{metric.value}%</span>
                  <div className="flex items-center">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    ) : metric.trend === 'down' ? (
                      <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-gray-400 mr-1" />
                    )}
                    <span>{metric.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
            <p className="text-sm text-gray-600">Deep dive into financial metrics and trends</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Generate Reports</h3>
            <p className="text-sm text-gray-600">Professional reports for investors and compliance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">AI Consultation</h3>
            <p className="text-sm text-gray-600">Get personalized financial recommendations</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-6 text-center">
            <Leaf className="h-8 w-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">ESG Analysis</h3>
            <p className="text-sm text-gray-600">Sustainability metrics and ESG reporting</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
