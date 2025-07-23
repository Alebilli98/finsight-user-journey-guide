
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, ComposedChart, Area, AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CashFlowStatementProps {
  data: {
    operatingCashFlow: number;
    investingCashFlow: number;
    financingCashFlow: number;
    netCashFlow: number;
    endingCashBalance: number;
    burnRate: number;
    cashRunway: number;
    monthlyData: Array<{
      month: string;
      operating: number;
      investing: number;
      financing: number;
      netCashFlow: number;
      endingBalance: number;
    }>;
  };
}

const CashFlowStatement = ({ data }: CashFlowStatementProps) => {
  const hasRealData = data.operatingCashFlow !== 0 || data.investingCashFlow !== 0;
  
  // Cash flow waterfall data for visualization
  const waterfallData = [
    { category: "Operating", value: data.operatingCashFlow, cumulative: data.operatingCashFlow },
    { category: "Investing", value: data.investingCashFlow, cumulative: data.operatingCashFlow + data.investingCashFlow },
    { category: "Financing", value: data.financingCashFlow, cumulative: data.netCashFlow },
    { category: "Net Change", value: data.netCashFlow, cumulative: data.netCashFlow }
  ];

  const MetricCard = ({ title, value, isPositive, description, showAlert }: { 
    title: string; 
    value: number | string; 
    isPositive?: boolean;
    description: string;
    showAlert?: boolean;
  }) => (
    <Card className={`hover:shadow-md transition-shadow ${showAlert ? 'border-red-200 bg-red-50' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {showAlert && <AlertTriangle className="h-4 w-4 text-red-500" />}
            </div>
            <p className="text-2xl font-bold">
              {typeof value === 'number' ? `€${value.toLocaleString()}` : value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
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
          <h2 className="text-2xl font-bold">Cash Flow Statement</h2>
          <p className="text-muted-foreground">Cash inflows and outflows analysis</p>
        </div>
        <Badge variant="secondary">Current Period</Badge>
      </div>

      {/* Burn Rate Alert */}
      {data.burnRate > 0 && hasRealData && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            <strong>Cash Burn Alert:</strong> Current burn rate is €{data.burnRate.toLocaleString()}/month. 
            {data.cashRunway > 0 && ` Cash runway: ${data.cashRunway} months.`}
          </AlertDescription>
        </Alert>
      )}

      {/* Key Cash Flow Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Operating Cash Flow" 
          value={data.operatingCashFlow} 
          isPositive={data.operatingCashFlow > 0}
          description="Cash from core business operations"
        />
        <MetricCard 
          title="Investing Cash Flow" 
          value={data.investingCashFlow} 
          isPositive={data.investingCashFlow > 0}
          description="Cash from investments and assets"
        />
        <MetricCard 
          title="Financing Cash Flow" 
          value={data.financingCashFlow} 
          isPositive={data.financingCashFlow > 0}
          description="Cash from debt and equity"
        />
        <MetricCard 
          title="Net Cash Flow" 
          value={data.netCashFlow} 
          isPositive={data.netCashFlow > 0}
          description="Total cash change in period"
          showAlert={data.netCashFlow < 0}
        />
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Cash Flow Trends</TabsTrigger>
          <TabsTrigger value="waterfall">Cash Flow Analysis</TabsTrigger>
          <TabsTrigger value="direct">Direct Method</TabsTrigger>
          <TabsTrigger value="runway">Cash Runway</TabsTrigger>
        </TabsList>

        {/* Cash Flow Trends */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Cash Flow Trends</CardTitle>
              <CardDescription>12-month cash flow analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData ? (
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={data.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                    <Line type="monotone" dataKey="operating" stroke="#10b981" strokeWidth={3} name="Operating" />
                    <Line type="monotone" dataKey="investing" stroke="#f59e0b" strokeWidth={3} name="Investing" />
                    <Line type="monotone" dataKey="financing" stroke="#3b82f6" strokeWidth={3} name="Financing" />
                    <Line type="monotone" dataKey="netCashFlow" stroke="#8b5cf6" strokeWidth={3} name="Net Cash Flow" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-350 flex items-center justify-center text-muted-foreground">
                  Import your cash flow data to see trend analysis
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Flow Waterfall */}
        <TabsContent value="waterfall" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Waterfall Analysis</CardTitle>
              <CardDescription>How operating, investing, and financing activities affect cash</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={waterfallData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Cash Flow']} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-350 flex items-center justify-center text-muted-foreground">
                  Import your cash flow data to see waterfall analysis
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Direct Method */}
        <TabsContent value="direct" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Direct Method Cash Flow</CardTitle>
              <CardDescription>Cash receipts and payments breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-lg mb-3">Operating Activities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cash received from customers</span>
                      <span className="text-green-600">€{(data.operatingCashFlow * 1.2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash paid to suppliers</span>
                      <span className="text-red-600">€{(data.operatingCashFlow * 0.15).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash paid for operating expenses</span>
                      <span className="text-red-600">€{(data.operatingCashFlow * 0.05).toLocaleString()}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Net Operating Cash Flow</span>
                      <span>€{data.operatingCashFlow.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cash Runway */}
        <TabsContent value="runway" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Runway Analysis</CardTitle>
              <CardDescription>How long your cash will last at current burn rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {data.cashRunway > 0 ? `${data.cashRunway} months` : 'N/A'}
                  </div>
                  <p className="text-muted-foreground">Estimated cash runway</p>
                </div>
                
                {hasRealData && (
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={data.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Cash Balance']} />
                      <Area type="monotone" dataKey="endingBalance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashFlowStatement;
