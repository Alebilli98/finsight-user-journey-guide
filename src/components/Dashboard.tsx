
import { useState } from "react";
import CommerceDashboard from "@/components/dashboards/CommerceDashboard";
import EcommerceDashboard from "@/components/dashboards/EcommerceDashboard";
import ConsultingDashboard from "@/components/dashboards/ConsultingDashboard";
import FinancialStatements from "@/components/financial/FinancialStatements";
import CustomizableDashboard from "@/components/dashboard/CustomizableDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, TrendingUp, Settings } from "lucide-react";

interface DashboardProps {
  user?: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  // Get user's industry to determine which dashboard to show
  const userIndustry = user?.industry;
  const userData = user || {};
  const financialData = userData.financialData || {};

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
            <TabsList className="grid w-full grid-cols-3 bg-transparent h-12">
              <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="statements" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <FileText className="h-4 w-4 mr-2" />
                Financial Statements
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
