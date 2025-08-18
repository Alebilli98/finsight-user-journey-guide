
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
            <img 
              src="/lovable-uploads/3649b85f-a01b-4935-b35c-c20278d06f18.png" 
              alt="Tralis AI Logo" 
              className="h-8 w-auto group-hover:scale-105 transition-transform duration-300"
            />
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
