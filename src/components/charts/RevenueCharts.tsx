
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, ComposedChart, Area, AreaChart
} from "recharts";
import { TrendingUp, Target, Info } from "lucide-react";

interface RevenueChartsProps {
  financialData?: any;
}

const RevenueCharts = ({ financialData }: RevenueChartsProps) => {
  // Mock data for revenue trends - replace with real data
  const monthlyRevenueData = [
    { month: 'Gen 24', revenue: 125000, operatingCosts: 85000, financialCosts: 5000 },
    { month: 'Feb 24', revenue: 132000, operatingCosts: 88000, financialCosts: 4800 },
    { month: 'Mar 24', revenue: 145000, operatingCosts: 92000, financialCosts: 5200 },
    { month: 'Apr 24', revenue: 138000, operatingCosts: 90000, financialCosts: 5100 },
    { month: 'Mag 24', revenue: 152000, operatingCosts: 95000, financialCosts: 5300 },
    { month: 'Giu 24', revenue: 148000, operatingCosts: 93000, financialCosts: 5000 },
    { month: 'Lug 24', revenue: 165000, operatingCosts: 98000, financialCosts: 5500 },
    { month: 'Ago 24', revenue: 158000, operatingCosts: 96000, financialCosts: 5200 },
    { month: 'Set 24', revenue: 172000, operatingCosts: 102000, financialCosts: 5600 },
    { month: 'Ott 24', revenue: 168000, operatingCosts: 100000, financialCosts: 5400 },
    { month: 'Nov 24', revenue: 180000, operatingCosts: 105000, financialCosts: 5800 },
    { month: 'Dic 24', revenue: 195000, operatingCosts: 110000, financialCosts: 6000 }
  ];

  // Gross margin composition data
  const grossMarginData = monthlyRevenueData.map(item => ({
    month: item.month,
    revenue: item.revenue,
    operatingCosts: item.operatingCosts,
    financialCosts: item.financialCosts,
    grossMargin: item.revenue - item.operatingCosts - item.financialCosts
  }));

  // Current month breakdown for donut chart
  const currentMonthBreakdown = [
    { name: 'Margine Lordo', value: 79000, color: '#10b981' },
    { name: 'Costi Operativi', value: 110000, color: '#f59e0b' },
    { name: 'Costi Finanziari', value: 6000, color: '#ef4444' }
  ];

  // Top products data
  const topProductsData = [
    { name: 'Prodotto A', value: 45000 },
    { name: 'Prodotto B', value: 38000 },
    { name: 'Prodotto C', value: 32000 },
    { name: 'Prodotto D', value: 28000 },
    { name: 'Prodotto E', value: 22000 }
  ];

  // Performance comparison data
  const performanceData = [
    { 
      period: 'Mese Corrente', 
      vendite: 245, 
      clientiAcquisiti: 38, 
      valoreMedioOrdine: 795 
    },
    { 
      period: 'Mese Precedente', 
      vendite: 228, 
      clientiAcquisiti: 35, 
      valoreMedioOrdine: 768 
    },
    { 
      period: 'Anno Precedente', 
      vendite: 198, 
      clientiAcquisiti: 29, 
      valoreMedioOrdine: 685 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Trend Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Andamento Ricavi Mensili</span>
              </CardTitle>
              <CardDescription>
                Trend dei ricavi e costi negli ultimi 12 mesi
              </CardDescription>
            </div>
            <Badge variant="secondary">Ultimi 12 mesi</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={grossMarginData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value, name) => [
                  `€${Number(value).toLocaleString()}`,
                  name === 'revenue' ? 'Ricavi' : 
                  name === 'operatingCosts' ? 'Costi Operativi' :
                  name === 'financialCosts' ? 'Costi Finanziari' : 'Margine Lordo'
                ]}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                fill="url(#revenueGradient)" 
                stroke="#3b82f6"
                fillOpacity={0.3}
                name="revenue"
              />
              <Line 
                type="monotone" 
                dataKey="operatingCosts" 
                stroke="#f59e0b" 
                strokeWidth={3}
                name="operatingCosts"
              />
              <Line 
                type="monotone" 
                dataKey="financialCosts" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="financialCosts"
              />
              <Line 
                type="monotone" 
                dataKey="grossMargin" 
                stroke="#10b981" 
                strokeWidth={3}
                name="grossMargin"
              />
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two-column layout for remaining charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gross Margin Composition */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <span>Componenti Margine Lordo</span>
            </CardTitle>
            <CardDescription>Composizione del margine lordo corrente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie
                    data={currentMonthBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {currentMonthBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {currentMonthBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <div>
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">€{item.value.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Comparison */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-purple-600" />
              <span>Confronto Performance Vendite</span>
            </CardTitle>
            <CardDescription>Comparazione metriche chiave nel tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="vendite" fill="#3b82f6" name="Vendite" />
                <Bar dataKey="clientiAcquisiti" fill="#10b981" name="Clienti Acquisiti" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-orange-600" />
            <span>Ricavi per Categoria Prodotto Top 5</span>
          </CardTitle>
          <CardDescription>Prodotti con maggiori ricavi nel periodo corrente</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, 'Ricavi']} />
              <Bar dataKey="value" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueCharts;
