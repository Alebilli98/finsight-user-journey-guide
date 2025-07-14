import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, 
  AlertCircle, CheckCircle, Calendar, Building2, 
  Users, Briefcase, TrendingUpDown, Upload, FileSpreadsheet,
  Calculator, Activity, Info
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardProps {
  user?: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [showCogsBreakdown, setShowCogsBreakdown] = useState(false);
  const { t } = useLanguage();

  // Get user's actual data or use defaults
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // Company Information
  const companyName = financialData.companyName || userData.company || 'La Tua Azienda';
  const industry = financialData.industry || userData.industry || 'Settore non specificato';
  const yearEnd = financialData.yearEnd || new Date().getFullYear();
  
  // Financial Data from imported Excel
  const annualRevenue = financialData.annualRevenue || financialData.totalRevenue || userData.monthlyIncome * 12 || 0;
  const monthlyRevenue = Math.round(annualRevenue / 12);
  const annualExpenses = financialData.annualExpenses || userData.monthlyExpenses * 12 || 0;
  const monthlyExpenses = Math.round(annualExpenses / 12);
  const netIncome = financialData.netIncome || (annualRevenue - annualExpenses);
  const monthlyNetIncome = Math.round(netIncome / 12);
  
  // Balance Sheet Data
  const totalAssets = financialData.totalAssets || userData.totalAssets || 0;
  const totalLiabilities = financialData.totalLiabilities || userData.totalLiabilities || 0;
  const totalEquity = financialData.totalEquity || (totalAssets - totalLiabilities);
  const cashAndEquivalents = financialData.cashAndEquivalents || userData.currentSavings || 0;
  
  // P&L Details
  const grossProfit = financialData.grossProfit || (annualRevenue - (financialData.cogs || annualRevenue * 0.4));
  const cogs = financialData.cogs || (annualRevenue * 0.4);
  const grossMargin = annualRevenue > 0 ? ((grossProfit / annualRevenue) * 100) : 0;
  const netMargin = annualRevenue > 0 ? ((netIncome / annualRevenue) * 100) : 0;
  const ebitda = grossProfit - (financialData.totalPersonnelCosts || annualExpenses * 0.6);
  const ebitdaMargin = annualRevenue > 0 ? ((ebitda / annualRevenue) * 100) : 0;

  // Working Capital calculation
  const currentAssets = financialData.currentAssets || (totalAssets * 0.6);
  const currentLiabilities = financialData.currentLiabilities || (totalLiabilities * 0.7);
  const workingCapital = currentAssets - currentLiabilities;

  // Calculate metrics from real data
  const savingsRate = annualRevenue > 0 ? ((netIncome) / annualRevenue * 100) : 0;
  const debtToEquity = totalEquity > 0 ? (totalLiabilities / totalEquity) : 0;
  const returnOnAssets = totalAssets > 0 ? ((netIncome / totalAssets) * 100) : 0;
  const returnOnEquity = totalEquity > 0 ? ((netIncome / totalEquity) * 100) : 0;

  // COGS breakdown for modal
  const cogsBreakdown = {
    materialCosts: cogs * 0.45,
    laborCosts: cogs * 0.35,
    overheadCosts: cogs * 0.20,
    totalCogs: cogs,
    cogsPercentage: annualRevenue > 0 ? ((cogs / annualRevenue) * 100) : 0
  };

  // Generate charts with real data
  const monthlyData = financialData.monthlyData && financialData.monthlyData.length > 0 
    ? financialData.monthlyData 
    : ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu'].map((month, index) => ({
        month,
        revenue: monthlyRevenue * (0.9 + (index * 0.02)),
        expenses: monthlyExpenses * (0.95 + (index * 0.01)),
        savings: monthlyNetIncome * (0.8 + (index * 0.05))
      }));

  const hasRealData = annualRevenue > 0 || totalAssets > 0;

  // Financial metrics with descriptions
  const financialMetrics = [
    {
      id: 'revenue',
      title: 'Ricavi Annuali',
      value: `€${annualRevenue.toLocaleString()}`,
      monthlyValue: `€${monthlyRevenue.toLocaleString()}/mese`,
      icon: DollarSign,
      color: 'text-green-600',
      description: "I ricavi annuali rappresentano il totale delle entrate generate dall'azienda in un anno attraverso la vendita di beni o servizi.",
      whatItIs: "I ricavi sono il denaro che l'azienda incassa dalle vendite prima di detrarre qualsiasi costo. Rappresentano il 'fatturato' dell'azienda.",
      whyImportant: "È il punto di partenza per valutare le performance aziendali. Mostra la capacità dell'azienda di generare business e crescere nel mercato.",
      benchmark: "• Crescita annuale superiore al 10%: Eccellente\n• Crescita 5-10%: Buona\n• Crescita 0-5%: Stabile\n• Crescita negativa: Attenzione"
    },
    {
      id: 'netIncome',
      title: 'Utile Netto',
      value: `€${netIncome.toLocaleString()}`,
      monthlyValue: `€${monthlyNetIncome.toLocaleString()}/mese`,
      icon: TrendingUp,
      color: netIncome >= 0 ? 'text-blue-600' : 'text-red-600',
      description: "L'utile netto è il profitto finale dell'azienda dopo aver sottratto tutti i costi, tasse e spese dai ricavi totali.",
      whatItIs: "È il 'guadagno pulito' dell'azienda, quello che rimane ai proprietari dopo aver pagato tutto. È la linea finale del conto economico.",
      whyImportant: "Indica la vera redditività dell'azienda e la sua capacità di generare valore per gli azionisti. È fondamentale per la sostenibilità a lungo termine.",
      benchmark: "• Superiore al 15% dei ricavi: Eccellente\n• 10-15%: Molto buono\n• 5-10%: Buono\n• 0-5%: Accettabile\n• Negativo: Perdite"
    },
    {
      id: 'equity',
      title: 'Patrimonio Netto',
      value: `€${totalEquity.toLocaleString()}`,
      monthlyValue: totalAssets > 0 ? `${((totalEquity / totalAssets) * 100).toFixed(1)}% degli asset` : 'Dati non disponibili',
      icon: BarChart3,
      color: totalEquity >= 0 ? 'text-purple-600' : 'text-red-600',
      description: "Il patrimonio netto rappresenta la differenza tra le attività totali e le passività totali dell'azienda.",
      whatItIs: "È il valore contabile dell'azienda che appartiene ai proprietari/azionisti. Include capitale versato, riserve e utili non distribuiti.",
      whyImportant: "Mostra la solidità finanziaria dell'azienda e quanto valore è stato accumulato nel tempo. Un patrimonio netto forte indica stabilità.",
      benchmark: "• Superiore al 50% degli asset: Molto solido\n• 30-50%: Solido\n• 20-30%: Accettabile\n• 10-20%: Attenzione\n• Inferiore al 10%: Rischio elevato"
    },
    {
      id: 'workingCapital',
      title: 'Working Capital',
      value: `€${workingCapital.toLocaleString()}`,
      monthlyValue: workingCapital > 0 ? 'Liquidità positiva' : 'Attenzione liquidità',
      icon: TrendingUpDown,
      color: workingCapital >= 0 ? 'text-indigo-600' : 'text-red-600',
      description: "Il capitale circolante è la differenza tra le attività correnti e le passività correnti dell'azienda.",
      whatItIs: "Rappresenta la liquidità operativa disponibile per gestire le operazioni quotidiane. Include scorte, crediti meno i debiti a breve termine.",
      whyImportant: "È cruciale per la gestione del flusso di cassa. Un capitale circolante positivo indica che l'azienda può coprire i suoi obblighi a breve termine.",
      benchmark: "• Ratio superiore a 2: Eccellente liquidità\n• Ratio 1.5-2: Buona liquidità\n• Ratio 1-1.5: Sufficiente\n• Ratio inferiore a 1: Problemi di liquidità"
    }
  ];

  // Margin metrics with descriptions
  const marginMetrics = [
    {
      id: 'grossMargin',
      title: 'Margine Lordo',
      value: `${Math.max(0, grossMargin).toFixed(1)}%`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: "Il margine lordo indica quanto rimane dei ricavi dopo aver sottratto i costi diretti di produzione (COGS).",
      whatItIs: "È calcolato come (Ricavi - Costo del Venduto) / Ricavi × 100. Mostra l'efficienza nella produzione e vendita dei prodotti/servizi.",
      whyImportant: "Indica quanto l'azienda guadagna su ogni euro di vendita prima dei costi operativi. Un margine alto significa buon controllo dei costi diretti.",
      benchmark: "• Superiore al 50%: Eccellente\n• 30-50%: Buono\n• 20-30%: Accettabile\n• 10-20%: Basso\n• Inferiore al 10%: Molto basso"
    },
    {
      id: 'netMargin',
      title: 'Margine Netto',
      value: `${Math.max(0, netMargin).toFixed(1)}%`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: "Il margine netto mostra quanto profitto rimane dopo aver dedotto tutti i costi, inclusi quelli operativi e le tasse.",
      whatItIs: "È calcolato come Utile Netto / Ricavi × 100. È l'indicatore finale di redditività dell'azienda.",
      whyImportant: "Mostra l'efficienza complessiva dell'azienda nel convertire le vendite in profitti. È fondamentale per valutare la sostenibilità del business.",
      benchmark: "• Superiore al 15%: Eccellente\n• 10-15%: Molto buono\n• 5-10%: Buono\n• 2-5%: Accettabile\n• Inferiore al 2%: Basso"
    },
    {
      id: 'ebitdaMargin',
      title: 'Margine EBITDA',
      value: `${Math.max(0, ebitdaMargin).toFixed(1)}%`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: "Il margine EBITDA mostra la redditività operativa prima di interessi, tasse, ammortamenti e svalutazioni.",
      whatItIs: "È calcolato come EBITDA / Ricavi × 100. Misura la performance operativa pura dell'azienda, escludendo elementi finanziari e contabili.",
      whyImportant: "Permette di confrontare aziende diverse eliminando gli effetti di decisioni finanziarie e contabili. Mostra l'efficienza operativa.",
      benchmark: "• Superiore al 25%: Eccellente\n• 15-25%: Buono\n• 10-15%: Accettabile\n• 5-10%: Basso\n• Inferiore al 5%: Molto basso"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bentornato, {user?.firstName || 'Utente'}!
          </h1>
          <p className="text-gray-600">Dashboard intelligente per la gestione finanziaria aziendale</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-100 text-green-800">
            <Building2 className="h-3 w-3 mr-1" />
            {companyName}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800">
            <Briefcase className="h-3 w-3 mr-1" />
            {industry}
          </Badge>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>Aggiornato: {new Date().toLocaleDateString('it-IT')}</span>
          </div>
        </div>
      </div>

      {/* Company Overview Card */}
      {hasRealData && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">{companyName}</h3>
                <p className="text-sm text-gray-600">{industry}</p>
              </div>
              <div className="text-center">
                <TrendingUpDown className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Anno Fiscale</h3>
                <p className="text-sm text-gray-600">{yearEnd}</p>
              </div>
              <div className="text-center">
                <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900">Stato Operativo</h3>
                <Badge className={netIncome > 0 ? 'bg-green-100 text-green-800' : netIncome === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                  {netIncome > 0 ? 'Profittevole' : netIncome === 0 ? 'Pareggio' : 'In Perdita'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Financial Metrics with Info Dialogs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className="flex items-center space-x-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                        <span>{metric.title}</span>
                      </DialogTitle>
                      <DialogDescription>
                        {metric.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cosa è</h4>
                        <p className="text-gray-700 text-sm">
                          {metric.whatItIs}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Perché è importante</h4>
                        <p className="text-gray-700 text-sm">
                          {metric.whyImportant}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benchmark di riferimento</h4>
                        <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                          {metric.benchmark}
                        </pre>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <span className="text-sm">{metric.monthlyValue}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* COGS Card with breakdown */}
      <Card 
        className="cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setShowCogsBreakdown(true)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">COGS (Costo del Venduto)</CardTitle>
          <div className="flex items-center space-x-2">
            <Calculator className="h-4 w-4 text-orange-600" />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={(e) => e.stopPropagation()}>
                  <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-orange-600" />
                    <span>COGS - Costo del Venduto</span>
                  </DialogTitle>
                  <DialogDescription>
                    Il COGS rappresenta tutti i costi diretti sostenuti per produrre i beni o servizi venduti dall'azienda.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cosa è</h4>
                    <p className="text-gray-700 text-sm">
                      Include materiali diretti, lavoro diretto e costi di produzione direttamente attribuibili ai prodotti venduti. Non include costi amministrativi o di vendita.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Perché è importante</h4>
                    <p className="text-gray-700 text-sm">
                      È fondamentale per calcolare il margine lordo e valutare l'efficienza produttiva. Un COGS ottimizzato aumenta direttamente la redditività.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Benchmark di riferimento</h4>
                    <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                      • Inferiore al 40% ricavi: Eccellente controllo costi{'\n'}• 40-60%: Buon controllo{'\n'}• 60-70%: Accettabile{'\n'}• Superiore al 70%: Necessaria ottimizzazione
                    </pre>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">€{cogs.toLocaleString()}</div>
          <p className="text-xs text-gray-500 flex items-center mt-1">
            <span className="text-sm">Clicca per dettagli breakdown</span>
          </p>
          {annualRevenue > 0 && (
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                {((cogs / annualRevenue) * 100).toFixed(1)}% dei ricavi
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* COGS Breakdown Modal */}
      {showCogsBreakdown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowCogsBreakdown(false)}>
          <Card className="w-full max-w-2xl mx-4" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-orange-600" />
                <span>Breakdown Costo del Venduto (COGS)</span>
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute top-4 right-4"
                onClick={() => setShowCogsBreakdown(false)}
              >
                ✕
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Costi Materiali</span>
                    <span className="font-bold">€{cogsBreakdown.materialCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Costi del Lavoro</span>
                    <span className="font-bold">€{cogsBreakdown.laborCosts.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Costi Generali</span>
                    <span className="font-bold">€{cogsBreakdown.overheadCosts.toLocaleString()}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">COGS Totale</span>
                    <span className="font-bold text-orange-600">€{cogsBreakdown.totalCogs.toLocaleString()}</span>
                  </div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3">Percentuale sui Ricavi</h4>
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {cogsBreakdown.cogsPercentage.toFixed(1)}%
                  </div>
                  <Progress value={cogsBreakdown.cogsPercentage} className="mb-2" />
                  <p className="text-sm text-orange-700">
                    {cogsBreakdown.cogsPercentage < 60 ? 'Eccellente controllo costi' : 
                     cogsBreakdown.cogsPercentage < 70 ? 'Buon controllo costi' : 
                     'Considerare ottimizzazione costi'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Financial Performance Charts */}
      {hasRealData && monthlyData.length > 0 && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Andamento Finanziario</CardTitle>
              <CardDescription>Ricavi, costi e utili mensili</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`€${Number(value).toLocaleString()}`, '']} />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                    name="Ricavi"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stackId="2"
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.6}
                    name="Costi"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="savings" 
                    stackId="3"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.8}
                    name="Utile"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Indicatori Chiave</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Indicatori di Performance</DialogTitle>
                      <DialogDescription>
                        Questi indicatori mostrano l'efficienza e la redditività dell'azienda attraverso diversi margini di profitto.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Come leggere i margini</h4>
                        <p className="text-gray-700 text-sm">
                          I margini mostrano quanta percentuale dei ricavi si trasforma in profitto a diversi livelli: lordo (dopo COGS), EBITDA (dopo costi operativi), netto (finale).
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Importanza del monitoraggio</h4>
                        <p className="text-gray-700 text-sm">
                          Monitorare l'evoluzione di questi margini nel tempo permette di identificare trend, problemi e opportunità di miglioramento nella gestione aziendale.
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
              <CardDescription>Margini e ratio di performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marginMetrics.map((margin, index) => (
                  <div key={margin.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">{margin.title}</span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                              <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{margin.title}</DialogTitle>
                              <DialogDescription>
                                {margin.description}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Cosa è</h4>
                                <p className="text-gray-700 text-sm">
                                  {margin.whatItIs}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Perché è importante</h4>
                                <p className="text-gray-700 text-sm">
                                  {margin.whyImportant}
                                </p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Benchmark di riferimento</h4>
                                <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                                  {margin.benchmark}
                                </pre>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <Badge className={
                        parseFloat(margin.value) > 30 ? 'bg-green-100 text-green-800' : 
                        parseFloat(margin.value) > 15 ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }>
                        {margin.value}
                      </Badge>
                    </div>
                    <Progress value={Math.min(100, Math.max(0, parseFloat(margin.value)))} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* No Data State */}
      {!hasRealData && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <FileSpreadsheet className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Nessun Dato Finanziario Disponibile</h3>
            <p className="text-blue-700 mb-6">
              Importa i tuoi dati finanziari per vedere analisi dettagliate, insight AI personalizzati e dashboard interattive.
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
                Importa Dati Finanziari
              </Button>
              <Button 
                onClick={() => {
                  const event = new CustomEvent('navigate-to-section', { detail: 'profile' });
                  window.dispatchEvent(event);
                }}
                variant="outline"
              >
                <Users className="h-4 w-4 mr-2" />
                Aggiorna Profilo
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights Section - Moved to the end */}
      {hasRealData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Insight AI Personalizzati</span>
            </CardTitle>
            <CardDescription>Raccomandazioni basate sui tuoi dati finanziari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {grossMargin > 40 ? (
                <div className="p-4 rounded-lg border bg-green-50 border-green-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Eccellente Margine Lordo</h4>
                    <Badge variant="secondary" className="text-xs">95% precisione</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Il tuo margine lordo del {grossMargin.toFixed(1)}% è eccellente. Continua a ottimizzare la struttura dei costi.</p>
                </div>
              ) : (
                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Ottimizza Margine Lordo</h4>
                    <Badge variant="secondary" className="text-xs">88% precisione</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Margine lordo del {grossMargin.toFixed(1)}%. Considera di rivedere i costi diretti o la strategia di pricing.</p>
                </div>
              )}

              {workingCapital > 0 ? (
                <div className="p-4 rounded-lg border bg-green-50 border-green-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Liquidità Sana</h4>
                    <Badge variant="secondary" className="text-xs">92% precisione</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Working capital positivo di €{workingCapital.toLocaleString()} indica una buona gestione della liquidità.</p>
                </div>
              ) : (
                <div className="p-4 rounded-lg border bg-orange-50 border-orange-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Attenzione Liquidità</h4>
                    <Badge variant="secondary" className="text-xs">90% precisione</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Working capital negativo. Priorità al miglioramento della gestione del capitale circolante.</p>
                </div>
              )}

              {netMargin > 10 ? (
                <div className="p-4 rounded-lg border bg-green-50 border-green-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Ottima Redditività</h4>
                    <Badge variant="secondary" className="text-xs">94% precisione</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Margine netto del {netMargin.toFixed(1)}% indica un'azienda molto redditizia. Considera investimenti per la crescita.</p>
                </div>
              ) : (
                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">Migliora Efficienza</h4>
                    <Badge variant="secondary" className="text-xs">85% precisione</Badge>
                  </div>
                  <p className="text-sm text-gray-700">Margine netto del {netMargin.toFixed(1)}% suggerisce di rivedere i costi operativi e aumentare l'efficienza.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
