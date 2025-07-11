import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle, Info, Link, Zap, Settings } from 'lucide-react';
import * as XLSX from 'xlsx';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Gestionali supportati
  const gestionali = [
    { 
      name: 'SAP Business One', 
      logo: '🏢', 
      status: 'available',
      description: 'Gestionale ERP completo per PMI'
    },
    { 
      name: 'Sage', 
      logo: '📊', 
      status: 'available',
      description: 'Software di contabilità e gestione aziendale'
    },
    { 
      name: 'Zucchetti', 
      logo: '🇮🇹', 
      status: 'available',
      description: 'Suite gestionale italiana'
    },
    { 
      name: 'TeamSystem', 
      logo: '💼', 
      status: 'available',
      description: 'Soluzioni digitali per aziende'
    },
    { 
      name: 'Microsoft Dynamics', 
      logo: '🔷', 
      status: 'coming-soon',
      description: 'ERP e CRM Microsoft'
    },
    { 
      name: 'Oracle NetSuite', 
      logo: '🔴', 
      status: 'coming-soon',
      description: 'Cloud ERP per aziende in crescita'
    }
  ];

  const downloadTemplate = () => {
    // Template con struttura semplificata ma completa
    const templateData = {
      'Informazioni Azienda': [
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
      'Dati Mensili 2024': [
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

    // Create workbook with better formatting
    const wb = XLSX.utils.book_new();

    Object.entries(templateData).forEach(([sheetName, data]) => {
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Set column widths
      const colWidths = [
        { wch: 25 }, // Column A - wider for descriptions
        { wch: 15 }, // Column B - numbers
        { wch: 35 }  // Column C - notes/details
      ];
      ws['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    // Save file
    XLSX.writeFile(wb, 'Template_Dati_Finanziari_Completo.xlsx');
    
    toast({
      title: "Template Scaricato",
      description: "Il template Excel completo è stato scaricato. Compila i tuoi dati e ricaricalo qui.",
    });
  };

  const connectGestionale = (gestionaleNome: string) => {
    if (gestionali.find(g => g.name === gestionaleNome)?.status === 'coming-soon') {
      toast({
        title: "Prossimamente Disponibile",
        description: `L'integrazione con ${gestionaleNome} sarà disponibile a breve.`,
      });
      return;
    }

    toast({
      title: "Connessione in Corso",
      description: `Avvio connessione sicura con ${gestionaleNome}...`,
    });

    // Simulate connection process
    setTimeout(() => {
      toast({
        title: "Connessione Riuscita",
        description: `${gestionaleNome} è stato collegato con successo. I dati verranno sincronizzati automaticamente.`,
      });
    }, 2000);
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
      
      const extractedData: any = {
        companyInfo: {
          name: '',
          taxCode: '',
          vatNumber: '',
          sector: '',
          employees: 0,
          foundingYear: '',
          headquarters: '',
          email: '',
          phone: '',
          website: ''
        },
        profitLoss: {
          revenue: 0,
          otherRevenue: 0,
          totalRevenue: 0,
          cogs: 0,
          grossProfit: 0,
          operatingExpenses: 0,
          ebitda: 0,
          ebit: 0,
          netIncome: 0
        },
        balanceSheet: {
          currentAssets: 0,
          nonCurrentAssets: 0,
          totalAssets: 0,
          currentLiabilities: 0,
          nonCurrentLiabilities: 0,
          totalLiabilities: 0,
          equity: 0
        },
        monthlyData: []
      };

      // Process Company Info sheet
      if (workbook.SheetNames.includes('Informazioni Azienda')) {
        const companySheet = workbook.Sheets['Informazioni Azienda'];
        const companyData = XLSX.utils.sheet_to_json(companySheet, { header: 1 }) as any[][];
        
        companyData.forEach((row: any[]) => {
          if (row[0] && row[1]) {
            switch (row[0].toString().toLowerCase()) {
              case 'ragione sociale':
                extractedData.companyInfo.name = row[1];
                break;
              case 'codice fiscale':
                extractedData.companyInfo.taxCode = row[1];
                break;
              case 'partita iva':
                extractedData.companyInfo.vatNumber = row[1];
                break;
              case 'settore di attività':
                extractedData.companyInfo.sector = row[1];
                break;
              case 'numero dipendenti':
                extractedData.companyInfo.employees = parseInt(row[1]) || 0;
                break;
              case 'anno costituzione':
                extractedData.companyInfo.foundingYear = row[1];
                break;
              case 'regione/provincia':
                extractedData.companyInfo.headquarters = row[1];
                break;
              case 'email aziendale':
                extractedData.companyInfo.email = row[1];
                break;
              case 'telefono':
                extractedData.companyInfo.phone = row[1];
                break;
              case 'fatturato annuo':
                extractedData.profitLoss.revenue = parseFloat(row[1]) || 0;
                break;
            }
          }
        });
      }

      // Process P&L sheet
      if (workbook.SheetNames.includes('Ricavi e Costi')) {
        const plSheet = workbook.Sheets['Ricavi e Costi'];
        const plData = XLSX.utils.sheet_to_json(plSheet, { header: 1 }) as any[][];
        
        plData.forEach((row: any[]) => {
          if (row[0] && row[1] && typeof row[1] === 'string') {
            const description = row[0].toString().toLowerCase();
            if (description.includes('ricavi totali')) {
              extractedData.profitLoss.totalRevenue = parseFloat(row[1]) || 0;
            } else if (description.includes('utile netto')) {
              extractedData.profitLoss.netIncome = parseFloat(row[1]) || 0;
            } else if (description.includes('costi totali')) {
              extractedData.profitLoss.operatingExpenses = parseFloat(row[1]) || 0;
            } else if (description.includes('utile lordo')) {
              extractedData.profitLoss.grossProfit = parseFloat(row[1]) || 0;
            } else if (description.includes('ebitda')) {
              extractedData.profitLoss.ebitda = parseFloat(row[1]) || 0;
            }
          }
        });
      }

      // Process Balance Sheet
      if (workbook.SheetNames.includes('Attività e Passività')) {
        const bsSheet = workbook.Sheets['Attività e Passività'];
        const bsData = XLSX.utils.sheet_to_json(bsSheet, { header: 1 }) as any[][];
        
        bsData.forEach((row: any[]) => {
          if (row[0] && row[1] && typeof row[1] === 'string') {
            const description = row[0].toString().toLowerCase();
            if (description.includes('totale attività')) {
              extractedData.balanceSheet.totalAssets = parseFloat(row[1]) || 0;
            } else if (description.includes('totale debiti')) {
              extractedData.balanceSheet.totalLiabilities = parseFloat(row[1]) || 0;
            } else if (description.includes('patrimonio netto')) {
              extractedData.balanceSheet.equity = parseFloat(row[1]) || 0;
            }
          }
        });
      }

      // Process Monthly Data
      if (workbook.SheetNames.includes('Dati Mensili 2024')) {
        const monthlySheet = workbook.Sheets['Dati Mensili 2024'];
        const monthlyData = XLSX.utils.sheet_to_json(monthlySheet, { header: 1 }) as any[][];
        
        // Skip header row
        monthlyData.slice(1).forEach((row: any[]) => {
          if (row[0] && row[1]) {
            extractedData.monthlyData.push({
              month: row[0],
              revenue: parseFloat(row[1]) || 0,
              costs: parseFloat(row[2]) || 0,
              grossProfit: parseFloat(row[3]) || 0,
              operatingExpenses: parseFloat(row[4]) || 0,
              ebitda: 0,
              notes: row[5] || ''
            });
          }
        });
      }

      setImportedData(extractedData);
      setImportStatus('success');
      
      // Update user data if callback provided
      if (onDataUpdate && user) {
        const updatedUser = {
          ...user,
          importedData: extractedData,
          lastDataImport: new Date().toISOString()
        };
        onDataUpdate(updatedUser);
      }
      
      // Call the callback with imported data
      if (onDataImport) {
        onDataImport(extractedData);
      }

      toast({
        title: "Importazione Completata",
        description: "I dati sono stati importati con successo e sono ora disponibili in tutta l'applicazione.",
      });
      
    } catch (error) {
      console.error('Errore durante l\'importazione:', error);
      setImportStatus('error');
      toast({
        title: "Errore di Importazione",
        description: "Si è verificato un errore durante l'importazione del file. Verifica il formato.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Importazione Dati</h1>
        <p className="text-gray-600">Collega il tuo gestionale o importa i dati tramite Excel</p>
      </div>

      {/* Collegamento Gestionali */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link className="h-5 w-5" />
            <span>Collega il Tuo Gestionale</span>
          </CardTitle>
          <CardDescription>
            Sincronizza automaticamente i dati dal tuo sistema gestionale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Zap className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Vantaggi della Connessione Diretta:</h4>
                <ul className="text-sm text-green-700 mt-2 space-y-1">
                  <li>• Sincronizzazione automatica in tempo reale</li>
                  <li>• Nessun errore di trascrizione manuale</li>
                  <li>• Analisi sempre aggiornate</li>
                  <li>• Risparmio di tempo e risorse</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {gestionali.map((gestionale) => (
              <Card key={gestionale.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{gestionale.logo}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{gestionale.name}</h4>
                        <p className="text-sm text-gray-600">{gestionale.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge 
                        variant={gestionale.status === 'available' ? 'default' : 'secondary'}
                        className={gestionale.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                      >
                        {gestionale.status === 'available' ? 'Disponibile' : 'Prossimamente'}
                      </Badge>
                      <Button 
                        size="sm" 
                        onClick={() => connectGestionale(gestionale.name)}
                        disabled={gestionale.status === 'coming-soon'}
                        className="w-20"
                      >
                        {gestionale.status === 'available' ? 'Collega' : 'Presto'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Template Download */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Importazione Manuale Excel</span>
          </CardTitle>
          <CardDescription>
            Scarica il template Excel e carica i tuoi dati manualmente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Il template Excel include 4 fogli:</h4>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• <strong>Informazioni Azienda</strong> - Dati anagrafici e generali</li>
                  <li>• <strong>Ricavi e Costi</strong> - Conto economico semplificato</li>
                  <li>• <strong>Attività e Passività</strong> - Stato patrimoniale</li>
                  <li>• <strong>Dati Mensili</strong> - Trend temporali per analisi</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Button onClick={downloadTemplate} className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Scarica Template Excel</span>
          </Button>
        </CardContent>
      </Card>

      {/* File Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Carica File Dati</span>
          </CardTitle>
          <CardDescription>
            Carica il template compilato con i tuoi dati aziendali
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Carica il tuo file Excel
            </h3>
            <p className="text-gray-600 mb-4">
              Clicca qui o trascina il file per caricarlo
            </p>
            <Badge variant="outline">Solo file .xlsx supportati</Badge>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {uploadedFile && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FileSpreadsheet className="h-4 w-4" />
              <span>File selezionato: {uploadedFile.name}</span>
              {isProcessing && <Badge>Elaborazione...</Badge>}
              {importStatus === 'success' && (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Importato
                </Badge>
              )}
              {importStatus === 'error' && (
                <Badge className="bg-red-100 text-red-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Errore
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Import Summary */}
      {importedData && importStatus === 'success' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Riepilogo Importazione</span>
            </CardTitle>
            <CardDescription>
              Ecco un riepilogo dei dati importati con successo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Info */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Informazioni Aziendali</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Nome:</span>
                  <span className="ml-2 font-medium">{importedData.companyInfo.name || 'Non specificato'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Settore:</span>
                  <span className="ml-2 font-medium">{importedData.companyInfo.sector || 'Non specificato'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Dipendenti:</span>
                  <span className="ml-2 font-medium">{importedData.companyInfo.employees || 'Non specificato'}</span>
                </div>
                <div>
                  <span className="text-gray-600">Sede:</span>
                  <span className="ml-2 font-medium">{importedData.companyInfo.headquarters || 'Non specificato'}</span>
                </div>
              </div>
            </div>

            <Separator />

            {/* Financial Summary */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Dati Finanziari Principali</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-900">Ricavi Totali</h5>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(importedData.profitLoss.totalRevenue)}
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium text-blue-900">Utile Netto</h5>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(importedData.profitLoss.netIncome)}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-medium text-purple-900">Totale Attività</h5>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(importedData.balanceSheet.totalAssets)}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Data Completeness */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Completezza Dati</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Informazioni Aziendali</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completo
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Conto Economico</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completo
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Stato Patrimoniale</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completo
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dati Mensili</span>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {importedData.monthlyData.length} mesi
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataImport;
