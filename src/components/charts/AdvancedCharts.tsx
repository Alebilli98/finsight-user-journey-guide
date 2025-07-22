
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ComposedChart
} from "recharts";
import { TrendingUp, TrendingDown, Target, DollarSign } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  color?: string;
  icon?: React.ReactNode;
}

export const MetricCard = ({ title, value, change, trend, color = "blue", icon }: MetricCardProps) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600"
  };

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {Math.abs(change)}% vs last month
              </div>
            )}
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} shadow-lg`}>
            {icon || <DollarSign className="h-6 w-6 text-white" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MonthlyRevenueChartProps {
  data: Array<{ month: string; revenue: number; expenses?: number; profit?: number }>;
  title?: string;
  height?: number;
}

export const MonthlyRevenueChart = ({ data, title = "Ricavi Mensili", height = 350 }: MonthlyRevenueChartProps) => {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>Andamento ricavi e profitti nel tempo</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              formatter={(value, name) => [
                `€${Number(value).toLocaleString()}`,
                name === 'revenue' ? 'Ricavi' : name === 'expenses' ? 'Spese' : 'Profitto'
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Bar dataKey="revenue" fill="url(#revenueGradient)" name="revenue" radius={[4, 4, 0, 0]} />
            {data[0]?.expenses && <Bar dataKey="expenses" fill="url(#expensesGradient)" name="expenses" radius={[4, 4, 0, 0]} />}
            {data[0]?.profit && <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} name="profit" />}
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3}/>
              </linearGradient>
              <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface ExpenseBreakdownProps {
  data: Array<{ name: string; value: number; color: string }>;
  title?: string;
}

export const ExpenseBreakdownChart = ({ data, title = "Suddivisione Spese" }: ExpenseBreakdownProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-orange-600" />
          <span>{title}</span>
        </CardTitle>
        <CardDescription>Distribuzione delle spese per categoria</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`€${Number(value).toLocaleString()}`, '']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">€{item.value.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{((item.value / total) * 100).toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface KPIIndicatorProps {
  title: string;
  value: number;
  target?: number;
  unit?: string;
  color?: string;
}

export const KPIIndicator = ({ title, value, target, unit = "%", color = "blue" }: KPIIndicatorProps) => {
  const percentage = target ? Math.min(100, (value / target) * 100) : value;
  
  const getColor = () => {
    if (percentage >= 80) return "text-green-600 bg-green-100";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-6">
        <div className="text-center">
          <h3 className="text-sm font-medium text-gray-600 mb-4">{title}</h3>
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getColor()} mb-4`}>
            <span className="text-2xl font-bold">{value.toFixed(1)}{unit}</span>
          </div>
          <Progress value={percentage} className="h-2 mb-2" />
          {target && (
            <p className="text-xs text-gray-500">Target: {target}{unit}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
