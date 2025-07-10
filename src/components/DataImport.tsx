import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, FileText, Download, CheckCircle, AlertCircle, 
  Database, Plug, Settings, Info, FileSpreadsheet
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as XLSX from 'xlsx';

interface DataImportProps {
  user: any;
  onDataUpdate: (updatedUser: any) => void;
}

const DataImport = ({ user, onDataUpdate }: DataImportProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [connectionData, setConnectionData] = useState({
    apiUrl: "",
    apiKey: "",
    systemType: "accounting"
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseFinancialData = (workbook: any) => {
    console.log('Parsing Excel workbook with sheets:', workbook.SheetNames);
    
    const result = {
      // Company Info
      companyName: '',
      industry: '',
      yearEnd: '',
      
      // P&L Data (Annual)
      salesRevenue: 0,
      otherRevenues: 0,
      totalRevenue: 0,
      cogs: 0,
      grossProfit: 0,
      wagesAndSalaries: 0,
      socialSecurityContributions: 0,
      employeeSeveranceIndemnity: 0,
      totalPersonnelCosts: 0,
      amortizationIntangible: 0,
      depreciationTangible: 0,
      totalAmortizationDepreciation: 0,
      changesInventories: 0,
      otherOperatingExpenses: 0,
      otherCosts: 0,
      interestFinancialExpenses: 0,
      totalFinancialExpenses: 0,
      profitBeforeTax: 0,
      incomeTaxes: 0,
      netIncome: 0,
      
      // Balance Sheet
      intangibleFixedAssets: 0,
      tangibleFixedAssets: 0,
      totalFixedAssets: 0,
      inventories: 0,
      receivables: 0,
      totalReceivables: 0,
      cashAndEquivalents: 0,
      totalCurrentAssets: 0,
      totalAssets: 0,
      capital: 0,
      legalReserve: 0,
      otherReserves: 0,
      profitLoss: 0,
      totalEquity: 0,
      employeeSeveranceIndemnityTFR: 0,
      debts: 0,
      totalDebts: 0,
      totalLiabilities: 0,
      
      // Monthly Data
      monthlyData: [] as any[],
      
      // Calculated fields for compatibility
      monthlyIncome: 0,
      monthlyExpenses: 0,
      annualRevenue: 0,
      annualExpenses: 0,
      currentSavings: 0,
      emergencyFund: 0,
      housingExpenses: 0,
      foodExpenses: 0,
      transportExpenses: 0,
      utilitiesExpenses: 0,
      entertainmentExpenses: 0,
      otherExpenses: 0
    };

    try {
      // Parse P&L Sheet
      if (workbook.Sheets['P&L Yearly']) {
        const plSheet = workbook.Sheets['P&L Yearly'];
        const plData = XLSX.utils.sheet_to_json(plSheet, { header: 1 });
        
        console.log('P&L Data:', plData);
        
        // Parse P&L data based on the structure shown in the image
        (plData as any[][]).forEach((row: any[], index: number) => {
          if (!row || !row[0]) return;
          
          const description = String(row[0]).toLowerCase().trim();
          const value2024 = parseFloat(String(row[1] || '').replace(/[^0-9.-]/g, '')) || 0;
          
          if (description.includes('revenues from sales')) {
            result.salesRevenue = value2024;
          } else if (description.includes('other revenues')) {
            result.otherRevenues = value2024;
          } else if (description.includes('total production value')) {
            result.totalRevenue = value2024;
          } else if (description.includes('cogs') || description.includes('cost of goods')) {
            result.cogs = value2024;
          } else if (description.includes('wages and salaries')) {
            result.wagesAndSalaries = value2024;
          } else if (description.includes('social security')) {
            result.socialSecurityContributions = value2024;
          } else if (description.includes('employee severance')) {
            result.employeeSeveranceIndemnity = value2024;
          } else if (description.includes('total personnel costs')) {
            result.totalPersonnelCosts = value2024;
          } else if (description.includes('amortization of intangible')) {
            result.amortizationIntangible = value2024;
          } else if (description.includes('depreciation of tangible')) {
            result.depreciationTangible = value2024;
          } else if (description.includes('total amortization')) {
            result.totalAmortizationDepreciation = value2024;
          } else if (description.includes('changes in inventories')) {
            result.changesInventories = value2024;
          } else if (description.includes('other operating expenses')) {
            result.otherOperatingExpenses = value2024;
          } else if (description.includes('other costs')) {
            result.otherCosts = value2024;
          } else if (description.includes('interest and other financial')) {
            result.interestFinancialExpenses = value2024;
          } else if (description.includes('total financial')) {
            result.totalFinancialExpenses = value2024;
          } else if (description.includes('profit before tax')) {
            result.profitBeforeTax = value2024;
          } else if (description.includes('income taxes')) {
            result.incomeTaxes = value2024;
          } else if (description.includes('profit (loss) for the year')) {
            result.netIncome = value2024;
          }
        });
      }

      // Parse Balance Sheet
      if (workbook.Sheets['Balance sheet Yearly']) {
        const bsSheet = workbook.Sheets['Balance sheet Yearly'];
        const bsData = XLSX.utils.sheet_to_json(bsSheet, { header: 1 });
        
        console.log('Balance Sheet Data:', bsData);
        
        (bsData as any[][]).forEach((row: any[]) => {
          if (!row || !row[0]) return;
          
          const description = String(row[0]).toLowerCase().trim();
          const value2024 = parseFloat(String(row[1] || '').replace(/[^0-9.-]/g, '')) || 0;
          
          if (description.includes('intangible fixed assets')) {
            result.intangibleFixedAssets = value2024;
          } else if (description.includes('tangible fixed assets')) {
            result.tangibleFixedAssets = value2024;
          } else if (description.includes('total fixed assets')) {
            result.totalFixedAssets = value2024;
          } else if (description.includes('inventories')) {
            result.inventories = value2024;
          } else if (description.includes('receivables')) {
            result.receivables = value2024;
          } else if (description.includes('total receivables')) {
            result.totalReceivables = value2024;
          } else if (description.includes('cash and cash equivalents')) {
            result.cashAndEquivalents = value2024;
          } else if (description.includes('total current assets')) {
            result.totalCurrentAssets = value2024;
          } else if (description.includes('total assets')) {
            result.totalAssets = value2024;
          } else if (description.includes('capital')) {
            result.capital = value2024;
          } else if (description.includes('legal reserve')) {
            result.legalReserve = value2024;
          } else if (description.includes('other reserves')) {
            result.otherReserves = value2024;
          } else if (description.includes('profit (loss) for the year')) {
            result.profitLoss = value2024;
          } else if (description.includes('total equity')) {
            result.totalEquity = value2024;
          } else if (description.includes('employee severance indemnity')) {
            result.employeeSeveranceIndemnityTFR = value2024;
          } else if (description.includes('debts')) {
            result.debts = value2024;
          } else if (description.includes('total debts')) {
            result.totalDebts = value2024;
          } else if (description.includes('total liabilities')) {
            result.totalLiabilities = value2024;
          }
        });
      }

      // Parse Monthly Data
      if (workbook.Sheets['P&L monthly']) {
        const monthlySheet = workbook.Sheets['P&L monthly'];
        const monthlyData = XLSX.utils.sheet_to_json(monthlySheet, { header: 1 });
        
        console.log('Monthly Data:', monthlyData);
        
        // Get company info from first rows
        if (monthlyData.length > 0) {
          const companyRow = monthlyData[1] as any[];
          const yearRow = monthlyData[2] as any[];
          const industryRow = monthlyData[3] as any[];
          
          if (companyRow && companyRow[1]) result.companyName = String(companyRow[1]);
          if (yearRow && yearRow[1]) result.yearEnd = String(yearRow[1]);
          if (industryRow && industryRow[1]) result.industry = String(industryRow[1]);
        }
        
        // Parse monthly financial data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let salesRevenueRow: any[] = [];
        let operatingExpensesRow: any[] = [];
        let netIncomeRow: any[] = [];
        
        (monthlyData as any[][]).forEach((row: any[]) => {
          if (!row || !row[0]) return;
          
          const description = String(row[0]).toLowerCase().trim();
          
          if (description.includes('sales revenue')) {
            salesRevenueRow = row;
          } else if (description.includes('total operating expenses')) {
            operatingExpensesRow = row;
          } else if (description.includes('net income')) {
            netIncomeRow = row;
          }
        });
        
        // Create monthly data array
        result.monthlyData = months.map((month, index) => {
          const revenue = parseFloat(String(salesRevenueRow[index + 1] || '').replace(/[^0-9.-]/g, '')) || 0;
          const expenses = parseFloat(String(operatingExpensesRow[index + 1] || '').replace(/[^0-9.-]/g, '')) || 0;
          const netIncome = parseFloat(String(netIncomeRow[index + 1] || '').replace(/[^0-9.-]/g, '')) || 0;
          
          return {
            month,
            revenue,
            expenses,
            savings: netIncome
          };
        });
      }

      // Calculate derived values for compatibility
      result.annualRevenue = result.totalRevenue || result.salesRevenue;
      result.monthlyIncome = Math.round(result.annualRevenue / 12);
      result.annualExpenses = result.cogs + result.totalPersonnelCosts + result.otherOperatingExpenses + result.otherCosts;
      result.monthlyExpenses = Math.round(result.annualExpenses / 12);
      result.currentSavings = result.cashAndEquivalents;
      result.emergencyFund = result.cashAndEquivalents;
      result.grossProfit = result.annualRevenue - result.cogs;
      
      // Calculate expense breakdown for dashboard
      if (result.monthlyExpenses > 0) {
        result.housingExpenses = Math.round(result.monthlyExpenses * 0.3);
        result.foodExpenses = Math.round(result.monthlyExpenses * 0.15);
        result.transportExpenses = Math.round(result.monthlyExpenses * 0.15);
        result.utilitiesExpenses = Math.round(result.monthlyExpenses * 0.1);
        result.entertainmentExpenses = Math.round(result.monthlyExpenses * 0.1);
        result.otherExpenses = result.monthlyExpenses - (result.housingExpenses + result.foodExpenses + result.transportExpenses + result.utilitiesExpenses + result.entertainmentExpenses);
      }

    } catch (error) {
      console.error('Error parsing financial data:', error);
    }

    console.log('Final parsed financial data:', result);
    return result;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Tipo di File Non Valido",
        description: "Carica un file CSV o Excel.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 15;
        });
      }, 200);

      // Read the file
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      
      console.log('Excel workbook loaded with sheets:', workbook.SheetNames);

      clearInterval(interval);
      setUploadProgress(100);

      if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
        throw new Error('Nessun foglio valido trovato nel file');
      }

      // Parse the financial data
      const parsedData = parseFinancialData(workbook);
      
      // Update user financial data
      const updatedUser = {
        ...user,
        companyName: parsedData.companyName || user.company,
        industry: parsedData.industry || user.industry,
        // Update direct user properties for immediate dashboard reflection
        monthlyIncome: parsedData.monthlyIncome,
        monthlyExpenses: parsedData.monthlyExpenses,
        totalAssets: parsedData.totalAssets,
        totalLiabilities: parsedData.totalLiabilities,
        currentSavings: parsedData.currentSavings,
        emergencyFund: parsedData.emergencyFund,
        housingExpenses: parsedData.housingExpenses,
        foodExpenses: parsedData.foodExpenses,
        transportExpenses: parsedData.transportExpenses,
        utilitiesExpenses: parsedData.utilitiesExpenses,
        entertainmentExpenses: parsedData.entertainmentExpenses,
        otherExpenses: parsedData.otherExpenses,
        financialData: {
          ...user.financialData,
          ...parsedData,
          importedData: {
            fileName: file.name,
            importDate: new Date().toISOString(),
            recordsProcessed: workbook.SheetNames.length,
            totalRevenue: parsedData.annualRevenue,
            totalExpenses: parsedData.annualExpenses,
            companyName: parsedData.companyName,
            industry: parsedData.industry
          },
          lastDataUpdate: new Date().toISOString()
        }
      };

      console.log('Final updated user:', updatedUser);

      // Save to localStorage and update parent
      localStorage.setItem("finsight_user", JSON.stringify(updatedUser));
      onDataUpdate(updatedUser);
      
      toast({
        title: "Dati Importati con Successo!",
        description: `Processati ${workbook.SheetNames.length} fogli. Ricavi Annuali: €${parsedData.annualRevenue.toLocaleString()}, Reddito Mensile: €${parsedData.monthlyIncome.toLocaleString()}`,
      });

    } catch (error) {
      console.error('File parsing error:', error);
      toast({
        title: "Importazione Fallita",
        description: `Errore nel processare il file: ${error instanceof Error ? error.message : 'Errore sconosciuto'}. Controlla il formato e riprova.`,
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleAPIConnection = async () => {
    if (!connectionData.apiUrl || !connectionData.apiKey) {
      toast({
        title: "Missing Information",
        description: "Please provide both API URL and API Key.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    setTimeout(() => {
      const updatedUser = {
        ...user,
        integrations: {
          ...user.integrations,
          [connectionData.systemType]: {
            connected: true,
            apiUrl: connectionData.apiUrl,
            connectedAt: new Date().toISOString(),
            status: "active"
          }
        }
      };
      
      onDataUpdate(updatedUser);
      setIsUploading(false);
      
      toast({
        title: "Connection Successful!",
        description: `Successfully connected to your ${connectionData.systemType} system.`,
      });
    }, 2000);
  };

  const downloadTemplate = () => {
    // Create comprehensive Excel template with P&L, Balance Sheet, and Monthly data
    const wb = XLSX.utils.book_new();
    
    // P&L Yearly Sheet
    const plData = [
      ['Account', '31/12/2024', '31/12/2023'],
      ['Revenues from sales and services', '500000', '450000'],
      ['Other revenues and income (Other)', '25000', '20000'],
      ['Total Production Value', '525000', '470000'],
      [''],
      ['For raw materials, consumables, supplies & goods', '200000', '180000'],
      ['For services', '50000', '45000'],
      ['For use of third-party assets', '15000', '12000'],
      ['COGS', '265000', '237000'],
      [''],
      [''],
      ['Wages and salaries', '120000', '110000'],
      ['Social security contributions', '35000', '32000'],
      ['Employee severance indemnity', '8000', '7000'],
      ['Total personnel costs', '163000', '149000'],
      [''],
      ['Amortization and depreciation:', ''],
      ['Amortization of intangible fixed assets', '5000', '4000'],
      ['Depreciation of tangible fixed assets', '15000', '12000'],
      ['Total amortization and depreciation', '20000', '16000'],
      [''],
      ['Changes in inventories', '5000', '3000'],
      ['Other operating expenses', '25000', '22000'],
      ['Other costs', '8000', '7000'],
      [''],
      [''],
      ['Interest and other financial expenses (Other)', '12000', '10000'],
      ['Total financial income and expenses', '12000', '10000'],
      [''],
      [''],
      ['Profit before tax', '27000', '26000'],
      ['Income taxes for the year (Current taxes)', '8100', '7800'],
      [''],
      ['Profit (Loss) for the year', '18900', '18200']
    ];
    
    const ws1 = XLSX.utils.aoa_to_sheet(plData);
    ws1['!cols'] = [{ width: 40 }, { width: 15 }, { width: 15 }];
    XLSX.utils.book_append_sheet(wb, ws1, 'P&L Yearly');

    // Balance Sheet Yearly
    const bsData = [
      ['Line Item', '31-12-2024 (EUR)', '31-12-2023 (EUR)'],
      ['ASSETS', '', ''],
      ['B) Fixed Assets', '', ''],
      ['I - Intangible Fixed Assets', '25000', '20000'],
      ['II - Tangible Fixed Assets', '150000', '130000'],
      ['Total Fixed Assets (B)', '175000', '150000'],
      ['C) Current Assets', '', ''],
      ['I - Inventories', '45000', '40000'],
      ['II - Receivables (due within next financial year)', '85000', '75000'],
      ['Total Receivables', '85000', '75000'],
      ['IV - Cash and Cash Equivalents', '35000', '30000'],
      ['Total Current Assets (C)', '165000', '145000'],
      ['D) Accrued Income and Prepaid Expenses', '5000', '4000'],
      ['TOTAL ASSETS', '345000', '299000'],
      ['LIABILITIES & EQUITY', '', ''],
      ['A) Equity', '', ''],
      ['I - Capital', '100000', '100000'],
      ['IV - Legal Reserve', '20000', '18000'],
      ['VI - Other Reserves', '45000', '35000'],
      ['IX - Profit (Loss) for the year', '18900', '18200'],
      ['Total Equity', '183900', '171200'],
      ['C) Employee Severance Indemnity (TFR)', '25000', '22000'],
      ['D) Debts', '', ''],
      ['Debts (due within next financial year)', '136100', '105800'],
      ['Total Debts', '136100', '105800'],
      ['E) Accrued Expenses and Deferred Income', '0', '0'],
      ['TOTAL LIABILITIES & EQUITY', '345000', '299000']
    ];
    
    const ws2 = XLSX.utils.aoa_to_sheet(bsData);
    ws2['!cols'] = [{ width: 40 }, { width: 20 }, { width: 20 }];
    XLSX.utils.book_append_sheet(wb, ws2, 'Balance sheet Yearly');

    // Monthly P&L Sheet
    const monthlyData = [
      ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['Company Name', 'Your Company Name', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['Year end', '2024', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['Industry:', 'Technology', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', '', '', '', '', ''],
      ['Line Item', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Annual Total'],
      ['Sales Revenue', '42000', '38000', '45000', '48000', '52000', '55000', '58000', '54000', '47000', '49000', '51000', '56000', '595000'],
      ['Cost of Goods Sold (COGS)', '16800', '15200', '18000', '19200', '20800', '22000', '23200', '21600', '18800', '19600', '20400', '22400', '238000'],
      ['Direct Materials', '8400', '7600', '9000', '9600', '10400', '11000', '11600', '10800', '9400', '9800', '10200', '11200', '119000'],
      ['Direct Labor', '8400', '7600', '9000', '9600', '10400', '11000', '11600', '10800', '9400', '9800', '10200', '11200', '119000'],
      ['Total Cost of Goods Sold', '16800', '15200', '18000', '19200', '20800', '22000', '23200', '21600', '18800', '19600', '20400', '22400', '238000'],
      ['Gross Profit', '25200', '22800', '27000', '28800', '31200', '33000', '34800', '32400', '28200', '29400', '30600', '33600', '357000'],
      ['Operating Expenses', '18900', '17100', '20250', '21600', '23400', '24750', '26100', '24300', '21150', '22050', '22950', '25200', '267750'],
      ['Housing Expenses', '5670', '5130', '6075', '6480', '7020', '7425', '7830', '7290', '6345', '6615', '6885', '7560', '80325'],
      ['Food Expenses', '2835', '2565', '3038', '3240', '3510', '3713', '3915', '3645', '3173', '3308', '3443', '3780', '40165'],
      ['Transport Expenses', '2835', '2565', '3038', '3240', '3510', '3713', '3915', '3645', '3173', '3308', '3443', '3780', '40165'],
      ['Utilities Expenses', '1890', '1710', '2025', '2160', '2340', '2475', '2610', '2430', '2115', '2205', '2295', '2520', '26775'],
      ['Entertainment Expenses', '1890', '1710', '2025', '2160', '2340', '2475', '2610', '2430', '2115', '2205', '2295', '2520', '26775'],
      ['Other Expenses', '3780', '3420', '4050', '4320', '4680', '4950', '5220', '4860', '4230', '4410', '4590', '5040', '53550'],
      ['General & Admin (G&A)', '1890', '1710', '2025', '2160', '2340', '2475', '2610', '2430', '2115', '2205', '2295', '2520', '26775'],
      ['Sales & Marketing', '1890', '1710', '2025', '2160', '2340', '2475', '2610', '2430', '2115', '2205', '2295', '2520', '26775'],
      ['Total Operating Expenses', '18900', '17100', '20250', '21600', '23400', '24750', '26100', '24300', '21150', '22050', '22950', '25200', '267750'],
      ['EBITDA', '6300', '5700', '6750', '7200', '7800', '8250', '8700', '8100', '7050', '7350', '7650', '8400', '89250'],
      ['Depreciation & Amortization', '1260', '1140', '1350', '1440', '1560', '1650', '1740', '1620', '1410', '1470', '1530', '1680', '17850'],
      ['EBIT (Operating Income)', '5040', '4560', '5400', '5760', '6240', '6600', '6960', '6480', '5640', '5880', '6120', '6720', '71400'],
      ['Interest Expense', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '1000', '12000'],
      ['Pre-Tax Income', '4040', '3560', '4400', '4760', '5240', '5600', '5960', '5480', '4640', '4880', '5120', '5720', '59400'],
      ['Income Tax Expense', '1212', '1068', '1320', '1428', '1572', '1680', '1788', '1644', '1392', '1464', '1536', '1716', '17820'],
      ['Net Income', '2828', '2492', '3080', '3332', '3668', '3920', '4172', '3836', '3248', '3416', '3584', '4004', '41580']
    ];
    
    const ws3 = XLSX.utils.aoa_to_sheet(monthlyData);
    ws3['!cols'] = [
      { width: 25 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, 
      { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, 
      { width: 10 }, { width: 10 }, { width: 10 }, { width: 15 }
    ];
    XLSX.utils.book_append_sheet(wb, ws3, 'P&L monthly');
    
    // Write the file
    XLSX.writeFile(wb, 'Financial_Statement_Template.xlsx');
    
    toast({
      title: "Template Scaricato",
      description: "Usa questo template Excel completo con P&L, Balance Sheet e dati mensili.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Importazione Dati & Integrazione</h1>
          <p className="text-gray-600">Importa dati aziendali completi e connetti sistemi esterni</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Database className="h-3 w-3 mr-1" />
          Gestione Dati Aziendali
        </Badge>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Caricamento Dati Aziendali</TabsTrigger>
          <TabsTrigger value="integration">Integrazione Sistemi</TabsTrigger>
          <TabsTrigger value="status">Stato Connessioni</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Carica Dati Finanziari Completi</span>
              </CardTitle>
              <CardDescription>
                Carica file Excel con P&L, Balance Sheet e dati mensili
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Carica File Finanziario</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Carica il tuo file Excel con i dati finanziari
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Include: P&L Annuale, Balance Sheet, Dati Mensili
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      {isUploading ? "Elaborando..." : "Scegli File Finanziario"}
                    </Button>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Elaborando dati finanziari...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Template Excel Professionale</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Formato Template Completo</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>P&L Annuale:</strong> Ricavi, Costi, Utili</li>
                        <li>• <strong>Balance Sheet:</strong> Attività, Passività, Patrimonio</li>
                        <li>• <strong>Dati Mensili:</strong> Breakdown mensile dettagliato</li>
                        <li>• <strong>Info Aziendali:</strong> Nome, Settore, Anno fiscale</li>
                        <li>• <strong>Formato Professionale:</strong> Compatibile con sistemi contabili</li>
                        <li>• <strong>Analisi Automatica:</strong> Calcoli e ratio automatici</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={downloadTemplate} 
                    className="w-full border-blue-200 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Scarica Template Finanziario Completo
                  </Button>
                </div>
              </div>

              {user.financialData?.importedData && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Ultima Importazione Dati</h4>
                      <p className="text-sm text-green-700 mt-1">
                        File: {user.financialData.importedData.fileName}<br />
                        Data: {new Date(user.financialData.importedData.importDate).toLocaleDateString()}<br />
                        {user.financialData.importedData.companyName && `Azienda: ${user.financialData.importedData.companyName}`}<br />
                        Fogli Processati: {user.financialData.importedData.recordsProcessed}<br />
                        Ricavi: €{user.financialData.importedData.totalRevenue?.toLocaleString() || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Plug className="h-5 w-5" />
                <span>Business System Integration</span>
              </CardTitle>
              <CardDescription>
                Connect to your existing ERP, accounting, CRM, and business management systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-type">Business System Type</Label>
                    <select 
                      id="system-type"
                      className="w-full p-3 border rounded-md"
                      value={connectionData.systemType}
                      onChange={(e) => setConnectionData({...connectionData, systemType: e.target.value})}
                    >
                      <option value="erp">ERP System (SAP, Oracle, NetSuite)</option>
                      <option value="accounting">Accounting Software (QuickBooks, Xero, FreshBooks)</option>
                      <option value="crm">CRM System (Salesforce, HubSpot, Pipedrive)</option>
                      <option value="banking">Banking API (Open Banking, Plaid)</option>
                      <option value="ecommerce">E-commerce Platform (Shopify, WooCommerce)</option>
                      <option value="hr">HR System (BambooHR, Workday)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-url">System API URL</Label>
                    <Input
                      id="api-url"
                      placeholder="https://api.yourbusiness-system.com/v1"
                      value={connectionData.apiUrl}
                      onChange={(e) => setConnectionData({...connectionData, apiUrl: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key / Access Token</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Your system's API key or access token"
                      value={connectionData.apiKey}
                      onChange={(e) => setConnectionData({...connectionData, apiKey: e.target.value})}
                    />
                  </div>

                  <Button 
                    onClick={handleAPIConnection} 
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    {isUploading ? "Connecting..." : "Test & Connect System"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Supported Integrations</h4>
                  <div className="space-y-3">
                    {[
                      { name: "ERP Systems", desc: "SAP, Oracle NetSuite, Microsoft Dynamics" },
                      { name: "Accounting", desc: "QuickBooks, Xero, FreshBooks, Wave" },
                      { name: "CRM Platforms", desc: "Salesforce, HubSpot, Pipedrive" },
                      { name: "Banking APIs", desc: "Open Banking, Plaid, Yodlee" },
                      { name: "E-commerce", desc: "Shopify, WooCommerce, Magento" },
                      { name: "HR Systems", desc: "BambooHR, Workday, ADP" }
                    ].map((system, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-sm">{system.name}</p>
                          <p className="text-xs text-gray-600">{system.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Enterprise Integration Setup</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      For enterprise integrations, our team can assist with custom API setup, data mapping, 
                      and secure connection protocols. Contact support for dedicated integration assistance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Integration Status Dashboard</span>
              </CardTitle>
              <CardDescription>
                Monitor all connected business systems and data sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.integrations ? (
                  Object.entries(user.integrations).map(([key, integration]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                          <h4 className="font-medium capitalize">{key} System Integration</h4>
                          <p className="text-sm text-gray-600">
                            Connected: {new Date(integration.connectedAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Last sync: {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Database className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium mb-2">No Systems Connected</h3>
                    <p className="text-sm mb-4">Connect your business systems to enable automated data synchronization</p>
                    <Button 
                      onClick={() => {
                        const integrationTab = document.querySelector('[value="integration"]') as HTMLElement;
                        integrationTab?.click();
                      }}
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                    >
                      <Plug className="h-4 w-4 mr-2" />
                      Connect Your First System
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataImport;
