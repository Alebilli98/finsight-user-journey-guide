import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, Download, CheckCircle, AlertCircle, Info } from 'lucide-react';
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

  const downloadTemplate = () => {
    // Create template data structure
    const templateData = {
      'Informazioni Azienda': [
        ['Nome Azienda', 'La Tua Azienda Srl'],
        ['Codice Fiscale', '12345678901'],
        ['Partita IVA', 'IT12345678901'],
        ['Settore', 'Tecnologia'],
        ['Numero Dipendenti', '50'],
        ['Anno di Costituzione', '2020'],
        ['Sede Legale', 'Milano, Italia'],
        ['Email', 'info@tuaazienda.it'],
        ['Telefono', '+39 02 1234567'],
        ['Sito Web', 'www.tuaazienda.it']
      ],
      'Conto Economico': [
        ['Descrizione', 'Valore (€)', 'Note'],
        ['Ricavi delle Vendite', '1200000', 'Ricavi principali'],
        ['Altri Ricavi', '50000', 'Ricavi secondari'],
        ['Totale Ricavi', '1250000', ''],
        ['Costo del Venduto (COGS)', '480000', 'Costi diretti'],
        ['Utile Lordo', '770000', 'Ricavi - COGS'],
        ['Spese Operative', '', ''],
        ['- Stipendi e Contributi', '300000', ''],
        ['- Affitti e Utilities', '60000', ''],
        ['- Marketing e Pubblicità', '80000', ''],
        ['- Spese Amministrative', '40000', ''],
        ['- Altre Spese Operative', '50000', ''],
        ['Totale Spese Operative', '530000', ''],
        ['EBITDA', '240000', 'Utile Lordo - Spese Operative'],
        ['Ammortamenti', '25000', ''],
        ['EBIT', '215000', 'EBITDA - Ammortamenti'],
        ['Interessi Passivi', '15000', ''],
        ['Utile ante Imposte', '200000', 'EBIT - Interessi'],
        ['Imposte', '48000', '24% sull\'utile ante imposte'],
        ['Utile Netto', '152000', 'Utile finale']
      ],
      'Stato Patrimoniale': [
        ['ATTIVITÀ', 'Valore (€)', 'Note'],
        ['ATTIVITÀ CORRENTI', '', ''],
        ['Cassa e Equivalenti', '150000', 'Liquidità immediata'],
        ['Crediti Commerciali', '200000', 'Crediti vs clienti'],
        ['Rimanenze', '80000', 'Scorte di magazzino'],
        ['Altri Crediti', '30000', 'Altri crediti a breve'],
        ['Totale Attività Correnti', '460000', ''],
        ['ATTIVITÀ NON CORRENTI', '', ''],
        ['Immobilizzazioni Materiali', '250000', 'Macchinari, attrezzature'],
        ['Immobilizzazioni Immateriali', '50000', 'Software, brevetti'],
        ['Investimenti', '40000', 'Partecipazioni'],
        ['Totale Attività Non Correnti', '340000', ''],
        ['TOTALE ATTIVITÀ', '800000', ''],
        ['', '', ''],
        ['PASSIVITÀ E PATRIMONIO', 'Valore (€)', 'Note'],
        ['PASSIVITÀ CORRENTI', '', ''],
        ['Debiti Commerciali', '120000', 'Debiti vs fornitori'],
        ['Debiti Finanziari a Breve', '50000', 'Prestiti a breve termine'],
        ['Altri Debiti', '80000', 'Stipendi, tasse, etc.'],
        ['Totale Passività Correnti', '250000', ''],
        ['PASSIVITÀ NON CORRENTI', '', ''],
        ['Debiti Finanziari a Lungo', '150000', 'Mutui, finanziamenti'],
        ['Altri Debiti a Lungo', '20000', 'Altri debiti a lungo termine'],
        ['Totale Passività Non Correnti', '170000', ''],
        ['TOTALE PASSIVITÀ', '420000', ''],
        ['PATRIMONIO NETTO', '', ''],
        ['Capitale Sociale', '100000', 'Capitale versato'],
        ['Riserve', '128000', 'Utili non distribuiti'],
        ['Utile dell\'Esercizio', '152000', 'Utile corrente'],
        ['Totale Patrimonio Netto', '380000', ''],
        ['TOTALE PASSIVITÀ E PATRIMONIO', '800000', 'Deve essere = Totale Attività']
      ],
      'Dati Mensili': [
        ['Mese', 'Ricavi (€)', 'Costi (€)', 'Utile Lordo (€)', 'Spese Operative (€)', 'EBITDA (€)', 'Note'],
        ['Gennaio', '100000', '40000', '60000', '45000', '15000', ''],
        ['Febbraio', '95000', '38000', '57000', '44000', '13000', ''],
        ['Marzo', '110000', '44000', '66000', '46000', '20000', ''],
        ['Aprile', '105000', '42000', '63000', '45000', '18000', ''],
        ['Maggio', '115000', '46000', '69000', '47000', '22000', ''],
        ['Giugno', '120000', '48000', '72000', '48000', '24000', ''],
        ['Luglio', '108000', '43200', '64800', '46000', '18800', ''],
        ['Agosto', '85000', '34000', '51000', '42000', '9000', 'Mese di ferie'],
        ['Settembre', '112000', '44800', '67200', '47000', '20200', ''],
        ['Ottobre', '118000', '47200', '70800', '48000', '22800', ''],
        ['Novembre', '125000', '50000', '75000', '49000', '26000', ''],
        ['Dicembre', '122000', '48800', '73200', '48000', '25200', 'Bonus natalizi inclusi']
      ]
    };

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add each sheet
    Object.entries(templateData).forEach(([sheetName, data]) => {
      const ws = XLSX.utils.aoa_to_sheet(data);
      
      // Set column widths
      const colWidths = [
        { wch: 25 }, // Column A
        { wch: 15 }, // Column B  
        { wch: 30 }  // Column C
      ];
      ws['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    // Save file
    XLSX.writeFile(wb, 'Template_Dati_Aziendali.xlsx');
    
    toast({
      title: "Template Scaricato",
      description: "Il template Excel è stato scaricato con successo. Compila i dati e ricaricalo qui.",
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
              case 'nome azienda':
                extractedData.companyInfo.name = row[1];
                break;
              case 'codice fiscale':
                extractedData.companyInfo.taxCode = row[1];
                break;
              case 'partita iva':
                extractedData.companyInfo.vatNumber = row[1];
                break;
              case 'settore':
                extractedData.companyInfo.sector = row[1];
                break;
              case 'numero dipendenti':
                extractedData.companyInfo.employees = parseInt(row[1]) || 0;
                break;
              case 'anno di costituzione':
                extractedData.companyInfo.foundingYear = row[1];
                break;
              case 'sede legale':
                extractedData.companyInfo.headquarters = row[1];
                break;
              case 'email':
                extractedData.companyInfo.email = row[1];
                break;
              case 'telefono':
                extractedData.companyInfo.phone = row[1];
                break;
              case 'sito web':
                extractedData.companyInfo.website = row[1];
                break;
            }
          }
        });
      }

      // Process P&L sheet
      if (workbook.SheetNames.includes('Conto Economico')) {
        const plSheet = workbook.Sheets['Conto Economico'];
        const plData = XLSX.utils.sheet_to_json(plSheet, { header: 1 }) as any[][];
        
        plData.forEach((row: any[]) => {
          if (row[0] && row[1] && typeof row[1] === 'number') {
            const description = row[0].toString().toLowerCase();
            if (description.includes('ricavi delle vendite')) {
              extractedData.profitLoss.revenue = row[1];
            } else if (description.includes('altri ricavi')) {
              extractedData.profitLoss.otherRevenue = row[1];
            } else if (description.includes('totale ricavi')) {
              extractedData.profitLoss.totalRevenue = row[1];
            } else if (description.includes('costo del venduto') || description.includes('cogs')) {
              extractedData.profitLoss.cogs = row[1];
            } else if (description.includes('utile lordo')) {
              extractedData.profitLoss.grossProfit = row[1];
            } else if (description.includes('totale spese operative')) {
              extractedData.profitLoss.operatingExpenses = row[1];
            } else if (description.includes('ebitda')) {
              extractedData.profitLoss.ebitda = row[1];
            } else if (description.includes('ebit')) {
              extractedData.profitLoss.ebit = row[1];
            } else if (description.includes('utile netto')) {
              extractedData.profitLoss.netIncome = row[1];
            }
          }
        });
      }

      // Process Balance Sheet
      if (workbook.SheetNames.includes('Stato Patrimoniale')) {
        const bsSheet = workbook.Sheets['Stato Patrimoniale'];
        const bsData = XLSX.utils.sheet_to_json(bsSheet, { header: 1 }) as any[][];
        
        bsData.forEach((row: any[]) => {
          if (row[0] && row[1] && typeof row[1] === 'number') {
            const description = row[0].toString().toLowerCase();
            if (description.includes('totale attività correnti')) {
              extractedData.balanceSheet.currentAssets = row[1];
            } else if (description.includes('totale attività non correnti')) {
              extractedData.balanceSheet.nonCurrentAssets = row[1];
            } else if (description.includes('totale attività') && !description.includes('correnti')) {
              extractedData.balanceSheet.totalAssets = row[1];
            } else if (description.includes('totale passività correnti')) {
              extractedData.balanceSheet.currentLiabilities = row[1];
            } else if (description.includes('totale passività non correnti')) {
              extractedData.balanceSheet.nonCurrentLiabilities = row[1];
            } else if (description.includes('totale passività') && !description.includes('correnti')) {
              extractedData.balanceSheet.totalLiabilities = row[1];
            } else if (description.includes('totale patrimonio netto')) {
              extractedData.balanceSheet.equity = row[1];
            }
          }
        });
      }

      // Process Monthly Data
      if (workbook.SheetNames.includes('Dati Mensili')) {
        const monthlySheet = workbook.Sheets['Dati Mensili'];
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
              ebitda: parseFloat(row[5]) || 0,
              notes: row[6] || ''
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
        <p className="text-gray-600">Importa i tuoi dati finanziari utilizzando il nostro template Excel</p>
      </div>

      {/* Template Download */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Scarica Template Excel</span>
          </CardTitle>
          <CardDescription>
            Scarica il nostro template strutturato per importare i tuoi dati aziendali
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Il template include:</h4>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Foglio "Informazioni Azienda" - Dati anagrafici della tua azienda</li>
                  <li>• Foglio "Conto Economico" - Ricavi, costi e risultato economico</li>
                  <li>• Foglio "Stato Patrimoniale" - Attività, passività e patrimonio netto</li>
                  <li>• Foglio "Dati Mensili" - Trend mensili per analisi temporali</li>
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
