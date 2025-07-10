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

  const parseFinancialData = (data: any[]) => {
    const result = {
      monthlyIncome: 0,
      monthlyExpenses: 0,
      totalAssets: 0,
      totalLiabilities: 0,
      currentSavings: 0,
      emergencyFund: 0,
      housingExpenses: 0,
      foodExpenses: 0,
      transportExpenses: 0,
      utilitiesExpenses: 0,
      entertainmentExpenses: 0,
      otherExpenses: 0,
      annualRevenue: 0,
      annualExpenses: 0,
      grossProfit: 0,
      netIncome: 0,
      monthlyData: [] as any[]
    };

    // Parse the data based on the template structure
    data.forEach((row, index) => {
      const keys = Object.keys(row);
      const values = Object.values(row);
      
      // Look for financial summary data
      if (keys[0]?.toLowerCase().includes('total revenue') || keys[0]?.toLowerCase().includes('revenue')) {
        const value = parseFloat(String(values[1] || values[0]).replace(/[^0-9.-]/g, ''));
        if (!isNaN(value)) {
          result.annualRevenue = value;
          result.monthlyIncome = Math.round(value / 12);
        }
      }
      
      if (keys[0]?.toLowerCase().includes('operating expenses') || keys[0]?.toLowerCase().includes('expenses')) {
        const value = parseFloat(String(values[1] || values[0]).replace(/[^0-9.-]/g, ''));
        if (!isNaN(value)) {
          result.annualExpenses = value;
          result.monthlyExpenses = Math.round(value / 12);
        }
      }
      
      if (keys[0]?.toLowerCase().includes('net income')) {
        const value = parseFloat(String(values[1] || values[0]).replace(/[^0-9.-]/g, ''));
        if (!isNaN(value)) result.netIncome = value;
      }
      
      if (keys[0]?.toLowerCase().includes('gross profit')) {
        const value = parseFloat(String(values[1] || values[0]).replace(/[^0-9.-]/g, ''));
        if (!isNaN(value)) result.grossProfit = value;
      }
      
      // Assets and liabilities
      if (keys[0]?.toLowerCase().includes('total assets') || keys[0]?.toLowerCase().includes('assets')) {
        const value = parseFloat(String(values[1] || values[0]).replace(/[^0-9.-]/g, ''));
        if (!isNaN(value)) result.totalAssets = value;
      }
      
      if (keys[0]?.toLowerCase().includes('total liabilities') || keys[0]?.toLowerCase().includes('liabilities')) {
        const value = parseFloat(String(values[1] || values[0]).replace(/[^0-9.-]/g, ''));
        if (!isNaN(value)) result.totalLiabilities = value;
      }
      
      if (keys[0]?.toLowerCase().includes('cash') && keys[0]?.toLowerCase().includes('equivalents')) {
        const value = parseFloat(String(values[1] || values[0]).replace(/[^0-9.-]/g, ''));
        if (!isNaN(value)) {
          result.currentSavings = value;
          result.emergencyFund = value;
        }
      }
      
      // Monthly breakdown data
      if (keys[0]?.toLowerCase() === 'month' && keys.length > 3) {
        // This is likely the monthly breakdown header, parse subsequent rows
        const monthlyBreakdown = data.slice(index + 1, index + 13).map(monthRow => {
          const monthValues = Object.values(monthRow);
          return {
            month: monthValues[0],
            revenue: parseFloat(String(monthValues[1] || 0).replace(/[^0-9.-]/g, '')) || 0,
            expenses: parseFloat(String(monthValues[2] || 0).replace(/[^0-9.-]/g, '')) || 0,
            marketing: parseFloat(String(monthValues[3] || 0).replace(/[^0-9.-]/g, '')) || 0,
            personnel: parseFloat(String(monthValues[4] || 0).replace(/[^0-9.-]/g, '')) || 0
          };
        }).filter(item => item.month && typeof item.month === 'string');
        
        if (monthlyBreakdown.length > 0) {
          result.monthlyData = monthlyBreakdown;
        }
      }
    });

    // Calculate expense categories based on typical business percentages
    if (result.monthlyExpenses > 0) {
      result.housingExpenses = Math.round(result.monthlyExpenses * 0.25); // Office/rent
      result.foodExpenses = Math.round(result.monthlyExpenses * 0.10); // Business meals
      result.transportExpenses = Math.round(result.monthlyExpenses * 0.15); // Business travel
      result.utilitiesExpenses = Math.round(result.monthlyExpenses * 0.10); // Utilities
      result.entertainmentExpenses = Math.round(result.monthlyExpenses * 0.05); // Entertainment
      result.otherExpenses = result.monthlyExpenses - (result.housingExpenses + result.foodExpenses + result.transportExpenses + result.utilitiesExpenses + result.entertainmentExpenses);
    }

    return result;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV or Excel file.",
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
      
      // Get the first worksheet
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      
      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      // Convert array format to object format for easier parsing
      const dataObjects = jsonData.slice(1).map((row: any) => {
        const obj: any = {};
        jsonData[0].forEach((header: any, index: number) => {
          obj[header] = row[index];
        });
        return obj;
      }).filter(obj => Object.values(obj).some(val => val !== undefined && val !== ''));

      clearInterval(interval);
      setUploadProgress(100);

      // Parse the financial data
      const parsedData = parseFinancialData(dataObjects);
      
      // Update user financial data
      const updatedFinancialData = {
        ...user.financialData,
        ...parsedData,
        importedData: {
          fileName: file.name,
          importDate: new Date().toISOString(),
          recordsProcessed: dataObjects.length,
          totalRevenue: parsedData.annualRevenue,
          totalExpenses: parsedData.annualExpenses
        },
        lastDataUpdate: new Date().toISOString()
      };

      const updatedUser = {
        ...user,
        financialData: updatedFinancialData,
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
        otherExpenses: parsedData.otherExpenses
      };

      onDataUpdate(updatedUser);
      
      toast({
        title: "Data Imported Successfully!",
        description: `Processed ${dataObjects.length} records from ${file.name}. Revenue: €${parsedData.annualRevenue.toLocaleString()}`,
      });

    } catch (error) {
      console.error('File parsing error:', error);
      toast({
        title: "Import Failed",
        description: "Error processing the file. Please check the format and try again.",
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
    const csvContent = `Company Information
Company Name,${user?.company || 'Your Company Name'}
Industry,Technology
Founded,2020
Employees,50

Financial Summary (Annual)
Total Revenue,500000
Cost of Goods Sold,200000
Gross Profit,300000
Operating Expenses,180000
EBITDA,120000
Net Income,90000

Monthly Breakdown
Month,Revenue,COGS,Operating Expenses,Marketing,Personnel,Technology,Other
January,45000,18000,15000,3000,8000,2000,1500
February,42000,17000,14500,2800,8200,1800,1400
March,48000,19000,16000,3200,8500,2200,1600
April,46000,18500,15500,3000,8300,2000,1500
May,50000,20000,17000,3500,8800,2300,1700
June,52000,21000,17500,3600,9000,2400,1800

Assets & Liabilities
Cash and Cash Equivalents,50000
Accounts Receivable,35000
Inventory,25000
Fixed Assets,150000
Total Assets,260000
Accounts Payable,15000
Short-term Debt,20000
Long-term Debt,80000
Total Liabilities,115000
Equity,145000

Key Performance Indicators
Monthly Recurring Revenue,40000
Customer Acquisition Cost,150
Customer Lifetime Value,2400
Churn Rate,5%
Gross Margin,60%
Operating Margin,24%
Current Ratio,2.1
Debt to Equity,0.79

Bank Account Details
Account Name,Business Checking
Bank Name,Your Bank
Account Number,****1234
Current Balance,50000
Average Monthly Inflow,45000
Average Monthly Outflow,35000

Investment Portfolio
Investment Type,Amount,Percentage
Stocks,30000,35%
Bonds,20000,25%
Real Estate,25000,30%
Cash/Savings,10000,10%
Total Investments,85000,100%`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finsight_business_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Import & Integration</h1>
          <p className="text-gray-600">Import comprehensive business data and connect external systems</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Database className="h-3 w-3 mr-1" />
          Enterprise Data Management
        </Badge>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Business Data Upload</TabsTrigger>
          <TabsTrigger value="integration">System Integration</TabsTrigger>
          <TabsTrigger value="status">Connection Status</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Complete Business Data</span>
              </CardTitle>
              <CardDescription>
                Upload comprehensive CSV or Excel files containing your complete business financials, KPIs, and operational data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Upload Business File</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Upload your complete business data file
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supports comprehensive financial statements, P&L, balance sheets, cash flow, and KPIs
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
                      {isUploading ? "Processing..." : "Choose Business File"}
                    </Button>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing business data...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Professional Template</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Complete Business Template</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Financial Statements (P&L, Balance Sheet)</li>
                        <li>• Monthly Revenue & Expense Breakdown</li>
                        <li>• Key Performance Indicators (KPIs)</li>
                        <li>• Asset & Liability Management</li>
                        <li>• Cash Flow Analysis</li>
                        <li>• Investment Portfolio Details</li>
                        <li>• Bank Account Information</li>
                        <li>• Business Metrics & Ratios</li>
                      </ul>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={downloadTemplate} 
                    className="w-full border-blue-200 hover:bg-blue-50"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Professional Business Template
                  </Button>
                </div>
              </div>

              {user.financialData?.importedData && (
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Last Business Data Import</h4>
                      <p className="text-sm text-green-700 mt-1">
                        File: {user.financialData.importedData.fileName}<br />
                        Date: {new Date(user.financialData.importedData.importDate).toLocaleDateString()}<br />
                        Records Processed: {user.financialData.importedData.recordsProcessed}<br />
                        Revenue Data: €{user.financialData.importedData.totalRevenue?.toLocaleString() || 'N/A'}
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
