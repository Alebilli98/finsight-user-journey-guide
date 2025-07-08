
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import Homepage from "@/components/Homepage";
import AuthModal from "@/components/AuthModal";
import OnboardingFlow from "@/components/OnboardingFlow";
import Dashboard from "@/components/Dashboard";
import Analytics from "@/components/Analytics";
import Reports from "@/components/Reports";
import AISolution from "@/components/AISolution";
import LendingSolution from "@/components/LendingSolution";
import Calendar from "@/components/Calendar";
import Packages from "@/components/Packages";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const { toast } = useToast();

  // Check for existing user session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("finsight_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowOnboarding(true);
  };

  const handleCompleteOnboarding = () => {
    setShowOnboarding(false);
    setActiveSection("dashboard");
    toast({
      title: "Welcome to FinSight!",
      description: "Your financial transformation journey begins now.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("finsight_user");
    setUser(null);
    setIsAuthenticated(false);
    setActiveSection("dashboard");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const renderContent = () => {
    if (showOnboarding) {
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
      case "calendar":
        return <Calendar />;
      case "packages":
        return <Packages />;
      case "profile":
        return <UserProfile user={user} onUserUpdate={handleUserUpdate} />;
      default:
        return <Dashboard />;
    }
  };

  // Show homepage if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <Homepage onLogin={handleLogin} onSignup={handleSignup} />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
          defaultTab={authModalTab}
        />
      </>
    );
  }

  // Show authenticated app
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
          />
          
          <div className="flex-1 flex flex-col">
            <Header 
              isOnboarded={true}
              user={user}
              onLogout={handleLogout}
              onProfile={() => setActiveSection("profile")}
            />
            
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
