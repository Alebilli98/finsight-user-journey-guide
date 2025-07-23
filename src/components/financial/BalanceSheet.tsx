
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { Building, CreditCard, TrendingUp, Info, Scale } from "lucide-react";

interface BalanceSheetProps {
  data: {
    // Assets
    currentAssets: {
      cash: number;
      accountsReceivable: number;
      inventory: number;
      otherCurrent: number;
      total: number;
    };
    nonCurrentAssets: {
      fixedAssets: number;
      intangibleAssets: number;
      investments: number;
      otherNonCurrent: number;
      total: number;
    };
    totalAssets: number;
    
    // Liabilities
    currentLiabilities: {
      accountsPayable: number;
      shortTermDebt: number;
      accruedExpenses: number;
      otherCurrent: number;
      total: number;
    };
    nonCurrentLiabilities: {
      longTermDebt: number;
      otherNonCurrent: number;
      total: number;
    };
    totalLiabilities: number;
    
    // Equity
    equity: {
      shareCapital: number;
      retainedEarnings: number;
      otherEquity: number;
      total: number;
    };
  };
}

const BalanceSheet = ({ data }: BalanceSheetProps) => {
  const hasRealData = data.totalAssets > 0;
  
  // Common-size data (as percentage of total assets)
  const commonSizeData = hasRealData ? [
    { category: "Current Assets", amount: data.currentAssets.total, percentage: (data.currentAssets.total / data.totalAssets) * 100 },
    { category: "Non-Current Assets", amount: data.nonCurrentAssets.total, percentage: (data.nonCurrentAssets.total / data.totalAssets) * 100 },
    { category: "Current Liabilities", amount: data.currentLiabilities.total, percentage: (data.currentLiabilities.total / data.totalAssets) * 100 },
    { category: "Non-Current Liabilities", amount: data.nonCurrentLiabilities.total, percentage: (data.nonCurrentLiabilities.total / data.totalAssets) * 100 },
    { category: "Total Equity", amount: data.equity.total, percentage: (data.equity.total / data.totalAssets) * 100 },
  ] : [];

  const AssetLiabilityCard = ({ 
    title, 
    amount, 
    icon: Icon, 
    color = "blue",
    description 
  }: { 
    title: string; 
    amount: number; 
    icon: any; 
    color?: string;
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
            <p className="text-2xl font-bold">€{amount.toLocaleString()}</p>
          </div>
          <div className={`p-2 rounded-full bg-${color}-100`}>
            <Icon className={`h-5 w-5 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Balance check indicator
  const isBalanced = Math.abs(data.totalAssets - (data.totalLiabilities + data.equity.total)) < 0.01;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Balance Sheet</h2>
          <p className="text-muted-foreground">Financial position snapshot</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={isBalanced ? "default" : "destructive"}>
            <Scale className="h-3 w-3 mr-1" />
            {isBalanced ? "Balanced" : "Unbalanced"}
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AssetLiabilityCard 
          title="Total Assets" 
          amount={data.totalAssets}
          icon={Building}
          color="green"
          description="Everything the company owns that has value, including cash, inventory, equipment, and property."
        />
        <AssetLiabilityCard 
          title="Total Liabilities" 
          amount={data.totalLiabilities}
          icon={CreditCard}
          color="red"
          description="All debts and obligations the company owes to others, including loans, accounts payable, and accrued expenses."
        />
        <AssetLiabilityCard 
          title="Total Equity" 
          amount={data.equity.total}
          icon={TrendingUp}
          color="blue"
          description="Owner's stake in the company. Assets minus Liabilities equals Equity."
        />
      </div>

      {/* Balance Sheet Equation */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Balance Sheet Equation</h3>
            <div className="flex items-center justify-center space-x-4 text-lg">
              <div className="bg-green-100 px-4 py-2 rounded-lg">
                <span className="font-medium">Assets</span>
                <div className="text-2xl font-bold text-green-600">€{data.totalAssets.toLocaleString()}</div>
              </div>
              <span className="text-2xl font-bold">=</span>
              <div className="bg-red-100 px-4 py-2 rounded-lg">
                <span className="font-medium">Liabilities</span>
                <div className="text-2xl font-bold text-red-600">€{data.totalLiabilities.toLocaleString()}</div>
              </div>
              <span className="text-2xl font-bold">+</span>
              <div className="bg-blue-100 px-4 py-2 rounded-lg">
                <span className="font-medium">Equity</span>
                <div className="text-2xl font-bold text-blue-600">€{data.equity.total.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="common-size">Common-Size</TabsTrigger>
          <TabsTrigger value="detailed">Detailed View</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Assets Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Assets Composition</CardTitle>
                <CardDescription>Current vs Non-Current Assets</CardDescription>
              </CardHeader>
              <CardContent>
                {hasRealData ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Current Assets", value: data.currentAssets.total, fill: "#10b981" },
                          { name: "Non-Current Assets", value: data.nonCurrentAssets.total, fill: "#3b82f6" }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                      </Pie>
                      <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-250 flex items-center justify-center text-muted-foreground">
                    Import data to see assets breakdown
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Liabilities & Equity */}
            <Card>
              <CardHeader>
                <CardTitle>Financing Structure</CardTitle>
                <CardDescription>How the company is financed</CardDescription>
              </CardHeader>
              <CardContent>
                {hasRealData ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Current Liabilities", value: data.currentLiabilities.total, fill: "#ef4444" },
                          { name: "Non-Current Liabilities", value: data.nonCurrentLiabilities.total, fill: "#f97316" },
                          { name: "Equity", value: data.equity.total, fill: "#8b5cf6" }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                      </Pie>
                      <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-250 flex items-center justify-center text-muted-foreground">
                    Import data to see financing structure
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Common-Size */}
        <TabsContent value="common-size" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common-Size Balance Sheet</CardTitle>
              <CardDescription>Each item as a percentage of total assets</CardDescription>
            </CardHeader>
            <CardContent>
              {hasRealData ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={commonSizeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, 'of Total Assets']} />
                    <Bar dataKey="percentage" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-350 flex items-center justify-center text-muted-foreground">
                  Import data to see common-size analysis
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Detailed View */}
        <TabsContent value="detailed" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Assets Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Assets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Current Assets</h4>
                  <div className="space-y-1 text-sm pl-4">
                    <div className="flex justify-between">
                      <span>Cash & Cash Equivalents</span>
                      <span>€{data.currentAssets.cash.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accounts Receivable</span>
                      <span>€{data.currentAssets.accountsReceivable.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inventory</span>
                      <span>€{data.currentAssets.inventory.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Current Assets</span>
                      <span>€{data.currentAssets.otherCurrent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 font-medium">
                      <span>Total Current Assets</span>
                      <span>€{data.currentAssets.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Non-Current Assets</h4>
                  <div className="space-y-1 text-sm pl-4">
                    <div className="flex justify-between">
                      <span>Fixed Assets</span>
                      <span>€{data.nonCurrentAssets.fixedAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intangible Assets</span>
                      <span>€{data.nonCurrentAssets.intangibleAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Investments</span>
                      <span>€{data.nonCurrentAssets.investments.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Non-Current</span>
                      <span>€{data.nonCurrentAssets.otherNonCurrent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 font-medium">
                      <span>Total Non-Current Assets</span>
                      <span>€{data.nonCurrentAssets.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span>TOTAL ASSETS</span>
                    <span>€{data.totalAssets.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liabilities & Equity Detail */}
            <Card>
              <CardHeader>
                <CardTitle>Liabilities & Equity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Current Liabilities</h4>
                  <div className="space-y-1 text-sm pl-4">
                    <div className="flex justify-between">
                      <span>Accounts Payable</span>
                      <span>€{data.currentLiabilities.accountsPayable.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Short-term Debt</span>
                      <span>€{data.currentLiabilities.shortTermDebt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accrued Expenses</span>
                      <span>€{data.currentLiabilities.accruedExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Current</span>
                      <span>€{data.currentLiabilities.otherCurrent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 font-medium">
                      <span>Total Current Liabilities</span>
                      <span>€{data.currentLiabilities.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Non-Current Liabilities</h4>
                  <div className="space-y-1 text-sm pl-4">
                    <div className="flex justify-between">
                      <span>Long-term Debt</span>
                      <span>€{data.nonCurrentLiabilities.longTermDebt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Non-Current</span>
                      <span>€{data.nonCurrentLiabilities.otherNonCurrent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 font-medium">
                      <span>Total Non-Current Liabilities</span>
                      <span>€{data.nonCurrentLiabilities.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between font-medium">
                    <span>TOTAL LIABILITIES</span>
                    <span>€{data.totalLiabilities.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Equity</h4>
                  <div className="space-y-1 text-sm pl-4">
                    <div className="flex justify-between">
                      <span>Share Capital</span>
                      <span>€{data.equity.shareCapital.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Retained Earnings</span>
                      <span>€{data.equity.retainedEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Equity</span>
                      <span>€{data.equity.otherEquity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t pt-1 font-medium">
                      <span>Total Equity</span>
                      <span>€{data.equity.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <span>TOTAL LIABILITIES & EQUITY</span>
                    <span>€{(data.totalLiabilities + data.equity.total).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BalanceSheet;
