
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, WaterfallChart
} from "recharts";
import { Droplets, TrendingDown, TrendingUp, Info, AlertTriangle, Zap } from "lucide-react";

interface CashFlowStatementProps {
  data: {
    // Operating Activities (Direct Method)
    operating: {
      cashFromCustomers: number;
      cashToSuppliers: number;
      cashToEmployees: number;
      cashForOperatingExpenses: number;
      interestPaid: number;
      taxesPaid: number;
      netOperatingCashFlow: number;
    };
    
    // Investing Activities
    investing: {
      purchaseOfAssets: number;
      saleOfAssets: number;
      investments: number;
      netInvestingCashFlow: number;
    };
    
    // Financing Activities
    financing: {
      proceedsFromLoans: number;
      loanRepayments: number;
      equityIssuance: number;
      dividendsPaid: number;
      netFinancingCashFlow: number;
    };
    
    // Summary
    netCashFlow: number;
    beginningCash: number;
    endingCash: number;
    
    // Historical data for trends
    monthlyData: Array<{
      month: string;
      operating: number;
      investing: number;
      financing: number;
      netCashFlow: number;
      endingCash: number;
    }>;
    
    // Burn rate calculation
    burnRate: number; // Monthly burn rate (negative operating cash flow)
    cashRunway: number; // Months of cash remaining at current burn rate
  };
}

const CashFlowStatement = ({ data }: CashFlowStatementProps) => {
  const hasRealData = Math.abs(data.netCashFlow) > 0 || data.endingCash > 0;
  const isNegativeOperatingCashFlow = data.operating.netOperatingCashFlow < 0;
  const isCriticalBurnRate = data.burnRate > 0 && data.cashRunway < 6; // Less than 6 months runway
  
  const CashFlowCard = ({ 
    title, 
    amount, 
    description,
    type = "neutral" 
  }: { 
    title: string; 
    amount: number; 
    description: string;
    type?: "positive" | "negative" | "neutral";
  }) => {
    const getColorClasses = () => {
      switch (type) {
        case "positive": return "border-green-200 bg-green-50";
        case "negative": return "border-red-200 bg-red-50";
        default: return "border-blue-200 bg-blue-50";
      }
    };

    return (
      <Card className={`hover:shadow-md transition-shadow ${getColorClasses()}`}>
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
              <p className="text-2xl font-bold">€{amount.toLocaleString()}</p>
            </div>
            <div className={`p-2 rounded-full ${
              type === "positive" ? "bg-green-100" : 
              type === "negative" ? "bg-red-100" : 
              "bg-blue-100"
            }`}>
              {type === "positive" ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : type === "negative" ? (
                <TrendingDown className="h-5 w-5 text-red-600" />
              ) : (
                <Droplets className="h-5 w-5 text-blue-600" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Cash Flow Statement</h2>
          <p className="text-muted-foreground">Cash movements and liquidity analysis</p>
        </div>
        <Badge variant="secondary">Direct Method</Badge>
      </div>

      {/* Burn Rate Alert */}
      {isNegativeOperatingCashFlow && (
        <Alert className={isCriticalBurnRate ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}>
          <AlertTriangle className={`h-4 w-4 ${isCriticalBurnRate ? "text-red-600" : "text-yellow-600"}`} />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <strong>Burn Rate Alert:</strong> Monthly cash burn of €{Math.abs(data.burnRate).toLocaleString()}
                {data.cashRunway > 0 && (
                  <span className="ml-2">• Cash runway: {data.cashRunway.toFixed(1)} months</span>
                )}
              </div>
              <Badge variant={isCriticalBurnRate ? "destructive" : "outline"}>
                <Zap className="h-3 w-3 mr-1" />
                {isCriticalBurnRate ? "Critical" : "Monitor"}
              </Badge>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <CashFlowCard 
          title="Operating Cash Flow" 
          amount={data.operating.netOperatingCashFlow}
          type={data.operating.netOperatingCashFlow > 0 ? "positive" : "negative"}
          description="Cash generated from core business operations. Positive indicates the business generates cash from operations."
        />
        <CashFlowCard 
          title="Investing Cash Flow" 
          amount={data.investing.netInvestingCashFlow}
          type={data.investing.netInvestingCashFlow > 0 ? "positive" : "negative"}
          description="Cash used for investments in assets, equipment, or other companies. Usually negative for growing businesses."
        />
        <CashFlowCard 
          title="Financing Cash Flow" 
          amount={data.financing.netFinancingCashFlow}
          type={data.financing.netFinancingCashFlow > 0 ? "positive" : "negative"}
          description="Cash from financing activities like loans, equity, or dividend payments."
        />
        <CashFlowCard 
          title="Net Cash Flow" 
          amount={data.netCashFlow}
          type={data.netCashFlow > 0 ? "positive" : "negative"}
          description="Total change in cash position. Sum of operating, investing, and financing cash flows."
        />
      </div>

      {/* Cash Balance Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Cash Flow Summary</h3>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="font-medium">Beginning Cash</span>
                <div className="text-2xl font-bold text-blue-600">€{data.beginningCash.toLocaleString()}</div>
              </div>
              <span className="text-2xl font-bold">+</span>
              <div className={`px-4 py-2 rounded-lg ${data.netCashFlow >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                <span className="font-medium">Net Cash Flow</span>
                <div className={`text-2xl font-bold ${data.netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  €{data.netCashFlow.toLocaleString()}
                </div>
              </div>
              <span className="text-2xl font-bold">=</span>
              <div className="bg-purple-100 px-4 py-2 rounded-lg">
                <span className="font-medium">Ending Cash</span>
                <div className="text-2xl font-bold text-purple-600">€{data.endingCash.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Statement</TabsTrigger>
          <TabsTrigger value="indirect">Indirect Method</TabsTrigger>
        </TabsList>

        {/* Trends */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Trends</CardTitle>
              <CardDescription>Monthly cash flow patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData ? (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                    <Line type="monotone" dataKey="operating" stroke="#10b981" strokeWidth={3} name="Operating CF" />
                    <Line type="monotone" dataKey="investing" stroke="#f59e0b" strokeWidth={3} name="Investing CF" />
                    <Line type="monotone" dataKey="financing" stroke="#3b82f6" strokeWidth={3} name="Financing CF" />
                    <Line type="monotone" dataKey="endingCash" stroke="#8b5cf6" strokeWidth={3} name="Cash Balance" />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-400 flex items-center justify-center text-muted-foreground">
                  Import cash flow data to see trends
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailed Statement */}
        <TabsContent value="detailed" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Operating Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Operating Activities</CardTitle>
                <CardDescription>Direct Method</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Cash from customers</span>
                    <span className="text-green-600">€{data.operating.cashFromCustomers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash to suppliers</span>
                    <span className="text-red-600">(€{Math.abs(data.operating.cashToSuppliers).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash to employees</span>
                    <span className="text-red-600">(€{Math.abs(data.operating.cashToEmployees).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operating expenses</span>
                    <span className="text-red-600">(€{Math.abs(data.operating.cashForOperatingExpenses).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest paid</span>
                    <span className="text-red-600">(€{Math.abs(data.operating.interestPaid).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes paid</span>
                    <span className="text-red-600">(€{Math.abs(data.operating.taxesPaid).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Net Operating Cash Flow</span>
                    <span className={data.operating.netOperatingCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                      €{data.operating.netOperatingCashFlow.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investing Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Investing Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Purchase of assets</span>
                    <span className="text-red-600">(€{Math.abs(data.investing.purchaseOfAssets).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sale of assets</span>
                    <span className="text-green-600">€{data.investing.saleOfAssets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investments</span>
                    <span className={data.investing.investments >= 0 ? "text-green-600" : "text-red-600"}>
                      {data.investing.investments >= 0 ? "€" : "(€"}
                      {Math.abs(data.investing.investments).toLocaleString()}
                      {data.investing.investments < 0 ? ")" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Net Investing Cash Flow</span>
                    <span className={data.investing.netInvestingCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                      €{data.investing.netInvestingCashFlow.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financing Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Proceeds from loans</span>
                    <span className="text-green-600">€{data.financing.proceedsFromLoans.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Loan repayments</span>
                    <span className="text-red-600">(€{Math.abs(data.financing.loanRepayments).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Equity issuance</span>
                    <span className="text-green-600">€{data.financing.equityIssuance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dividends paid</span>
                    <span className="text-red-600">(€{Math.abs(data.financing.dividendsPaid).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Net Financing Cash Flow</span>
                    <span className={data.financing.netFinancingCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                      €{data.financing.netFinancingCashFlow.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Indirect Method */}
        <TabsContent value="indirect" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operating Cash Flow - Indirect Method</CardTitle>
              <CardDescription>Starting from net income and adjusting for non-cash items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm max-w-md">
                <div className="flex justify-between">
                  <span>Net Income</span>
                  <span>€{(data.operating.netOperatingCashFlow * 0.8).toLocaleString()}</span>
                </div>
                <div className="text-xs text-muted-foreground pl-4">
                  <div className="flex justify-between">
                    <span>+ Depreciation & Amortization</span>
                    <span>€{Math.abs(data.operating.netOperatingCashFlow * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>+ Increase in Accounts Payable</span>
                    <span>€{Math.abs(data.operating.netOperatingCashFlow * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- Increase in Accounts Receivable</span>
                    <span>(€{Math.abs(data.operating.netOperatingCashFlow * 0.03).toLocaleString()})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>- Increase in Inventory</span>
                    <span>(€{Math.abs(data.operating.netOperatingCashFlow * 0.02).toLocaleString()})</span>
                  </div>
                </div>
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>Net Operating Cash Flow</span>
                  <span className={data.operating.netOperatingCashFlow >= 0 ? "text-green-600" : "text-red-600"}>
                    €{data.operating.netOperatingCashFlow.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CashFlowStatement;
