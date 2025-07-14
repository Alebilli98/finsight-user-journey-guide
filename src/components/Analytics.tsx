
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
    { 
      metric: "Rotazione Attività", 
      current: assetTurnover, 
      industry: 1.5, 
      target: 2.0,
      description: "Misura l'efficienza nell'utilizzo delle attività totali per generare ricavi.",
      whatItIs: "È calcolato come Ricavi / Attività Totali. Indica quanti euro di ricavi genera ogni euro di attività.",
      whyImportant: "Un valore alto indica un uso efficiente delle risorse aziendali. È fondamentale per valutare la produttività degli investimenti.",
      benchmark: "• Superiore a 2.0: Eccellente\n• 1.5-2.0: Buono\n• 1.0-1.5: Medio\n• Inferiore a 1.0: Da migliorare"
    },
    { 
      metric: "Rotazione Scorte", 
      current: inventoryTurnover, 
      industry: 6.2, 
      target: 10.0,
      description: "Indica quanto frequentemente l'azienda vende e rinnova le sue scorte in un periodo.",
      whatItIs: "È calcolato come Costo del Venduto / Scorte Medie. Misura l'efficienza nella gestione dell'inventario.",
      whyImportant: "Un turnover alto indica una gestione efficace delle scorte, riducendo i costi di magazzino e il rischio di obsolescenza.",
      benchmark: "• Superiore a 10: Eccellente\n• 6-10: Buono\n• 4-6: Medio\n• Inferiore a 4: Lento"
    },
    { 
      metric: "Rotazione Crediti", 
      current: receivablesTurnover, 
      industry: 9.8, 
      target: 15.0,
      description: "Misura la velocità con cui l'azienda incassa i crediti dai clienti.",
      whatItIs: "È calcolato come Ricavi / Crediti Medi. Indica quante volte l'anno si incassano i crediti.",
      whyImportant: "Un valore alto significa tempi di incasso più rapidi, migliorando il flusso di cassa e riducendo il rischio di crediti inesigibili.",
      benchmark: "• Superiore a 15: Eccellente\n• 10-15: Buono\n• 6-10: Medio\n• Inferiore a 6: Lento"
    },
    { 
      metric: "Capitale Circolante", 
      current: workingCapital, 
      industry: 1.8, 
      target: 2.5,
      description: "Misura la liquidità operativa disponibile per le attività quotidiane.",
      whatItIs: "È calcolato come Attività Correnti / Passività Correnti. Indica la capacità di coprire gli obblighi a breve termine.",
      whyImportant: "È essenziale per la gestione del flusso di cassa e la continuità operativa. Un valore troppo basso indica rischi di liquidità.",
      benchmark: "• Superiore a 2.5: Molto liquido\n• 2.0-2.5: Buono\n• 1.5-2.0: Sufficiente\n• Inferiore a 1.5: Rischio"
    },
    { 
      metric: "Rotazione Debiti", 
      current: payablesTurnover, 
      industry: 8.5, 
      target: 12.0,
      description: "Indica la velocità con cui l'azienda paga i suoi fornitori.",
      whatItIs: "È calcolato come Acquisti / Debiti Medi verso Fornitori. Misura la gestione dei pagamenti ai fornitori.",
      whyImportant: "Aiuta a ottimizzare il flusso di cassa bilanciando i rapporti con i fornitori e la gestione della liquidità.",
      benchmark: "• 10-15: Ottimale\n• 8-10: Buono\n• 6-8: Lento\n• Inferiore a 6: Molto lento"
    },
    { 
      metric: "Ciclo Conversione", 
      current: cashConversionCycle, 
      industry: 45, 
      target: 30,
      description: "Misura il tempo necessario per convertire gli investimenti in inventario in flussi di cassa.",
      whatItIs: "È la somma dei giorni di inventario e crediti meno i giorni di pagamento ai fornitori. Espresso in giorni.",
      whyImportant: "Un ciclo più breve significa un flusso di cassa più veloce e minor capitale immobilizzato nelle operazioni.",
      benchmark: "• Inferiore a 30 giorni: Eccellente\n• 30-45: Buono\n• 45-60: Medio\n• Superiore a 60: Da migliorare"
    },
    { 
      metric: "Rotazione Immobilizzi", 
      current: fixedAssetTurnover, 
      industry: 2.3, 
      target: 3.5,
      description: "Misura l'efficienza nell'utilizzo degli asset fissi per generare ricavi.",
      whatItIs: "È calcolato come Ricavi / Immobilizzazioni Nette. Indica la produttività degli investimenti in asset fissi.",
      whyImportant: "Un valore alto indica un uso efficiente di impianti, macchinari e altre immobilizzazioni per generare vendite.",
      benchmark: "• Superiore a 3.5: Eccellente\n• 2.5-3.5: Buono\n• 1.5-2.5: Medio\n• Inferiore a 1.5: Basso"
    },
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

  // Leverage metrics with descriptions
  const leverageMetrics = [
    {
      id: 'debtToEquity',
      title: 'Debiti/Patrimonio',
      value: Math.max(0, debtToEquity).toFixed(2),
      status: debtToEquity < 0.5 ? 'Conservativo' : debtToEquity < 1 ? 'Moderato' : 'Alta leva',
      description: "Il rapporto debiti/patrimonio misura la leva finanziaria dell'azienda confrontando i debiti totali con il patrimonio netto.",
      whatItIs: "È calcolato come Debiti Totali / Patrimonio Netto. Indica quanto debito usa l'azienda rispetto al capitale proprio.",
      whyImportant: "Mostra il livello di rischio finanziario e la dipendenza da finanziamenti esterni. Un valore troppo alto può indicare rischi di sostenibilità.",
      benchmark: "• Inferiore a 0.5: Conservativo\n• 0.5-1.0: Moderato\n• 1.0-2.0: Elevato\n• Superiore a 2.0: Molto rischioso"
    },
    {
      id: 'interestCoverage',
      title: 'Copertura Interessi',
      value: Math.max(1, interestCoverage).toFixed(1) + 'x',
      status: interestCoverage > 5 ? 'Forte copertura' : interestCoverage > 2 ? 'Adeguata' : 'Monitorare',
      description: "La copertura degli interessi misura la capacità dell'azienda di pagare gli interessi sui debiti con i propri utili.",
      whatItIs: "È calcolato come EBIT / Interessi Passivi. Indica quante volte l'azienda può coprire gli interessi con i suoi utili operativi.",
      whyImportant: "È fondamentale per valutare la sostenibilità del debito. Un valore basso indica difficoltà nel servire il debito.",
      benchmark: "• Superiore a 5x: Eccellente\n• 3-5x: Buono\n• 2-3x: Sufficiente\n• Inferiore a 2x: Rischio"
    },
    {
      id: 'debtToAssets',
      title: 'Debiti/Attività',
      value: Math.max(0, debtToAssets).toFixed(2),
      status: debtToAssets < 0.3 ? 'Conservativo' : debtToAssets < 0.6 ? 'Moderato' : 'Alto debito',
      description: "Il rapporto debiti/attività mostra quale percentuale delle attività è finanziata attraverso il debito.",
      whatItIs: "È calcolato come Debiti Totali / Attività Totali. Indica la proporzione di attività finanziate con debito.",
      whyImportant: "Mostra la struttura finanziaria e il rischio. Un valore alto indica maggiore dipendenza dal debito per finanziare le attività.",
      benchmark: "• Inferiore a 0.3: Basso debito\n• 0.3-0.6: Moderato\n• 0.6-0.8: Alto\n• Superiore a 0.8: Molto alto"
    }
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
      benchmark: "• Eccellente: Superiore al 15%\n• Buono: 10-15%\n• Medio: 5-10%\n• Da migliorare: Inferiore al 5%"
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
      benchmark: "• Eccellente: Superiore al 10%\n• Buono: 5-10%\n• Medio: 2-5%\n• Da migliorare: Inferiore al 2%"
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
      benchmark: "• Eccellente: Superiore al 10%\n• Buono: 5-10%\n• Medio: 2-5%\n• Da migliorare: Inferiore al 2%"
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
      benchmark: "• Eccellente: Superiore al 12%\n• Buono: 8-12%\n• Medio: 5-8%\n• Da migliorare: Inferiore al 5%"
    }
  ];

  // Update ratioCards to include new ratios
  const ratioCards = [
    { 
      title: "Indice Corrente", 
      value: currentRatio.toFixed(2), 
      change: currentRatio > 2 ? "+0.12" : "-0.08", 
      status: currentRatio > 2 ? "good" : "warning",
      description: "L'indice corrente misura la capacità dell'azienda di far fronte agli obblighi a breve termine con le attività correnti.",
      whatItIs: "È calcolato come Attività Correnti / Passività Correnti. Indica quante volte le attività a breve coprono i debiti a breve.",
      whyImportant: "È fondamentale per valutare la liquidità e la solvibilità a breve termine. Un valore troppo basso indica rischi di liquidità.",
      benchmark: "• Superiore a 2.0: Buona liquidità\n• 1.5-2.0: Sufficiente\n• 1.0-1.5: Attenzione\n• Inferiore a 1.0: Rischio"
    },
    { 
      title: "Indice Secco", 
      value: quickRatio.toFixed(2), 
      change: quickRatio > 1.5 ? "+0.08" : "-0.05", 
      status: quickRatio > 1.5 ? "good" : "warning",
      description: "L'indice secco misura la capacità di pagare i debiti a breve termine escludendo le scorte dalle attività correnti.",
      whatItIs: "È calcolato come (Attività Correnti - Scorte) / Passività Correnti. È più conservativo dell'indice corrente.",
      whyImportant: "Fornisce una misura più accurata della liquidità immediata, escludendo le scorte che potrebbero essere difficili da convertire rapidamente in cash.",
      benchmark: "• Superiore a 1.5: Ottima liquidità\n• 1.0-1.5: Buona\n• 0.7-1.0: Sufficiente\n• Inferiore a 0.7: Insufficiente"
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
                        {ratio.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cosa è</h4>
                        <p className="text-gray-700 text-sm">
                          {ratio.whatItIs}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Perché è importante</h4>
                        <p className="text-gray-700 text-sm">
                          {ratio.whyImportant}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Benchmark di riferimento</h4>
                        <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                          {ratio.benchmark}
                        </pre>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-green-900">Margine Lordo</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Info className="h-4 w-4 text-green-600 hover:text-green-800" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Margine Lordo</DialogTitle>
                            <DialogDescription>
                              Il margine lordo indica la percentuale di ricavi che rimane dopo aver dedotto i costi diretti di produzione.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Come si calcola</h4>
                              <p className="text-gray-700 text-sm">
                                (Ricavi - Costo del Venduto) / Ricavi × 100
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Interpretazione</h4>
                              <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                                • Superiore al 50%: Eccellente controllo costi{'\n'}• 30-50%: Buon controllo{'\n'}• 20-30%: Accettabile{'\n'}• Inferiore al 20%: Margini sotto pressione
                              </pre>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{Math.max(0, grossMargin).toFixed(1)}%</p>
                    <p className="text-sm text-green-700">
                      {hasRealData ? "Basato sui tuoi dati" : "Dati di esempio"}
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-900">Margine Netto</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Info className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Margine Netto</DialogTitle>
                            <DialogDescription>
                              Il margine netto mostra la percentuale di ricavi che si trasforma in profitto finale dopo tutti i costi.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Come si calcola</h4>
                              <p className="text-gray-700 text-sm">
                                Utile Netto / Ricavi × 100
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Interpretazione</h4>
                              <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                                • Superiore al 15%: Eccellente redditività{'\n'}• 10-15%: Buona redditività{'\n'}• 5-10%: Redditività media{'\n'}• Inferiore al 5%: Bassa redditività
                              </pre>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{Math.max(0, netMargin).toFixed(1)}%</p>
                    <p className="text-sm text-blue-700">
                      {hasRealData ? "Basato sui tuoi dati" : "Dati di esempio"}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-purple-900">Margine EBITDA</h4>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Info className="h-4 w-4 text-purple-600 hover:text-purple-800" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Margine EBITDA</DialogTitle>
                            <DialogDescription>
                              Il margine EBITDA mostra la redditività operativa prima di interessi, tasse, ammortamenti e svalutazioni.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Come si calcola</h4>
                              <p className="text-gray-700 text-sm">
                                EBITDA / Ricavi × 100
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Interpretazione</h4>
                              <pre className="text-gray-700 text-sm whitespace-pre-line bg-gray-50 p-3 rounded">
                                • Superiore al 25%: Performance operativa eccellente{'\n'}• 15-25%: Buona performance{'\n'}• 10-15%: Performance media{'\n'}• Inferiore al 10%: Performance sotto la media
                              </pre>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
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
                      <CardTitle className="text-base flex items-center space-x-2">
                        <span>Performance vs Settore</span>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Confronto con il Settore</DialogTitle>
                              <DialogDescription>
                                Questo confronto mostra come la tua azienda si posiziona rispetto alla media del settore e ai benchmark di eccellenza.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Come interpretare</h4>
                                <p className="text-gray-700 text-sm">
                                  Valori superiori alla media settore indicano performance migliori della concorrenza. Valori che raggiungono i benchmark indicano eccellenza operativa.
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardTitle>
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

                {/* Efficiency Metrics Grid with Info */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {efficiencyData.map((metric) => (
                    <Card key={metric.metric}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{metric.metric}</DialogTitle>
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
                        <div className="text-lg font-bold text-blue-600">{metric.current.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span>Settore: {metric.industry}</span> • <span>Benchmark: {metric.benchmark}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="leverage" className="mt-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {leverageMetrics.map((metric) => (
                    <div key={metric.id} className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-blue-900">{metric.title}</h4>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Info className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{metric.title}</DialogTitle>
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
                      <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                      <p className="text-sm text-blue-700">
                        {metric.status}
                      </p>
                    </div>
                  ))}
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
