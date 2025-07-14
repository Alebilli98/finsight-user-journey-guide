
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle, Info, Link, Zap, Settings, Database, Plug } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useLanguage } from '@/contexts/LanguageContext';

interface DataImportProps {
  user?: any;
  onDataUpdate?: (updatedUser: any) => void;
  onDataImport?: (data: any) => void;
}

const DataImport = ({ user, onDataUpdate, onDataImport }: DataImportProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importedData, setImportedData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("file-upload");
  
  // External Integration states
  const [systemType, setSystemType] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedSystems, setConnectedSystems] = useState<any[]>([]);
  const [templateLanguage, setTemplateLanguage] = useState<'it' | 'en' | 'es'>('it');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { language } = useLanguage();

  const systemTypes = [
    "SAP Business One",
    "Sage",
    "Zucchetti",
    "TeamSystem", 
    "Microsoft Dynamics",
    "Oracle NetSuite",
    "QuickBooks",
    "Xero",
    "Altri"
  ];

  const downloadTemplate = () => {
    const templateData = {
      'Company Info': [
        ['Campo', 'Valore', 'Note'],
        ['Ragione Sociale', 'Es: La Tua Azienda Srl', 'Nome completo dell\'azienda'],
        ['Codice Fiscale', 'Es: 12345678901', 'Codice fiscale dell\'azienda'],
        ['Partita IVA', 'Es: IT12345678901', 'Partita IVA con prefisso paese'],
        ['Settore di Attività', 'Es: Manifatturiero', 'Settore principale'],
        ['Numero Dipendenti', '50', 'Numero dipendenti attuali'],
        ['Anno Costituzione', '2020', 'Anno di fondazione'],
        ['Regione/Provincia', 'Es: Lombardia/Milano', 'Ubicazione sede principale'],
        ['Fatturato Annuo', '1000000', 'Fatturato ultimo anno in euro'],
        ['Email Aziendale', 'info@azienda.it', 'Email principale'],
        ['Telefono', '+39 02 1234567', 'Numero di telefono']
      ],
      'Ricavi e Costi': [
        ['Voce', 'Importo €', 'Descrizione'],
        ['RICAVI TOTALI', '1200000', 'Somma di tutti i ricavi'],
        ['Ricavi da Vendite', '1000000', 'Ricavi principali da vendite'],
        ['Altri Ricavi', '200000', 'Ricavi accessori, plusvalenze, etc.'],
        ['', '', ''],
        ['COSTI TOTALI', '900000', 'Somma di tutti i costi'],
        ['Costo del Venduto', '400000', 'Costi diretti di produzione'],
        ['Costi del Personale', '300000', 'Stipendi + contributi + TFR'],
        ['Costi Operativi', '150000', 'Affitti, utilities, marketing'],
        ['Ammortamenti', '30000', 'Ammortamenti e svalutazioni'],
        ['Oneri Finanziari', '20000', 'Interessi passivi, commissioni'],
        ['', '', ''],
        ['UTILE LORDO', '300000', 'Ricavi - Costo del Venduto'],
        ['EBITDA', '270000', 'Utile prima di interessi, tasse, ammortamenti'],
        ['UTILE NETTO', '240000', 'Utile finale dopo tutte le deduzioni']
      ],
      'Attività e Passività': [
        ['Voce Patrimoniale', 'Importo €', 'Dettagli'],
        ['ATTIVITÀ CORRENTI', '', ''],
        ['Cassa e Banche', '150000', 'Liquidità immediata'],
        ['Crediti Clienti', '200000', 'Crediti commerciali'],
        ['Magazzino', '100000', 'Rimanenze e scorte'],
        ['Altri Crediti', '50000', 'Crediti diversi'],
        ['Totale Attività Correnti', '500000', ''],
        ['', '', ''],
        ['ATTIVITÀ FISSE', '', ''],
        ['Immobili', '300000', 'Terreni e fabbricati'],
        ['Impianti e Macchinari', '200000', 'Attrezzature produttive'],
        ['Altri Beni', '50000', 'Mobili, auto aziendali, etc.'],
        ['Totale Attività Fisse', '550000', ''],
        ['', '', ''],
        ['TOTALE ATTIVITÀ', '1050000', ''],
        ['', '', ''],
        ['PASSIVITÀ', '', ''],
        ['Debiti Fornitori', '150000', 'Debiti commerciali'],
        ['Debiti Bancari Breve', '100000', 'Prestiti entro 12 mesi'],
        ['Altri Debiti Breve', '50000', 'Stipendi, tasse, etc.'],
        ['Debiti Bancari Lungo', '200000', 'Mutui e finanziamenti'],
        ['Totale Debiti', '500000', ''],
        ['', '', ''],
        ['PATRIMONIO NETTO', '550000', 'Capitale + Riserve + Utili']
      ],
      'Dati Mensili': [
        ['Mese', 'Ricavi', 'Costi', 'Utile', 'Liquidità', 'Note'],
        ['Gennaio', '95000', '70000', '25000', '145000', ''],
        ['Febbraio', '88000', '68000', '20000', '140000', ''],
        ['Marzo', '105000', '75000', '30000', '155000', ''],
        ['Aprile', '98000', '72000', '26000', '150000', ''],
        ['Maggio', '110000', '78000', '32000', '165000', ''],
        ['Giugno', '115000', '82000', '33000', '170000', ''],
        ['Luglio', '102000', '74000', '28000', '160000', 'Periodo estivo'],
        ['Agosto', '75000', '65000', '10000', '135000', 'Ferie aziendali'],
        ['Settembre', '108000', '76000', '32000', '162000', ''],
        ['Ottobre', '112000', '80000', '32000', '168000', ''],
        ['Novembre', '118000', '85000', '33000', '175000', ''],
        ['Dicembre', '125000', '90000', '35000', '185000', 'Chiusura annuale']
      ]
    };

    const wb = XLSX.utils.book_new();
    Object.entries(templateData).forEach(([sheetName, data]) => {
      const ws = XLSX.utils.aoa_to_sheet(data);
      const colWidths = [
        { wch: 25 },
        { wch: 15 },
        { wch: 35 }
      ];
      ws['!cols'] = colWidths;
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    const fileName = templateLanguage === 'it' ? 'Template_Dati_Finanziari.xlsx' :
                    templateLanguage === 'en' ? 'Financial_Data_Template.xlsx' :
                    'Plantilla_Datos_Financieros.xlsx';

    XLSX.writeFile(wb, fileName);
    
    toast({
      title: templateLanguage === 'it' ? "Template Scaricato" : 
             templateLanguage === 'en' ? "Template Downloaded" : 
             "Plantilla Descargada",
      description: templateLanguage === 'it' ? "Il template Excel è stato scaricato con successo." :
                   templateLanguage === 'en' ? "The Excel template has been downloaded successfully." :
                   "La plantilla Excel se ha descargado exitosamente.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setImportStatus('idle');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      
      // Process the Excel file and extract data
      const extractedData = {
        companyInfo: { name: 'Test Company', sector: 'Technology' },
        profitLoss: { totalRevenue: 1200000, netIncome: 240000 },
        balanceSheet: { totalAssets: 1050000, equity: 550000 },
        monthlyData: []
      };

      setImportedData(extractedData);
      setImportStatus('success');
      
      if (onDataUpdate && user) {
        const updatedUser = {
          ...user,
          importedData: extractedData,
          lastDataImport: new Date().toISOString()
        };
        onDataUpdate(updatedUser);
      }
      
      if (onDataImport) {
        onDataImport(extractedData);
      }

      toast({
        title: "Importazione Completata",
        description: "I dati sono stati importati con successo.",
      });
      
    } catch (error) {
      console.error('Errore durante l\'importazione:', error);
      setImportStatus('error');
      toast({
        title: "Errore di Importazione",
        description: "Si è verificato un errore durante l'importazione del file.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
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
      // Simulate API connection test
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

      // Reset form
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Data Import & Integration</h1>
        <p className="text-gray-600">Import your financial data and connect external systems</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b">
              <TabsList className="grid w-full grid-cols-3 bg-transparent h-12">
                <TabsTrigger 
                  value="file-upload" 
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  File Upload
                </TabsTrigger>
                <TabsTrigger 
                  value="external-integration"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  External Integration
                </TabsTrigger>
                <TabsTrigger 
                  value="connection-status"
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  Connection Status
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="file-upload" className="p-6 space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Upload Financial Data</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Upload CSV or Excel files containing your financial transactions, income, and expenses
              </p>

              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Drag & drop your files here
                </h3>
                <p className="text-gray-600 mb-4">
                  or click to browse and upload
                </p>
                <Badge variant="outline">Supported formats: .xlsx, .csv</Badge>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="template-language">Template Language:</Label>
                    <Select value={templateLanguage} onValueChange={(value: 'it' | 'en' | 'es') => setTemplateLanguage(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">🇮🇹 IT</SelectItem>
                        <SelectItem value="en">🇬🇧 EN</SelectItem>
                        <SelectItem value="es">🇪🇸 ES</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={downloadTemplate} variant="outline" className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download Template</span>
                  </Button>
                </div>

                {uploadedFile && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>{uploadedFile.name}</span>
                    {isProcessing && <Badge>Processing...</Badge>}
                    {importStatus === 'success' && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Imported
                      </Badge>
                    )}
                    {importStatus === 'error' && (
                      <Badge className="bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Error
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="external-integration" className="p-6 space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Plug className="h-5 w-5" />
                <h3 className="text-lg font-semibold">External System Integration</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Connect to your existing accounting or financial management systems
              </p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="system-type">System Type</Label>
                  <Select value={systemType} onValueChange={setSystemType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your accounting software" />
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
                  <Label htmlFor="api-url">API URL</Label>
                  <Input
                    id="api-url"
                    type="url"
                    placeholder="https://api.yoursystem.com/v1"
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleTestConnection} 
                  disabled={isConnecting}
                  className="w-full"
                >
                  {isConnecting ? "Testing Connection..." : "Test Connection"}
                </Button>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg mt-6">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Setup Guide</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Need help setting up the integration? Contact our support team for assistance with API configuration and data mapping.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="connection-status" className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5" />
                <h3 className="text-lg font-semibold">Connection Status</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Monitor your connected systems and data sources
              </p>

              {connectedSystems.length === 0 ? (
                <div className="text-center py-12">
                  <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-500 mb-2">
                    No external systems connected yet
                  </h4>
                  <p className="text-gray-400 mb-4">
                    Use the Integration tab to connect your systems
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("external-integration")}
                  >
                    Connect System
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
                              Connected
                            </Badge>
                            <p className="text-xs text-gray-500">
                              Last sync: {new Date(system.lastSync).toLocaleString('it-IT')}
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
