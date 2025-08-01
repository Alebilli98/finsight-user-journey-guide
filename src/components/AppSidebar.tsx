
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
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2.5 rounded-xl shadow-md">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-900">Finsk.Ai</h1>
                <p className="text-sm text-gray-500">Your AI Financial Guide</p>
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
                            ? "bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 font-medium shadow-lg border border-blue-200" 
                            : "hover:bg-gray-100 text-gray-700 hover:shadow-md"
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
