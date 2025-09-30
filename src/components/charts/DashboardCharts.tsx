import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

interface DashboardChartsProps {
  financialData?: any;
}

const DashboardCharts = ({ financialData }: DashboardChartsProps) => {
  // Sample data - in a real app this would come from the financialData prop
  const revenueData = [
    { month: 'Jan', revenue: 15000 },
    { month: 'Feb', revenue: 18000 },
    { month: 'Mar', revenue: 16500 },
    { month: 'Apr', revenue: 22000 },
    { month: 'May', revenue: 19500 },
    { month: 'Jun', revenue: 24000 },
    { month: 'Jul', revenue: 21000 },
    { month: 'Aug', revenue: 25500 },
    { month: 'Sep', revenue: 23000 },
    { month: 'Oct', revenue: 28000 },
    { month: 'Nov', revenue: 26500 },
    { month: 'Dec', revenue: 30000 }
  ];

  const costsData = [
    { month: 'Jan', totalCosts: 12000 },
    { month: 'Feb', totalCosts: 13500 },
    { month: 'Mar', totalCosts: 12800 },
    { month: 'Apr', totalCosts: 15000 },
    { month: 'May', totalCosts: 14200 },
    { month: 'Jun', totalCosts: 16500 },
    { month: 'Jul', totalCosts: 15800 },
    { month: 'Aug', totalCosts: 17200 },
    { month: 'Sep', totalCosts: 16800 },
    { month: 'Oct', totalCosts: 18500 },
    { month: 'Nov', totalCosts: 17900 },
    { month: 'Dec', totalCosts: 19500 }
  ];

  const costBreakdownData = [
    { name: 'Operating Costs', value: 110000, color: '#3b82f6' },
    { name: 'Financial Costs', value: 6000, color: '#ef4444' },
    { name: 'Administrative', value: 25000, color: '#f59e0b' },
    { name: 'Marketing', value: 18000, color: '#10b981' }
  ];

  const marginData = [
    { month: 'Jan', revenue: 15000, costs: 12000, margin: 3000 },
    { month: 'Feb', revenue: 18000, costs: 13500, margin: 4500 },
    { month: 'Mar', revenue: 16500, costs: 12800, margin: 3700 },
    { month: 'Apr', revenue: 22000, costs: 15000, margin: 7000 },
    { month: 'May', revenue: 19500, costs: 14200, margin: 5300 },
    { month: 'Jun', revenue: 24000, costs: 16500, margin: 7500 },
    { month: 'Jul', revenue: 21000, costs: 15800, margin: 5200 },
    { month: 'Aug', revenue: 25500, costs: 17200, margin: 8300 },
    { month: 'Sep', revenue: 23000, costs: 16800, margin: 6200 },
    { month: 'Oct', revenue: 28000, costs: 18500, margin: 9500 },
    { month: 'Nov', revenue: 26500, costs: 17900, margin: 8600 },
    { month: 'Dec', revenue: 30000, costs: 19500, margin: 10500 }
  ];

  return (
    <div className="space-y-8">
      {/* Revenue Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Costs Section - Two Charts Side by Side */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Total Costs Bar Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Total Costs</CardTitle>
            <CardDescription>Monthly cost analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Total Costs']} />
                <Bar dataKey="totalCosts" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown Pie Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Cost Breakdown</CardTitle>
            <CardDescription>Cost distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costBreakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`€${value.toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gross Margin Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Gross Margin Analysis</CardTitle>
          <CardDescription>Revenue, costs, and margin trend</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={marginData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`€${value.toLocaleString()}`, name]} />
              <Legend />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
              <Bar dataKey="costs" fill="#ef4444" name="Costs" />
              <Line 
                type="monotone" 
                dataKey="margin" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Gross Margin"
                dot={{ fill: '#10b981' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;