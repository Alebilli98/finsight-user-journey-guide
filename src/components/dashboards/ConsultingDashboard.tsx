
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
  
  // Consulting specific metrics
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const invoicesIssued = financialData.invoicesIssued || Math.round((userData.monthlyIncome * 12) / 2500) || 120;
  const clientCredits = financialData.clientCredits || (userData.monthlyIncome * 2) || 50000;
  const personnelCount = financialData.personnelCount || Math.max(1, Math.round(invoicesIssued / 50)) || 8;
  
  // Additional consulting metrics
  const averageInvoiceValue = invoicesIssued > 0 ? (clientCredits * 6 / invoicesIssued) : 2500;
  const annualRevenue = invoicesIssued * averageInvoiceValue || userData.monthlyIncome * 12 || 300000;
  const monthlyInvoices = Math.round(invoicesIssued / 12);
  const dso = clientCredits > 0 && annualRevenue > 0 ? (clientCredits / (annualRevenue / 365)) : 45;
  const revenuePerEmployee = personnelCount > 0 ? (annualRevenue / personnelCount) : 37500;
  
  const hasRealData = invoicesIssued > 0 || clientCredits > 0;

  // Generate sample monthly data for charts
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'].map((month, index) => {
    const baseRevenue = (annualRevenue / 12) * (0.8 + Math.random() * 0.4);
    const baseInvoices = monthlyInvoices * (0.8 + Math.random() * 0.4);
    const baseCredits = (clientCredits / 6) * (0.85 + Math.random() * 0.3);
    return {
      month,
      revenue: Math.round(baseRevenue),
      invoices: Math.round(baseInvoices),
      credits: Math.round(baseCredits),
      expenses: Math.round(baseRevenue * 0.65) // 65% expense ratio for consulting
    };
  });

  // Consulting specific expense breakdown
  const expenseData = [
    { name: 'Stipendi & Benefit', value: Math.round(annualRevenue * 0.45), color: '#3b82f6' },
    { name: 'Spese Generali', value: Math.round(annualRevenue * 0.08), color: '#10b981' },
    { name: 'Marketing & BD', value: Math.round(annualRevenue * 0.06), color: '#f59e0b' },
    { name: 'Formazione', value: Math.round(annualRevenue * 0.04), color: '#8b5cf6' },
    { name: 'Tecnologia', value: Math.round(annualRevenue * 0.03), color: '#ef4444' },
    { name: 'Altri Costi', value: Math.round(annualRevenue * 0.04), color: '#6b7280' }
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
          change={14.7}
          trend="up"
          color="blue"
          icon={<FileText className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Crediti Clienti"
          value={`€${clientCredits.toLocaleString()}`}
          change={-8.2}
          trend="down"
          color="orange"
          icon={<CreditCard className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="Team"
          value={personnelCount.toString()}
          change={12.5}
          trend="up"
          color="green"
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <MetricCard 
          title="DSO"
          value={`${dso.toFixed(0)} giorni`}
          change={-15.3}
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
          value={85}
          target={90}
          unit="%"
        />
        <KPIIndicator 
          title="Client Satisfaction"
          value={92}
          target={95}
          unit="%"
        />
      </div>

      {/* Charts Section */}
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

      {/* Consulting Insights */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Progetti Completati</h3>
                <p className="text-sm text-blue-700">92% consegnati in tempo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-500 rounded-full">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900">Efficienza Team</h3>
                <p className="text-sm text-indigo-700">€{(revenuePerEmployee/1000).toFixed(0)}k revenue per persona</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Growth Rate</h3>
                <p className="text-sm text-purple-700">+18% crescita annuale</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights for Consulting */}
      {hasRealData && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-indigo-600" />
              <span>Insight AI per Consulenza</span>
            </CardTitle>
            <CardDescription>Raccomandazioni personalizzate per la tua attività</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-xl border ${dso <= 30 ? 'bg-green-50 border-green-200' : dso <= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                <h4 className="font-semibold text-gray-900 mb-2">Gestione Crediti</h4>
                <p className="text-sm text-gray-700">
                  {dso <= 30 ? 'Eccellente gestione dei crediti! Tempi di incasso ottimali.' :
                   dso <= 60 ? 'Tempi di incasso nella norma, considera solleciti proattivi.' :
                   'Priorità al miglioramento della collection. DSO troppo elevato.'}
                </p>
              </div>

              <div className={`p-6 rounded-xl border ${revenuePerEmployee > 75000 ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                <h4 className="font-semibold text-gray-900 mb-2">Produttività Team</h4>
                <p className="text-sm text-gray-700">
                  {revenuePerEmployee > 75000 ? 'Team altamente produttivo! Ottima efficienza operativa.' :
                   'Opportunità di miglioramento. Considera formazione e specializzazioni.'}
                </p>
              </div>

              <div className={`p-6 rounded-xl border ${averageInvoiceValue > 3000 ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                <h4 className="font-semibold text-gray-900 mb-2">Valore Progetti</h4>
                <p className="text-sm text-gray-700">
                  {averageInvoiceValue > 3000 ? 'Ottimo valore medio dei progetti! Clienti enterprise.' :
                   'Focus su progetti di maggior valore. Considera servizi premium.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
