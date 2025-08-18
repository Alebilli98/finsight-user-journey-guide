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
import DataImport from "@/components/DataImport";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const { toast } = useToast();
  const { t } = useLanguage();

  // Check for existing user session on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("tralis_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Show onboarding only if it's the user's first time
      if (!userData.hasCompletedOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, []);

  // Listen for navigation events from Analytics component and calendar
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveSection(event.detail);
    };

    window.addEventListener('navigate-to-section', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('navigate-to-section', handleNavigate as EventListener);
    };
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
    
    // Show onboarding only for first-time users
    if (userData.isFirstLogin || !userData.hasCompletedOnboarding) {
      setShowOnboarding(true);
    } else {
      setActiveSection("dashboard");
      toast({
        title: `${t('auth.welcome')}, ${userData.firstName}!`,
        description: t('dashboard.welcome'),
      });
    }
  };

  const handleCompleteOnboarding = () => {
    // Mark onboarding as completed
    const updatedUser = { ...user, hasCompletedOnboarding: true };
    setUser(updatedUser);
    localStorage.setItem("tralis_user", JSON.stringify(updatedUser));
    
    // Update users array
    const savedUsers = JSON.parse(localStorage.getItem("tralis_users") || "[]");
    const updatedUsers = savedUsers.map((u: any) => 
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("tralis_users", JSON.stringify(updatedUsers));
    
    setShowOnboarding(false);
    setActiveSection("dashboard");
    toast({
      title: `Benvenuto in Tralis AI, ${user.firstName}!`,
      description: "Il tuo viaggio di trasformazione finanziaria inizia ora.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("tralis_user");
    setUser(null);
    setIsAuthenticated(false);
    setActiveSection("dashboard");
    setShowOnboarding(false);
    toast({
      title: t('header.logout'),
      description: "Sei stato disconnesso con successo.",
    });
  };

  const handleUserUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    // Update both current user and users array
    localStorage.setItem("tralis_user", JSON.stringify(updatedUser));
    const savedUsers = JSON.parse(localStorage.getItem("tralis_users") || "[]");
    const updatedUsers = savedUsers.map((u: any) => 
      u.email === updatedUser.email ? updatedUser : u
    );
    localStorage.setItem("tralis_users", JSON.stringify(updatedUsers));
  };

  const renderContent = () => {
    if (showOnboarding) {
      return <OnboardingFlow onComplete={handleCompleteOnboarding} />;
    }

    switch (activeSection) {
      case "dashboard":
        return <Dashboard user={user} />;
      case "analytics":
        return <Analytics user={user} />;
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
      case "data-import":
        return <DataImport user={user} onDataUpdate={handleUserUpdate} />;
      default:
        return <Dashboard user={user} />;
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

  // Show authenticated app with proper layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
          />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Header 
              isOnboarded={!showOnboarding}
              user={user}
              onLogout={handleLogout}
              onProfile={() => setActiveSection("profile")}
            />
            
            <main className="flex-1 p-4 overflow-auto">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
