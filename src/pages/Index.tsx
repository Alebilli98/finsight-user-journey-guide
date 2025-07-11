import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Analytics from "@/components/Analytics";
import Reports from "@/components/Reports";
import DataImport from "@/components/DataImport";
import AISolution from "@/components/AISolution";
import Lending from "@/components/Lending";
import CalendarPage from "@/components/CalendarPage";
import Packages from "@/components/Packages";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Index() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    } else if (status === "authenticated") {
      // Fetch user data or perform other actions
      setUser(session.user);
    }
  }, [status, router, session]);

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
                      title: "Data Imported",
                      description: "The data has been successfully imported.",
                    });
                  }}
                />;
      case 'ai-solution':
        return <AISolution />;
      case 'lending':
        return <Lending />;
      case 'calendar':
        return <CalendarPage />;
      case 'packages':
        return <Packages />;
      default:
        return <div>Sezione non trovata</div>;
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const handleProfileUpdate = (updatedUser: any) => {
    setUser(updatedUser);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Header 
              user={user} 
              onLogout={handleLogout}
              onProfileUpdate={handleProfileUpdate}
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

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
