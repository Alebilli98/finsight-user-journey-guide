
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, TrendingUp, Target, Calculator, AlertCircle,
  DollarSign, Percent, TrendingDown, Info
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DuPontAnalysis from "./financial/DuPontAnalysis";
import ScenarioAnalysis from "./ai/ScenarioAnalysis";

interface AnalyticsProps {
  user?: any;
}

const Analytics = ({ user }: AnalyticsProps) => {
  const userData = user || {};
  const financialData = userData.financialData || {};
  
  // DuPont Analysis data
  const dupontData = {
    netIncome: financialData.netIncome || 0,
    revenue: financialData.annualRevenue || 0,
    totalAssets: financialData.totalAssets || 0,
    totalEquity: (financialData.totalAssets || 0) - (financialData.totalLiabilities || 0),
    netProfitMargin: financialData.annualRevenue > 0 ? ((financialData.netIncome || 0) / financialData.annualRevenue) * 100 : 0,
    assetTurnover: financialData.totalAssets > 0 ? (financialData.annualRevenue || 0) / financialData.totalAssets : 0,
    equityMultiplier: ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0)) > 0 ? 
      (financialData.totalAssets || 0) / ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0)) : 0,
    roe: ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0)) > 0 ? 
      ((financialData.netIncome || 0) / ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0))) * 100 : 0,
    historicalData: financialData.dupontHistorical || [],
    industryBenchmarks: {
      netProfitMargin: 15,
      assetTurnover: 1.2,
      equityMultiplier: 2.0,
      roe: 15
    }
  };

  // Financial ratios with descriptions
  const financialRatios = [
    {
      name: "Margine di Profitto Netto",
      value: dupontData.netProfitMargin,
      benchmark: "10-20%",
      description: "Misura l'efficienza operativa dell'azienda",
      info: "Questo ratio indica quanto profitto netto genera l'azienda per ogni euro di ricavi. Un margine più alto indica una maggiore efficienza operativa.",
      type: "Profitability Ratio",
      icon: <Percent className="h-4 w-4" />,
      whatIs: "Il margine di profitto netto è un indicatore di redditività che mostra la percentuale di profitto che rimane dopo aver dedotto tutti i costi dai ricavi.",
      purpose: "Valuta l'efficienza dell'azienda nel controllare i costi e generare profitti dai ricavi.",
      benchmarkRange: "Generalmente considerato buono tra il 10-20%, ma varia significativamente per settore."
    },
    {
      name: "Rotazione degli Attivi",
      value: dupontData.assetTurnover,
      benchmark: "1.0-2.0",
      description: "Misura l'efficienza nell'utilizzo degli asset",
      info: "Indica quanto efficacemente l'azienda utilizza i suoi asset per generare ricavi. Un valore più alto indica un uso più efficiente degli asset.",
      type: "Efficiency Ratio",
      icon: <TrendingUp className="h-4 w-4" />,
      whatIs: "La rotazione degli attivi misura quanto efficacemente un'azienda utilizza i suoi asset per generare ricavi.",
      purpose: "Identifica se l'azienda sta utilizzando i suoi asset in modo efficiente per generare vendite.",
      benchmarkRange: "Valori superiori a 1.0 sono generalmente positivi, con 1.5-2.0 considerati ottimi per molti settori."
    },
    {
      name: "Moltiplicatore di Equity",
      value: dupontData.equityMultiplier,
      benchmark: "1.5-3.0",
      description: "Misura il leveraging finanziario",
      info: "Questo ratio mostra quanto l'azienda utilizza il debito per finanziare i suoi asset. Un valore più alto indica maggiore leva finanziaria.",
      type: "Leverage Ratio",
      icon: <Target className="h-4 w-4" />,
      whatIs: "Il moltiplicatore di equity indica quanto l'azienda fa affidamento sul debito rispetto al capitale proprio per finanziare i suoi asset.",
      purpose: "Valuta il livello di leva finanziaria e il rischio associato alla struttura del capitale.",
      benchmarkRange: "Valori tra 1.5-3.0 sono tipicamente accettabili, ma dipende dal settore e dalla strategia aziendale."
    },
    {
      name: "ROE (Return on Equity)",
      value: dupontData.roe,
      benchmark: "12-18%",
      description: "Rendimento sul capitale proprio",
      info: "Misura la redditività dell'investimento degli azionisti. Un ROE più alto indica una maggiore redditività per gli azionisti.",
      type: "Profitability Ratio",
      icon: <DollarSign className="h-4 w-4" />,
      whatIs: "Il Return on Equity misura la redditività in relazione al capitale proprio investito dagli azionisti.",
      purpose: "Indica quanto efficacemente l'azienda genera profitti con il denaro investito dagli azionisti.",
      benchmarkRange: "Un ROE del 12-18% è generalmente considerato buono, con valori superiori al 20% eccellenti."
    }
  ];

  const RatioCard = ({ ratio }: { ratio: any }) => {
    const isGood = ratio.name === "ROE (Return on Equity)" || ratio.name === "Margine di Profitto Netto" 
      ? ratio.value > 12 
      : ratio.name === "Rotazione degli Attivi" 
        ? ratio.value > 1.0
        : ratio.value < 3.0;

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {ratio.icon}
              <div>
                <CardTitle className="text-sm">{ratio.name}</CardTitle>
                <CardDescription className="text-xs">{ratio.type}</CardDescription>
              </div>
            </div>
            <Badge variant={isGood ? "default" : "secondary"}>
              {typeof ratio.value === 'number' ? ratio.value.toFixed(1) : ratio.value}
              {ratio.name.includes('Margine') || ratio.name.includes('ROE') ? '%' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{ratio.description}</p>
            
            {/* Informative description box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Informazioni</span>
              </div>
              <div className="text-xs space-y-1">
                <p><strong>Cosa è:</strong> {ratio.whatIs}</p>
                <p><strong>A cosa serve:</strong> {ratio.purpose}</p>
                <p><strong>Range di riferimento:</strong> {ratio.benchmarkRange}</p>
              </div>
            </div>
            
            <Alert className="border-blue-200 bg-blue-50">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-xs">
                <strong>Benchmark:</strong> {ratio.benchmark}<br />
                {ratio.info}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
            Financial Analytics
          </h1>
          <p className="text-gray-600 mt-2">Advanced financial analysis and performance metrics</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-100 to-slate-200 text-slate-800 border-0 px-4 py-2 rounded-full">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics Dashboard
        </Badge>
      </div>

      <Tabs defaultValue="ratios" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ratios" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Financial Ratios
          </TabsTrigger>
          <TabsTrigger value="dupont" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            DuPont Analysis
          </TabsTrigger>
          <TabsTrigger value="ai-insights" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ratios" className="space-y-6">
          {/* Financial Ratios Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {financialRatios.map((ratio, index) => (
              <RatioCard key={index} ratio={ratio} />
            ))}
          </div>

          {/* Additional Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-green-50 to-green-100">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Trend Analysis</h3>
                <p className="text-sm text-gray-600 mb-4">Analisi delle tendenze finanziarie</p>
                <Button variant="outline" size="sm">
                  Visualizza Trend
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Benchmark Comparison</h3>
                <p className="text-sm text-gray-600 mb-4">Confronto con benchmark di settore</p>
                <Button variant="outline" size="sm">
                  Confronta
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Performance Metrics</h3>
                <p className="text-sm text-gray-600 mb-4">Metriche di performance avanzate</p>
                <Button variant="outline" size="sm">
                  Analizza
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dupont" className="space-y-6">
          <DuPontAnalysis data={dupontData} />
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <ScenarioAnalysis financialData={financialData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
