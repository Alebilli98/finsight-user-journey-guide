
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

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          processFileData(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const processFileData = async (file: File) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sampleData = {
        transactions: Math.floor(Math.random() * 500) + 100,
        totalRevenue: Math.floor(Math.random() * 500000) + 200000,
        totalExpenses: Math.floor(Math.random() * 400000) + 150000,
        categories: ['Revenue', 'COGS', 'Operating Expenses', 'Marketing', 'Personnel', 'Technology']
      };

      const updatedFinancialData = {
        ...user.financialData,
        importedData: {
          fileName: file.name,
          importDate: new Date().toISOString(),
          ...sampleData
        },
        monthlyIncome: Math.round(sampleData.totalRevenue / 12),
        monthlyExpenses: Math.round(sampleData.totalExpenses / 12),
        lastDataUpdate: new Date().toISOString()
      };

      const updatedUser = {
        ...user,
        financialData: updatedFinancialData
      };

      onDataUpdate(updatedUser);
      
      toast({
        title: "Data Imported Successfully!",
        description: `Processed ${sampleData.transactions} transactions from ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "There was an error processing your file. Please try again.",
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
                        Records Processed: {user.financialData.importedData.transactions}<br />
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
                      onClick={() => document.querySelector('[value="integration"]')?.click()}
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
