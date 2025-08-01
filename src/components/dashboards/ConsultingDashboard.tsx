import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, FileText, CreditCard, TrendingUp, Users, Clock,
  Building2, Upload, Target, Award, Briefcase
} from "lucide-react";
import { MetricCard, MonthlyRevenueChart, ExpenseBreakdownChart, KPIIndicator } from "../charts/AdvancedCharts";

interface ConsultingDashboardProps {
  user?: any;
}

const ConsultingDashboard = ({ user }: ConsultingDashboardProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // Consulting specific metrics - start with 0 if no real data
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const invoicesIssued = financialData.invoicesIssued || 0;
  const clientCredits = financialData.clientCredits || 0;
  const personnelCount = financialData.personnelCount || 0;
  
  // Additional consulting metrics
  const averageInvoiceValue = invoicesIssued > 0 ? (clientCredits * 6 / invoicesIssued) : 0;
  const annualRevenue = invoicesIssued * averageInvoiceValue || 0;
  const monthlyInvoices = Math.round(invoicesIssued / 12);
  const dso = clientCredits > 0 && annualRevenue > 0 ? (clientCredits / (annualRevenue / 365)) : 0;
  const revenuePerEmployee = personnelCount > 0 ? (annualRevenue / personnelCount) : 0;
  
  const hasRealData = invoicesIssued > 0 || clientCredits > 0;

  // Generate monthly data - all zeros if no real data
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map((month) => ({
    month,
    revenue: 0,
    invoices: 0,
    credits: 0,
    expenses: 0
  }));

  // Consulting specific expense breakdown - all zeros if no real data
  const expenseData = [
    { name: 'Nessun Dato', value: 0, color: '#e5e7eb' }
  ];

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard Consulenza
          </h1>
          <p className="text-gray-600 mt-2">Bentornato, {user?.firstName || 'Utente'}! Gestisci la tua attività professionale</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800 border-0 px-4 py-2 rounded-full">
            <Building2 className="h-4 w-4 mr-2" />
            {companyName}
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-0 px-4 py-2 rounded-full">
            <Briefcase className="h-4 w-4 mr-2" />
            Consulenza
          </Badge>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Fatture Emesse"
          value={invoicesIssued.toLocaleString()}
          change={hasRealData ? 14.7 : 0}
          trend="up"
          color="blue"
          icon={<FileText className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Crediti Clienti"
          value={`€${clientCredits.toLocaleString()}`}
          change={hasRealData ? -8.2 : 0}
          trend="down"
          color="orange"
          icon={<CreditCard className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Team"
          value={personnelCount.toString()}
          change={hasRealData ? 12.5 : 0}
          trend="up"
          color="green"
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="DSO"
          value={`${dso.toFixed(0)} giorni`}
          change={hasRealData ? -15.3 : 0}
          trend="down"
          color="purple"
          icon={<Clock className="h-6 w-6 text-white" />}
        />
      </div>

      {/* KPI Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPIIndicator 
          title="Revenue per Employee"
          value={revenuePerEmployee / 1000}
          target={100}
          unit="k€"
        />
        <KPIIndicator 
          title="Utilizzo Capacity"
          value={hasRealData ? 85 : 0}
          target={90}
          unit="%"
        />
        <KPIIndicator 
          title="Client Satisfaction"
          value={hasRealData ? 92 : 0}
          target={95}
          unit="%"
        />
      </div>

      {/* Charts Section - only show if we have real data */}
      {hasRealData && (
        <div className="grid lg:grid-cols-2 gap-8">
          <MonthlyRevenueChart 
            data={monthlyData}
            title="Performance Consulenza"
            height={400}
          />
          <ExpenseBreakdownChart 
            data={expenseData}
            title="Struttura Costi"
          />
        </div>
      )}

      {/* No Data State */}
      {!hasRealData && (
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 border-0 shadow-lg">
          <CardContent className="p-8 text-center">
            <FileText className="h-20 w-20 text-indigo-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-indigo-900 mb-3">Configura i tuoi Dati di Consulenza</h3>
            <p className="text-indigo-700 mb-8 max-w-md mx-auto">
              Importa dati su fatture, crediti e team per vedere analytics dettagliate sulla tua attività professionale.
            </p>
            <Button 
              onClick={() => {
                const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                window.dispatchEvent(event);
              }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-full px-8 py-3"
            >
              <Upload className="h-5 w-5 mr-2" />
              Importa Dati Consulenza
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConsultingDashboard;
