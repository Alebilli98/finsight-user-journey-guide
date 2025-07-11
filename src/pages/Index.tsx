
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Analytics from "@/components/Analytics";
import Reports from "@/components/Reports";
import DataImport from "@/components/DataImport";
import AISolution from "@/components/AISolution";
import LendingSolution from "@/components/LendingSolution";
import Calendar from "@/components/Calendar";
import Packages from "@/components/Packages";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Index() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<any>({
    firstName: 'Mario',
    lastName: 'Rossi',
    email: 'mario.rossi@example.com',
    plan: 'Premier'
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <Reports />;
      case 'data-import':
        return <DataImport 
                  user={user} 
                  onDataUpdate={handleProfileUpdate}
                  onDataImport={(data: any) => {
                    console.log("Data imported:", data);
                    toast({
                      title: "Dati Importati",
                      description: "I dati sono stati importati con successo.",
                    });
                  }}
                />;
      case 'ai-solution':
        return <AISolution />;
      case 'lending':
        return <LendingSolution />;
      case 'calendar':
        return <Calendar />;
      case 'packages':
        return <Packages />;
      default:
        return <div>Sezione non trovata</div>;
    }
  };

  const handleLogout = async () => {
    navigate('/login');
  };

  const handleProfileUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    toast({
      title: "Profilo Aggiornato",
      description: "Il tuo profilo è stato aggiornato con successo.",
    });
  };

  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Header 
              isOnboarded={true}
              user={user} 
              onLogout={handleLogout}
              onProfile={handleProfileUpdate}
            />
            
            <main className="flex-1 p-6 overflow-auto">
              {renderContent()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
