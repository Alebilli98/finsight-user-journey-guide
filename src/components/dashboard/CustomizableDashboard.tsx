
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, Target, BookOpen, TrendingUp, DollarSign, 
  BarChart3, PieChart, Info, Lightbulb 
} from "lucide-react";
import { MetricCard } from "../charts/AdvancedCharts";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  category: string;
}

interface CustomizableDashboardProps {
  user?: any;
  financialData?: any;
}

const CustomizableDashboard = ({ user, financialData }: CustomizableDashboardProps) => {
  const [selectedMetrics, setSelectedMetrics] = useState([
    'revenue', 'grossProfit', 'netIncome', 'cashFlow', 'burnRate'
  ]);
  
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Monthly Revenue',
      current: financialData?.monthlyRevenue || 0,
      target: 50000,
      unit: '€',
      category: 'Revenue'
    },
    {
      id: '2',
      title: 'Gross Margin',
      current: financialData?.grossMargin || 0,
      target: 70,
      unit: '%',
      category: 'Profitability'
    },
    {
      id: '3',
      title: 'Cash Runway',
      current: financialData?.cashRunway || 0,
      target: 18,
      unit: 'months',
      category: 'Financial Health'
    }
  ]);

  const [newGoal, setNewGoal] = useState({ title: '', current: 0, target: 0, unit: '', category: '' });

  const availableMetrics = [
    { id: 'revenue', label: 'Annual Revenue', icon: DollarSign },
    { id: 'grossProfit', label: 'Gross Profit', icon: TrendingUp },
    { id: 'netIncome', label: 'Net Income', icon: BarChart3 },
    { id: 'cashFlow', label: 'Operating Cash Flow', icon: BarChart3 },
    { id: 'burnRate', label: 'Burn Rate', icon: TrendingDown },
    { id: 'customers', label: 'Active Customers', icon: Users },
    { id: 'retention', label: 'Customer Retention', icon: Target },
    { id: 'growth', label: 'Growth Rate', icon: TrendingUp }
  ];

  const glossaryTerms = [
    {
      term: "Gross Profit Margin",
      definition: "The percentage of revenue remaining after subtracting the cost of goods sold. Shows how efficiently you produce your products.",
      example: "If you have €100k revenue and €40k COGS, your gross margin is 60%."
    },
    {
      term: "Burn Rate",
      definition: "The rate at which a company spends money, typically measured monthly. Critical for startups to monitor cash runway.",
      example: "If you spend €10k more than you earn each month, your burn rate is €10k/month."
    },
    {
      term: "Current Ratio",
      definition: "Current assets divided by current liabilities. Measures your ability to pay short-term obligations.",
      example: "A ratio of 2.0 means you have €2 in current assets for every €1 in current liabilities."
    },
    {
      term: "Customer Acquisition Cost (CAC)",
      definition: "The total cost of acquiring a new customer, including marketing and sales expenses.",
      example: "If you spend €1000 on marketing and acquire 10 customers, your CAC is €100."
    }
  ];

  const handleMetricToggle = (metricId: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricId) 
        ? prev.filter(id => id !== metricId)
        : [...prev, metricId]
    );
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      setGoals(prev => [...prev, {
        ...newGoal,
        id: Date.now().toString(),
        current: newGoal.current || 0
      }]);
      setNewGoal({ title: '', current: 0, target: 0, unit: '', category: '' });
    }
  };

  const getMetricValue = (metricId: string) => {
    switch (metricId) {
      case 'revenue': return financialData?.annualRevenue || 0;
      case 'grossProfit': return (financialData?.annualRevenue || 0) - (financialData?.merchandiseCost || 0);
      case 'netIncome': return financialData?.netIncome || 0;
      case 'cashFlow': return financialData?.operatingCashFlow || 0;
      case 'burnRate': return financialData?.burnRate || 0;
      case 'customers': return financialData?.activeCustomers || 0;
      case 'retention': return 85; // Example value
      case 'growth': return 15; // Example value
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Personalized Dashboard</h2>
          <p className="text-muted-foreground">Customize your view and track your goals</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Customize Your Dashboard</DialogTitle>
                <DialogDescription>
                  Select which metrics you want to see on your dashboard
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {availableMetrics.map((metric) => (
                    <div key={metric.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={metric.id}
                        checked={selectedMetrics.includes(metric.id)}
                        onCheckedChange={() => handleMetricToggle(metric.id)}
                      />
                      <Label htmlFor={metric.id} className="flex items-center gap-2">
                        <metric.icon className="h-4 w-4" />
                        {metric.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Glossary
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Financial Terms Glossary</DialogTitle>
                <DialogDescription>
                  Understanding key financial concepts for your business
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {glossaryTerms.map((item, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-2">{item.term}</h4>
                      <p className="text-muted-foreground mb-2">{item.definition}</p>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm"><strong>Example:</strong> {item.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
          <TabsTrigger value="goals">Goal Tracking</TabsTrigger>
          <TabsTrigger value="insights">Learning Hub</TabsTrigger>
        </TabsList>

        {/* Key Metrics */}
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedMetrics.map((metricId) => {
              const metric = availableMetrics.find(m => m.id === metricId);
              if (!metric) return null;
              
              return (
                <MetricCard
                  key={metricId}
                  title={metric.label}
                  value={metricId === 'retention' || metricId === 'growth' ? 
                    `${getMetricValue(metricId)}%` : 
                    `€${getMetricValue(metricId).toLocaleString()}`}
                  change={Math.random() * 20 - 10} // Random for demo
                  trend={Math.random() > 0.5 ? "up" : "down"}
                  color="blue"
                  icon={<metric.icon className="h-6 w-6 text-white" />}
                />
              );
            })}
          </div>
        </TabsContent>

        {/* Goal Tracking */}
        <TabsContent value="goals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Financial Goals
              </CardTitle>
              <CardDescription>Track your progress towards key financial targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal) => {
                const progress = Math.min(100, (goal.current / goal.target) * 100);
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.title}</span>
                      <Badge variant="outline">{goal.category}</Badge>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{goal.current}{goal.unit} / {goal.target}{goal.unit}</span>
                      <span>{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium mb-3">Add New Goal</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Goal title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Input
                    placeholder="Target value"
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target: Number(e.target.value) }))}
                  />
                  <Input
                    placeholder="Unit (€, %, etc.)"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                  />
                  <Button onClick={addGoal} className="w-full">
                    Add Goal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Hub */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Monitor your cash runway monthly to avoid surprises</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Aim for 40-60% gross margins in most businesses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm">Track customer acquisition cost vs lifetime value</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Financial Planning for Startups
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Understanding Cash Flow
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="h-4 w-4 mr-2" />
                    Fundraising Preparation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomizableDashboard;
