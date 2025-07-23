
import { useState } from "react";
import CommerceDashboard from "@/components/dashboards/CommerceDashboard";
import EcommerceDashboard from "@/components/dashboards/EcommerceDashboard";
import ConsultingDashboard from "@/components/dashboards/ConsultingDashboard";
import FinancialStatements from "@/components/financial/FinancialStatements";
import Analytics from "@/components/Analytics";
import AISolution from "@/components/AISolution";
import DuPontAnalysis from "@/components/financial/DuPontAnalysis";
import ScenarioAnalysis from "@/components/ai/ScenarioAnalysis";
import CustomizableDashboard from "@/components/dashboard/CustomizableDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, BarChart3, Calculator, TrendingUp, Brain, Settings, Bot } from "lucide-react";

interface DashboardProps {
  user?: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  // Get user's industry to determine which dashboard to show
  const userIndustry = user?.industry;
  const userData = user || {};
  const financialData = userData.financialData || {};

  // DuPont Analysis data
  const dupontData = {
    netIncome: financialData.netIncome || 0,
    revenue: financialData.annualRevenue || 0,
    totalAssets: financialData.totalAssets || 0,
    totalEquity: (financialData.totalAssets || 0) - (financialData.totalLiabilities || 0),
    netProfitMargin: financialData.annualRevenue > 0 ? ((financialData.netIncome || 0) / financialData.annualRevenue) * 100 : 0,
    assetTurnover: financialData.totalAssets > 0 ? (financialData.annualRevenue || 0) / financialData.totalAssets : 0,
    equityMultiplier: ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0)) > 0 ? 
      (financialData.totalAssets || 0) / ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0)) : 0,
    roe: ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0)) > 0 ? 
      ((financialData.netIncome || 0) / ((financialData.totalAssets || 0) - (financialData.totalLiabilities || 0))) * 100 : 0,
    historicalData: financialData.dupontHistorical || [],
    industryBenchmarks: {
      netProfitMargin: 15,
      assetTurnover: 1.2,
      equityMultiplier: 2.0,
      roe: 15
    }
  };

  // Render the industry-specific dashboard
  const renderIndustryDashboard = () => {
    switch (userIndustry) {
      case 'commerce':
        return <CommerceDashboard user={user} />;
      case 'ecommerce':
        return <EcommerceDashboard user={user} />;
      case 'consulting':
        return <ConsultingDashboard user={user} />;
      default:
        return <CommerceDashboard user={user} />; // Default to commerce dashboard
    }
  };

  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b bg-white/50 backdrop-blur-sm">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-7 bg-transparent h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="statements" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <FileText className="h-4 w-4 mr-2" />
                Financial Statements
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="dupont" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Calculator className="h-4 w-4 mr-2" />
                DuPont Analysis
              </TabsTrigger>
              <TabsTrigger value="ai-solution" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Bot className="h-4 w-4 mr-2" />
                AI Solution
              </TabsTrigger>
              <TabsTrigger value="ai-insights" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </TabsTrigger>
              <TabsTrigger value="custom" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Settings className="h-4 w-4 mr-2" />
                My Dashboard
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" className="mt-0">
          {renderIndustryDashboard()}
        </TabsContent>

        <TabsContent value="statements" className="mt-0">
          <FinancialStatements user={user} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-0">
          <Analytics user={user} />
        </TabsContent>

        <TabsContent value="dupont" className="mt-0">
          <div className="p-6">
            <DuPontAnalysis data={dupontData} />
          </div>
        </TabsContent>

        <TabsContent value="ai-solution" className="mt-0">
          <div className="p-6">
            <AISolution financialData={financialData} />
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="mt-0">
          <div className="p-6">
            <ScenarioAnalysis financialData={financialData} />
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-0">
          <div className="p-6">
            <CustomizableDashboard user={user} financialData={financialData} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
