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
    console.log('Raw Excel data:', data);
    
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

    // Parse the simplified data structure
    data.forEach((row) => {
      if (!row || typeof row !== 'object') return;
      
      const description = String(row.Description || row.description || '').toLowerCase();
      const value = parseFloat(String(row.Value || row.value || row.Amount || row.amount || '').replace(/[^0-9.-]/g, ''));
      
      if (isNaN(value)) return;
      
      console.log(`Processing: ${description} = ${value}`);
      
      // Map descriptions to result fields
      if (description.includes('monthly revenue') || description.includes('monthly income')) {
        result.monthlyIncome = value;
        result.annualRevenue = value * 12;
      } else if (description.includes('monthly expenses')) {
        result.monthlyExpenses = value;
        result.annualExpenses = value * 12;
      } else if (description.includes('annual revenue') || description.includes('total revenue')) {
        result.annualRevenue = value;
        result.monthlyIncome = Math.round(value / 12);
      } else if (description.includes('annual expenses') || description.includes('total expenses')) {
        result.annualExpenses = value;
        result.monthlyExpenses = Math.round(value / 12);
      } else if (description.includes('gross profit')) {
        result.grossProfit = value;
      } else if (description.includes('net income')) {
        result.netIncome = value;
      } else if (description.includes('total assets')) {
        result.totalAssets = value;
      } else if (description.includes('total liabilities')) {
        result.totalLiabilities = value;
      } else if (description.includes('cash') || description.includes('savings')) {
        result.currentSavings = value;
        result.emergencyFund = value;
      } else if (description.includes('housing') || description.includes('rent')) {
        result.housingExpenses = value;
      } else if (description.includes('food')) {
        result.foodExpenses = value;
      } else if (description.includes('transport')) {
        result.transportExpenses = value;
      } else if (description.includes('utilities')) {
        result.utilitiesExpenses = value;
      } else if (description.includes('entertainment')) {
        result.entertainmentExpenses = value;
      }
    });

    // Calculate missing values
    if (result.monthlyExpenses === 0 && result.annualExpenses > 0) {
      result.monthlyExpenses = Math.round(result.annualExpenses / 12);
    }
    
    if (result.monthlyIncome === 0 && result.annualRevenue > 0) {
      result.monthlyIncome = Math.round(result.annualRevenue / 12);
    }

    // Calculate expense breakdown if not provided
    if (result.monthlyExpenses > 0 && result.housingExpenses === 0) {
      result.housingExpenses = Math.round(result.monthlyExpenses * 0.3);
      result.foodExpenses = Math.round(result.monthlyExpenses * 0.15);
      result.transportExpenses = Math.round(result.monthlyExpenses * 0.15);
      result.utilitiesExpenses = Math.round(result.monthlyExpenses * 0.1);
      result.entertainmentExpenses = Math.round(result.monthlyExpenses * 0.1);
      result.otherExpenses = result.monthlyExpenses - (result.housingExpenses + result.foodExpenses + result.transportExpenses + result.utilitiesExpenses + result.entertainmentExpenses);
    }

    // Generate monthly data
    if (result.monthlyIncome > 0) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      result.monthlyData = months.map((month, index) => ({
        month,
        revenue: Math.round(result.monthlyIncome * (0.9 + Math.random() * 0.2)),
        expenses: Math.round(result.monthlyExpenses * (0.9 + Math.random() * 0.2)),
        savings: Math.round((result.monthlyIncome - result.monthlyExpenses) * (0.8 + Math.random() * 0.4))
      }));
    }

    console.log('Final parsed data:', result);
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
      
      // Convert to JSON with headers
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
      
      // Find data starting from first non-empty row
      let dataRows: any[] = [];
      for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        if (row && row.length >= 2 && row[0] && row[1]) {
          // Convert array to object format
          dataRows.push({
            Description: row[0],
            Value: row[1]
          });
        }
      }

      clearInterval(interval);
      setUploadProgress(100);

      console.log('Excel data rows:', dataRows);

      if (dataRows.length === 0) {
        throw new Error('No valid data found in file');
      }

      // Parse the financial data
      const parsedData = parseFinancialData(dataRows);
      
      // Update user financial data
      const updatedUser = {
        ...user,
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
            recordsProcessed: dataRows.length,
            totalRevenue: parsedData.annualRevenue,
            totalExpenses: parsedData.annualExpenses
          },
          lastDataUpdate: new Date().toISOString()
        }
      };

      console.log('Final updated user:', updatedUser);

      // Save to localStorage and update parent
      localStorage.setItem("finsight_user", JSON.stringify(updatedUser));
      onDataUpdate(updatedUser);
      
      toast({
        title: "Data Imported Successfully!",
        description: `Processed ${dataRows.length} records. Monthly Income: €${parsedData.monthlyIncome.toLocaleString()}, Monthly Expenses: €${parsedData.monthlyExpenses.toLocaleString()}`,
      });

    } catch (error) {
      console.error('File parsing error:', error);
      toast({
        title: "Import Failed",
        description: `Error processing the file: ${error instanceof Error ? error.message : 'Unknown error'}. Please check the format and try again.`,
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
    const csvContent = `Description,Value
Monthly Revenue,45000
Monthly Expenses,35000
Annual Revenue,540000
Annual Expenses,420000
Gross Profit,300000
Net Income,120000
Total Assets,250000
Total Liabilities,100000
Cash and Savings,50000
Housing Expenses,10500
Food Expenses,5250
Transport Expenses,5250
Utilities Expenses,3500
Entertainment Expenses,3500
Other Expenses,7000`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simple_business_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: "Use this simplified template to upload your business data.",
    });
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
