
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
import { Textarea } from "@/components/ui/textarea";

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

    // Validate file type
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

    // Simulate file processing
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
      // Simulate data processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate sample processed data based on file
      const sampleData = {
        transactions: Math.floor(Math.random() * 500) + 100,
        totalIncome: Math.floor(Math.random() * 50000) + 20000,
        totalExpenses: Math.floor(Math.random() * 40000) + 15000,
        categories: ['Payroll', 'Operations', 'Marketing', 'Technology', 'Other']
      };

      // Update user's financial data
      const updatedFinancialData = {
        ...user.financialData,
        importedData: {
          fileName: file.name,
          importDate: new Date().toISOString(),
          ...sampleData
        },
        monthlyIncome: sampleData.totalIncome / 12,
        monthlyExpenses: sampleData.totalExpenses / 12,
        lastDataUpdate: new Date().toISOString()
      };

      const updatedUser = {
        ...user,
        financialData: updatedFinancialData
      };

      onDataUpdate(updatedUser);
      
      toast({
        title: "File Uploaded Successfully!",
        description: `Processed ${sampleData.transactions} transactions from ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
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

    // Simulate API connection test
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
    // Create sample CSV template
    const csvContent = `Date,Description,Amount,Category,Type
2024-01-01,Office Rent,-2500,Operations,Expense
2024-01-01,Client Payment,5000,Revenue,Income
2024-01-02,Marketing Campaign,-800,Marketing,Expense
2024-01-03,Software License,-299,Technology,Expense`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'finsight_data_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Import & Integration</h1>
          <p className="text-gray-600">Import your financial data and connect external systems</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          <Database className="h-3 w-3 mr-1" />
          Data Management
        </Badge>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">File Upload</TabsTrigger>
          <TabsTrigger value="integration">External Integration</TabsTrigger>
          <TabsTrigger value="status">Connection Status</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Financial Data</span>
              </CardTitle>
              <CardDescription>
                Upload CSV or Excel files containing your financial transactions, income, and expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Upload File</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag and drop your file here, or click to browse
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
                    >
                      Choose File
                    </Button>
                  </div>
                  
                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Supported Formats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">CSV Files</p>
                        <p className="text-sm text-gray-600">Comma-separated values</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Excel Files</p>
                        <p className="text-sm text-gray-600">.xlsx and .xls formats</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" onClick={downloadTemplate} className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>

              {user.financialData?.importedData && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Last Import</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        File: {user.financialData.importedData.fileName}<br />
                        Date: {new Date(user.financialData.importedData.importDate).toLocaleDateString()}<br />
                        Transactions: {user.financialData.importedData.transactions}
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
                <span>External System Integration</span>
              </CardTitle>
              <CardDescription>
                Connect to your existing accounting or financial management systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="system-type">System Type</Label>
                  <select 
                    id="system-type"
                    className="w-full p-2 border rounded-md"
                    value={connectionData.systemType}
                    onChange={(e) => setConnectionData({...connectionData, systemType: e.target.value})}
                  >
                    <option value="accounting">Accounting Software</option>
                    <option value="banking">Banking API</option>
                    <option value="erp">ERP System</option>
                    <option value="crm">CRM System</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-url">API URL</Label>
                  <Input
                    id="api-url"
                    placeholder="https://api.yoursystem.com/v1"
                    value={connectionData.apiUrl}
                    onChange={(e) => setConnectionData({...connectionData, apiUrl: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Your API key"
                    value={connectionData.apiKey}
                    onChange={(e) => setConnectionData({...connectionData, apiKey: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleAPIConnection} 
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading ? "Connecting..." : "Test Connection"}
                </Button>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Setup Guide</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Contact your system administrator to obtain API credentials. 
                      Ensure your system supports REST API integration with read permissions for financial data.
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
                <span>Connection Status</span>
              </CardTitle>
              <CardDescription>
                Monitor your connected systems and data sources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.integrations ? (
                  Object.entries(user.integrations).map(([key, integration]: [string, any]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <h4 className="font-medium capitalize">{key} System</h4>
                          <p className="text-sm text-gray-600">
                            Connected on {new Date(integration.connectedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Plug className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No external systems connected yet</p>
                    <p className="text-sm">Use the Integration tab to connect your systems</p>
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
