
import { 
  TrendingUp, BarChart3, FileText, Brain, CreditCard, Package, Calendar, Upload
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AppSidebar = ({ activeSection, setActiveSection }: AppSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { t } = useLanguage();

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "data-import", label: "Data Import", icon: Upload },
    { id: "ai-solution", label: "AI Solution", icon: Brain },
    { id: "lending", label: "Lending", icon: CreditCard },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "packages", label: "Packages", icon: Package },
  ];

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-3 px-3 py-6 mb-4">
            <div className="bg-tech-gradient p-2.5 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/lovable-uploads/79cc2aab-18a5-4eb6-97d0-e35487ae3632.png" 
                alt="Finsk.Ai Logo" 
                className="h-6 w-6"
              />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold bg-tech-gradient bg-clip-text text-transparent font-inter">Finsk.Ai</h1>
                <p className="text-sm text-primary font-medium font-poppins">Your AI Financial Guide</p>
              </div>
            )}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <ScrollArea className="h-[calc(100vh-200px)] overflow-y-auto">
              <SidebarMenu className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full justify-start py-3 px-4 rounded-xl transition-all transform hover:scale-105 ${
                          isActive 
                            ? "bg-tech-gradient text-white font-medium shadow-lg border border-primary/20" 
                            : "hover:bg-primary/10 text-tech-gray hover:text-primary hover:shadow-md"
                        }`}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && <span className="ml-3 text-base">{item.label}</span>}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
