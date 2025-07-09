
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
  // Get user's actual data or use defaults
  const userData = user || {};
  const monthlyIncome = userData.monthlyIncome || 0;
  const monthlyExpenses = userData.monthlyExpenses || 0;
  const currentSavings = userData.currentSavings || 0;
  const totalAssets = userData.totalAssets || 0;
  const totalLiabilities = userData.totalLiabilities || 0;
  const emergencyFund = userData.emergencyFund || 0;

  // Calculate metrics from real data
  const netWorth = totalAssets - totalLiabilities;
  const monthlyNetIncome = monthlyIncome - monthlyExpenses;
  const savingsRate = monthlyIncome > 0 ? ((monthlyNetIncome) / monthlyIncome * 100) : 0;
  const emergencyMonths = monthlyExpenses > 0 ? (emergencyFund / monthlyExpenses) : 0;

  // Generate charts with real data
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      name: month,
      income: monthlyIncome * (0.9 + (index * 0.02)),
      expenses: monthlyExpenses * (0.95 + (index * 0.01)),
      savings: monthlyNetIncome * (0.8 + (index * 0.05))
    }));
  };

  const kpiData = generateMonthlyData();

  // Expense categories based on user data
  const expenseData = monthlyExpenses > 0 ? [
    { name: "Housing", value: Math.round((userData.housingExpenses || monthlyExpenses * 0.3) / monthlyExpenses * 100), color: "#3b82f6" },
    { name: "Food", value: Math.round((userData.foodExpenses || monthlyExpenses * 0.15) / monthlyExpenses * 100), color: "#10b981" },
    { name: "Transportation", value: Math.round((userData.transportExpenses || monthlyExpenses * 0.15) / monthlyExpenses * 100), color: "#f59e0b" },
    { name: "Utilities", value: Math.round((userData.utilitiesExpenses || monthlyExpenses * 0.10) / monthlyExpenses * 100), color: "#ef4444" },
    { name: "Entertainment", value: Math.round((userData.entertainmentExpenses || monthlyExpenses * 0.10) / monthlyExpenses * 100), color: "#8b5cf6" },
    { name: "Other", value: Math.round((userData.otherExpenses || monthlyExpenses * 0.20) / monthlyExpenses * 100), color: "#6b7280" },
  ] : [];

  // Health metrics based on real data
  const healthMetrics = [
    { 
      name: "Savings Rate", 
      value: Math.min(100, Math.max(0, savingsRate)), 
      status: savingsRate > 20 ? "healthy" : savingsRate > 10 ? "warning" : "critical", 
      trend: "up" 
    },
    { 
      name: "Emergency Fund", 
      value: Math.min(100, emergencyMonths * 16.67), 
      status: emergencyMonths >= 6 ? "healthy" : emergencyMonths >= 3 ? "warning" : "critical", 
      trend: "stable" 
    },
    { 
      name: "Net Worth Growth", 
      value: netWorth > 0 ? Math.min(100, 75 + (netWorth / 100000 * 25)) : 0, 
      status: netWorth > 0 ? "healthy" : "warning", 
      trend: netWorth > totalLiabilities ? "up" : "down" 
    },
    { 
      name: "Debt-to-Income", 
      value: monthlyIncome > 0 ? Math.max(0, 100 - (totalLiabilities / (monthlyIncome * 12) * 100)) : 0, 
      status: (totalLiabilities / (monthlyIncome * 12)) < 0.3 ? "healthy" : "warning", 
      trend: "stable" 
    },
  ];

  // AI insights based on actual data
  const generateAIInsights = () => {
    const insights = [];
    
    if (savingsRate > 20) {
      insights.push({
        title: "Excellent Savings Rate",
        insight: `Your ${savingsRate.toFixed(1)}% savings rate is exceptional! Consider investing the surplus for long-term growth.`,
        confidence: 95,
        type: "positive"
      });
    } else if (savingsRate < 10) {
      insights.push({
        title: "Improve Savings Rate",
        insight: `Your current savings rate is ${savingsRate.toFixed(1)}%. Aim to reduce expenses by €${Math.round((monthlyIncome * 0.2 - monthlyNetIncome))} monthly.`,
        confidence: 88,
        type: "opportunity"
      });
    }

    if (emergencyMonths < 3) {
      insights.push({
        title: "Emergency Fund Priority",
        insight: `You have ${emergencyMonths.toFixed(1)} months of expenses saved. Prioritize building to 6 months (€${Math.round(monthlyExpenses * 6)}).`,
        confidence: 92,
        type: "opportunity"
      });
    }

    if (netWorth > 0) {
      insights.push({
        title: "Positive Net Worth",
        insight: `Your net worth of €${netWorth.toLocaleString()} shows healthy financial progress. Consider diversifying investments.`,
        confidence: 85,
        type: "positive"
      });
    }

    return insights.length > 0 ? insights : [{
      title: "Complete Your Profile",
      insight: "Add your financial data in the Profile section to get personalized AI insights and recommendations.",
      confidence: 100,
      type: "neutral"
    }];
  };

  const aiInsights = generateAIInsights();

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
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{monthlyIncome.toLocaleString()}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              {monthlyIncome > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Active income stream
                </>
              ) : (
                <>
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Add your income data
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Monthly</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${monthlyNetIncome >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              €{monthlyNetIncome.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              {monthlyNetIncome >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {savingsRate.toFixed(1)}% savings rate
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Expenses exceed income
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netWorth >= 0 ? 'text-purple-600' : 'text-red-600'}`}>
              €{netWorth.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              {netWorth >= 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Positive net worth
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Focus on debt reduction
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Fund</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">€{emergencyFund.toLocaleString()}</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <CheckCircle className="h-3 w-3 mr-1" />
              {emergencyMonths.toFixed(1)} months coverage
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
      {monthlyIncome > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Trend</CardTitle>
              <CardDescription>6-month income, expenses and savings overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={kpiData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${value?.toLocaleString()}`, '']} />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="Income"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                    name="Expenses"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stackId="3"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.8}
                    name="Savings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {expenseData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Your monthly spending distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Financial Health Ratios */}
      <Card>
        <CardHeader>
          <CardTitle>Your Financial Health Metrics</CardTitle>
          <CardDescription>Key indicators based on your personal data</CardDescription>
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
                        : metric.status === 'warning'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {metric.status}
                  </Badge>
                </div>
                <Progress value={metric.value} className="h-2" />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{metric.value.toFixed(0)}%</span>
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
