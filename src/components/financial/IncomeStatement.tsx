
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
    depreciation: number;
    amortization: number;
    ebit: number;
    ebitda: number;
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
    { item: "EBITDA", amount: data.ebitda, percentage: (data.ebitda / data.revenue) * 100, highlight: true },
    { item: "D&A", amount: data.depreciation + data.amortization, percentage: ((data.depreciation + data.amortization) / data.revenue) * 100 },
    { item: "EBIT", amount: data.ebit, percentage: (data.ebit / data.revenue) * 100, highlight: true },
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

      {/* Key EBITDA and EBIT Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-blue-900">EBITDA</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Info className="h-4 w-4 text-blue-700" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">EBITDA</h4>
                    <p className="text-sm text-muted-foreground">
                      Earnings Before Interest, Taxes, Depreciation, and Amortization. Key metric for assessing operational profitability and cash generation capability.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900 mb-2">€{data.ebitda.toLocaleString()}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">EBITDA Margin</span>
              <span className="text-lg font-semibold text-blue-800">
                {data.revenue > 0 ? ((data.ebitda / data.revenue) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-200">
              <div className="text-xs text-blue-700 space-y-1">
                <div className="flex justify-between">
                  <span>EBIT</span>
                  <span>€{data.ebit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Depreciation</span>
                  <span>€{data.depreciation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>+ Amortization</span>
                  <span>€{data.amortization.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-purple-900">EBIT</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Info className="h-4 w-4 text-purple-700" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium">EBIT</h4>
                    <p className="text-sm text-muted-foreground">
                      Earnings Before Interest and Taxes. Measures operating profit from core business activities, excluding financial structure impacts.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900 mb-2">€{data.ebit.toLocaleString()}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-purple-700">EBIT Margin</span>
              <span className="text-lg font-semibold text-purple-800">
                {data.revenue > 0 ? ((data.ebit / data.revenue) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="mt-3 pt-3 border-t border-purple-200">
              <div className="text-xs text-purple-700 space-y-1">
                <div className="flex justify-between">
                  <span>Gross Profit</span>
                  <span>€{data.grossProfit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>- Operating Expenses</span>
                  <span>€{data.operatingExpenses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard 
          title="Gross Profit" 
          value={data.grossProfit} 
          isPositive={data.grossProfit > 0}
          description="Revenue minus cost of goods sold. Shows how efficiently you produce your products or services."
        />
        <MetricCard 
          title="Net Income" 
          value={data.netIncome} 
          isPositive={data.netIncome > 0}
          description="Bottom line profit after all expenses, interest, and taxes."
        />
        <MetricCard 
          title="Gross Margin %" 
          value={data.revenue > 0 ? parseFloat(((data.grossProfit / data.revenue) * 100).toFixed(1)) : 0}
          isPositive={(data.grossProfit / data.revenue) > 0.3}
          description="Gross profit as a percentage of revenue. Higher is better, indicating strong pricing power."
        />
      </div>

      <Tabs defaultValue="ebitda-analysis" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="ebitda-analysis">EBITDA Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="common-size">Common-Size</TabsTrigger>
          <TabsTrigger value="breakdown">Revenue Breakdown</TabsTrigger>
          <TabsTrigger value="statement">Full Statement</TabsTrigger>
        </TabsList>

        {/* EBITDA Analysis Tab */}
        <TabsContent value="ebitda-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>EBITDA & EBIT Bridge Analysis</CardTitle>
              <CardDescription>Waterfall from Revenue to EBITDA and EBIT</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData ? (
                <div className="space-y-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: 'Revenue', value: data.revenue, fill: '#10b981' },
                      { name: 'COGS', value: -data.costOfGoodsSold, fill: '#ef4444' },
                      { name: 'Gross Profit', value: data.grossProfit, fill: '#3b82f6' },
                      { name: 'OpEx', value: -data.operatingExpenses, fill: '#f59e0b' },
                      { name: 'EBITDA', value: data.ebitda, fill: '#6366f1' },
                      { name: 'D&A', value: -(data.depreciation + data.amortization), fill: '#ec4899' },
                      { name: 'EBIT', value: data.ebit, fill: '#8b5cf6' }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`€${Math.abs(Number(value)).toLocaleString()}`, '']} />
                      <Bar dataKey="value" />
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="bg-slate-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">EBITDA Components</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Revenue</span>
                            <span className="font-medium">€{data.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-red-600">
                            <span>- COGS</span>
                            <span className="font-medium">€{data.costOfGoodsSold.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-red-600">
                            <span>- Operating Expenses</span>
                            <span className="font-medium">€{data.operatingExpenses.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 font-semibold text-blue-700">
                            <span>EBITDA</span>
                            <span>€{data.ebitda.toLocaleString()}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Key Margin Ratios</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Gross Margin</span>
                            <span className="font-medium">{((data.grossProfit / data.revenue) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-blue-700 font-semibold">
                            <span>EBITDA Margin</span>
                            <span>{((data.ebitda / data.revenue) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between text-purple-700 font-semibold">
                            <span>EBIT Margin</span>
                            <span>{((data.ebit / data.revenue) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span>Net Margin</span>
                            <span className="font-medium">{((data.netIncome / data.revenue) * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <div className="h-300 flex items-center justify-center text-muted-foreground">
                  Import your financial data to see EBITDA analysis
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

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
                    <YAxis dataKey="item" type="category" width={150} />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Percentage of Revenue']} />
                    <Bar dataKey="percentage">
                      {commonSizeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.highlight ? '#8b5cf6' : '#3b82f6'} />
                      ))}
                    </Bar>
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
                  { label: "Revenue", value: data.revenue, bold: true, size: 'large' },
                  { label: "Cost of Goods Sold", value: data.costOfGoodsSold, negative: true },
                  { label: "Gross Profit", value: data.grossProfit, bold: true, border: true },
                  { label: "Operating Expenses", value: data.operatingExpenses, negative: true },
                  { label: "Depreciation", value: data.depreciation, negative: true, indent: true },
                  { label: "Amortization", value: data.amortization, negative: true, indent: true },
                  { label: "EBITDA", value: data.ebitda, bold: true, border: true, highlight: 'blue' },
                  { label: "Depreciation & Amortization", value: data.depreciation + data.amortization, negative: true },
                  { label: "EBIT (Operating Income)", value: data.ebit, bold: true, border: true, highlight: 'purple' },
                  { label: "Interest Expense", value: data.interestExpense, negative: true },
                  { label: "Income Before Taxes", value: data.ebit - data.interestExpense },
                  { label: "Taxes", value: data.taxes, negative: true },
                  { label: "Net Income", value: data.netIncome, bold: true, border: true, size: 'large' },
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex justify-between py-2 ${item.border ? 'border-t border-b' : ''} ${item.bold ? 'font-semibold' : ''} ${item.indent ? 'pl-4' : ''} ${item.highlight === 'blue' ? 'bg-blue-50 -mx-4 px-4' : ''} ${item.highlight === 'purple' ? 'bg-purple-50 -mx-4 px-4' : ''}`}
                  >
                    <span className={item.size === 'large' ? 'text-lg' : ''}>{item.label}</span>
                    <span className={`${item.negative ? 'text-red-600' : ''} ${item.size === 'large' ? 'text-lg' : ''}`}>
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
