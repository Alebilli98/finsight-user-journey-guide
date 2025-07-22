
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
      
      const sheetNames = workbook.SheetNames;
      const extractedData: any = {
        companyInfo: {},
        financialData: {},
        monthlyData: [],
        industry: userIndustry
      };

      // Process each sheet
      sheetNames.forEach(sheetName => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (sheetName.includes('Dati Mensili') || sheetName.includes('Monthly')) {
          // Process monthly data
          const monthlyData = jsonData.slice(1).map((row: any) => {
            if (Array.isArray(row) && row.length >= 4) {
              return {
                month: row[0] || '',
                revenue: parseFloat(row[1]) || 0,
                expenses: parseFloat(row[2]) || 0,
                profit: parseFloat(row[3]) || 0,
                notes: row[4] || ''
              };
            }
            return null;
          }).filter(Boolean);
          
          extractedData.monthlyData = monthlyData;
        } else {
          // Process main financial data
          jsonData.slice(1).forEach((row: any) => {
            if (Array.isArray(row) && row.length >= 2) {
              const field = row[0]?.toString().toLowerCase();
              const value = row[1];
              
              if (field && value !== undefined && value !== '') {
                // Map common fields based on industry
                if (field.includes('ricavi') || field.includes('revenue')) {
                  extractedData.financialData.annualRevenue = parseFloat(value) || 0;
                } else if (field.includes('vendite') || field.includes('sales')) {
                  extractedData.financialData.numberOfSales = parseFloat(value) || 0;
                } else if (field.includes('ordini') || field.includes('orders')) {
                  extractedData.financialData.ordersReceived = parseFloat(value) || 0;
                } else if (field.includes('clienti') || field.includes('customers')) {
                  extractedData.financialData.activeCustomers = parseFloat(value) || 0;
                } else if (field.includes('fatture') || field.includes('invoices')) {
                  extractedData.financialData.invoicesIssued = parseFloat(value) || 0;
                } else if (field.includes('crediti') || field.includes('credits')) {
                  extractedData.financialData.clientCredits = parseFloat(value) || 0;
                } else if (field.includes('costo') && field.includes('merce')) {
                  extractedData.financialData.merchandiseCost = parseFloat(value) || 0;
                } else if (field.includes('margine') || field.includes('margin')) {
                  extractedData.financialData.grossMargin = parseFloat(value) || 0;
                } else if (field.includes('conversione') || field.includes('conversion')) {
                  extractedData.financialData.conversionRate = parseFloat(value) || 0;
                }
              }
            }
          });
        }
      });

      // Calculate derived metrics
      const annualRevenue = extractedData.financialData.annualRevenue || 0;
      const monthlyData = extractedData.monthlyData;
      
      if (monthlyData && monthlyData.length > 0) {
        // Calculate totals from monthly data if annual data is missing
        if (!annualRevenue) {
          extractedData.financialData.annualRevenue = monthlyData.reduce((sum: number, month: any) => sum + (month.revenue || 0), 0);
        }
        
        // Calculate expense breakdown
        const totalExpenses = monthlyData.reduce((sum: number, month: any) => sum + (month.expenses || 0), 0);
        extractedData.financialData.expenseBreakdown = generateExpenseBreakdown(totalExpenses, userIndustry);
      }

      // Set additional calculated fields based on industry
      switch (userIndustry) {
        case 'commerce':
          if (!extractedData.financialData.numberOfSales && annualRevenue) {
            extractedData.financialData.numberOfSales = Math.round(annualRevenue / 150); // Assume 150€ average sale
          }
          break;
        case 'ecommerce':
          if (!extractedData.financialData.ordersReceived && annualRevenue) {
            extractedData.financialData.ordersReceived = Math.round(annualRevenue / 85); // Assume 85€ AOV
          }
          if (!extractedData.financialData.activeCustomers && extractedData.financialData.ordersReceived) {
            extractedData.financialData.activeCustomers = Math.round(extractedData.financialData.ordersReceived * 0.7);
          }
          break;
        case 'consulting':
          if (!extractedData.financialData.invoicesIssued) {
            extractedData.financialData.invoicesIssued = annualRevenue;
          }
          break;
      }

      setImportedData(extractedData);
      setImportStatus('success');
      
      if (onDataUpdate) {
        onDataUpdate(extractedData);
      }

      toast({
        title: "Importazione Completata",
        description: `Dati importati con successo. Ricavi annuali: €${(extractedData.financialData.annualRevenue || 0).toLocaleString()}`,
      });

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

  const generateExpenseBreakdown = (totalExpenses: number, industry: string) => {
    switch (industry) {
      case 'commerce':
        return [
          { name: 'Costo Merci', value: Math.round(totalExpenses * 0.5), color: '#ef4444' },
          { name: 'Affitto', value: Math.round(totalExpenses * 0.15), color: '#3b82f6' },
          { name: 'Stipendi', value: Math.round(totalExpenses * 0.2), color: '#10b981' },
          { name: 'Marketing', value: Math.round(totalExpenses * 0.08), color: '#f59e0b' },
          { name: 'Altri Costi', value: Math.round(totalExpenses * 0.07), color: '#6b7280' }
        ];
      case 'ecommerce':
        return [
          { name: 'Costo Prodotti', value: Math.round(totalExpenses * 0.4), color: '#ef4444' },
          { name: 'Marketing Digital', value: Math.round(totalExpenses * 0.2), color: '#3b82f6' },
          { name: 'Logistica', value: Math.round(totalExpenses * 0.15), color: '#10b981' },
          { name: 'Piattaforma', value: Math.round(totalExpenses * 0.1), color: '#f59e0b' },
          { name: 'Altri Costi', value: Math.round(totalExpenses * 0.15), color: '#6b7280' }
        ];
      case 'consulting':
        return [
          { name: 'Personale', value: Math.round(totalExpenses * 0.6), color: '#ef4444' },
          { name: 'Ufficio', value: Math.round(totalExpenses * 0.15), color: '#3b82f6' },
          { name: 'Software/Tools', value: Math.round(totalExpenses * 0.1), color: '#10b981' },
          { name: 'Marketing', value: Math.round(totalExpenses * 0.08), color: '#f59e0b' },
          { name: 'Altri Costi', value: Math.round(totalExpenses * 0.07), color: '#6b7280' }
        ];
      default:
        return [
          { name: 'Costi Operativi', value: Math.round(totalExpenses * 0.7), color: '#ef4444' },
          { name: 'Altri Costi', value: Math.round(totalExpenses * 0.3), color: '#6b7280' }
        ];
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

export default FileProcessor;
