
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
    { id: "data-import", label: "Data Import", icon: Upload },
    { id: "ai-solution", label: "AI Solution", icon: Brain },
    { id: "lending", label: "Lending", icon: CreditCard },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "packages", label: "Packages", icon: Package },
  ];

  return (
    <Sidebar className={collapsed ? "w-12" : "w-64"} collapsible="icon">
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-2 px-2 py-4 mb-2">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-1.5 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">FinSight</h1>
                <p className="text-xs text-gray-500">La Tua Guida Finanziaria</p>
              </div>
            )}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full justify-start py-2 px-3 rounded-md transition-all ${
                        isActive 
                          ? "bg-blue-100 text-blue-700 font-medium shadow-sm" 
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      {!collapsed && <span className="ml-2 text-sm">{item.label}</span>}
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
