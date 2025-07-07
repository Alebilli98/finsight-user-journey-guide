
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Calendar, User, Bell
} from "lucide-react";

interface HeaderProps {
  isOnboarded: boolean;
}

const Header = ({ isOnboarded }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {isOnboarded && <SidebarTrigger />}
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
