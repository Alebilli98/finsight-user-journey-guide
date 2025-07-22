
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, ShoppingBag, Users, TrendingUp, Monitor,
  Building2, Upload, Target, Zap
} from "lucide-react";
import { MetricCard, MonthlyRevenueChart, ExpenseBreakdownChart, KPIIndicator } from "../charts/AdvancedCharts";

interface EcommerceDashboardProps {
  user?: any;
}

const EcommerceDashboard = ({ user }: EcommerceDashboardProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // E-commerce specific metrics
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const annualRevenue = financialData.annualRevenue || financialData.totalRevenue || userData.monthlyIncome * 12 || 180000;
  const ordersReceived = financialData.ordersReceived || Math.round(annualRevenue / 85) || 2118;
  const activeCustomers = financialData.activeCustomers || Math.round(ordersReceived * 0.7) || 1483;
  
  // Additional e-commerce metrics
  const averageOrderValue = ordersReceived > 0 ? (annualRevenue / ordersReceived) : 85;
  const customerLifetimeValue = activeCustomers > 0 ? (annualRevenue / activeCustomers) : 121;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const monthlyOrders = Math.round(ordersReceived / 12);
  const conversionRate = financialData.conversionRate || 3.2;
  
  const hasRealData = annualRevenue > 0 || ordersReceived > 0;

  // Generate sample monthly data for charts
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map((month, index) => {
    const baseRevenue = monthlyRevenue * (0.8 + Math.random() * 0.4);
    const baseOrders = monthlyOrders * (0.8 + Math.random() * 0.4);
    const baseCustomers = Math.round(activeCustomers / 12) * (0.9 + Math.random() * 0.2);
    return {
      month,
      revenue: Math.round(baseRevenue),
      orders: Math.round(baseOrders),
      customers: Math.round(baseCustomers),
      expenses: Math.round(baseRevenue * 0.6) // 60% expense ratio for e-commerce
    };
  });

  // E-commerce specific expense breakdown
  const expenseData = [
    { name: 'Costo Prodotti', value: Math.round(annualRevenue * 0.4), color: '#ef4444' },
    { name: 'Marketing Digital', value: Math.round(annualRevenue * 0.12), color: '#3b82f6' },
    { name: 'Logistica & Spedizioni', value: Math.round(annualRevenue * 0.08), color: '#10b981' },
    { name: 'Piattaforma E-commerce', value: Math.round(annualRevenue * 0.03), color: '#f59e0b' },
    { name: 'Customer Service', value: Math.round(annualRevenue * 0.05), color: '#8b5cf6' },
    { name: 'Altri Costi', value: Math.round(annualRevenue * 0.02), color: '#6b7280' }
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-purple-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Dashboard E-commerce
          </h1>
          <p className="text-gray-600 mt-2">Bentornato, {user?.firstName || 'Utente'}! Monitora il tuo store online</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-0 px-4 py-2 rounded-full">
            <Building2 className="h-4 w-4 mr-2" />
            {companyName}
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 px-4 py-2 rounded-full">
            <Monitor className="h-4 w-4 mr-2" />
            E-commerce
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Ricavi Annuali"
          value={`€${annualRevenue.toLocaleString()}`}
          change={15.2}
          trend="up"
          color="green"
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Ordini Ricevuti"
          value={ordersReceived.toLocaleString()}
          change={22.8}
          trend="up"
          color="blue"
          icon={<ShoppingBag className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Clienti Attivi"
          value={activeCustomers.toLocaleString()}
          change={18.5}
          trend="up"
          color="purple"
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="AOV"
          value={`€${averageOrderValue.toFixed(0)}`}
          change={5.3}
          trend="up"
          color="orange"
          icon={<Target className="h-6 w-6 text-white" />}
        />
      </div>

      {/* KPI Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIIndicator 
          title="Tasso di Conversione"
          value={conversionRate}
          target={5}
          unit="%"
        />
        <KPIIndicator 
          title="Customer Lifetime Value"
          value={customerLifetimeValue}
          target={200}
          unit="€"
        />
        <KPIIndicator 
          title="Ritorno Clienti"
          value={68}
          target={75}
          unit="%"
        />
      </div>

      {/* Charts Section */}
      {hasRealData && (
        <div className="grid lg:grid-cols-2 gap-8">
          <MonthlyRevenueChart 
            data={monthlyData}
            title="Performance E-commerce"
            height={400}
          />
          <ExpenseBreakdownChart 
            data={expenseData}
            title="Analisi Costi Online"
          />
        </div>
      )}

      {/* E-commerce Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Conversioni in Crescita</h3>
                <p className="text-sm text-blue-700">+{conversionRate}% tasso di conversione</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Base Clienti</h3>
                <p className="text-sm text-purple-700">CLV €{customerLifetimeValue.toFixed(0)} per cliente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-900">Revenue Growth</h3>
                <p className="text-sm text-green-700">+15% crescita anno su anno</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* No Data State */}
      {!hasRealData && (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <Monitor className="h-20 w-20 text-purple-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-purple-900 mb-3">Configura il tuo Store Online</h3>
            <p className="text-purple-700 mb-8 max-w-md mx-auto">
              Connetti il tuo e-commerce per vedere analytics dettagliate su ordini, clienti e performance.
            </p>
            <Button 
              onClick={() => {
                const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-full px-8 py-3"
            >
              <Upload className="h-5 w-5 mr-2" />
              Connetti Store Online
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EcommerceDashboard;
