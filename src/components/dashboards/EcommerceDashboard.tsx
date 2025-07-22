
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
  
  // E-commerce specific metrics - start with 0 if no real data
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const annualRevenue = financialData.annualRevenue || 0;
  const ordersReceived = financialData.ordersReceived || 0;
  const activeCustomers = financialData.activeCustomers || 0;
  
  // Additional e-commerce metrics
  const averageOrderValue = ordersReceived > 0 ? (annualRevenue / ordersReceived) : 0;
  const customerLifetimeValue = activeCustomers > 0 ? (annualRevenue / activeCustomers) : 0;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const monthlyOrders = Math.round(ordersReceived / 12);
  const conversionRate = financialData.conversionRate || 0;
  
  const hasRealData = annualRevenue > 0 || ordersReceived > 0;

  // Generate monthly data - all zeros if no real data
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map((month) => ({
    month,
    revenue: 0,
    orders: 0,
    customers: 0,
    expenses: 0
  }));

  // E-commerce specific expense breakdown - all zeros if no real data
  const expenseData = [
    { name: 'Nessun Dato', value: 0, color: '#e5e7eb' }
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
          change={hasRealData ? 15.2 : 0}
          trend="up"
          color="green"
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Ordini Ricevuti"
          value={ordersReceived.toLocaleString()}
          change={hasRealData ? 22.8 : 0}
          trend="up"
          color="blue"
          icon={<ShoppingBag className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Clienti Attivi"
          value={activeCustomers.toLocaleString()}
          change={hasRealData ? 18.5 : 0}
          trend="up"
          color="purple"
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="AOV"
          value={`€${averageOrderValue.toFixed(0)}`}
          change={hasRealData ? 5.3 : 0}
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
          value={hasRealData ? 68 : 0}
          target={75}
          unit="%"
        />
      </div>

      {/* Charts Section - only show if we have real data */}
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
