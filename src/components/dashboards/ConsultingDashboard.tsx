
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, FileText, CreditCard, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Calendar, Building2, 
  Upload, FileSpreadsheet, Activity, Users, Clock
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

interface ConsultingDashboardProps {
  user?: any;
}

const ConsultingDashboard = ({ user }: ConsultingDashboardProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // Consulting specific metrics
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const invoicesIssued = financialData.invoicesIssued || Math.round((userData.monthlyIncome * 12) / 2500) || 0; // Average invoice 2500€
  const clientCredits = financialData.clientCredits || (userData.monthlyIncome * 2) || 0; // 2 months of receivables
  const personnelCount = financialData.personnelCount || Math.max(1, Math.round(invoicesIssued / 50)) || 1; // 1 person per 50 invoices/year
  
  // Additional consulting metrics
  const averageInvoiceValue = invoicesIssued > 0 ? (clientCredits * 6 / invoicesIssued) : 0; // Assuming 2 months DSO
  const annualRevenue = invoicesIssued * averageInvoiceValue || userData.monthlyIncome * 12 || 0;
  const monthlyInvoices = Math.round(invoicesIssued / 12);
  const dso = clientCredits > 0 && annualRevenue > 0 ? (clientCredits / (annualRevenue / 365)) : 30; // Days Sales Outstanding
  const revenuePerEmployee = personnelCount > 0 ? (annualRevenue / personnelCount) : 0;
  
  const hasRealData = invoicesIssued > 0 || clientCredits > 0;

  // Generate sample monthly data for charts
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'].map((month, index) => ({
    month,
    invoices: monthlyInvoices * (0.9 + (index * 0.02)),
    credits: (clientCredits / 6) * (0.85 + (index * 0.03)),
    revenue: (annualRevenue / 12) * (0.9 + (index * 0.02))
  }));

  // Personnel distribution for pie chart
  const personnelData = [
    { name: 'Senior Consultants', value: Math.round(personnelCount * 0.4), color: '#3b82f6' },
    { name: 'Junior Consultants', value: Math.round(personnelCount * 0.4), color: '#10b981' },
    { name: 'Support Staff', value: Math.round(personnelCount * 0.2), color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Consulenza - {user?.firstName || 'Utente'}
          </h1>
          <p className="text-gray-600">Gestisci la tua attività di consulenza con metriche professionali</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800">
            <Building2 className="h-3 w-3 mr-1" />
            {companyName}
          </Badge>
          <Badge className="bg-indigo-100 text-indigo-800">
            <Users className="h-3 w-3 mr-1" />
            Consulenza
          </Badge>
        </div>
      </div>

      {/* Key Metrics for Consulting */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fatture Emesse</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{invoicesIssued.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {monthlyInvoices} fatture/mese
            </p>
            {averageInvoiceValue > 0 && (
              <p className="text-xs text-gray-500">
                Valore medio: €{averageInvoiceValue.toFixed(0)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crediti verso Clienti</CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">€{clientCredits.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              DSO: {dso.toFixed(0)} giorni
            </p>
            {dso > 0 && (
              <Badge variant="outline" className={`text-xs mt-2 ${dso > 60 ? 'border-red-300 text-red-700' : dso > 30 ? 'border-yellow-300 text-yellow-700' : 'border-green-300 text-green-700'}`}>
                {dso > 60 ? 'Attenzione' : dso > 30 ? 'Nella norma' : 'Ottimo'}
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personale</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{personnelCount}</div>
            <p className="text-xs text-gray-500 mt-1">
              {personnelCount === 1 ? 'collaboratore' : 'collaboratori'}
            </p>
            {revenuePerEmployee > 0 && (
              <p className="text-xs text-gray-500">
                Produttività: €{revenuePerEmployee.toFixed(0)}/anno
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Consulting Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Performance Finanziaria</span>
            </CardTitle>
            <CardDescription>Metriche chiave della consulenza</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ricavi Annuali</span>
                <span className="font-bold text-green-600">€{annualRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Ricavi per Dipendente</span>
                <span className="font-bold text-blue-600">€{revenuePerEmployee.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Days Sales Outstanding</span>
                <Badge className={dso > 60 ? 'bg-red-100 text-red-800' : dso > 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                  {dso.toFixed(0)} giorni
                </Badge>
              </div>
              <Progress value={Math.min(100, Math.max(0, (120 - dso) / 120 * 100))} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <span>Distribuzione Team</span>
            </CardTitle>
            <CardDescription>Composizione del personale</CardDescription>
          </CardHeader>
          <CardContent>
            {personnelCount > 1 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={personnelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {personnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} persone`, '']} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Team di 1 persona</p>
                <p className="text-xs text-gray-400">Aggiungi più collaboratori per vedere la distribuzione</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts for Consulting */}
      {hasRealData && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Andamento Fatturazione</CardTitle>
              <CardDescription>Fatture emesse e crediti mensili</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'invoices' ? `${Number(value).toLocaleString()} fatture` : `€${Number(value).toLocaleString()}`,
                    name === 'invoices' ? 'Fatture' : name === 'credits' ? 'Crediti' : 'Ricavi'
                  ]} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="revenue"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="credits" 
                    stackId="2"
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.6}
                    name="credits"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trend Fatture</CardTitle>
              <CardDescription>Numero fatture emesse nel tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} fatture`, '']} />
                  <Bar dataKey="invoices" fill="#3b82f6" name="Fatture" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Insights for Consulting */}
      {hasRealData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span>Insight AI per Consulenza</span>
            </CardTitle>
            <CardDescription>Raccomandazioni basate sui tuoi dati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${dso <= 30 ? 'bg-green-50 border-green-200' : dso <= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                <h4 className="font-medium text-gray-900">Gestione Crediti</h4>
                <p className="text-sm text-gray-700 mt-1">
                  {dso <= 30 ? 'Eccellente gestione dei crediti! Tempi di incasso ottimali.' :
                   dso <= 60 ? 'Tempi di incasso nella norma, considera solleciti proattivi.' :
                   'Tempi di incasso elevati. Priorità al miglioramento della collection.'}
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${revenuePerEmployee > 100000 ? 'bg-green-50 border-green-200' : revenuePerEmployee > 75000 ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200'}`}>
                <h4 className="font-medium text-gray-900">Produttività Team</h4>
                <p className="text-sm text-gray-700 mt-1">
                  {revenuePerEmployee > 100000 ? 'Produttività eccellente del team!' :
                   revenuePerEmployee > 75000 ? 'Buona produttività, considera specializzazioni.' :
                   'Opportunità di miglioramento nella produttività del team.'}
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${averageInvoiceValue > 3000 ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                <h4 className="font-medium text-gray-900">Valore Progetti</h4>
                <p className="text-sm text-gray-700 mt-1">
                  {averageInvoiceValue > 3000 ? 'Ottimo valore medio dei progetti!' :
                   'Considera progetti di maggior valore per aumentare la redditività.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {!hasRealData && (
        <Card className="bg-indigo-50 border-indigo-200">
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Configura i tuoi Dati di Consulenza</h3>
            <p className="text-indigo-700 mb-6">
              Importa dati su fatture, crediti e team per vedere analytics dettagliate sulla tua attività di consulenza.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => {
                  const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                  window.dispatchEvent(event);
                }}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Importa Dati Consulenza
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConsultingDashboard;
