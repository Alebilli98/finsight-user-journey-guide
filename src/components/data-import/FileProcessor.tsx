
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

interface FileProcessorProps {
  onDataUpdate?: (data: any) => void;
  userIndustry?: string;
}

export const useFileProcessor = ({ onDataUpdate, userIndustry = 'commerce' }: FileProcessorProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importedData, setImportedData] = useState<any>(null);
  const { toast } = useToast();

  const processExcelFile = async (file: File) => {
    setIsProcessing(true);
    setImportStatus('idle');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer);
      
      const extractedData: any = {
        companyInfo: {},
        financialData: {},
        monthlyData: [],
        balanceSheet: {},
        industry: userIndustry,
        errors: []
      };

      // Process Company Info
      if (workbook.SheetNames.includes('Company Info')) {
        const companySheet = workbook.Sheets['Company Info'];
        const companyData = XLSX.utils.sheet_to_json(companySheet, { header: 1 });
        
        companyData.slice(1).forEach((row: any) => {
          if (Array.isArray(row) && row.length >= 2) {
            const field = row[0]?.toString().toLowerCase();
            const value = row[1];
            
            if (field && value) {
              if (field.includes('company name')) extractedData.companyInfo.companyName = value;
              else if (field.includes('tax code')) extractedData.companyInfo.taxCode = value;
              else if (field.includes('vat')) extractedData.companyInfo.vatNumber = value;
              else if (field.includes('sector')) extractedData.companyInfo.sector = value;
              else if (field.includes('employees')) extractedData.companyInfo.employees = parseFloat(value) || 0;
              else if (field.includes('establishment')) extractedData.companyInfo.yearEstablished = value;
              else if (field.includes('region')) extractedData.companyInfo.region = value;
              else if (field.includes('turnover')) extractedData.financialData.annualRevenue = parseFloat(value) || 0;
              else if (field.includes('email')) extractedData.companyInfo.email = value;
              else if (field.includes('phone')) extractedData.companyInfo.phone = value;
            }
          }
        });
      }

      // Process P&L Statement
      if (workbook.SheetNames.includes('P&L')) {
        const plSheet = workbook.Sheets['P&L'];
        const plData = XLSX.utils.sheet_to_json(plSheet, { header: 1 });
        
        plData.slice(1).forEach((row: any) => {
          if (Array.isArray(row) && row.length >= 2) {
            const field = row[0]?.toString().toLowerCase();
            const value = parseFloat(row[1]) || 0;
            
            if (field && !isNaN(value)) {
              if (field.includes('retail sales revenue') || field.includes('total revenue')) {
                extractedData.financialData.annualRevenue = value;
              } else if (field.includes('cost of goods sold') || field.includes('cost of acquiring')) {
                extractedData.financialData.costOfGoodsSold = value;
              } else if (field.includes('gross profit')) {
                extractedData.financialData.grossProfit = value;
              } else if (field.includes('selling & marketing')) {
                extractedData.financialData.marketingExpenses = value;
              } else if (field.includes('rent expenses')) {
                extractedData.financialData.rentExpenses = value;
              } else if (field.includes('general & administrative')) {
                extractedData.financialData.adminExpenses = value;
              } else if (field.includes('depreciation')) {
                extractedData.financialData.depreciation = value;
              } else if (field.includes('total operating expenses')) {
                extractedData.financialData.operatingExpenses = value;
              } else if (field.includes('operating income') || field.includes('ebit')) {
                extractedData.financialData.operatingIncome = value;
              } else if (field.includes('interest expense')) {
                extractedData.financialData.interestExpense = value;
              } else if (field.includes('interest income')) {
                extractedData.financialData.interestIncome = value;
              } else if (field.includes('income tax')) {
                extractedData.financialData.taxes = value;
              } else if (field.includes('net income')) {
                extractedData.financialData.netIncome = value;
              }
            }
          }
        });
      }

      // Process Balance Sheet
      if (workbook.SheetNames.includes('Balance Sheet')) {
        const balanceSheet = workbook.Sheets['Balance Sheet'];
        const balanceData = XLSX.utils.sheet_to_json(balanceSheet, { header: 1 });
        
        balanceData.slice(1).forEach((row: any) => {
          if (Array.isArray(row) && row.length >= 2) {
            const field = row[0]?.toString().toLowerCase();
            const value = parseFloat(row[1]) || 0;
            
            if (field && !isNaN(value)) {
              if (field.includes('cash & cash equivalents')) {
                extractedData.financialData.cash = value;
              } else if (field.includes('accounts receivable')) {
                extractedData.financialData.accountsReceivable = value;
              } else if (field.includes('inventory')) {
                extractedData.financialData.inventory = value;
              } else if (field.includes('prepaid expenses')) {
                extractedData.financialData.prepaidExpenses = value;
              } else if (field.includes('total current assets')) {
                extractedData.financialData.currentAssets = value;
              } else if (field.includes('property & equipment')) {
                extractedData.financialData.propertyEquipment = value;
              } else if (field.includes('accumulated depreciation')) {
                extractedData.financialData.accumulatedDepreciation = value;
              } else if (field.includes('total non-current assets')) {
                extractedData.financialData.nonCurrentAssets = value;
              } else if (field.includes('total assets')) {
                extractedData.financialData.totalAssets = value;
              } else if (field.includes('accounts payable')) {
                extractedData.financialData.accountsPayable = value;
              } else if (field.includes('accrued expenses')) {
                extractedData.financialData.accruedExpenses = value;
              } else if (field.includes('total current liabilities')) {
                extractedData.financialData.currentLiabilities = value;
              } else if (field.includes('long-term debt')) {
                extractedData.financialData.longTermDebt = value;
              } else if (field.includes('total non-current liabilities')) {
                extractedData.financialData.nonCurrentLiabilities = value;
              } else if (field.includes('total liabilities')) {
                extractedData.financialData.totalLiabilities = value;
              } else if (field.includes('common stock')) {
                extractedData.financialData.commonStock = value;
              } else if (field.includes('retained earnings')) {
                extractedData.financialData.retainedEarnings = value;
              }
            }
          }
        });
      }

      // Process Monthly Data
      if (workbook.SheetNames.includes('Dati Mensili')) {
        const monthlySheet = workbook.Sheets['Dati Mensili'];
        const monthlyData = XLSX.utils.sheet_to_json(monthlySheet, { header: 1 });
        
        const processedMonthlyData = monthlyData.slice(1).map((row: any) => {
          if (Array.isArray(row) && row.length >= 5) {
            return {
              month: row[0] || '',
              revenue: parseFloat(row[1]) || 0,
              costs: parseFloat(row[2]) || 0,
              profit: parseFloat(row[3]) || 0,
              cash: parseFloat(row[4]) || 0,
              notes: row[5] || ''
            };
          }
          return null;
        }).filter(Boolean);
        
        extractedData.monthlyData = processedMonthlyData;
      }

      // Calculate KPIs
      const calculateKPIs = () => {
        const revenue = extractedData.financialData.annualRevenue || 0;
        const cogs = extractedData.financialData.costOfGoodsSold || 0;
        const netIncome = extractedData.financialData.netIncome || 0;
        const totalAssets = extractedData.financialData.totalAssets || 0;
        const totalLiabilities = extractedData.financialData.totalLiabilities || 0;
        const equity = totalAssets - totalLiabilities;

        // Calculate key ratios
        extractedData.financialData.grossMargin = revenue > 0 ? ((revenue - cogs) / revenue) * 100 : 0;
        extractedData.financialData.netMargin = revenue > 0 ? (netIncome / revenue) * 100 : 0;
        extractedData.financialData.roi = totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0;
        extractedData.financialData.roe = equity > 0 ? (netIncome / equity) * 100 : 0;
        extractedData.financialData.debtToEquity = equity > 0 ? totalLiabilities / equity : 0;
        extractedData.financialData.currentRatio = extractedData.financialData.currentLiabilities > 0 ? 
          (extractedData.financialData.currentAssets || 0) / extractedData.financialData.currentLiabilities : 0;

        // Calculate growth if monthly data is available
        if (extractedData.monthlyData && extractedData.monthlyData.length >= 2) {
          const firstMonth = extractedData.monthlyData[0];
          const lastMonth = extractedData.monthlyData[extractedData.monthlyData.length - 1];
          if (firstMonth.revenue > 0) {
            extractedData.financialData.revenueGrowth = ((lastMonth.revenue - firstMonth.revenue) / firstMonth.revenue) * 100;
          }
        }
      };

      calculateKPIs();

      // Data validation
      const validateData = () => {
        const errors = [];
        
        if (!extractedData.companyInfo.companyName) errors.push('Nome azienda mancante');
        if (!extractedData.financialData.annualRevenue || extractedData.financialData.annualRevenue <= 0) {
          errors.push('Ricavi annuali mancanti o non validi');
        }
        if (!extractedData.financialData.totalAssets || extractedData.financialData.totalAssets <= 0) {
          errors.push('Totale attività mancante o non valido');
        }
        if (Math.abs((extractedData.financialData.totalAssets || 0) - 
                   ((extractedData.financialData.totalLiabilities || 0) + 
                    (extractedData.financialData.commonStock || 0) + 
                    (extractedData.financialData.retainedEarnings || 0))) > 1) {
          errors.push('Bilancio non in pareggio: Attività ≠ Passività + Patrimonio');
        }
        
        return errors;
      };

      const validationErrors = validateData();
      extractedData.errors = validationErrors;

      if (validationErrors.length > 0) {
        setImportStatus('error');
        toast({
          title: "Dati Incompleti",
          description: `Alcuni dati non sono completi: ${validationErrors.join(', ')}`,
          variant: "destructive"
        });
      } else {
        setImportStatus('success');
        toast({
          title: "Importazione Completata",
          description: `Dati importati con successo. Ricavi: €${(extractedData.financialData.annualRevenue || 0).toLocaleString()}`,
        });
      }

      setImportedData(extractedData);
      
      if (onDataUpdate) {
        onDataUpdate(extractedData);
      }

      return extractedData;
      
    } catch (error) {
      console.error('Errore durante l\'importazione:', error);
      setImportStatus('error');
      toast({
        title: "Errore di Importazione",
        description: "Si è verificato un errore durante l'elaborazione del file. Verifica il formato.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processExcelFile,
    isProcessing,
    importStatus,
    importedData,
    setImportStatus
  };
};

export default useFileProcessor;
