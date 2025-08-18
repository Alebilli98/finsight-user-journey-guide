
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Calendar, User, Bell, LogOut, Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "./LanguageSelector";

interface HeaderProps {
  isOnboarded: boolean;
  user?: any;
  onLogout?: () => void;
  onProfile?: () => void;
}

const Header = ({ isOnboarded, user, onLogout, onProfile }: HeaderProps) => {
  const { t } = useLanguage();

  return (
    <header className="bg-white/95 backdrop-blur-xl shadow-lg border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            {isOnboarded && <SidebarTrigger className="text-primary hover:text-accent transition-colors" />}
            {isOnboarded && (
              <div className="flex items-center space-x-3">
                <img 
                  src="/lovable-uploads/3649b85f-a01b-4935-b35c-c20278d06f18.png" 
                  alt="Tralis AI Logo" 
                  className="h-12 w-auto"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isOnboarded && user && (
              <>
                <Button variant="ghost" size="sm" className="text-tech-gray hover:text-primary hover:bg-primary/10">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-tech-gray hover:text-primary hover:bg-primary/10"
                  onClick={() => {
                    const event = new CustomEvent('navigate-to-section', { detail: 'calendar' });
                    window.dispatchEvent(event);
                  }}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative text-tech-gray hover:text-primary hover:bg-primary/10">
                      <User className="h-4 w-4" />
                      <span className="ml-2 hidden md:inline font-inter">
                        {user.firstName} {user.lastName}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 tech-card border-primary/20">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium text-dark-blue font-inter">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-tech-gray font-poppins">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary/20" />
                    <DropdownMenuItem onClick={onProfile} className="text-tech-gray hover:text-primary hover:bg-primary/10">
                      <User className="mr-2 h-4 w-4" />
                      {t('header.profile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-tech-gray hover:text-primary hover:bg-primary/10">
                      <Settings className="mr-2 h-4 w-4" />
                      {t('header.settings')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/20" />
                    <DropdownMenuItem onClick={onLogout} className="text-tech-gray hover:text-destructive hover:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('header.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <LanguageSelector />
              </>
            )}
            <Badge variant="secondary" className="bg-tech-gradient text-white border-0 font-inter shadow-lg">
              {user?.plan || "Premier"} {t('header.plan')}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
