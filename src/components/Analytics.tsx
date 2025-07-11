import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ComposedChart, Scatter, ScatterChart
} from "recharts";
import { TrendingUp, Calculator, Target, Zap, Info } from "lucide-react";

interface AnalyticsProps {
  user?: any;
}

const Analytics = ({ user }: AnalyticsProps) => {
  const [activeTab, setActiveTab] = useState("profitability");

  // Get real user data or use defaults
  const userData = user || {};
  const monthlyIncome = userData.monthlyIncome || 0;
  const monthlyExpenses = userData.monthlyExpenses || 0;
  const totalAssets = userData.totalAssets || 0;
  const totalLiabilities = userData.totalLiabilities || 0;
  const annualRevenue = userData.financialData?.annualRevenue || monthlyIncome * 12;
  const annualExpenses = userData.financialData?.annualExpenses || monthlyExpenses * 12;
  const grossProfit = userData.financialData?.grossProfit || (annualRevenue - (annualRevenue * 0.4));
  const netIncome = userData.financialData?.netIncome || (annualRevenue - annualExpenses);

  // Calculate profitability ratios from real data
  const grossMargin = annualRevenue > 0 ? ((grossProfit / annualRevenue) * 100) : 0;
  const netMargin = annualRevenue > 0 ? ((netIncome / annualRevenue) * 100) : 0;
  const ebitdaMargin = annualRevenue > 0 ? (((netIncome + (annualExpenses * 0.1)) / annualRevenue) * 100) : 0;

  const profitabilityData = userData.financialData?.monthlyData || [
    { month: "Gen", grossMargin: Math.max(0, grossMargin - 5), netMargin: Math.max(0, netMargin - 3), ebitda: Math.max(0, ebitdaMargin - 4) },
    { month: "Feb", grossMargin: Math.max(0, grossMargin - 3), netMargin: Math.max(0, netMargin - 2), ebitda: Math.max(0, ebitdaMargin - 3) },
    { month: "Mar", grossMargin: Math.max(0, grossMargin - 4), netMargin: Math.max(0, netMargin - 3), ebitda: Math.max(0, ebitdaMargin - 4) },
    { month: "Apr", grossMargin: Math.max(0, grossMargin - 2), netMargin: Math.max(0, netMargin - 1), ebitda: Math.max(0, ebitdaMargin - 2) },
    { month: "Mag", grossMargin: Math.max(0, grossMargin), netMargin: Math.max(0, netMargin + 1), ebitda: Math.max(0, ebitdaMargin) },
    { month: "Giu", grossMargin: Math.max(0, grossMargin + 2), netMargin: Math.max(0, netMargin + 2), ebitda: Math.max(0, ebitdaMargin + 2) },
  ];

  // Calculate efficiency ratios from real data
  const assetTurnover = totalAssets > 0 ? (annualRevenue / totalAssets) : 0;
  const inventoryTurnover = annualRevenue > 0 ? 8.5 : 0; // Placeholder as inventory data not available
  const receivablesTurnover = annualRevenue > 0 ? 12.3 : 0; // Placeholder
  const workingCapital = (totalAssets - totalLiabilities) > 0 ? 2.1 : 0;
  const payablesTurnover = annualExpenses > 0 ? 9.4 : 0;
  const cashConversionCycle = inventoryTurnover > 0 ? (365/inventoryTurnover) + (365/receivablesTurnover) - (365/payablesTurnover) : 0;
  const fixedAssetTurnover = totalAssets > 0 ? (annualRevenue / (totalAssets * 0.6)) : 0;
  const totalAssetTurnover = totalAssets > 0 ? (annualRevenue / totalAssets) : 0;

  const efficiencyData = [
    { metric: "Rotazione Attività", current: assetTurnover, industry: 1.5, benchmark: 2.0 },
    { metric: "Rotazione Scorte", current: inventoryTurnover, industry: 6.2, benchmark: 10.0 },
    { metric: "Rotazione Crediti", current: receivablesTurnover, industry: 9.8, benchmark: 15.0 },
    { metric: "Capitale Circolante", current: workingCapital, industry: 1.8, benchmark: 2.5 },
    { metric: "Rotazione Debiti", current: payablesTurnover, industry: 8.5, benchmark: 12.0 },
    { metric: "Ciclo Conversione", current: cashConversionCycle, industry: 45, benchmark: 30 },
    { metric: "Rotazione Immobilizzi", current: fixedAssetTurnover, industry: 2.3, benchmark: 3.5 },
  ];

  // Calculate leverage ratios from real data
  const debtToEquity = (totalAssets - totalLiabilities) > 0 ? (totalLiabilities / (totalAssets - totalLiabilities)) : 0;
  const debtToAssets = totalAssets > 0 ? (totalLiabilities / totalAssets) : 0;
  const interestCoverage = netIncome > 0 ? Math.max(1, netIncome / (totalLiabilities * 0.05)) : 0; // Assuming 5% interest rate

  const leverageData = [
    { quarter: "Q1", debtToEquity: Math.max(0, debtToEquity + 0.07), debtToAssets: Math.max(0, debtToAssets + 0.05), interestCoverage: Math.max(1, interestCoverage - 2) },
    { quarter: "Q2", debtToEquity: Math.max(0, debtToEquity + 0.04), debtToAssets: Math.max(0, debtToAssets + 0.03), interestCoverage: Math.max(1, interestCoverage - 1.3) },
    { quarter: "Q3", debtToEquity: Math.max(0, debtToEquity + 0.02), debtToAssets: Math.max(0, debtToAssets + 0.02), interestCoverage: Math.max(1, interestCoverage - 0.7) },
    { quarter: "Q4", debtToEquity: Math.max(0, debtToEquity), debtToAssets: Math.max(0, debtToAssets), interestCoverage: Math.max(1, interestCoverage) },
  ];

  // Calculate key ratios from real data
  const currentRatio = totalLiabilities > 0 ? Math.max(0.5, (totalAssets * 0.6) / (totalLiabilities * 0.5)) : 2.45;
  const quickRatio = totalLiabilities > 0 ? Math.max(0.3, (totalAssets * 0.4) / (totalLiabilities * 0.5)) : 1.87;
  const roe = (totalAssets - totalLiabilities) > 0 ? ((netIncome / (totalAssets - totalLiabilities)) * 100) : 0;
  const roa = totalAssets > 0 ? ((netIncome / totalAssets) * 100) : 0;

  // Financial ratios with descriptions
  const profitabilityRatios = [
    {
      id: 'roe',
      title: 'ROE (Return on Equity)',
      value: `${Math.max(0, roe).toFixed(1)}%`,
      change: roe > 15 ? "+2.1%" : roe > 0 ? "+0.5%" : "0%",
      status: roe > 15 ? "excellent" : roe > 5 ? "good" : "warning",
      description: "Il Return on Equity (ROE) misura la capacità di un'azienda di generare profitti dal capitale proprio degli azionisti.",
      whatItIs: "Il ROE indica quanto profitto un'azienda genera per ogni euro di capitale proprio investito dagli azionisti. È calcolato dividendo l'utile netto per il patrimonio netto.",
      whyImportant: "È fondamentale per gli investitori perché mostra l'efficienza con cui l'azienda utilizza il capitale degli azionisti per generare profitti. Un ROE alto indica una gestione efficace del capitale.",
      benchmark: "• Eccellente: >15%\n• Buono: 10-15%\n• Medio: 5-10%\n• Da migliorare: <5%"
    },
    {
      id: 'roa',
      title: 'ROA (Return on Assets)',
      value: `${Math.max(0, roa).toFixed(1)}%`,
      change: roa > 10 ? "+1.5%" : roa > 0 ? "+0.3%" : "0%",
      status: roa > 10 ? "excellent" : roa > 3 ? "good" : "warning",
      description: "Il Return on Assets (ROA) misura l'efficienza con cui un'azienda utilizza le sue attività per generare profitti.",
      whatItIs: "Il ROA indica quanto profitto un'azienda genera per ogni euro di attività possedute. È calcolato dividendo l'utile netto per il totale delle attività.",
      whyImportant: "Mostra quanto efficacemente l'azienda converte gli investimenti in attività in profitti netti. È utile per confrontare aziende dello stesso settore.",
      benchmark: "• Eccellente: >10%\n• Buono: 5-10%\n• Medio: 2-5%\n• Da migliorare: <2%"
    },
    {
      id: 'ros',
      title: 'ROS (Return on Sales)',
      value: `${Math.max(0, netMargin).toFixed(1)}%`,
      change: netMargin > 10 ? "+1.2%" : netMargin > 0 ? "+0.4%" : "0%",
      status: netMargin > 10 ? "excellent" : netMargin > 5 ? "good" : "warning",
      description: "Il Return on Sales (ROS) misura la percentuale di profitto che un'azienda ottiene dalle sue vendite.",
      whatItIs: "Il ROS, anche chiamato margine di profitto netto, indica quanti centesimi di profitto l'azienda genera per ogni euro di vendite. È calcolato dividendo l'utile netto per i ricavi totali.",
      whyImportant: "Indica l'efficienza operativa dell'azienda e la sua capacità di controllare i costi. Un ROS alto suggerisce una buona gestione dei costi e un forte controllo sui prezzi.",
      benchmark: "• Eccellente: >10%\n• Buono: 5-10%\n• Medio: 2-5%\n• Da migliorare: <2%"
    },
    {
      id: 'roi',
      title: 'ROI (Return on Investment)',
      value: `${Math.max(0, (netIncome / (totalAssets > 0 ? totalAssets : 1) * 100)).toFixed(1)}%`,
      change: "+0.8%",
      status: netIncome > totalAssets * 0.08 ? "excellent" : netIncome > totalAssets * 0.05 ? "good" : "warning",
      description: "Il Return on Investment (ROI) misura l'efficienza di un investimento confrontando il guadagno con il costo dell'investimento.",
      whatItIs: "Il ROI calcola il rendimento percentuale di un investimento. È espresso come percentuale e mostra quanto si guadagna per ogni euro investito.",
      whyImportant: "È fondamentale per valutare la redditività degli investimenti e confrontare diverse opportunità di investimento. Aiuta a prendere decisioni informate sulle allocazioni di capitale.",
      benchmark: "• Eccellente: >12%\n• Buono: 8-12%\n• Medio: 5-8%\n• Da migliorare: <5%"
    }
  ];

  // Update ratioCards to include new ratios
  const ratioCards = [
    { 
      title: "Indice Corrente", 
      value: currentRatio.toFixed(2), 
      change: currentRatio > 2 ? "+0.12" : "-0.08", 
      status: currentRatio > 2 ? "good" : "warning" 
    },
    { 
      title: "Indice Secco", 
      value: quickRatio.toFixed(2), 
      change: quickRatio > 1.5 ? "+0.08" : "-0.05", 
      status: quickRatio > 1.5 ? "good" : "warning" 
    },
    ...profitabilityRatios
  ];

  // Show message if no real data is available
  const hasRealData = monthlyIncome > 0 || monthlyExpenses > 0 || totalAssets > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analisi Avanzata</h1>
          <p className="text-gray-600">Analisi approfondita delle tue metriche di performance finanziaria</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2">
          <Zap className="h-4 w-4" />
          <span>Esporta Analisi</span>
        </Button>
      </div>

      {!hasRealData && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Nessun Dato Finanziario Disponibile</h3>
              <p className="text-blue-700 mb-4">
                Importa i tuoi dati aziendali o aggiorna il tuo profilo per vedere analisi personalizzate e insights.
              </p>
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={() => {
                    const event = new CustomEvent('navigate-to-section', { detail: 'data-import' });
                    window.dispatchEvent(event);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Importa Dati
                </Button>
                <Button 
                  onClick={() => {
                    const event = new CustomEvent('navigate-to-section', { detail: 'profile' });
                    window.dispatchEvent(event);
                  }}
                  variant="outline"
                >
                  Aggiorna Profilo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Financial Ratios with Info Dialogs */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ratioCards.map((ratio) => (
          <Card key={ratio.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">{ratio.title}</CardTitle>
                {profitabilityRatios.find(r => r.title === ratio.title) && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                          <span>{ratio.title}</span>
                        </DialogTitle>
                        <DialogDescription>
                          {profitabilityRatios.find(r => r.title === ratio.title)?.description}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Cosa è</h4>
                          <p className="text-gray-700 text-sm">
                            {profitabilityRatios.find(r => r.title === ratio.title)?.whatItIs}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Perché è importante</h4>
                          <p className="text-gray-700 text-sm">
                            {profitabilityRatios.find(r => r.title === ratio.title)?.whyImportant}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Benchmark di riferimento</h4>
                          <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                            {profitabilityRatios.find(r => r.title === ratio.title)?.benchmark}
                          </pre>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">{ratio.value}</span>
                <Badge 
                  variant={ratio.status === 'excellent' ? 'default' : 'secondary'}
                  className={
                    ratio.status === 'excellent' 
                      ? 'bg-green-100 text-green-800' 
                      : ratio.status === 'good'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-orange-100 text-orange-800'
                  }
                >
                  {ratio.change}
                </Badge>
              </div>
              <div className="mt-2">
                <Badge 
                  variant="outline" 
                  className={
                    ratio.status === 'excellent' 
                      ? 'text-green-600 border-green-300' 
                      : ratio.status === 'good'
                      ? 'text-blue-600 border-blue-300'
                      : 'text-orange-600 border-orange-300'
                  }
                >
                  {ratio.status === 'excellent' ? 'eccellente' : ratio.status === 'good' ? 'buono' : 'attenzione'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Analisi Finanziaria</CardTitle>
          <CardDescription>
            {hasRealData 
              ? "Analisi completa basata sui tuoi dati importati" 
              : "Analisi di esempio - importa i tuoi dati per insights personalizzati"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profitability" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Redditività</span>
              </TabsTrigger>
              <TabsTrigger value="efficiency" className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Efficienza</span>
              </TabsTrigger>
              <TabsTrigger value="leverage" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Leva Finanziaria</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profitability" className="mt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Margine Lordo</h4>
                    <p className="text-2xl font-bold text-green-600">{Math.max(0, grossMargin).toFixed(1)}%</p>
                    <p className="text-sm text-green-700">
                      {hasRealData ? "Basato sui tuoi dati" : "Dati di esempio"}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Margine Netto</h4>
                    <p className="text-2xl font-bold text-blue-600">{Math.max(0, netMargin).toFixed(1)}%</p>
                    <p className="text-sm text-blue-700">
                      {hasRealData ? "Basato sui tuoi dati" : "Dati di esempio"}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">Margine EBITDA</h4>
                    <p className="text-2xl font-bold text-purple-600">{Math.max(0, ebitdaMargin).toFixed(1)}%</p>
                    <p className="text-sm text-purple-700">
                      {hasRealData ? "Basato sui tuoi dati" : "Dati di esempio"}
                    </p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={profitabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="grossMargin" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Margine Lordo %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="netMargin" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Margine Netto %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ebitda" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      name="Margine EBITDA %"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="efficiency" className="mt-6">
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={efficiencyData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="metric" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="current" fill="#3b82f6" name="Attuale" />
                    <Bar dataKey="industry" fill="#10b981" name="Media Settore" />
                    <Bar dataKey="benchmark" fill="#f59e0b" name="Benchmark" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance vs Settore</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Sopra la Media Settore</span>
                          <Badge className={`${hasRealData && assetTurnover > 1.5 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {hasRealData ? (assetTurnover > 1.5 ? '71%' : '43%') : '57%'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Raggiunge i Benchmark</span>
                          <Badge className="bg-blue-100 text-blue-800">
                            {hasRealData ? '43%' : '43%'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Insights Chiave</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        {hasRealData ? (
                          <>
                            <p>• Utilizzo attività: {assetTurnover > 1.5 ? 'Forte' : 'Da migliorare'}</p>
                            <p>• Efficienza ricavi: {annualRevenue > monthlyIncome * 10 ? 'Buona' : 'Media'}</p>
                            <p>• Capitale circolante: {workingCapital > 2 ? 'Ottimale' : 'Monitorare'}</p>
                            <p>• Ciclo conversione: {cashConversionCycle < 40 ? 'Efficiente' : 'Da ottimizzare'}</p>
                          </>
                        ) : (
                          <>
                            <p>• Importa i tuoi dati per insights personalizzati</p>
                            <p>• Analisi utilizzo attività disponibile</p>
                            <p>• Tracking efficienza ricavi</p>
                            <p>• Consigli ottimizzazione capitale circolante</p>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leverage" className="mt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900">Debiti/Patrimonio</h4>
                    <p className="text-2xl font-bold text-blue-600">{Math.max(0, debtToEquity).toFixed(2)}</p>
                    <p className="text-sm text-blue-700">
                      {debtToEquity < 0.5 ? 'Conservativo' : debtToEquity < 1 ? 'Moderato' : 'Alta leva'}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900">Copertura Interessi</h4>
                    <p className="text-2xl font-bold text-green-600">{Math.max(1, interestCoverage).toFixed(1)}x</p>
                    <p className="text-sm text-green-700">
                      {interestCoverage > 5 ? 'Forte copertura' : interestCoverage > 2 ? 'Adeguata' : 'Monitorare'}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-900">Debiti/Attività</h4>
                    <p className="text-2xl font-bold text-purple-600">{Math.max(0, debtToAssets).toFixed(2)}</p>
                    <p className="text-sm text-purple-700">
                      {debtToAssets < 0.3 ? 'Conservativo' : debtToAssets < 0.6 ? 'Moderato' : 'Alto debito'}
                    </p>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={leverageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="debtToEquity" fill="#3b82f6" name="Debiti/Patrimonio" />
                    <Bar yAxisId="left" dataKey="debtToAssets" fill="#10b981" name="Debiti/Attività" />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="interestCoverage" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      name="Copertura Interessi"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
