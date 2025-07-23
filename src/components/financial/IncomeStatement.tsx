
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface IncomeStatementProps {
  data: {
    revenue: number;
    costOfGoodsSold: number;
    grossProfit: number;
    operatingExpenses: number;
    ebit: number;
    interestExpense: number;
    taxes: number;
    netIncome: number;
    monthlyData: Array<{
      month: string;
      revenue: number;
      expenses: number;
      netIncome: number;
    }>;
    revenueBreakdown?: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
  };
}

const IncomeStatement = ({ data }: IncomeStatementProps) => {
  const hasRealData = data.revenue > 0;
  
  // Calculate common-size percentages
  const commonSizeData = hasRealData ? [
    { item: "Revenue", amount: data.revenue, percentage: 100 },
    { item: "Cost of Goods Sold", amount: data.costOfGoodsSold, percentage: (data.costOfGoodsSold / data.revenue) * 100 },
    { item: "Gross Profit", amount: data.grossProfit, percentage: (data.grossProfit / data.revenue) * 100 },
    { item: "Operating Expenses", amount: data.operatingExpenses, percentage: (data.operatingExpenses / data.revenue) * 100 },
    { item: "EBIT", amount: data.ebit, percentage: (data.ebit / data.revenue) * 100 },
    { item: "Interest Expense", amount: data.interestExpense, percentage: (data.interestExpense / data.revenue) * 100 },
    { item: "Taxes", amount: data.taxes, percentage: (data.taxes / data.revenue) * 100 },
    { item: "Net Income", amount: data.netIncome, percentage: (data.netIncome / data.revenue) * 100 },
  ] : [];

  const MetricCard = ({ title, value, isPositive, description }: { 
    title: string; 
    value: number; 
    isPositive?: boolean;
    description: string;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                    <Info className="h-3 w-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-2xl font-bold">€{value.toLocaleString()}</p>
          </div>
          <div className={`p-2 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
            {isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Income Statement (P&L)</h2>
          <p className="text-muted-foreground">Profit and loss overview</p>
        </div>
        <Badge variant="secondary">Year to Date</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Gross Profit" 
          value={data.grossProfit} 
          isPositive={data.grossProfit > 0}
          description="Revenue minus cost of goods sold. Shows how efficiently you produce your products or services."
        />
        <MetricCard 
          title="Operating Income (EBIT)" 
          value={data.ebit} 
          isPositive={data.ebit > 0}
          description="Earnings before interest and taxes. Shows profit from core business operations."
        />
        <MetricCard 
          title="Net Income" 
          value={data.netIncome} 
          isPositive={data.netIncome > 0}
          description="Bottom line profit after all expenses, interest, and taxes."
        />
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="common-size">Common-Size</TabsTrigger>
          <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="statement">Full Statement</TabsTrigger>
        </TabsList>

        {/* Trend Analysis */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Expense Trends</CardTitle>
              <CardDescription>Monthly trends over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue" />
                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
                    <Line type="monotone" dataKey="netIncome" stroke="#3b82f6" strokeWidth={3} name="Net Income" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-350 flex items-center justify-center text-muted-foreground">
                  Import your financial data to see trend analysis
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Common-Size Analysis */}
        <TabsContent value="common-size" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common-Size Income Statement</CardTitle>
              <CardDescription>Each item as a percentage of total revenue</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={commonSizeData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="item" type="category" width={120} />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Percentage of Revenue']} />
                    <Bar dataKey="percentage" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-350 flex items-center justify-center text-muted-foreground">
                  Import your financial data to see common-size analysis
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Breakdown */}
        <TabsContent value="breakdown" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Category</CardTitle>
              <CardDescription>Revenue breakdown by product, service, or customer segment</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData && data.revenueBreakdown ? (
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={data.revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="amount"
                    >
                      {data.revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Revenue']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-350 flex items-center justify-center text-muted-foreground">
                  Configure revenue categories to see breakdown analysis
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Full Statement */}
        <TabsContent value="statement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Income Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: "Revenue", value: data.revenue, bold: true },
                  { label: "Cost of Goods Sold", value: data.costOfGoodsSold, negative: true },
                  { label: "Gross Profit", value: data.grossProfit, bold: true, border: true },
                  { label: "Operating Expenses", value: data.operatingExpenses, negative: true },
                  { label: "Operating Income (EBIT)", value: data.ebit, bold: true, border: true },
                  { label: "Interest Expense", value: data.interestExpense, negative: true },
                  { label: "Income Before Taxes", value: data.ebit - data.interestExpense },
                  { label: "Taxes", value: data.taxes, negative: true },
                  { label: "Net Income", value: data.netIncome, bold: true, border: true },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between py-2 ${item.border ? 'border-t border-b' : ''} ${item.bold ? 'font-semibold' : ''}`}
                  >
                    <span>{item.label}</span>
                    <span className={item.negative ? 'text-red-600' : ''}>
                      €{item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IncomeStatement;
