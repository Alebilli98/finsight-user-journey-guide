
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Languages className="h-4 w-4 mr-2" />
          {language === 'it' ? 'IT' : language === 'en' ? 'EN' : 'ES'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage('it')}>
          🇮🇹 {t('language.italian')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('en')}>
          🇬🇧 {t('language.english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('es')}>
          🇪🇸 {t('language.spanish')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
