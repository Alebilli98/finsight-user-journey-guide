import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, MessageSquare, Lightbulb, Settings, Send, Mic,
  TrendingUp, BarChart3, Brain, Target
} from "lucide-react";
import AIAssistant from "./ai/AIAssistant";
import ScenarioAnalysis from "./ai/ScenarioAnalysis";

const AISolution = () => {
  const [activeTab, setActiveTab] = useState<'assistant' | 'chat' | 'insights' | 'scenario'>('assistant');
  const [chatMessage, setChatMessage] = useState("");

  // Default financial data for ScenarioAnalysis
  const defaultFinancialData = {
    annualRevenue: 100000,
    merchandiseCost: 60000,
    operatingExpenses: 25000,
    grossMargin: 40,
    monthlyRecurringRevenue: 8333,
    cashRunway: 12,
    burnRate: 5000,
    monthlyRevenue: 8333,
    currentRatio: 1.5,
    operatingCashFlow: 15000
  };

  const aiFeatures = [
    {
      id: 'assistant',
      icon: Bot,
      title: "AI Assistant",
      description: "Assistente intelligente per analisi finanziarie",
      color: "blue"
    },
    {
      id: 'chat',
      icon: MessageSquare,
      title: "Chat AI",
      description: "Conversazione naturale con l'AI",
      color: "green"
    },
    {
      id: 'insights',
      icon: Lightbulb,
      title: "AI Insights",
      description: "Insights automatici sui tuoi dati",
      color: "purple"
    },
    {
      id: 'scenario',
      icon: Settings,
      title: "Scenario Analysis",
      description: "Analisi di scenari what-if",
      color: "orange"
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'assistant':
        return <AIAssistant />;
      case 'scenario':
        return <ScenarioAnalysis financialData={defaultFinancialData} />;
      case 'chat':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5" />
                      Comando AI
                    </CardTitle>
                    <CardDescription>
                      Scrivi o parla per dare comandi all'assistente AI
                    </CardDescription>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">AI Avanzata</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Textarea 
                      placeholder="Es: 'Fissa un meeting con le risorse umane mercoledì alle 9' oppure 'Prepara un report vendite trimestrale'"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="min-h-[100px] pr-20"
                    />
                    <div className="absolute right-2 bottom-2 flex gap-2">
                      <Button size="sm" variant="ghost" className="p-2">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="p-2">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Esempi di comandi:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• "Analizza le performance del Q3 e suggerisci miglioramenti"</li>
                      <li>• "Crea un forecast di vendite per i prossimi 6 mesi"</li>
                      <li>• "Confronta i nostri KPI con i benchmark del settore"</li>
                      <li>• "Prepara una presentazione sui risultati finanziari"</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'insights':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Insight Automatici
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">Trend Positivo Rilevato</p>
                      <p className="text-sm text-blue-700">Le tue vendite sono cresciute del 15% nell'ultimo trimestre</p>
                    </div>
                    <div className="p-3 bg-amber-50 rounded-lg">
                      <p className="font-medium text-amber-900">Attenzione Cash Flow</p>
                      <p className="text-sm text-amber-700">Prevista una diminuzione di liquidità nei prossimi 30 giorni</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900">Opportunità di Crescita</p>
                      <p className="text-sm text-green-700">Il margine lordo è migliorato del 8% rispetto all'anno scorso</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Raccomandazioni AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                      <p className="font-medium">Ottimizza i Costi Operativi</p>
                      <p className="text-sm text-gray-600">Riduci del 12% le spese generali per migliorare la redditività</p>
                    </div>
                    <div className="p-3 border-l-4 border-green-500 bg-green-50">
                      <p className="font-medium">Investimenti Consigliati</p>
                      <p className="text-sm text-gray-600">Aumenta il budget marketing del 20% per massimizzare il ROI</p>
                    </div>
                    <div className="p-3 border-l-4 border-purple-500 bg-purple-50">
                      <p className="font-medium">Diversificazione Portfolio</p>
                      <p className="text-sm text-gray-600">Considera l'espansione in nuovi mercati geografici</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Solutions
          </h1>
          <p className="text-gray-600 mt-2">Intelligent recommendations and insights tailored to your business</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-0 px-4 py-2 rounded-full">
          <Brain className="h-4 w-4 mr-2" />
          AI Powered
        </Badge>
      </div>

      {/* AI Features Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {aiFeatures.map((feature) => {
          const Icon = feature.icon;
          const isActive = activeTab === feature.id;
          
          return (
            <Card 
              key={feature.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isActive ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setActiveTab(feature.id as any)}
            >
              <CardContent className="p-4 text-center">
                <div className={`mx-auto mb-2 p-2 rounded-full w-fit ${
                  feature.color === 'blue' ? 'bg-blue-100' :
                  feature.color === 'green' ? 'bg-green-100' :
                  feature.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    feature.color === 'blue' ? 'text-blue-600' :
                    feature.color === 'green' ? 'text-green-600' :
                    feature.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {activeTab === 'assistant' && 'Assistente AI Finsk.Ai'}
            {activeTab === 'chat' && 'Chat AI'}
            {activeTab === 'insights' && 'AI Insights'}
            {activeTab === 'scenario' && 'Scenario Analysis'}
          </h2>
          <p className="text-gray-600">
            {activeTab === 'assistant' && 'Analisi automatica e comandi intelligenti per la tua azienda'}
            {activeTab === 'chat' && 'Comunica direttamente con l\'AI per ottenere risposte immediate'}
            {activeTab === 'insights' && 'Insights automatici e raccomandazioni basate sui tuoi dati'}
            {activeTab === 'scenario' && 'Esplora diversi scenari futuri per la tua azienda'}
          </p>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default AISolution;
