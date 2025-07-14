
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

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const { toast } = useToast();
  const { t } = useLanguage();

  const reportTypes = [
    {
      id: "pnl",
      title: "Conto Economico",
      description: "Rendiconto completo dei ricavi con standard IFRS",
      icon: TrendingUp,
      formats: ["PDF", "Excel", "CSV"],
      lastGenerated: "2 ore fa",
    },
    {
      id: "balance-sheet",
      title: "Stato Patrimoniale",
      description: "Situazione patrimoniale-finanziaria (conforme IFRS)",
      icon: BarChart3,
      formats: ["PDF", "Excel"],
      lastGenerated: "2 ore fa",
    },
    {
      id: "financial-ratios",
      title: "Analisi Indici Finanziari",
      description: "Analisi completa degli indici e benchmarking",
      icon: Target,
      formats: ["PDF", "Excel"],
      lastGenerated: "1 giorno fa",
    },
  ];

  const quickReports = [
    { title: "Posizione Cassa Giornaliera", period: "Oggi", accounts: "Tutti" },
    { title: "Riepilogo Ricavi Settimanale", period: "Questa Settimana", accounts: "Ricavi" },
    { title: "Report Spese Mensile", period: "Questo Mese", accounts: "Spese" },
    { title: "Performance Trimestrale", period: "Q2 2024", accounts: "Tutti" },
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
    
    // Simulate report generation
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report Finanziari</h1>
          <p className="text-gray-600">Genera e scarica report finanziari completi</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        {quickReports.map((report, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <Badge variant="outline" className="text-xs">Rapido</Badge>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{report.period}</p>
              <Button 
                size="sm" 
                className="w-full"
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
      <Card>
        <CardHeader>
          <CardTitle>Report Finanziari Standard</CardTitle>
          <CardDescription>
            Bilanci conformi agli standard IFRS e report di analisi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="daily">Giornaliero</TabsTrigger>
              <TabsTrigger value="weekly">Settimanale</TabsTrigger>
              <TabsTrigger value="monthly">Mensile</TabsTrigger>
              <TabsTrigger value="yearly">Annuale</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPeriod} className="mt-6">
              <div className="space-y-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <Card key={report.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <Icon className="h-6 w-6 text-blue-600" />
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
                                className="flex items-center space-x-1"
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
      <Card>
        <CardHeader>
          <CardTitle>Report Andamento Mercato</CardTitle>
          <CardDescription>Analisi di mercato e trend settoriali aggiornati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {marketReports.map((report) => (
              <Card key={report.id} className="hover:shadow-sm transition-shadow">
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
      <Card>
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
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{report.format}</Badge>
                  <Button variant="ghost" size="sm">
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
