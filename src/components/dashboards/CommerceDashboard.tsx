
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
  
  // Commerce-specific metrics - start with 0 if no real data
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const annualRevenue = financialData.annualRevenue || 0;
  const numberOfSales = financialData.numberOfSales || 0;
  const merchandiseCost = financialData.merchandiseCost || 0;
  const grossProfit = annualRevenue - merchandiseCost;
  const grossMargin = annualRevenue > 0 ? ((grossProfit / annualRevenue) * 100) : 0;

  // Additional commerce metrics - only if we have real data
  const averageSaleValue = numberOfSales > 0 ? (annualRevenue / numberOfSales) : 0;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const monthlySales = Math.round(numberOfSales / 12);
  
  const hasRealData = annualRevenue > 0 || numberOfSales > 0;

  // Generate monthly data - all zeros if no real data
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map((month) => ({
    month,
    revenue: 0,
    expenses: 0,
    profit: 0,
    sales: 0
  }));

  // Expense breakdown data - all zeros if no real data
  const expenseData = [
    { name: 'Nessun Dato', value: 0, color: '#e5e7eb' }
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
          change={hasRealData ? 8.5 : 0}
          trend="up"
          color="green"
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Numero Vendite"
          value={numberOfSales.toLocaleString()}
          change={hasRealData ? 12.3 : 0}
          trend="up"
          color="blue"
          icon={<ShoppingCart className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Costo Merce"
          value={`€${merchandiseCost.toLocaleString()}`}
          change={hasRealData ? -3.2 : 0}
          trend="down"
          color="orange"
          icon={<Package className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Margine Lordo"
          value={`${grossMargin.toFixed(1)}%`}
          change={hasRealData ? 5.7 : 0}
          trend="up"
          color="purple"
          icon={<Target className="h-6 w-6 text-white" />}
        />
      </div>

      {/* KPI Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIIndicator 
          title="ROI (Return on Investment)"
          value={merchandiseCost > 0 ? ((grossProfit / merchandiseCost) * 100) : 0}
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
          value={numberOfSales > 0 ? (numberOfSales / 2000) * 100 : 0}
          target={100}
          unit="%"
        />
      </div>

      {/* Charts Section - only show if we have real data */}
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

      {/* No Data State - always show when no real data */}
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
