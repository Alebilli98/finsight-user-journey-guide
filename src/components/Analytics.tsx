
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Target,
  Calendar, Clock, Users, DollarSign, Activity, Calculator,
  Percent, FileBarChart, Gauge
} from "lucide-react";
import { MonthlyRevenueChart, ExpenseBreakdownChart, KPIIndicator } from "./charts/AdvancedCharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnalyticsProps {
  user?: any;
}

const Analytics = ({ user }: AnalyticsProps) => {
  const { t } = useLanguage();
  const userData = user || {};
  const financialData = userData.financialData || {};
  const userIndustry = userData.industry || 'commerce';

  // Use real data if available, otherwise show zeros
  const annualRevenue = financialData.annualRevenue || 0;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const hasRealData = annualRevenue > 0;

  // Calculate comprehensive KPIs and ratios
  const calculateFinancialRatios = () => {
    const totalAssets = financialData.totalAssets || 0;
    const totalLiabilities = financialData.totalLiabilities || 0;
    const currentAssets = financialData.currentAssets || 0;
    const currentLiabilities = financialData.currentLiabilities || 0;
    const inventory = financialData.inventory || 0;
    const netIncome = financialData.netIncome || 0;
    const totalEquity = totalAssets - totalLiabilities;
    const grossProfit = financialData.grossProfit || 0;
    const costOfGoodsSold = financialData.costOfGoodsSold || 0;
    const operatingExpenses = financialData.operatingExpenses || 0;

    return {
      // Liquidity Ratios
      currentRatio: currentLiabilities > 0 ? (currentAssets / currentLiabilities) : 0,
      quickRatio: currentLiabilities > 0 ? ((currentAssets - inventory) / currentLiabilities) : 0,
      cashRatio: currentLiabilities > 0 ? (financialData.cash || 0) / currentLiabilities : 0,

      // Profitability Ratios
      grossMargin: annualRevenue > 0 ? (grossProfit / annualRevenue) * 100 : 0,
      netMargin: annualRevenue > 0 ? (netIncome / annualRevenue) * 100 : 0,
      operatingMargin: annualRevenue > 0 ? ((annualRevenue - costOfGoodsSold - operatingExpenses) / annualRevenue) * 100 : 0,
      roa: totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0,
      roe: totalEquity > 0 ? (netIncome / totalEquity) * 100 : 0,

      // Efficiency Ratios
      assetTurnover: totalAssets > 0 ? annualRevenue / totalAssets : 0,
      inventoryTurnover: inventory > 0 ? costOfGoodsSold / inventory : 0,
      receivablesTurnover: (financialData.accountsReceivable || 0) > 0 ? annualRevenue / financialData.accountsReceivable : 0,

      // Leverage Ratios
      debtToEquity: totalEquity > 0 ? totalLiabilities / totalEquity : 0,
      debtToAssets: totalAssets > 0 ? totalLiabilities / totalAssets : 0,
      equityRatio: totalAssets > 0 ? totalEquity / totalAssets : 0,

      // Industry Specific KPIs
      ...getIndustrySpecificKPIs()
    };
  };

  const getIndustrySpecificKPIs = () => {
    switch (userIndustry) {
      case 'consulting':
        return {
          utilizationRate: financialData.utilizationRate || 0,
          billableHours: financialData.billableHours || 0,
          averageHourlyRate: financialData.averageHourlyRate || 0,
          clientRetentionRate: financialData.clientRetentionRate || 0,
          projectMargin: financialData.projectMargin || 0
        };
      case 'ecommerce':
        return {
          conversionRate: financialData.conversionRate || 0,
          averageOrderValue: financialData.averageOrderValue || 0,
          customerAcquisitionCost: financialData.customerAcquisitionCost || 0,
          customerLifetimeValue: financialData.customerLifetimeValue || 0,
          cartAbandonmentRate: financialData.cartAbandonmentRate || 0
        };
      default: // commerce
        return {
          inventoryDays: financialData.inventoryDays || 0,
          grossProfitPerUnit: financialData.grossProfitPerUnit || 0,
          salesPerSquareFoot: financialData.salesPerSquareFoot || 0,
          customerFootfall: financialData.customerFootfall || 0,
          averageTransactionValue: financialData.averageTransactionValue || 0
        };
    }
  };

  const ratios = calculateFinancialRatios();

  const monthlyData = hasRealData ? 
    (financialData.monthlyData || []) : 
    Array(12).fill(0).map((_, index) => ({
      month: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'][index],
      revenue: 0,
      expenses: 0,
      profit: 0
    }));

  const expenseData = hasRealData ? 
    (financialData.expenseBreakdown || []) :
    [
      { name: 'Nessun Dato', value: 0, color: '#e5e7eb' }
    ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Analytics Avanzate
          </h1>
          <p className="text-gray-600 mt-2">Analisi dettagliate delle performance aziendali</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 px-4 py-2 rounded-full">
            <Activity className="h-4 w-4 mr-2" />
            Analytics
          </Badge>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="profitability" className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-4 bg-transparent h-12">
                <TabsTrigger value="profitability" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Redditività
                </TabsTrigger>
                <TabsTrigger value="liquidity" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Liquidità
                </TabsTrigger>
                <TabsTrigger value="efficiency" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Efficienza
                </TabsTrigger>
                <TabsTrigger value="industry" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Settore
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Profitability Tab */}
            <TabsContent value="profitability" className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPIIndicator 
                  title="Margine Lordo"
                  value={ratios.grossMargin}
                  target={60}
                  unit="%"
                />
                <KPIIndicator 
                  title="Margine Netto"
                  value={ratios.netMargin}
                  target={15}
                  unit="%"
                />
                <KPIIndicator 
                  title="Margine Operativo"
                  value={ratios.operatingMargin}
                  target={20}
                  unit="%"
                />
                <KPIIndicator 
                  title="ROA (Return on Assets)"
                  value={ratios.roa}
                  target={10}
                  unit="%"
                />
                <KPIIndicator 
                  title="ROE (Return on Equity)"
                  value={ratios.roe}
                  target={15}
                  unit="%"
                />
                <KPIIndicator 
                  title="EBITDA Margin"
                  value={hasRealData ? (financialData.ebitdaMargin || 0) : 0}
                  target={25}
                  unit="%"
                />
              </div>
            </TabsContent>

            {/* Liquidity Tab */}
            <TabsContent value="liquidity" className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPIIndicator 
                  title="Current Ratio"
                  value={ratios.currentRatio}
                  target={2}
                  unit=""
                />
                <KPIIndicator 
                  title="Quick Ratio"
                  value={ratios.quickRatio}
                  target={1}
                  unit=""
                />
                <KPIIndicator 
                  title="Cash Ratio"
                  value={ratios.cashRatio}
                  target={0.5}
                  unit=""
                />
                <KPIIndicator 
                  title="Working Capital Ratio"
                  value={hasRealData ? (financialData.workingCapitalRatio || 0) : 0}
                  target={20}
                  unit="%"
                />
                <KPIIndicator 
                  title="Days Sales Outstanding"
                  value={hasRealData ? (financialData.dso || 0) : 0}
                  target={30}
                  unit=" giorni"
                />
                <KPIIndicator 
                  title="Days Payable Outstanding"
                  value={hasRealData ? (financialData.dpo || 0) : 0}
                  target={45}
                  unit=" giorni"
                />
              </div>
            </TabsContent>

            {/* Efficiency Tab */}
            <TabsContent value="efficiency" className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPIIndicator 
                  title="Asset Turnover"
                  value={ratios.assetTurnover}
                  target={1.5}
                  unit=""
                />
                <KPIIndicator 
                  title="Inventory Turnover"
                  value={ratios.inventoryTurnover}
                  target={6}
                  unit=""
                />
                <KPIIndicator 
                  title="Receivables Turnover"
                  value={ratios.receivablesTurnover}
                  target={12}
                  unit=""
                />
                <KPIIndicator 
                  title="Debt to Equity"
                  value={ratios.debtToEquity}
                  target={0.5}
                  unit=""
                />
                <KPIIndicator 
                  title="Debt to Assets"
                  value={ratios.debtToAssets}
                  target={0.3}
                  unit=""
                />
                <KPIIndicator 
                  title="Equity Ratio"
                  value={ratios.equityRatio * 100}
                  target={60}
                  unit="%"
                />
              </div>
            </TabsContent>

            {/* Industry Specific Tab */}
            <TabsContent value="industry" className="p-6 space-y-6">
              {userIndustry === 'consulting' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <KPIIndicator 
                    title="Utilization Rate"
                    value={ratios.utilizationRate}
                    target={85}
                    unit="%"
                  />
                  <KPIIndicator 
                    title="Ore Fatturabili/Anno"
                    value={ratios.billableHours}
                    target={1800}
                    unit=""
                  />
                  <KPIIndicator 
                    title="Tariffa Oraria Media"
                    value={ratios.averageHourlyRate}
                    target={100}
                    unit="€"
                  />
                  <KPIIndicator 
                    title="Client Retention"
                    value={ratios.clientRetentionRate}
                    target={90}
                    unit="%"
                  />
                  <KPIIndicator 
                    title="Project Margin"
                    value={ratios.projectMargin}
                    target={40}
                    unit="%"
                  />
                </div>
              )}

              {userIndustry === 'ecommerce' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <KPIIndicator 
                    title="Conversion Rate"
                    value={ratios.conversionRate}
                    target={3}
                    unit="%"
                  />
                  <KPIIndicator 
                    title="Average Order Value"
                    value={ratios.averageOrderValue}
                    target={100}
                    unit="€"
                  />
                  <KPIIndicator 
                    title="Customer Acquisition Cost"
                    value={ratios.customerAcquisitionCost}
                    target={30}
                    unit="€"
                  />
                  <KPIIndicator 
                    title="Customer Lifetime Value"
                    value={ratios.customerLifetimeValue}
                    target={300}
                    unit="€"
                  />
                  <KPIIndicator 
                    title="Cart Abandonment Rate"
                    value={ratios.cartAbandonmentRate}
                    target={70}
                    unit="%"
                  />
                </div>
              )}

              {userIndustry === 'commerce' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <KPIIndicator 
                    title="Giorni di Inventario"
                    value={ratios.inventoryDays}
                    target={30}
                    unit=" giorni"
                  />
                  <KPIIndicator 
                    title="Profitto Lordo/Unità"
                    value={ratios.grossProfitPerUnit}
                    target={50}
                    unit="€"
                  />
                  <KPIIndicator 
                    title="Vendite/m²"
                    value={ratios.salesPerSquareFoot}
                    target={500}
                    unit="€"
                  />
                  <KPIIndicator 
                    title="Traffico Clienti"
                    value={ratios.customerFootfall}
                    target={1000}
                    unit="/mese"
                  />
                  <KPIIndicator 
                    title="Scontrino Medio"
                    value={ratios.averageTransactionValue}
                    target={75}
                    unit="€"
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Charts Section */}
      {hasRealData ? (
        <div className="grid lg:grid-cols-2 gap-8">
          <MonthlyRevenueChart 
            data={monthlyData}
            title="Performance Mensile"
            height={400}
          />
          <ExpenseBreakdownChart 
            data={expenseData}
            title="Analisi Spese"
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <Calculator className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">Nessun Dato Disponibile</h3>
          <p className="text-gray-400 mb-4">Importa i tuoi dati per vedere le analytics dettagliate</p>
          <Button 
            onClick={() => {
              const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
              window.dispatchEvent(event);
            }}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-full"
          >
            Importa Dati
          </Button>
        </div>
      )}
    </div>
  );
};

export default Analytics;
