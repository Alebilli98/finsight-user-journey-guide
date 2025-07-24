import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Info, Database, Plug, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import SectorTemplates from './data-import/SectorTemplates';
import { useFileProcessor } from './data-import/FileProcessor';

interface DataImportProps {
  user?: any;
  onDataUpdate?: (updatedUser: any) => void;
  onDataImport?: (data: any) => void;
}

const DataImport = ({ user, onDataUpdate, onDataImport }: DataImportProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("file-upload");
  
  // External Integration states
  const [systemType, setSystemType] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedSystems, setConnectedSystems] = useState<any[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const userIndustry = user?.industry || 'commerce';

  const { processExcelFile, isProcessing, importStatus, importedData } = useFileProcessor({
    onDataUpdate: (data) => {
      if (onDataUpdate && user) {
        const updatedUser = {
          ...user,
          companyInfo: { ...user.companyInfo, ...data.companyInfo },
          financialData: { ...user.financialData, ...data.financialData },
          monthlyData: data.monthlyData,
          balanceSheet: data.balanceSheet,
          lastDataImport: new Date().toISOString()
        };
        onDataUpdate(updatedUser);
      }
      
      if (onDataImport) {
        onDataImport(data);
      }
    },
    userIndustry
  });

  const systemTypes = [
    "SAP Business One", "Sage", "Zucchetti", "TeamSystem", 
    "Microsoft Dynamics", "Oracle NetSuite", "QuickBooks", "Xero", "Altri"
  ];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      await processExcelFile(file);
    }
  };

  const handleTestConnection = async () => {
    if (!systemType || !apiUrl || !apiKey) {
      toast({
        title: "Dati Mancanti",
        description: "Compila tutti i campi per testare la connessione.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newConnection = {
        id: Date.now(),
        systemType,
        apiUrl,
        status: 'connected',
        lastSync: new Date().toISOString()
      };

      setConnectedSystems([...connectedSystems, newConnection]);
      
      toast({
        title: "Connessione Riuscita",
        description: `${systemType} è stato collegato con successo.`,
      });

      setSystemType("");
      setApiUrl("");
      setApiKey("");
      
    } catch (error) {
      toast({
        title: "Errore di Connessione",
        description: "Impossibile connettersi al sistema. Verifica i dati inseriti.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Data Import & Integration
          </h1>
          <p className="text-gray-600 mt-2">Importa i dati finanziari e connetti sistemi esterni</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-0 px-4 py-2 rounded-full">
            <Upload className="h-4 w-4 mr-2" />
            Data Import
          </Badge>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-12">
                <TabsTrigger 
                  value="file-upload" 
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Caricamento File
                </TabsTrigger>
                <TabsTrigger 
                  value="external-integration"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Integrazioni Esterne
                </TabsTrigger>
                <TabsTrigger 
                  value="connection-status"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Stato Connessioni
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="file-upload" className="p-6 space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Carica Dati Finanziari</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Carica il template Excel completo per aggiornare automaticamente tutte le metriche e KPI
              </p>

              {/* Template Section */}
              <div className="mb-8">
                <SectorTemplates userIndustry={userIndustry} />
              </div>

              {/* File Upload Area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="bg-gradient-to-r from-blue-500 to-green-500 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Trascina e rilascia il template compilato qui
                </h3>
                <p className="text-gray-600 mb-4">
                  oppure clicca per selezionare e caricare
                </p>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Formati supportati: .xlsx, .csv
                </Badge>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />

              {uploadedFile && (
                <Card className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-600">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isProcessing && (
                          <Badge className="bg-blue-100 text-blue-800">
                            Elaborazione...
                          </Badge>
                        )}
                        {importStatus === 'success' && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Importato con Successo
                          </Badge>
                        )}
                        {importStatus === 'error' && (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Errore - Verifica i dati
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {importedData && (
                      <div className="mt-4 p-3 bg-white rounded border">
                        <h4 className="font-medium text-gray-900 mb-2">Dati Importati:</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          {importedData.companyInfo?.companyName && (
                            <div>Azienda: {importedData.companyInfo.companyName}</div>
                          )}
                          {importedData.financialData?.annualRevenue && (
                            <div>Ricavi: €{importedData.financialData.annualRevenue.toLocaleString()}</div>
                          )}
                          {importedData.financialData?.grossMargin && (
                            <div>Margine Lordo: {importedData.financialData.grossMargin.toFixed(1)}%</div>
                          )}
                          {importedData.financialData?.roi && (
                            <div>ROI: {importedData.financialData.roi.toFixed(1)}%</div>
                          )}
                          {importedData.monthlyData?.length > 0 && (
                            <div>Dati Mensili: {importedData.monthlyData.length} mesi</div>
                          )}
                        </div>
                        
                        {importedData.errors && importedData.errors.length > 0 && (
                          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
                            <p className="text-sm text-red-700 font-medium">Attenzione:</p>
                            <ul className="text-sm text-red-600 mt-1">
                              {importedData.errors.map((error: string, index: number) => (
                                <li key={index}>• {error}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="external-integration" className="p-6 space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Plug className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Integrazioni Esterne</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Connetti i tuoi sistemi di contabilità o gestione finanziaria esistenti
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="system-type">Tipo di Sistema</Label>
                  <Select value={systemType} onValueChange={setSystemType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona il tuo software" />
                    </SelectTrigger>
                    <SelectContent>
                      {systemTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="api-url">URL API</Label>
                  <Input
                    id="api-url"
                    type="url"
                    placeholder="https://api.yoursystem.com/v1"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="api-key">Chiave API</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="La tua chiave API"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleTestConnection} 
                  disabled={isConnecting}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-full"
                >
                  {isConnecting ? "Testando la Connessione..." : "Testa la Connessione"}
                </Button>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg mt-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Guida all'Installazione</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Hai bisogno di aiuto per configurare l'integrazione? Contatta il nostro team di supporto per assistenza con la configurazione dell'API e la mappatura dei dati.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="connection-status" className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Stato Connessioni</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Monitora i tuoi sistemi connessi e le fonti di dati
              </p>

              {connectedSystems.length === 0 ? (
                <div className="text-center py-12">
                  <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-500 mb-2">
                    Nessun sistema esterno connesso
                  </h4>
                  <p className="text-gray-400 mb-4">
                    Usa la tab Integrazione per connettere i tuoi sistemi
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("external-integration")}
                  >
                    Connetti Sistema
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {connectedSystems.map((system) => (
                    <Card key={system.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Database className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{system.systemType}</h4>
                              <p className="text-sm text-gray-600">{system.apiUrl}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Connesso
                            </Badge>
                            <p className="text-xs text-gray-500">
                              Ultima sincronizzazione: {new Date(system.lastSync).toLocaleString('it-IT')}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataImport;
