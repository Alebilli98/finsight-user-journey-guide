
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, DollarSign, Users, ShoppingCart, Target, Calendar,
  ArrowUpRight, ArrowDownRight, Eye, Download
} from "lucide-react";
import { MetricCard } from "@/components/charts/AdvancedCharts";
import RevenueCharts from "@/components/charts/RevenueCharts";

interface CommerceDashboardProps {
  user?: any;
}

const CommerceDashboard = ({ user }: CommerceDashboardProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};

  // Calculate key metrics with new cost structure
  const totalRevenue = financialData.annualRevenue || 195000;
  const operatingCosts = financialData.operatingCosts || 110000; // Costi operativi
  const financialCosts = financialData.financialCosts || 6000; // Costi finanziari (interessi)
  const grossMargin = totalRevenue - operatingCosts - financialCosts;
  const grossMarginPercent = totalRevenue > 0 ? (grossMargin / totalRevenue) * 100 : 0;

  // Additional metrics
  const totalCustomers = financialData.totalCustomers || 1250;
  const monthlyOrders = financialData.monthlyOrders || 245;
  const averageOrderValue = totalRevenue / 12 / monthlyOrders || 795;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Commerce Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Panoramica completa delle performance commerciali</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-0">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance Positiva
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Ricavi Totali"
          value={`€${totalRevenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          color="blue"
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title="Costi Operativi"
          value={`€${operatingCosts.toLocaleString()}`}
          change={-3.2}
          trend="down"
          color="orange"
          icon={<Target className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title="Costi Finanziari"
          value={`€${financialCosts.toLocaleString()}`}
          change={2.1}
          trend="up"
          color="red"
          icon={<TrendingUp className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title="Margine Lordo"
          value={`€${grossMargin.toLocaleString()}`}
          change={18.7}
          trend="up"
          color="green"
          icon={<ArrowUpRight className="h-6 w-6 text-white" />}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clienti Totali</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalCustomers.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  8.2% vs mese scorso
                </div>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ordini Mensili</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{monthlyOrders}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  5.7% vs mese scorso
                </div>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valore Medio Ordine</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">€{averageOrderValue.toFixed(0)}</p>
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  3.4% vs mese scorso
                </div>
              </div>
              <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Analisi Ricavi e Costi</span>
          </CardTitle>
          <CardDescription>
            Visualizzazione dettagliata dei ricavi, costi operativi e finanziari
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RevenueCharts financialData={financialData} />
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Performance Mensile</CardTitle>
            <CardDescription>Confronto con obiettivi mensili</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ricavi</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">€{(totalRevenue / 12).toLocaleString()}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    112% obiettivo
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Margine Lordo</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{grossMarginPercent.toFixed(1)}%</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Ottimo
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nuovi Clienti</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">38</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    +8.2%
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Prossimi Obiettivi</CardTitle>
            <CardDescription>Raccomandazioni per il prossimo mese</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm">Aumentare ricavi del 5%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Ridurre costi operativi del 2%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm">Acquisire 45 nuovi clienti</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-sm">Aumentare valore medio ordine</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommerceDashboard;
