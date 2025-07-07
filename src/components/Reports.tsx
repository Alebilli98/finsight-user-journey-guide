
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, FileText, Calendar, Filter, Clock, CheckCircle,
  BarChart3, PieChart, TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const { toast } = useToast();

  const reportTypes = [
    {
      id: "pnl",
      title: "Profit & Loss Statement",
      description: "Comprehensive income statement with IFRS standards",
      icon: TrendingUp,
      formats: ["PDF", "Excel", "CSV"],
      lastGenerated: "2 hours ago",
    },
    {
      id: "balance-sheet",
      title: "Balance Sheet",
      description: "Statement of financial position (IFRS compliant)",
      icon: BarChart3,
      formats: ["PDF", "Excel"],
      lastGenerated: "2 hours ago",
    },
    {
      id: "cash-flow",
      title: "Cash Flow Statement",
      description: "Direct and indirect method cash flow analysis",
      icon: PieChart,
      formats: ["PDF", "Excel", "CSV"],
      lastGenerated: "3 hours ago",
    },
    {
      id: "financial-ratios",
      title: "Financial Ratios Analysis",
      description: "Comprehensive ratio analysis and benchmarking",
      icon: BarChart3,
      formats: ["PDF", "Excel"],
      lastGenerated: "1 day ago",
    },
  ];

  const quickReports = [
    { title: "Daily Cash Position", period: "Today", accounts: "All" },
    { title: "Weekly Revenue Summary", period: "This Week", accounts: "Revenue" },
    { title: "Monthly Expense Report", period: "This Month", accounts: "Expenses" },
    { title: "Quarterly Performance", period: "Q2 2024", accounts: "All" },
  ];

  const handleDownloadReport = (reportType: string, format: string) => {
    toast({
      title: "Report Generation Started",
      description: `Generating ${reportType} report in ${format} format...`,
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Ready",
        description: `Your ${reportType} report has been downloaded successfully.`,
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600">Generate and download comprehensive financial reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        {quickReports.map((report, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <Badge variant="outline" className="text-xs">Quick</Badge>
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{report.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{report.period}</p>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => handleDownloadReport(report.title, "PDF")}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Reports Section */}
      <Card>
        <CardHeader>
          <CardTitle>Standard Financial Reports</CardTitle>
          <CardDescription>
            IFRS-compliant financial statements and analysis reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedPeriod} className="mt-6">
              <div className="space-y-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon;
                  return (
                    <Card key={report.id} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              <Icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{report.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  Last generated: {report.lastGenerated}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {report.formats.map((format) => (
                              <Button
                                key={format}
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadReport(report.title, format)}
                                className="flex items-center space-x-1"
                              >
                                <Download className="h-3 w-3" />
                                <span>{format}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Report History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Your recently generated financial reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "P&L Statement - June 2024", date: "2 hours ago", status: "completed", format: "PDF" },
              { name: "Balance Sheet - June 2024", date: "2 hours ago", status: "completed", format: "Excel" },
              { name: "Cash Flow - Q2 2024", date: "1 day ago", status: "completed", format: "PDF" },
              { name: "Monthly Expense Report - May 2024", date: "3 days ago", status: "completed", format: "CSV" },
              { name: "Financial Ratios - Q1 2024", date: "1 week ago", status: "completed", format: "PDF" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{report.format}</Badge>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
