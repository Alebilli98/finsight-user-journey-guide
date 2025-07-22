
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, PieChart, TrendingUp, TrendingDown, Target,
  Calendar, Clock, Users, DollarSign, Activity
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

  // Generate analytics data based on industry
  const getIndustryMetrics = () => {
    switch (userIndustry) {
      case 'consulting':
        return {
          primaryMetric: { title: "Fatture Emesse", value: financialData.invoicesIssued || 0, icon: DollarSign },
          secondaryMetric: { title: "Crediti vs Clienti", value: financialData.clientCredits || 0, icon: Users },
          tertiaryMetric: { title: "Ore Fatturabili", value: financialData.billableHours || 0, icon: Clock }
        };
      case 'ecommerce':
        return {
          primaryMetric: { title: "Ordini Ricevuti", value: financialData.ordersReceived || 0, icon: BarChart3 },
          secondaryMetric: { title: "Clienti Attivi", value: financialData.activeCustomers || 0, icon: Users },
          tertiaryMetric: { title: "Tasso Conversione", value: financialData.conversionRate || 0, icon: Target }
        };
      default: // commerce
        return {
          primaryMetric: { title: "Numero Vendite", value: financialData.numberOfSales || 0, icon: BarChart3 },
          secondaryMetric: { title: "Costo Merce", value: financialData.merchandiseCost || 0, icon: PieChart },
          tertiaryMetric: { title: "Margine Lordo", value: financialData.grossMargin || 0, icon: Target }
        };
    }
  };

  const metrics = getIndustryMetrics();

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

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">{metrics.primaryMetric.title}</p>
                <p className="text-2xl font-bold text-blue-900">
                  {typeof metrics.primaryMetric.value === 'number' ? 
                    (metrics.primaryMetric.title.includes('€') ? 
                      `€${metrics.primaryMetric.value.toLocaleString()}` : 
                      metrics.primaryMetric.value.toLocaleString()) : 
                    metrics.primaryMetric.value}
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-full">
                <metrics.primaryMetric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">{metrics.secondaryMetric.title}</p>
                <p className="text-2xl font-bold text-green-900">
                  {typeof metrics.secondaryMetric.value === 'number' ? 
                    (metrics.secondaryMetric.title.includes('€') ? 
                      `€${metrics.secondaryMetric.value.toLocaleString()}` : 
                      metrics.secondaryMetric.value.toLocaleString()) : 
                    metrics.secondaryMetric.value}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-full">
                <metrics.secondaryMetric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">{metrics.tertiaryMetric.title}</p>
                <p className="text-2xl font-bold text-purple-900">
                  {typeof metrics.tertiaryMetric.value === 'number' ? 
                    (metrics.tertiaryMetric.title.includes('%') ? 
                      `${metrics.tertiaryMetric.value}%` :
                      metrics.tertiaryMetric.title.includes('€') ? 
                        `€${metrics.tertiaryMetric.value.toLocaleString()}` : 
                        metrics.tertiaryMetric.value.toLocaleString()) : 
                    metrics.tertiaryMetric.value}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-full">
                <metrics.tertiaryMetric.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <Tabs defaultValue="performance" className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-12">
                <TabsTrigger value="performance" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Performance
                </TabsTrigger>
                <TabsTrigger value="trends" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Trends
                </TabsTrigger>
                <TabsTrigger value="forecasting" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Previsioni
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="performance" className="p-6 space-y-6">
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
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-500 mb-2">Nessun Dato Disponibile</h3>
                  <p className="text-gray-400 mb-4">Importa i tuoi dati per vedere le analytics</p>
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
            </TabsContent>

            <TabsContent value="trends" className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <KPIIndicator 
                  title="Crescita Ricavi"
                  value={hasRealData ? (financialData.revenueGrowth || 0) : 0}
                  target={15}
                  unit="%"
                />
                <KPIIndicator 
                  title="Efficienza Operativa"
                  value={hasRealData ? (financialData.operationalEfficiency || 0) : 0}
                  target={85}
                  unit="%"
                />
                <KPIIndicator 
                  title="ROI"
                  value={hasRealData ? (financialData.roi || 0) : 0}
                  target={20}
                  unit="%"
                />
              </div>
            </TabsContent>

            <TabsContent value="forecasting" className="p-6">
              <div className="text-center py-12">
                <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Previsioni Avanzate</h3>
                <p className="text-gray-600 mb-4">Modelli predittivi basati sui tuoi dati storici</p>
                <Badge className="bg-blue-100 text-blue-800">In Sviluppo</Badge>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
