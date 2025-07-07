
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, BarChart3, FileText, Brain, CreditCard, Package,
  Calendar, User, Settings, Bell
} from "lucide-react";

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOnboarded: boolean;
}

const Header = ({ activeSection, setActiveSection, isOnboarded }: HeaderProps) => {
  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "ai-solution", label: "AI Solution", icon: Brain },
    { id: "lending", label: "Lending", icon: CreditCard },
    { id: "packages", label: "Packages", icon: Package },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-2 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinSight</h1>
                <p className="text-xs text-gray-500">Your Financial Guide</p>
              </div>
            </div>

            {isOnboarded && (
              <nav className="hidden md:flex space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveSection(item.id)}
                      className="flex items-center space-x-2"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isOnboarded && (
              <>
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </>
            )}
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Premier Plan
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
