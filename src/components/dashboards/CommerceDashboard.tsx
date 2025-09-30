
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, DollarSign, Users, ShoppingCart, Target, Calendar,
  ArrowUpRight, ArrowDownRight, Eye, Download
} from "lucide-react";
import { MetricCard } from "@/components/charts/AdvancedCharts";
import DashboardCharts from "@/components/charts/DashboardCharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommerceDashboardProps {
  user?: any;
}

const CommerceDashboard = ({ user }: CommerceDashboardProps) => {
  const { t } = useLanguage();
  const userData = user || {};
  const financialData = userData.financialData || {};

  // Calculate key metrics with new cost structure
  const totalRevenue = financialData.annualRevenue || 195000;
  const operatingCosts = financialData.operatingCosts || 110000;
  const financialCosts = financialData.financialCosts || 6000;
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
            {t('commerce.dashboard.title') || 'Commerce Dashboard'}
          </h1>
          <p className="text-gray-600 mt-2">{t('commerce.dashboard.subtitle') || 'Complete overview of commercial performance'}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-0">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('commerce.positive.performance') || 'Positive Performance'}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            {t('common.export') || 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Key Metrics - 6 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title={t('commerce.total.revenue') || 'Total Revenue'}
          value={`€${totalRevenue.toLocaleString()}`}
          change={12.5}
          trend="up"
          color="blue"
          icon={<DollarSign className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title={t('commerce.operating.costs') || 'Operating Costs'}
          value={`€${operatingCosts.toLocaleString()}`}
          change={-3.2}
          trend="down"
          color="orange"
          icon={<Target className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title={t('commerce.financial.costs') || 'Financial Costs'}
          value={`€${financialCosts.toLocaleString()}`}
          change={2.1}
          trend="up"
          color="red"
          icon={<TrendingUp className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title={t('commerce.gross.margin') || 'Gross Margin'}
          value={`€${grossMargin.toLocaleString()}`}
          change={18.7}
          trend="up"
          color="green"
          icon={<ArrowUpRight className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title={t('commerce.total.customers') || 'Total Customers'}
          value={totalCustomers.toLocaleString()}
          change={8.2}
          trend="up"
          color="purple"
          icon={<Users className="h-6 w-6 text-white" />}
        />
        <MetricCard
          title={t('commerce.average.order.value') || 'Average Order Value'}
          value={`€${averageOrderValue.toFixed(0)}`}
          change={3.4}
          trend="up"
          color="cyan"
          icon={<ShoppingCart className="h-6 w-6 text-white" />}
        />
      </div>


      {/* Dashboard Charts Section */}
      <DashboardCharts financialData={financialData} />

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">{t('commerce.monthly.performance') || 'Monthly Performance'}</CardTitle>
            <CardDescription>{t('commerce.monthly.goals') || 'Comparison with monthly goals'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('dashboard.revenue') || 'Revenue'}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">€{(totalRevenue / 12).toLocaleString()}</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    112% {t('commerce.target') || 'target'}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('commerce.gross.margin') || 'Gross Margin'}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{grossMarginPercent.toFixed(1)}%</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {t('commerce.excellent') || 'Excellent'}
                  </Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('commerce.new.customers') || 'New Customers'}</span>
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
            <CardTitle className="text-lg">{t('commerce.next.goals') || 'Next Goals'}</CardTitle>
            <CardDescription>{t('commerce.recommendations') || 'Recommendations for next month'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm">{t('commerce.increase.revenue') || 'Increase revenue by 5%'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">{t('commerce.reduce.costs') || 'Reduce operating costs by 2%'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                <span className="text-sm">{t('commerce.acquire.customers') || 'Acquire 45 new customers'}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-sm">{t('commerce.increase.aov') || 'Increase average order value'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommerceDashboard;
