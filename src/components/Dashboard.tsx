
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, 
  AlertCircle, CheckCircle, Calendar, Leaf, Building2, 
  Globe, Target, Zap, Brain, Shield, User
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area
} from "recharts";

interface DashboardProps {
  user?: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  // Use user's actual data if available, otherwise use demo data
  const financialData = user?.financialData || {};
  const monthlyIncome = financialData.monthlyIncome || 92000;
  const monthlyExpenses = financialData.monthlyExpenses || 64000;
  const currentSavings = financialData.currentSavings || 28000;

  const kpiData = [
    { name: "Jan", revenue: monthlyIncome * 0.8, expenses: monthlyExpenses * 0.85, profit: monthlyIncome * 0.8 - monthlyExpenses * 0.85, cashFlow: (monthlyIncome * 0.8 - monthlyExpenses * 0.85) * 1.2 },
    { name: "Feb", revenue: monthlyIncome * 0.9, expenses: monthlyExpenses * 0.9, profit: monthlyIncome * 0.9 - monthlyExpenses * 0.9, cashFlow: (monthlyIncome * 0.9 - monthlyExpenses * 0.9) * 1.3 },
    { name: "Mar", revenue: monthlyIncome * 0.85, expenses: monthlyExpenses * 0.88, profit: monthlyIncome * 0.85 - monthlyExpenses * 0.88, cashFlow: (monthlyIncome * 0.85 - monthlyExpenses * 0.88) * 1.1 },
    { name: "Apr", revenue: monthlyIncome * 0.95, expenses: monthlyExpenses * 0.92, profit: monthlyIncome * 0.95 - monthlyExpenses * 0.92, cashFlow: (monthlyIncome * 0.95 - monthlyExpenses * 0.92) * 1.4 },
    { name: "May", revenue: monthlyIncome * 1.1, expenses: monthlyExpenses * 0.95, profit: monthlyIncome * 1.1 - monthlyExpenses * 0.95, cashFlow: (monthlyIncome * 1.1 - monthlyExpenses * 0.95) * 1.5 },
    { name: "Jun", revenue: monthlyIncome, expenses: monthlyExpenses, profit: monthlyIncome - monthlyExpenses, cashFlow: (monthlyIncome - monthlyExpenses) * 1.6 },
  ];

  const expenseData = [
    { name: "Payroll", value: 45, color: "#3b82f6" },
    { name: "Operations", value: 25, color: "#10b981" },
    { name: "Marketing", value: 15, color: "#f59e0b" },
    { name: "Technology", value: 10, color: "#ef4444" },
    { name: "Other", value: 5, color: "#8b5cf6" },
  ];

  const profitMargin = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100) : 0;
  const healthMetrics = [
    { name: "Profitability Ratio", value: Math.min(85, Math.max(0, profitMargin)), status: profitMargin > 20 ? "healthy" : "warning", trend: "up" },
    { name: "Efficiency Ratio", value: 78, status: "healthy", trend: "up" },
    { name: "Leverage Ratio", value: 45, status: "healthy", trend: "down" },
    { name: "Liquidity Position", value: currentSavings > 20000 ? 85 : 60, status: currentSavings > 20000 ? "healthy" : "warning", trend: "stable" },
  ];

  const aiInsights = [
    {
      title: "Cash Flow Prediction",
      insight: `Based on your current income of $${monthlyIncome.toLocaleString()}, AI forecasts 15% increase in cash flow next quarter`,
      confidence: 87,
      type: "positive"
    },
    {
      title: "Cost Optimization",
      insight: `With monthly expenses of $${monthlyExpenses.toLocaleString()}, identified potential savings of $2K in operational costs`, 
      confidence: 92,
      type: "opportunity"
    },
    {
      title: "Investment Readiness",
      insight: `Your profit margin of ${profitMargin.toFixed(1)}% indicates ${profitMargin > 25 ? 'strong' : 'moderate'} readiness for growth investment`,
      confidence: 81,
      type: "neutral"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-gray-600">Your personalized financial intelligence dashboard</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-800">
            <Building2 className="h-3 w-3 mr-1" />
            {user?.company || 'Your Company'}
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Last updated: Today, {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
        </div>
      </div>

      {/* Personal Welcome Card */}
      {user && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {new Date(user.registrationDate || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {financialData.importedData ? 'From imported data' : '+12.5% from last month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${(monthlyIncome - monthlyExpenses).toLocaleString()}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {profitMargin.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Savings</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${currentSavings.toLocaleString()}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {currentSavings > 20000 ? 'Strong' : 'Growing'} liquidity position
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Score</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{Math.floor(profitMargin * 3)}%</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              Based on your metrics
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>Personalized AI Insights</span>
          </CardTitle>
          <CardDescription>Recommendations based on your financial data</CardDescription>
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
            <CardTitle>Your Revenue & Cash Flow Trend</CardTitle>
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
          <CardTitle>Your Financial Health Metrics</CardTitle>
          <CardDescription>Essential indicators based on your personal data</CardDescription>
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
    </div>
  );
};

export default Dashboard;
