
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, ShoppingCart, Package, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Calendar, Building2, 
  Upload, FileSpreadsheet, Activity, Info
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";

interface CommerceDashboardProps {
  user?: any;
}

const CommerceDashboard = ({ user }: CommerceDashboardProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // Commerce-specific metrics
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const annualRevenue = financialData.annualRevenue || financialData.totalRevenue || userData.monthlyIncome * 12 || 0;
  const numberOfSales = financialData.numberOfSales || Math.round(annualRevenue / 150) || 0; // Average sale of 150€
  const merchandiseCost = financialData.merchandiseCost || (annualRevenue * 0.45) || 0;
  const grossProfit = annualRevenue - merchandiseCost;
  const grossMargin = annualRevenue > 0 ? ((grossProfit / annualRevenue) * 100) : 0;

  // Additional commerce metrics
  const averageSaleValue = numberOfSales > 0 ? (annualRevenue / numberOfSales) : 0;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const monthlySales = Math.round(numberOfSales / 12);
  
  const hasRealData = annualRevenue > 0 || numberOfSales > 0;

  // Generate sample monthly data for charts
  const monthlyData = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'].map((month, index) => ({
    month,
    revenue: monthlyRevenue * (0.9 + (index * 0.02)),
    sales: monthlySales * (0.85 + (index * 0.03)),
    costs: (merchandiseCost / 12) * (0.95 + (index * 0.01))
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Commercio - {user?.firstName || 'Utente'}
          </h1>
          <p className="text-gray-600">Gestisci la tua attività commerciale con metriche specifiche</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-blue-100 text-blue-800">
            <Building2 className="h-3 w-3 mr-1" />
            {companyName}
          </Badge>
          <Badge className="bg-green-100 text-green-800">
            <ShoppingCart className="h-3 w-3 mr-1" />
            Commercio
          </Badge>
        </div>
      </div>

      {/* Key Metrics for Commerce */}
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
            <CardTitle className="text-sm font-medium">Numero di Vendite</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{numberOfSales.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              {monthlySales} vendite/mese
            </p>
            {averageSaleValue > 0 && (
              <p className="text-xs text-gray-500">
                Valore medio: €{averageSaleValue.toFixed(0)}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Costo Acquisto Merce</CardTitle>
            <Package className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">€{merchandiseCost.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">
              €{Math.round(merchandiseCost / 12).toLocaleString()}/mese
            </p>
            {annualRevenue > 0 && (
              <Badge variant="outline" className="text-xs mt-2">
                {((merchandiseCost / annualRevenue) * 100).toFixed(1)}% dei ricavi
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profitability Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>Analisi Redditività</span>
          </CardTitle>
          <CardDescription>Margine lordo e profitto sul venduto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Profitto Lordo</span>
                <span className="font-bold text-green-600">€{grossProfit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Margine Lordo</span>
                <Badge className={grossMargin > 30 ? 'bg-green-100 text-green-800' : grossMargin > 15 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                  {grossMargin.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={Math.min(100, Math.max(0, grossMargin))} className="h-2" />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Insight AI</h4>
              <p className="text-sm text-blue-700">
                {grossMargin > 30 
                  ? "Eccellente margine lordo! La tua gestione dei costi è ottimale." 
                  : grossMargin > 15 
                    ? "Margine buono, considera ottimizzazioni sui costi di acquisto."
                    : "Margine basso, rivedi la strategia di pricing e fornitori."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts for Commerce */}
      {hasRealData && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Andamento Vendite</CardTitle>
              <CardDescription>Ricavi e numero vendite mensili</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [
                    name === 'sales' ? `${Number(value).toLocaleString()} vendite` : `€${Number(value).toLocaleString()}`,
                    name === 'revenue' ? 'Ricavi' : name === 'sales' ? 'Vendite' : 'Costi'
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
                    dataKey="costs" 
                    stackId="2"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                    name="costs"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Vendite</CardTitle>
              <CardDescription>Numero vendite per mese</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} vendite`, '']} />
                  <Bar dataKey="sales" fill="#3b82f6" name="Vendite" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Data State */}
      {!hasRealData && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <FileSpreadsheet className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Configura i tuoi Dati Commerciali</h3>
            <p className="text-blue-700 mb-6">
              Importa i dati delle tue vendite e costi per vedere analisi dettagliate specifiche per il commercio.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => {
                  const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                  window.dispatchEvent(event);
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Importa Dati Vendite
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommerceDashboard;
