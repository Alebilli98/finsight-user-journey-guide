
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, MicOff, Send, Brain, Download, Calendar, Mail, 
  TrendingUp, AlertTriangle, CheckCircle, FileText, Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAssistantProps {
  financialData?: any;
}

interface AIResponse {
  id: string;
  type: 'analysis' | 'command' | 'report';
  content: string;
  action?: {
    type: 'download' | 'email' | 'calendar' | 'plan';
    title: string;
    data?: any;
  };
  timestamp: string;
}

const AIAssistant = ({ financialData }: AIAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const recognitionRef = useRef<any>(null);

  // Inizializza il riconoscimento vocale
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'it-IT';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Errore",
          description: "Errore nel riconoscimento vocale. Riprova.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  // Genera automaticamente suggerimenti all'avvio
  useEffect(() => {
    if (financialData && Object.keys(financialData).length > 0) {
      generateAutomaticInsights();
    }
  }, [financialData]);

  const generateAutomaticInsights = () => {
    const insights: AIResponse[] = [
      {
        id: Date.now().toString(),
        type: 'analysis',
        content: `📊 **Analisi Automatica dei KPI**

**Performance Finanziaria:**
- Margine Lordo: ${((financialData?.grossMargin || 0)).toFixed(1)}% ${(financialData?.grossMargin || 0) > 40 ? '✅ Buono' : '⚠️ Da migliorare'}
- Burn Rate: €${(financialData?.burnRate || 0).toLocaleString()}/mese
- Cash Runway: ${(financialData?.cashRunway || 0)} mesi ${(financialData?.cashRunway || 0) > 12 ? '✅' : '🚨'}

**Aree di Miglioramento:**
${(financialData?.cashRunway || 0) < 12 ? '• Urgente: Estendere il cash runway oltre 12 mesi' : ''}
${(financialData?.grossMargin || 0) < 40 ? '• Ottimizzare il margine lordo riducendo i costi o aumentando i prezzi' : ''}
• Automatizzare la raccolta crediti per migliorare il cash flow
• Diversificare le fonti di ricavo per ridurre il rischio

**Raccomandazioni Strategiche:**
1. Focus su clienti ad alto valore per migliorare l'LTV
2. Implementare metriche di efficienza operativa
3. Pianificare strategia di fundraising se necessario`,
        timestamp: new Date().toLocaleTimeString()
      }
    ];

    setResponses(insights);
  };

  const handleVoiceCommand = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Non supportato",
        description: "Il riconoscimento vocale non è supportato su questo browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const processCommand = async (input: string) => {
    setIsProcessing(true);
    
    // Simula elaborazione AI
    await new Promise(resolve => setTimeout(resolve, 2000));

    const lowerInput = input.toLowerCase();
    let response: AIResponse;

    if (lowerInput.includes('meeting') || lowerInput.includes('riunione')) {
      response = {
        id: Date.now().toString(),
        type: 'command',
        content: `✅ **Meeting Pianificato**
        
Ho pianificato una riunione con le Risorse Umane per mercoledì alle 9:00.

**Dettagli:**
- Titolo: Riunione con HR
- Data: Mercoledì, ${new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
- Ora: 09:00
- Durata: 1 ora
- Partecipanti: Te, Team HR

L'invito è stato inviato automaticamente ai partecipanti.`,
        action: {
          type: 'calendar',
          title: 'Aggiungi al Calendario',
          data: { event: 'Riunione HR', date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) }
        },
        timestamp: new Date().toLocaleTimeString()
      };
    } else if (lowerInput.includes('report') || lowerInput.includes('trimestrale')) {
      response = {
        id: Date.now().toString(),
        type: 'report',
        content: `📈 **Report Vendite Trimestrale Generato**

Ho preparato il report completo delle vendite Q3 2024:

**Highlights:**
- Ricavi Totali: €${(financialData?.annualRevenue || 0).toLocaleString()}
- Crescita YoY: +15.3%
- Margine Lordo: ${(financialData?.grossMargin || 0).toFixed(1)}%
- Nuovi Clienti: 45

**Analisi Trend:**
- Prodotto A: +23% vendite
- Servizio B: +8% vendite
- Canale Online: +31% crescita

Il PDF dettagliato è pronto per il download e sarà inviato via email.`,
        action: {
          type: 'download',
          title: 'Scarica Report PDF',
          data: { fileName: 'report-vendite-q3-2024.pdf' }
        },
        timestamp: new Date().toLocaleTimeString()
      };
    } else if (lowerInput.includes('costi') || lowerInput.includes('ridurre')) {
      response = {
        id: Date.now().toString(),
        type: 'command',
        content: `💡 **Piano di Riduzione Costi del 10%**

Ho analizzato la tua struttura costi e preparato un piano strategico:

**Aree di Intervento (€${Math.round((financialData?.operatingExpenses || 50000) * 0.1).toLocaleString()} risparmi annuali):**

1. **Tecnologia & Software (30% del target)**
   - Consolidamento licenze software: -€2,400/anno
   - Rinegoziazione contratti cloud: -€1,800/anno

2. **Operazioni & Logistica (40% del target)**
   - Ottimizzazione processi: -€3,200/anno
   - Automatizzazione tasks ripetitivi: -€2,000/anno

3. **Marketing & Vendite (30% del target)**
   - Focus su canali ad alto ROI: -€1,800/anno
   - Ottimizzazione campagne: -€1,200/anno

**Timeline Implementazione:**
- Settimana 1-2: Audit dettagliato
- Settimana 3-4: Rinegoziazioni contratti
- Mese 2: Implementazione automazioni
- Mese 3: Monitoraggio risultati`,
        action: {
          type: 'plan',
          title: 'Scarica Piano Completo',
          data: { type: 'cost-reduction' }
        },
        timestamp: new Date().toLocaleTimeString()
      };
    } else {
      response = {
        id: Date.now().toString(),
        type: 'analysis',
        content: `🤖 **Assistente Tralis AI**

Ho analizzato la tua richiesta: "${input}"

Basandomi sui tuoi dati finanziari, ecco la mia risposta:

**Analisi Attuale:**
- Stato finanziario: ${(financialData?.cashRunway || 0) > 12 ? 'Stabile' : 'Richiede attenzione'}
- Performance: ${(financialData?.grossMargin || 0) > 50 ? 'Eccellente' : 'In crescita'}
- Cash Flow: ${(financialData?.operatingCashFlow || 0) > 0 ? 'Positivo' : 'Da ottimizzare'}

**Suggerimenti:**
- Monitora i KPI chiave settimanalmente
- Implementa dashboard real-time
- Pianifica revisioni strategiche mensili

Vuoi che approfondisca qualche aspetto specifico?`,
        timestamp: new Date().toLocaleTimeString()
      };
    }

    setResponses(prev => [response, ...prev]);
    setMessage("");
    setIsProcessing(false);

    toast({
      title: "Comando Processato",
      description: "L'AI ha elaborato la tua richiesta con successo.",
    });
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;
    processCommand(message);
  };

  const handleAction = (action: any) => {
    switch (action.type) {
      case 'download':
        // Simula download
        toast({
          title: "Download Avviato",
          description: `Il file ${action.data?.fileName || 'documento.pdf'} è stato scaricato.`,
        });
        break;
      case 'email':
        toast({
          title: "Email Inviata",
          description: "Il report è stato inviato via email.",
        });
        break;
      case 'calendar':
        toast({
          title: "Evento Aggiunto",
          description: "L'evento è stato aggiunto al calendario.",
        });
        break;
      case 'plan':
        toast({
          title: "Piano Scaricato",
          description: "Il piano strategico è stato scaricato.",
        });
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Assistente AI Tralis AI</h3>
          <p className="text-gray-600">Analisi automatica e comandi intelligenti per la tua azienda</p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
          <Brain className="h-3 w-3 mr-1" />
          AI Avanzata
        </Badge>
      </div>

      {/* Input Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Comando AI
          </CardTitle>
          <CardDescription>
            Scrivi o parla per dare comandi all'assistente AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Es: 'Fissa un meeting con le risorse umane mercoledì alle 9' oppure 'Prepara un report vendite trimestrale'"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
                rows={2}
              />
              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleVoiceCommand}
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  className="h-10 w-10"
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={isProcessing || !message.trim()}
                  size="icon"
                  className="h-10 w-10"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            {isListening && (
              <Alert>
                <Mic className="h-4 w-4" />
                <AlertDescription>
                  🎤 Sto ascoltando... Parla chiaramente il tuo comando.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Responses */}
      <div className="space-y-4">
        {responses.map((response) => (
          <Card key={response.id} className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {response.type === 'analysis' && <Brain className="h-4 w-4 text-blue-600" />}
                  {response.type === 'command' && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {response.type === 'report' && <FileText className="h-4 w-4 text-purple-600" />}
                  <span className="text-sm font-medium">
                    {response.type === 'analysis' && 'Analisi AI'}
                    {response.type === 'command' && 'Comando Eseguito'}
                    {response.type === 'report' && 'Report Generato'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {response.timestamp}
                </div>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                  {response.content}
                </pre>
              </div>

              {response.action && (
                <div className="mt-4 pt-3 border-t">
                  <Button
                    onClick={() => handleAction(response.action)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {response.action.type === 'download' && <Download className="h-3 w-3" />}
                    {response.action.type === 'email' && <Mail className="h-3 w-3" />}
                    {response.action.type === 'calendar' && <Calendar className="h-3 w-3" />}
                    {response.action.type === 'plan' && <FileText className="h-3 w-3" />}
                    {response.action.title}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {responses.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">Assistente AI Pronto</h3>
            <p className="text-gray-600 text-sm">
              L'AI analizzerà automaticamente i tuoi dati finanziari e genererà suggerimenti strategici.
              Usa i comandi vocali o scritti per interazioni avanzate.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIAssistant;
