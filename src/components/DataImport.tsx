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
      'Company Info': [
        ['Field', 'Value', 'Notes'],
        ['Company Name', 'Your Company Ltd', ''],
        ['Tax ID', '12345678901', ''],
        ['VAT Number', 'IT12345678901', ''],
        ['Industry', 'Technology', ''],
        ['Employees', '50', 'Number of employees'],
        ['Founded Year', '2020', ''],
        ['Headquarters', 'Milan, Italy', ''],
        ['Email', 'info@yourcompany.com', ''],
        ['Phone', '+39 02 1234567', ''],
        ['Website', 'www.yourcompany.com', '']
      ],
      'Income Statement': [
        ['Item', 'Amount (€)', 'Notes'],
        ['Revenue', '1200000', 'Total sales revenue'],
        ['Cost of Goods Sold', '480000', 'Direct costs'],
        ['Gross Profit', '720000', 'Revenue - COGS'],
        ['Operating Expenses', '450000', 'Total operational costs'],
        ['EBITDA', '270000', 'Earnings before interest, taxes, depreciation'],
        ['Depreciation', '25000', 'Asset depreciation'],
        ['EBIT', '245000', 'Operating profit'],
        ['Interest Expense', '15000', 'Cost of debt'],
        ['Tax Expense', '55200', 'Corporate taxes'],
        ['Net Income', '174800', 'Final profit']
      ],
      'Balance Sheet': [
        ['Item', 'Amount (€)', 'Category'],
        ['Cash & Cash Equivalents', '150000', 'Current Assets'],
        ['Accounts Receivable', '200000', 'Current Assets'],
        ['Inventory', '80000', 'Current Assets'],
        ['Total Current Assets', '430000', 'Assets'],
        ['Property, Plant & Equipment', '250000', 'Fixed Assets'],
        ['Intangible Assets', '50000', 'Fixed Assets'],
        ['Total Fixed Assets', '300000', 'Assets'],
        ['Total Assets', '730000', 'Assets'],
        ['Accounts Payable', '120000', 'Current Liabilities'],
        ['Short-term Debt', '50000', 'Current Liabilities'],
        ['Total Current Liabilities', '170000', 'Liabilities'],
        ['Long-term Debt', '150000', 'Long-term Liabilities'],
        ['Total Liabilities', '320000', 'Liabilities'],
        ['Share Capital', '100000', 'Equity'],
        ['Retained Earnings', '310000', 'Equity'],
        ['Total Equity', '410000', 'Equity']
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
    XLSX.writeFile(wb, 'FinSight_Data_Template.xlsx');
    
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
      if (workbook.SheetNames.includes('Company Info')) {
        const companySheet = workbook.Sheets['Company Info'];
        const companyData = XLSX.utils.sheet_to_json(companySheet, { header: 1 }) as any[][];
        
        companyData.forEach((row: any[]) => {
          if (row[0] && row[1]) {
            switch (row[0].toString().toLowerCase()) {
              case 'company name':
                extractedData.companyInfo.name = row[1];
                break;
              case 'tax id':
                extractedData.companyInfo.taxCode = row[1];
                break;
              case 'vat number':
                extractedData.companyInfo.vatNumber = row[1];
                break;
              case 'industry':
                extractedData.companyInfo.sector = row[1];
                break;
              case 'employees':
                extractedData.companyInfo.employees = parseInt(row[1]) || 0;
                break;
              case 'founded year':
                extractedData.companyInfo.foundingYear = row[1];
                break;
              case 'headquarters':
                extractedData.companyInfo.headquarters = row[1];
                break;
              case 'email':
                extractedData.companyInfo.email = row[1];
                break;
              case 'phone':
                extractedData.companyInfo.phone = row[1];
                break;
              case 'website':
                extractedData.companyInfo.website = row[1];
                break;
            }
          }
        });
      }

      // Process Income Statement sheet
      if (workbook.SheetNames.includes('Income Statement')) {
        const plSheet = workbook.Sheets['Income Statement'];
        const plData = XLSX.utils.sheet_to_json(plSheet, { header: 1 }) as any[][];
        
        plData.forEach((row: any[]) => {
          if (row[0] && row[1] && typeof row[1] === 'number') {
            const description = row[0].toString().toLowerCase();
            if (description.includes('revenue')) {
              extractedData.profitLoss.revenue = row[1];
            } else if (description.includes('cost of goods sold')) {
              extractedData.profitLoss.cogs = row[1];
            } else if (description.includes('gross profit')) {
              extractedData.profitLoss.grossProfit = row[1];
            } else if (description.includes('operating expenses')) {
              extractedData.profitLoss.operatingExpenses = row[1];
            } else if (description.includes('ebitda')) {
              extractedData.profitLoss.ebitda = row[1];
            } else if (description.includes('ebit')) {
              extractedData.profitLoss.ebit = row[1];
            } else if (description.includes('net income')) {
              extractedData.profitLoss.netIncome = row[1];
            }
          }
        });
      }

      // Process Balance Sheet
      if (workbook.SheetNames.includes('Balance Sheet')) {
        const bsSheet = workbook.Sheets['Balance Sheet'];
        const bsData = XLSX.utils.sheet_to_json(bsSheet, { header: 1 }) as any[][];
        
        bsData.forEach((row: any[]) => {
          if (row[0] && row[1] && typeof row[1] === 'number') {
            const description = row[0].toString().toLowerCase();
            if (description.includes('total current assets')) {
              extractedData.balanceSheet.currentAssets = row[1];
            } else if (description.includes('total fixed assets')) {
              extractedData.balanceSheet.nonCurrentAssets = row[1];
            } else if (description.includes('total assets')) {
              extractedData.balanceSheet.totalAssets = row[1];
            } else if (description.includes('total current liabilities')) {
              extractedData.balanceSheet.currentLiabilities = row[1];
            } else if (description.includes('total liabilities') && !description.includes('current')) {
              extractedData.balanceSheet.totalLiabilities = row[1];
            } else if (description.includes('total equity')) {
              extractedData.balanceSheet.equity = row[1];
            }
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
        <p className="text-gray-600">Importa i tuoi dati finanziari e collega i tuoi gestionali</p>
      </div>

      {/* Integration Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Integrazioni Gestionali</span>
          </CardTitle>
          <CardDescription>
            Collega direttamente i tuoi software gestionali per l'importazione automatica dei dati
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'QuickBooks', status: 'available', color: 'blue' },
              { name: 'Xero', status: 'available', color: 'green' },
              { name: 'SAP', status: 'available', color: 'purple' },
              { name: 'Oracle', status: 'available', color: 'red' },
              { name: 'Sage 50', status: 'available', color: 'orange' },
              { name: 'Zucchetti', status: 'available', color: 'teal' }
            ].map((integration) => (
              <Card key={integration.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`h-12 w-12 bg-${integration.color}-100 rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                    <span className={`text-${integration.color}-600 font-semibold text-lg`}>
                      {integration.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{integration.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={`bg-${integration.color}-50 text-${integration.color}-700 border-${integration.color}-200`}
                  >
                    Disponibile
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => toast({
                      title: "Integrazione in Sviluppo",
                      description: `L'integrazione con ${integration.name} sarà disponibile a breve.`,
                    })}
                  >
                    Connetti
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Integrazioni Automatiche</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Una volta collegate, le integrazioni sincronizzeranno automaticamente i tuoi dati 
                  finanziari ogni notte, mantenendo sempre aggiornate le tue analisi e report.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Download */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5" />
            <span>Scarica Template Excel</span>
          </CardTitle>
          <CardDescription>
            Scarica il nostro template strutturato per importare manualmente i tuoi dati
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Il template include:</h4>
                <ul className="text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Foglio "Company Info" - Informazioni aziendali</li>
                  <li>• Foglio "Income Statement" - Conto economico</li>
                  <li>• Foglio "Balance Sheet" - Stato patrimoniale</li>
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
                    {formatCurrency(importedData.profitLoss.revenue)}
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
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataImport;
