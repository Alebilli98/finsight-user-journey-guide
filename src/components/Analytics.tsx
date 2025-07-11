import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, TrendingDown, Minus, Info
} from "lucide-react";
import { format } from 'date-fns';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface AnalyticsProps {
  user?: any;
}

const Analytics = ({ user }: AnalyticsProps) => {
  const [selectedRatio, setSelectedRatio] = useState<string | null>(null);

  const liquidityRatios = [
    {
      name: "Current Ratio",
      value: "1.2:1",
      change: "+0.1",
      trend: "up" as const,
      definition: "The current ratio measures a company's ability to pay short-term obligations with its current assets.",
      purpose: "It is used to assess a company's financial health by evaluating its ability to cover its short-term liabilities with its short-term assets.",
      formula: "Current Ratio = Current Assets / Current Liabilities"
    },
    {
      name: "Quick Ratio",
      value: "0.8:1",
      change: "-0.2",
      trend: "down" as const,
      definition: "The quick ratio measures a company's ability to meet its short-term obligations with its most liquid assets.",
      purpose: "It is used to assess a company's immediate liquidity position by excluding less liquid assets like inventory.",
      formula: "Quick Ratio = (Current Assets - Inventory) / Current Liabilities"
    }
  ];

  const leverageRatios = [
    {
      name: "Debt-to-Equity Ratio",
      value: "1.5:1",
      change: "+0.3",
      trend: "up" as const,
      definition: "The debt-to-equity ratio measures the proportion of a company's debt to its equity.",
      purpose: "It is used to evaluate a company's financial leverage and risk by assessing the extent to which it is financed by debt versus equity.",
      formula: "Debt-to-Equity Ratio = Total Debt / Total Equity"
    },
    {
      name: "Times Interest Earned Ratio",
      value: "4.5x",
      change: "+0.5",
      trend: "up" as const,
      definition: "The times interest earned ratio measures a company's ability to cover its interest expenses with its earnings before interest and taxes (EBIT).",
      purpose: "It is used to assess a company's ability to meet its debt obligations by evaluating its capacity to generate earnings to cover interest expenses.",
      formula: "Times Interest Earned Ratio = EBIT / Interest Expense"
    }
  ];

  const efficiencyRatios = [
    {
      name: "Inventory Turnover Ratio",
      value: "6.2x",
      change: "+0.8",
      trend: "up" as const,
      definition: "The inventory turnover ratio measures how many times a company's inventory is sold and replaced over a period.",
      purpose: "It is used to assess a company's efficiency in managing its inventory by evaluating how quickly it sells and replenishes its stock.",
      formula: "Inventory Turnover Ratio = Cost of Goods Sold / Average Inventory"
    },
    {
      name: "Accounts Receivable Turnover Ratio",
      value: "9.5x",
      change: "+1.2",
      trend: "up" as const,
      definition: "The accounts receivable turnover ratio measures how many times a company collects its average accounts receivable balance over a period.",
      purpose: "It is used to assess a company's efficiency in collecting its receivables by evaluating how quickly it converts its credit sales into cash.",
      formula: "Accounts Receivable Turnover Ratio = Net Credit Sales / Average Accounts Receivable"
    }
  ];

  const profitabilityRatios = [
    {
      name: "ROE (Return on Equity)",
      value: "18.5%",
      change: "+2.1%",
      trend: "up" as const,
      definition: "Il ROE (Return on Equity) indica quanto profitto un'azienda genera per ogni euro di capitale proprio investito dagli azionisti.",
      purpose: "È fondamentale per gli investitori in quanto misura l'efficienza con cui l'azienda utilizza il capitale degli azionisti per generare profitti. Un ROE elevato indica una gestione efficace del capitale proprio.",
      formula: "ROE = Utile Netto / Patrimonio Netto × 100"
    }
  ];

  const allRatios = [
    ...liquidityRatios,
    ...leverageRatios,
    ...efficiencyRatios,
    ...profitabilityRatios
  ];

  const getRatioInfo = (ratioName: string) => {
    return allRatios.find(ratio => ratio.name === ratioName);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analisi Finanziaria</h1>
        <p className="text-gray-600">
          Esplora le metriche chiave e gli indici finanziari della tua azienda
        </p>
        {user?.lastDataImport && (
          <Badge className="mt-2">
            Ultimo Import Dati: {format(new Date(user.lastDataImport), 'dd/MM/yyyy HH:mm')}
          </Badge>
        )}
      </div>

      {/* Key Metrics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-blue-50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-blue-900">Ricavi Totali</CardTitle>
            <CardDescription>Entrate generate dalle vendite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(1250000)}</div>
            <p className="text-sm text-blue-700 mt-2">
              +12% rispetto al trimestre precedente
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-green-900">Utile Netto</CardTitle>
            <CardDescription>Profitto dopo tutte le spese</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(200000)}</div>
            <p className="text-sm text-green-700 mt-2">
              +8% rispetto al trimestre precedente
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-900">Margine di Profitto</CardTitle>
            <CardDescription>Percentuale di profitto sui ricavi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">16%</div>
            <p className="text-sm text-purple-700 mt-2">
              Stabile rispetto al trimestre precedente
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Financial Ratios Analysis */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Liquidity Ratios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span>Indici di Liquidità</span>
            </CardTitle>
            <CardDescription>
              Misurano la capacità di far fronte agli obblighi a breve termine
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {liquidityRatios.map((ratio, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedRatio(ratio.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    ratio.trend === 'up' ? 'bg-green-100' : 
                    ratio.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {ratio.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : ratio.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ratio.name}</p>
                    <p className="text-sm text-gray-600">{ratio.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    ratio.trend === 'up' ? 'text-green-600' : 
                    ratio.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {ratio.change}
                  </p>
                  <Info className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leverage Ratios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span>Indici di Leva Finanziaria</span>
            </CardTitle>
            <CardDescription>
              Misurano l'uso del debito per finanziare le attività
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {leverageRatios.map((ratio, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedRatio(ratio.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    ratio.trend === 'up' ? 'bg-green-100' : 
                    ratio.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {ratio.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : ratio.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ratio.name}</p>
                    <p className="text-sm text-gray-600">{ratio.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    ratio.trend === 'up' ? 'text-green-600' : 
                    ratio.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {ratio.change}
                  </p>
                  <Info className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Efficiency Ratios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-yellow-600" />
              <span>Indici di Efficienza</span>
            </CardTitle>
            <CardDescription>
              Misurano l'efficacia nell'utilizzo delle risorse
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {efficiencyRatios.map((ratio, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedRatio(ratio.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    ratio.trend === 'up' ? 'bg-green-100' : 
                    ratio.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {ratio.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : ratio.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ratio.name}</p>
                    <p className="text-sm text-gray-600">{ratio.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    ratio.trend === 'up' ? 'text-green-600' : 
                    ratio.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {ratio.change}
                  </p>
                  <Info className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Profitability Ratios */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Indici di Redditività</span>
            </CardTitle>
            <CardDescription>
              Misurano la capacità di generare profitti dai ricavi, attività o capitale
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {profitabilityRatios.map((ratio, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedRatio(ratio.name)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    ratio.trend === 'up' ? 'bg-green-100' : 
                    ratio.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {ratio.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : ratio.trend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    ) : (
                      <Minus className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ratio.name}</p>
                    <p className="text-sm text-gray-600">{ratio.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    ratio.trend === 'up' ? 'text-green-600' : 
                    ratio.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {ratio.change}
                  </p>
                  <Info className="h-4 w-4 text-gray-400 mt-1" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Analisi di Tendenza</h2>
        <p className="text-gray-600">
          Visualizza l'andamento delle principali metriche nel tempo
        </p>
        <Card>
          <CardContent>
            <p>Grafico di esempio qui</p>
          </CardContent>
        </Card>
      </div> */}

      {/* Ratio Information Dialog */}
      <Dialog open={!!selectedRatio} onOpenChange={() => setSelectedRatio(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedRatio}</DialogTitle>
          </DialogHeader>
          {selectedRatio && getRatioInfo(selectedRatio) && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Definizione</h4>
                <p className="text-gray-600 text-sm">
                  {getRatioInfo(selectedRatio)?.definition}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">A Cosa Serve</h4>
                <p className="text-gray-600 text-sm">
                  {getRatioInfo(selectedRatio)?.purpose}
                </p>
              </div>
              {getRatioInfo(selectedRatio)?.formula && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Formula</h4>
                  <p className="text-gray-600 text-sm font-mono bg-gray-100 p-2 rounded">
                    {getRatioInfo(selectedRatio)?.formula}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Analytics;
