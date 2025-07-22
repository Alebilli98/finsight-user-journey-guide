
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, FileText, Calendar, Clock, CheckCircle,
  BarChart3, PieChart, TrendingUp, TrendingDown, Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReportsProps {
  user?: any;
}

const Reports = ({ user }: ReportsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const { toast } = useToast();
  const { t } = useLanguage();
  const userData = user || {};
  const userIndustry = userData.industry || 'commerce';

  const getIndustryReports = () => {
    switch (userIndustry) {
      case 'consulting':
        return [
          {
            id: "invoicing",
            title: "Report Fatturazione",
            description: "Analisi fatture emesse e crediti",
            icon: TrendingUp,
            formats: ["PDF", "Excel", "CSV"],
            lastGenerated: "2 ore fa",
          },
          {
            id: "client-profitability",
            title: "Profittabilità Clienti",
            description: "ROI per cliente e progetto",
            icon: Target,
            formats: ["PDF", "Excel"],
            lastGenerated: "1 giorno fa",
          },
          {
            id: "time-tracking",
            title: "Report Ore Lavorate",
            description: "Analisi tempo e produttività",
            icon: Clock,
            formats: ["PDF", "Excel"],
            lastGenerated: "3 ore fa",
          },
        ];
      case 'ecommerce':
        return [
          {
            id: "sales-performance",
            title: "Performance Vendite Online",
            description: "Analisi ordini e conversioni",
            icon: TrendingUp,
            formats: ["PDF", "Excel", "CSV"],
            lastGenerated: "1 ora fa",
          },
          {
            id: "customer-analytics",
            title: "Analisi Clienti E-commerce",
            description: "CLV, retention e segmentazione",
            icon: Target,
            formats: ["PDF", "Excel"],
            lastGenerated: "2 ore fa",
          },
          {
            id: "inventory-report",
            title: "Report Inventario",
            description: "Stock, rotazione e previsioni",
            icon: BarChart3,
            formats: ["PDF", "Excel"],
            lastGenerated: "4 ore fa",
          },
        ];
      default: // commerce
        return [
          {
            id: "pnl",
            title: "Conto Economico",
            description: "Rendiconto completo dei ricavi",
            icon: TrendingUp,
            formats: ["PDF", "Excel", "CSV"],
            lastGenerated: "2 ore fa",
          },
          {
            id: "sales-analysis",
            title: "Analisi Vendite",
            description: "Performance vendite e margini",
            icon: BarChart3,
            formats: ["PDF", "Excel"],
            lastGenerated: "2 ore fa",
          },
          {
            id: "inventory-costs",
            title: "Costi Inventario",
            description: "Analisi costi merce e rotazione",
            icon: PieChart,
            formats: ["PDF", "Excel"],
            lastGenerated: "1 giorno fa",
          },
        ];
    }
  };

  const reportTypes = getIndustryReports();

  const quickReports = [
    { title: "Riepilogo Giornaliero", period: "Oggi", accounts: "Tutti" },
    { title: "Performance Settimanale", period: "Questa Settimana", accounts: "Principali" },
    { title: "Report Mensile", period: "Questo Mese", accounts: "Tutti" },
    { title: "Analisi Trimestrale", period: "Q4 2024", accounts: "Tutti" },
  ];

  const marketReports = [
    {
      id: "tech-sector",
      title: "Andamento Settore Tecnologico",
      description: "Analisi trend e performance del settore IT",
      date: "15 Gen 2024",
      trend: "up",
      change: "+12.3%",
      insights: ["Crescita del cloud computing", "Investimenti in AI", "Mercato cybersecurity in espansione"]
    },
    {
      id: "manufacturing",
      title: "Report Manifatturiero",
      description: "Outlook produzione industriale italiana",
      date: "10 Gen 2024",
      trend: "down",
      change: "-2.1%",
      insights: ["Pressioni sui costi energetici", "Rallentamento ordini export", "Investimenti in automazione"]
    },
    {
      id: "retail-sector",
      title: "Settore Retail & E-commerce",
      description: "Trend consumi e vendite al dettaglio",
      date: "12 Gen 2024",
      trend: "up",
      change: "+8.7%",
      insights: ["Crescita e-commerce", "Omnicanalità", "Sostenibilità prodotti"]
    },
    {
      id: "financial-services",
      title: "Servizi Finanziari",
      description: "Analisi banche e fintech italiane",
      date: "8 Gen 2024",
      trend: "up",
      change: "+5.4%",
      insights: ["Digitalizzazione bancaria", "Crescita pagamenti digitali", "Normative ESG"]
    }
  ];

  const handleDownloadReport = (reportType: string, format: string) => {
    toast({
      title: "Generazione Report Avviata",
      description: `Generando il report ${reportType} in formato ${format}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Report Pronto",
        description: `Il tuo report ${reportType} è stato scaricato con successo.`,
      });
    }, 2000);
  };

  const handleDownloadMarketReport = (reportTitle: string) => {
    toast({
      title: "Download Avviato",
      description: `Scaricando ${reportTitle}...`,
    });
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Report Finanziari
          </h1>
          <p className="text-gray-600 mt-2">Genera e scarica report finanziari personalizzati</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 px-4 py-2 rounded-full">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        {quickReports.map((report, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-500 rounded-full">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">Rapido</Badge>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
              <p className="text-xs text-gray-500 mb-3">{report.period}</p>
              <Button 
                size="sm" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-full"
                onClick={() => handleDownloadReport(report.title, "PDF")}
              >
                <Download className="h-3 w-3 mr-1" />
                Scarica
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Reports Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Report Settore {userIndustry.charAt(0).toUpperCase() + userIndustry.slice(1)}
          </CardTitle>
          <CardDescription>
            Report specializzati per il tuo settore di attività
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-full p-1">
              <TabsTrigger value="daily" className="rounded-full">Giornaliero</TabsTrigger>
              <TabsTrigger value="weekly" className="rounded-full">Settimanale</TabsTrigger>
              <TabsTrigger value="monthly" className="rounded-full">Mensile</TabsTrigger>
              <TabsTrigger value="yearly" className="rounded-full">Annuale</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPeriod} className="mt-6">
              <div className="space-y-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <Card key={report.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full shadow-lg">
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{report.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  Ultimo generato: {report.lastGenerated}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {report.formats.map((format) => (
                              <Button
                                key={format}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadReport(report.title, format)}
                                className="flex items-center space-x-1 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 border-gray-200 rounded-full"
                              >
                                <Download className="h-3 w-3" />
                                <span>{format}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Market Reports Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Report Andamento Mercato</CardTitle>
          <CardDescription>Analisi di mercato e trend settoriali aggiornati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {marketReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {report.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <h3 className="font-semibold text-gray-900">{report.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="text-xs text-gray-500">{report.date}</span>
                        <Badge 
                          className={`${report.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          variant="secondary"
                        >
                          {report.change}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">Insights Chiave:</h4>
                    <ul className="space-y-1">
                      {report.insights.map((insight, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleDownloadMarketReport(report.title)}
                  >
                    <Download className="h-3 w-3 mr-2" />
                    Scarica Report
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Report Recenti</CardTitle>
          <CardDescription>I tuoi report finanziari generati di recente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Conto Economico - Giugno 2024", date: "2 ore fa", status: "completed", format: "PDF" },
              { name: "Stato Patrimoniale - Giugno 2024", date: "2 ore fa", status: "completed", format: "Excel" },
              { name: "Report Spese Mensile - Maggio 2024", date: "3 giorni fa", status: "completed", format: "CSV" },
              { name: "Indici Finanziari - Q1 2024", date: "1 settimana fa", status: "completed", format: "PDF" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500 rounded-full">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{report.format}</Badge>
                  <Button variant="ghost" size="sm" className="hover:bg-blue-50 rounded-full">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
