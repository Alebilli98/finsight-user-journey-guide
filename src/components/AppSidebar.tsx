
import { 
  TrendingUp, BarChart3, FileText, Brain, CreditCard, Package
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const AppSidebar = ({ activeSection, setActiveSection }: AppSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "ai-solution", label: "AI Solution", icon: Brain },
    { id: "lending", label: "Lending", icon: CreditCard },
    { id: "packages", label: "Packages", icon: Package },
  ];

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-2 px-2 py-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">FinSight</h1>
                <p className="text-xs text-gray-500">Your Financial Guide</p>
              </div>
            )}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full justify-start ${
                        isActive 
                          ? "bg-blue-100 text-blue-700 font-medium" 
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {!collapsed && <span className="ml-2">{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
