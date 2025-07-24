
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet, Info } from "lucide-react";
import * as XLSX from 'xlsx';
import { useToast } from "@/hooks/use-toast";

interface ExcelTemplateGeneratorProps {
  userIndustry?: string;
}

const ExcelTemplateGenerator = ({ userIndustry = 'commerce' }: ExcelTemplateGeneratorProps) => {
  const { toast } = useToast();

  const generateTemplate = () => {
    const workbook = XLSX.utils.book_new();

    // P&L Sheet
    const plData = [
      ['Revenue', 'Amount', 'Notes'],
      ['Retail Sales Revenue', 0, 'Revenue generated from the sale of goods through its own retail brands/stores.'],
      ['Total Revenue', 0, ''],
      ['', '', ''],
      ['Cost of Goods Sold (COGS)', '', ''],
      ['Cost of acquiring or manufacturing the good.', 0.00, ''],
      ['Gross Profit', 0, 'Total Revenue - Cost of Goods Sold'],
      ['', '', ''],
      ['Operating Expenses', '', ''],
      ['Selling & Marketing Expenses', 0, 'Salaries for retail staff, advertising, promotions, store supplies, store maintenance, utilities for stores.'],
      ['Rent Expenses (for leased stores)', 0, 'Cost of leasing retail space.'],
      ['General & Administrative (G&A) Expenses', 0, 'Corporate overhead, administrative salaries, legal fees, accounting fees, IT expenses.'],
      ['Depreciation & Amortization', 0, 'Non-cash expense for store fixtures, equipment, and any leasehold improvements.'],
      ['Total Operating Expenses', 0, ''],
      ['', '', ''],
      ['Operating Income (EBIT)', 0, 'Gross Profit - Total Operating Expenses'],
      ['', '', ''],
      ['Other Income & Expenses', '', ''],
      ['Interest Expense', 0, 'Cost of borrowing money (e.g., lines of credit for inventory).'],
      ['Interest Income', 0, 'Income from cash deposits.'],
      ['Net Other Income/Expense', 0, ''],
      ['', '', ''],
      ['Earnings Before Taxes (EBT)', 0, 'Operating Income + Net Other Income/Expense'],
      ['Income Tax Expense', 0, 'Estimated taxes on earnings.'],
      ['Net Income', 0, 'Earnings Before Taxes - Income Tax Expense']
    ];

    // Balance Sheet Data
    const balanceSheetData = [
      ['Balance Sheet', 'Amount (€)', 'Notes'],
      ['Assets', '', ''],
      ['Current Assets', '', ''],
      ['Cash & Cash Equivalents', 0, 'Highly liquid assets.'],
      ['Accounts Receivable', 0, 'Money owed from customer credit card sales or other receivables.'],
      ['Inventory', 0, 'Goods held for sale in retail stores.'],
      ['Prepaid Expenses', 0, 'Expenses paid in advance (e.g., insurance, advertising).'],
      ['Total Current Assets', 0, ''],
      ['', '', ''],
      ['Non-Current Assets', '', ''],
      ['Property & Equipment', 0, 'Store fixtures, office equipment, vehicles (if any), less accumulated depreciation.'],
      ['Accumulated Depreciation', 0, 'Total depreciation recorded on assets to date.'],
      ['Leasehold Improvements', 0, 'Improvements made to leased retail spaces, amortized over the lease term.'],
      ['Intangible Assets (e.g., Trademarks)', 0, 'Value of brand names or intellectual property.'],
      ['Total Non-Current Assets', 0, ''],
      ['', '', ''],
      ['Total Assets', 0, ''],
      ['', '', ''],
      ['', '', ''],
      ['Liabilities', '', ''],
      ['Current Liabilities', '', ''],
      ['Accounts Payable', 0, 'Money owed to suppliers for inventory and other operating expenses.'],
      ['Accrued Expenses', 0, 'Expenses incurred but not yet paid (e.g., salaries payable, accrued rent).'],
      ['Deferred Revenue', 0, 'Gift card balances, customer prepayments.'],
      ['Current Portion of Long-Term Debt', 0, 'Portion of loans due within the next 12 months.'],
      ['Total Current Liabilities', 0, ''],
      ['', '', ''],
      ['Non-Current Liabilities', '', ''],
      ['Long-Term Debt', 0, 'Loans not due within the next 12 months.'],
      ['Lease Liabilities (under IFRS 16)', 0, 'Represents the present value of future lease payments for operating leases.'],
      ['Deferred Tax Liabilities', 0, ''],
      ['Total Non-Current Liabilities', 0, ''],
      ['', '', ''],
      ['Total Liabilities', 0, ''],
      ['', '', ''],
      ['', '', ''],
      ['Equity', '', ''],
      ['Common Stock', 0, 'Value of shares issued to owners/investors.'],
      ['Retained Earnings', 0, 'Accumulated net income that has not been distributed to shareholders.'],
      ['Total Equity', 0, ''],
      ['', '', ''],
      ['Total Liabilities & Equity', 0, 'Must equal Total Assets']
    ];

    // Monthly Data
    const monthlyData = [
      ['Month', 'Revenues', 'Costs', 'Profit', 'Cash', 'Note'],
      ['January', '', '€', '', '€', '', '€', '', '€', ''],
      ['February', '', '€', '', '€', '', '€', '', '€', ''],
      ['March', '', '€', '', '€', '', '€', '', '€', ''],
      ['April', '', '€', '', '€', '', '€', '', '€', ''],
      ['May', '', '€', '', '€', '', '€', '', '€', ''],
      ['June', '', '€', '', '€', '', '€', '', '€', ''],
      ['July', '', '€', '', '€', '', '€', '', '€', ''],
      ['August', '', '€', '', '€', '', '€', '', '€', ''],
      ['September', '', '€', '', '€', '', '€', '', '€', ''],
      ['October', '', '€', '', '€', '', '€', '', '€', ''],
      ['November', '', '€', '', '€', '', '€', '', '€', ''],
      ['December', '', '€', '', '€', '', '€', '', '€', '']
    ];

    // Company Info
    const companyInfoData = [
      ['Field', 'Value', 'Note'],
      ['Company Name', '', 'Full company name'],
      ['Tax Code', '', 'Company\'s tax code'],
      ['VAT Number', '', 'VAT number with country prefix'],
      ['Sector of Activity', '', 'Main sector of activity'],
      ['Number of Employees', '', '2 current employees'],
      ['Year of Establishment', '', '2017 Year of foundation'],
      ['Region/Province', '', 'Headquarters location'],
      ['Annual Turnover', '', '490588.19 Last year\'s turnover in euro'],
      ['Company Email', '', 'Main email'],
      ['Phone', '', 'Phone number']
    ];

    // Create worksheets
    const plSheet = XLSX.utils.aoa_to_sheet(plData);
    const balanceSheet = XLSX.utils.aoa_to_sheet(balanceSheetData);
    const monthlySheet = XLSX.utils.aoa_to_sheet(monthlyData);
    const companyInfoSheet = XLSX.utils.aoa_to_sheet(companyInfoData);

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, plSheet, 'P&L');
    XLSX.utils.book_append_sheet(workbook, balanceSheet, 'Balance Sheet');
    XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Dati Mensili');
    XLSX.utils.book_append_sheet(workbook, companyInfoSheet, 'Company Info');

    // Generate file
    const fileName = `FinSight_Template_${userIndustry}_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    toast({
      title: "Template Scaricato",
      description: `Il template Excel è stato generato: ${fileName}`,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5 text-blue-600" />
          Template Excel Completo
        </CardTitle>
        <CardDescription>
          Template professionale con tutte le sezioni necessarie per l'analisi finanziaria
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="font-semibold mb-2">Sezioni Incluse:</h4>
          <ul className="space-y-1 text-sm">
            <li>• <strong>P&L (Profit & Loss):</strong> Ricavi, costi, margini e utile netto</li>
            <li>• <strong>Balance Sheet:</strong> Attività, passività e patrimonio netto</li>
            <li>• <strong>Dati Mensili:</strong> Trend mensili di ricavi, costi e profitti</li>
            <li>• <strong>Company Info:</strong> Informazioni aziendali di base</li>
          </ul>
        </div>

        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-amber-800">Istruzioni:</p>
              <p className="text-amber-700 mt-1">
                1. Scarica il template<br/>
                2. Compila tutti i campi con i tuoi dati<br/>
                3. Carica il file nella sezione "Caricamento File"<br/>
                4. Il sistema calcolerà automaticamente tutti i KPI
              </p>
            </div>
          </div>
        </div>

        <Button 
          onClick={generateTemplate}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-full"
        >
          <Download className="h-4 w-4 mr-2" />
          Scarica Template Excel
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExcelTemplateGenerator;
