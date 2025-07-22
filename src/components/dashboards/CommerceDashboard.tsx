
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, ShoppingCart, Package, TrendingUp, TrendingDown,
  Building2, Upload, FileSpreadsheet, Users, Target
} from "lucide-react";
import { MetricCard, MonthlyRevenueChart, ExpenseBreakdownChart, KPIIndicator } from "../charts/AdvancedCharts";

interface CommerceDashboardProps {
  user?: any;
}

const CommerceDashboard = ({ user }: CommerceDashboardProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // Commerce-specific metrics
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const annualRevenue = financialData.annualRevenue || financialData.totalRevenue || userData.monthlyIncome * 12 || 250000;
  const numberOfSales = financialData.numberOfSales || Math.round(annualRevenue / 150) || 1667;
  const merchandiseCost = financialData.merchandiseCost || (annualRevenue * 0.45) || 112500;
  const grossProfit = annualRevenue - merchandiseCost;
  const grossMargin = annualRevenue > 0 ? ((grossProfit / annualRevenue) * 100) : 55;

  // Additional commerce metrics
  const averageSaleValue = numberOfSales > 0 ? (annualRevenue / numberOfSales) : 150;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const monthlySales = Math.round(numberOfSales / 12);
  
  const hasRealData = annualRevenue > 0 || numberOfSales > 0;

  // Generate sample monthly data for charts with realistic variations
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map((month, index) => {
    const baseRevenue = monthlyRevenue * (0.8 + Math.random() * 0.4); // ±20% variation
    const baseCosts = (merchandiseCost / 12) * (0.9 + Math.random() * 0.2); // ±10% variation
    return {
      month,
      revenue: Math.round(baseRevenue),
      expenses: Math.round(baseCosts),
      profit: Math.round(baseRevenue - baseCosts),
      sales: Math.round(monthlySales * (0.8 + Math.random() * 0.4))
    };
  });

  // Expense breakdown data
  const expenseData = [
    { name: 'Costo Merci', value: merchandiseCost, color: '#ef4444' },
    { name: 'Affitto', value: Math.round(annualRevenue * 0.08), color: '#3b82f6' },
    { name: 'Stipendi', value: Math.round(annualRevenue * 0.15), color: '#10b981' },
    { name: 'Marketing', value: Math.round(annualRevenue * 0.05), color: '#f59e0b' },
    { name: 'Utilities', value: Math.round(annualRevenue * 0.03), color: '#8b5cf6' },
    { name: 'Altri Costi', value: Math.round(annualRevenue * 0.04), color: '#6b7280' }
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Dashboard Commercio
          </h1>
          <p className="text-gray-600 mt-2">Bentornato, {user?.firstName || 'Utente'}! Ecco le tue metriche aziendali</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 px-4 py-2 rounded-full">
            <Building2 className="h-4 w-4 mr-2" />
            {companyName}
          </Badge>
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-0 px-4 py-2 rounded-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Commercio
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Ricavi Annuali"
          value={`€${annualRevenue.toLocaleString()}`}
          change={8.5}
          trend="up"
          color="green"
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Numero Vendite"
          value={numberOfSales.toLocaleString()}
          change={12.3}
          trend="up"
          color="blue"
          icon={<ShoppingCart className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Costo Merce"
          value={`€${merchandiseCost.toLocaleString()}`}
          change={-3.2}
          trend="down"
          color="orange"
          icon={<Package className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Margine Lordo"
          value={`${grossMargin.toFixed(1)}%`}
          change={5.7}
          trend="up"
          color="purple"
          icon={<Target className="h-6 w-6 text-white" />}
        />
      </div>

      {/* KPI Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIIndicator 
          title="ROI (Return on Investment)"
          value={((grossProfit / merchandiseCost) * 100)}
          target={120}
          unit="%"
        />
        <KPIIndicator 
          title="Margine Lordo"
          value={grossMargin}
          target={60}
          unit="%"
        />
        <KPIIndicator 
          title="Efficienza Vendite"
          value={(numberOfSales / 2000) * 100}
          target={100}
          unit="%"
        />
      </div>

      {/* Charts Section */}
      {hasRealData && (
        <div className="grid lg:grid-cols-2 gap-8">
          <MonthlyRevenueChart 
            data={monthlyData}
            title="Performance Finanziaria"
            height={400}
          />
          <ExpenseBreakdownChart 
            data={expenseData}
            title="Analisi Costi"
          />
        </div>
      )}

      {/* Additional Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Vendite in Crescita</h3>
                <p className="text-sm text-green-700">+15% rispetto al trimestre scorso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Clienti Fedeli</h3>
                <p className="text-sm text-blue-700">68% clienti che ritornano</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Obiettivo Annuale</h3>
                <p className="text-sm text-purple-700">83% dell'obiettivo raggiunto</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* No Data State */}
      {!hasRealData && (
        <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200 border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <FileSpreadsheet className="h-20 w-20 text-blue-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-blue-900 mb-3">Configura i tuoi Dati Commerciali</h3>
            <p className="text-blue-700 mb-8 max-w-md mx-auto">
              Importa i dati delle tue vendite e costi per vedere analisi dettagliate specifiche per il commercio.
            </p>
            <Button 
              onClick={() => {
                const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-full px-8 py-3"
            >
              <Upload className="h-5 w-5 mr-2" />
              Importa Dati Vendite
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommerceDashboard;
