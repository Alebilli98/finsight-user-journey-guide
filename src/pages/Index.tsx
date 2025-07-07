
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from "recharts";
import { 
  TrendingUp, DollarSign, PieChart as PieChartIcon, BarChart3, 
  Brain, FileText, CreditCard, Zap, CheckCircle, Star,
  Calendar, Download, MessageSquare, BookOpen, Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import OnboardingFlow from "@/components/OnboardingFlow";
import Dashboard from "@/components/Dashboard";
import Analytics from "@/components/Analytics";
import Reports from "@/components/Reports";
import AISolution from "@/components/AISolution";
import LendingSolution from "@/components/LendingSolution";
import Packages from "@/components/Packages";

const Index = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [isOnboarded, setIsOnboarded] = useState(false);
  const { toast } = useToast();

  const handleCompleteOnboarding = () => {
    setIsOnboarded(true);
    setActiveSection("dashboard");
    toast({
      title: "Welcome to FinSight!",
      description: "Your financial data has been synced successfully.",
    });
  };

  const renderContent = () => {
    if (!isOnboarded && activeSection === "welcome") {
      return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
    }

    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "analytics":
        return <Analytics />;
      case "reports":
        return <Reports />;
      case "ai-solution":
        return <AISolution />;
      case "lending":
        return <LendingSolution />;
      case "packages":
        return <Packages />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOnboarded={isOnboarded}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
