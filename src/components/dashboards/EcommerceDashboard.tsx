
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, ShoppingBag, Users, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Calendar, Building2, 
  Upload, FileSpreadsheet, Activity, Monitor
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";

interface EcommerceDashboardProps {
  user?: any;
}

const EcommerceDashboard = ({ user }: EcommerceDashboardProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // E-commerce specific metrics
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const annualRevenue = financialData.annualRevenue || financialData.totalRevenue || userData.monthlyIncome * 12 || 0;
  const ordersReceived = financialData.ordersReceived || Math.round(annualRevenue / 85) || 0; // Average order of 85€
  const activeCustomers = financialData.activeCustomers || Math.round(ordersReceived * 0.7) || 0; // Some customers make multiple orders
  
  // Additional e-commerce metrics
  const averageOrderValue = ordersReceived > 0 ? (annualRevenue / ordersReceived) : 0;
  const customerLifetimeValue = activeCustomers > 0 ? (annualRevenue / activeCustomers) : 0;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const monthlyOrders = Math.round(ordersReceived / 12);
  const conversionRate = financialData.conversionRate || 2.5; // Default 2.5%
  
  const hasRealData = annualRevenue > 0 || ordersReceived > 0;

  // Generate sample monthly data for charts
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'].map((month, index) => ({
    month,
    revenue: monthlyRevenue * (0.9 + (index * 0.02)),
    orders: monthlyOrders * (0.85 + (index * 0.03)),
    customers: Math.round(activeCustomers / 12) * (0.9 + (index * 0.02))
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard E-commerce - {user?.firstName || 'Utente'}
          </h1>
          <p className="text-gray-600">Monitora il tuo negozio online con metriche specifiche</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800">
            <Building2 className="h-3 w-3 mr-1" />
            {companyName}
          </Badge>
          <Badge className="bg-purple-100 text-purple-800">
            <Monitor className="h-3 w-3 mr-1" />
            E-commerce
          </Badge>
        </div>
      </div>

      {/* Key Metrics for E-commerce */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ricavi Annuali</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{annualRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              €{monthlyRevenue.toLocaleString()}/mese
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ordini Ricevuti</CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{ordersReceived.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {monthlyOrders} ordini/mese
            </p>
            {averageOrderValue > 0 && (
              <p className="text-xs text-gray-500">
                AOV: €{averageOrderValue.toFixed(0)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clienti Attivi</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{activeCustomers.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {Math.round(activeCustomers / 12)}/mese nuovi
            </p>
            {customerLifetimeValue > 0 && (
              <p className="text-xs text-gray-500">
                CLV: €{customerLifetimeValue.toFixed(0)}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* E-commerce Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Performance Vendite</span>
            </CardTitle>
            <CardDescription>Metriche chiave del tuo e-commerce</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Valore Ordine Medio (AOV)</span>
                <span className="font-bold text-green-600">€{averageOrderValue.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Tasso di Conversione</span>
                <Badge className={conversionRate > 3 ? 'bg-green-100 text-green-800' : conversionRate > 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                  {conversionRate.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={Math.min(100, conversionRate * 20)} className="h-2" />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Customer Lifetime Value</span>
                <span className="font-bold text-purple-600">€{customerLifetimeValue.toFixed(0)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Analisi Clienti</span>
            </CardTitle>
            <CardDescription>Insight sui tuoi clienti</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <h4 className="font-semibold text-blue-900 mb-2">Insight AI</h4>
              <p className="text-sm text-blue-700">
                {conversionRate > 3 
                  ? "Ottimo tasso di conversione! Il tuo sito converte bene." 
                  : conversionRate > 2 
                    ? "Tasso di conversione nella media, considera ottimizzazioni UX."
                    : "Tasso di conversione basso, rivedi il funnel di acquisto."}
              </p>
              <p className="text-sm text-blue-700">
                {averageOrderValue > 100 
                  ? "AOV elevato, ottima strategia di upselling." 
                  : "Considera strategie per aumentare il valore dell'ordine medio."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts for E-commerce */}
      {hasRealData && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Andamento E-commerce</CardTitle>
              <CardDescription>Ricavi e ordini mensili</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'orders' ? `${Number(value).toLocaleString()} ordini` : 
                    name === 'customers' ? `${Number(value).toLocaleString()} clienti` :
                    `€${Number(value).toLocaleString()}`,
                    name === 'revenue' ? 'Ricavi' : name === 'orders' ? 'Ordini' : 'Clienti'
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
                    dataKey="orders" 
                    stackId="2"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                    name="orders"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crescita Clienti</CardTitle>
              <CardDescription>Base clienti attivi nel tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} clienti`, '']} />
                  <Line 
                    type="monotone" 
                    dataKey="customers" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    name="Clienti Attivi"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Data State */}
      {!hasRealData && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-8 text-center">
            <Monitor className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-purple-900 mb-2">Configura i tuoi Dati E-commerce</h3>
            <p className="text-purple-700 mb-6">
              Connetti il tuo store online per vedere analytics dettagliate su ordini, clienti e performance.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => {
                  const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                  window.dispatchEvent(event);
                }}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Connetti Store Online
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EcommerceDashboard;
