
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
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
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          {isOnboarded && (
            <AppSidebar 
              activeSection={activeSection} 
              setActiveSection={setActiveSection}
            />
          )}
          
          <div className="flex-1 flex flex-col">
            <Header isOnboarded={isOnboarded} />
            
            <main className="flex-1 container mx-auto px-4 py-8">
              {renderContent()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
