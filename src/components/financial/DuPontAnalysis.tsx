
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from "recharts";
import { TrendingUp, Info, Target, Calculator } from "lucide-react";

interface DuPontAnalysisProps {
  data: {
    netIncome: number;
    revenue: number;
    totalAssets: number;
    totalEquity: number;
    
    // DuPont components
    netProfitMargin: number; // Net Income / Revenue
    assetTurnover: number;   // Revenue / Total Assets
    equityMultiplier: number; // Total Assets / Total Equity
    roe: number;             // Return on Equity
    
    // Historical data for trends
    historicalData: Array<{
      period: string;
      netProfitMargin: number;
      assetTurnover: number;
      equityMultiplier: number;
      roe: number;
    }>;
    
    // Industry benchmarks (optional)
    industryBenchmarks?: {
      netProfitMargin: number;
      assetTurnover: number;
      equityMultiplier: number;
      roe: number;
    };
  };
}

const DuPontAnalysis = ({ data }: DuPontAnalysisProps) => {
  const hasRealData = data.revenue > 0 && data.totalAssets > 0;
  
  const ComponentCard = ({ 
    title, 
    value, 
    benchmark, 
    description, 
    unit = "",
    calculation 
  }: { 
    title: string; 
    value: number; 
    benchmark?: number;
    description: string;
    unit?: string;
    calculation: string;
  }) => {
    const performanceVsBenchmark = benchmark ? ((value - benchmark) / benchmark) * 100 : 0;
    const isAboveBenchmark = performanceVsBenchmark > 0;
    
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-sm">{title}</h3>
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
                      <div className="text-xs bg-gray-50 p-2 rounded">
                        <strong>Calculation:</strong> {calculation}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              {benchmark && (
                <Badge variant={isAboveBenchmark ? "default" : "secondary"} className="text-xs">
                  {isAboveBenchmark ? "↑" : "↓"} {Math.abs(performanceVsBenchmark).toFixed(1)}%
                </Badge>
              )}
            </div>
            
            <div className="text-2xl font-bold text-center">
              {value.toFixed(2)}{unit}
            </div>
            
            {benchmark && (
              <div className="text-center text-sm text-muted-foreground">
                Industry avg: {benchmark.toFixed(2)}{unit}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">DuPont Analysis</h2>
          <p className="text-muted-foreground">Break down Return on Equity (ROE) into its key components</p>
        </div>
        <Badge variant="secondary">
          <Calculator className="h-3 w-3 mr-1" />
          Financial Analysis
        </Badge>
      </div>

      {/* DuPont Equation Visualization */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">DuPont Equation</h3>
            
            {/* Large Screen Layout */}
            <div className="hidden lg:flex items-center justify-center space-x-4 text-lg">
              <div className="bg-green-100 px-4 py-3 rounded-lg border-2 border-green-200">
                <div className="font-medium text-green-800">ROE</div>
                <div className="text-2xl font-bold text-green-600">{data.roe.toFixed(2)}%</div>
              </div>
              
              <span className="text-2xl font-bold">=</span>
              
              <div className="bg-blue-100 px-4 py-3 rounded-lg border-2 border-blue-200">
                <div className="font-medium text-blue-800">Net Profit Margin</div>
                <div className="text-xl font-bold text-blue-600">{data.netProfitMargin.toFixed(2)}%</div>
              </div>
              
              <span className="text-2xl font-bold">×</span>
              
              <div className="bg-purple-100 px-4 py-3 rounded-lg border-2 border-purple-200">
                <div className="font-medium text-purple-800">Asset Turnover</div>
                <div className="text-xl font-bold text-purple-600">{data.assetTurnover.toFixed(2)}</div>
              </div>
              
              <span className="text-2xl font-bold">×</span>
              
              <div className="bg-orange-100 px-4 py-3 rounded-lg border-2 border-orange-200">
                <div className="font-medium text-orange-800">Equity Multiplier</div>
                <div className="text-xl font-bold text-orange-600">{data.equityMultiplier.toFixed(2)}</div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-3">
              <div className="bg-green-100 px-4 py-3 rounded-lg border-2 border-green-200">
                <div className="font-medium text-green-800">Return on Equity (ROE)</div>
                <div className="text-2xl font-bold text-green-600">{data.roe.toFixed(2)}%</div>
              </div>
              
              <div className="text-center font-bold">Equals</div>
              
              <div className="grid grid-cols-1 gap-2">
                <div className="bg-blue-100 px-4 py-3 rounded-lg border-2 border-blue-200">
                  <div className="font-medium text-blue-800">Net Profit Margin</div>
                  <div className="text-xl font-bold text-blue-600">{data.netProfitMargin.toFixed(2)}%</div>
                </div>
                
                <div className="text-center font-bold">×</div>
                
                <div className="bg-purple-100 px-4 py-3 rounded-lg border-2 border-purple-200">
                  <div className="font-medium text-purple-800">Asset Turnover</div>
                  <div className="text-xl font-bold text-purple-600">{data.assetTurnover.toFixed(2)}</div>
                </div>
                
                <div className="text-center font-bold">×</div>
                
                <div className="bg-orange-100 px-4 py-3 rounded-lg border-2 border-orange-200">
                  <div className="font-medium text-orange-800">Equity Multiplier</div>
                  <div className="text-xl font-bold text-orange-600">{data.equityMultiplier.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ComponentCard
          title="Return on Equity"
          value={data.roe}
          benchmark={data.industryBenchmarks?.roe}
          description="Overall profitability relative to shareholder equity. Higher ROE indicates more efficient use of equity."
          unit="%"
          calculation="Net Income ÷ Total Equity"
        />
        
        <ComponentCard
          title="Net Profit Margin"
          value={data.netProfitMargin}
          benchmark={data.industryBenchmarks?.netProfitMargin}
          description="Profitability efficiency - how much profit is generated from each euro of revenue."
          unit="%"
          calculation="Net Income ÷ Revenue"
        />
        
        <ComponentCard
          title="Asset Turnover"
          value={data.assetTurnover}
          benchmark={data.industryBenchmarks?.assetTurnover}
          description="Asset utilization efficiency - how effectively assets are used to generate revenue."
          calculation="Revenue ÷ Total Assets"
        />
        
        <ComponentCard
          title="Equity Multiplier"
          value={data.equityMultiplier}
          benchmark={data.industryBenchmarks?.equityMultiplier}
          description="Financial leverage - how much assets are financed by debt vs equity. Higher = more leveraged."
          calculation="Total Assets ÷ Total Equity"
        />
      </div>

      {/* Trend Analysis */}
      {hasRealData && data.historicalData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>DuPont Components Trend Analysis</CardTitle>
            <CardDescription>Historical performance of each ROE component</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data.historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${Number(value).toFixed(2)}${name === 'netProfitMargin' || name === 'roe' ? '%' : ''}`,
                    name === 'netProfitMargin' ? 'Net Profit Margin' :
                    name === 'assetTurnover' ? 'Asset Turnover' :
                    name === 'equityMultiplier' ? 'Equity Multiplier' :
                    'ROE'
                  ]}
                />
                <Line type="monotone" dataKey="roe" stroke="#10b981" strokeWidth={3} name="roe" />
                <Line type="monotone" dataKey="netProfitMargin" stroke="#3b82f6" strokeWidth={2} name="netProfitMargin" />
                <Line type="monotone" dataKey="assetTurnover" stroke="#8b5cf6" strokeWidth={2} name="assetTurnover" />
                <Line type="monotone" dataKey="equityMultiplier" stroke="#f59e0b" strokeWidth={2} name="equityMultiplier" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Analysis Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Key Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-1">Profitability Driver</h4>
              <p className="text-sm text-blue-800">
                {data.netProfitMargin > (data.industryBenchmarks?.netProfitMargin || 10) 
                  ? "Strong profit margins indicate efficient cost management and pricing power."
                  : "Consider improving operational efficiency and cost control to boost margins."
                }
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-1">Asset Efficiency</h4>
              <p className="text-sm text-purple-800">
                {data.assetTurnover > (data.industryBenchmarks?.assetTurnover || 1) 
                  ? "Excellent asset utilization - generating strong revenue from asset base."
                  : "Focus on increasing revenue generation from existing assets or optimizing asset base."
                }
              </p>
            </div>
            
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-1">Financial Leverage</h4>
              <p className="text-sm text-orange-800">
                {data.equityMultiplier > 2 
                  ? "High leverage amplifies returns but increases financial risk."
                  : "Conservative leverage provides stability but may limit growth potential."
                }
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ROE Improvement Strategies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <h4 className="font-medium">Increase Net Profit Margin:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Optimize pricing strategies</li>
                <li>• Reduce operating costs</li>
                <li>• Improve operational efficiency</li>
                <li>• Focus on higher-margin products/services</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Improve Asset Turnover:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Increase sales volume</li>
                <li>• Optimize inventory management</li>
                <li>• Improve asset utilization</li>
                <li>• Divest underperforming assets</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Optimize Financial Leverage:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 pl-4">
                <li>• Balance debt and equity financing</li>
                <li>• Consider strategic debt for growth</li>
                <li>• Maintain optimal capital structure</li>
                <li>• Monitor financial risk levels</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DuPontAnalysis;
