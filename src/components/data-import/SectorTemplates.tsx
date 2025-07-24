
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileSpreadsheet, Building, ShoppingCart, Users } from "lucide-react";
import ExcelTemplateGenerator from "./ExcelTemplateGenerator";

interface SectorTemplatesProps {
  userIndustry?: string;
}

const SectorTemplates = ({ userIndustry = 'commerce' }: SectorTemplatesProps) => {
  const templates = [
    {
      id: 'commerce',
      title: 'Retail & Commerce',
      description: 'Template per negozi fisici, vendita al dettaglio e commercio tradizionale',
      icon: Building,
      color: 'blue',
      features: ['Gestione inventario', 'Analisi vendite', 'Costi operativi', 'Margini prodotto']
    },
    {
      id: 'ecommerce',
      title: 'E-commerce',
      description: 'Template per negozi online, marketplace e vendita digitale',
      icon: ShoppingCart,
      color: 'green',
      features: ['Conversion rate', 'CAC & LTV', 'Logistica', 'Marketing digitale']
    },
    {
      id: 'consulting',
      title: 'Consulting & Services',
      description: 'Template per consulenze, servizi professionali e agenzie',
      icon: Users,
      color: 'purple',
      features: ['Ore fatturabili', 'Progetti attivi', 'Margini servizi', 'Utilizzo risorse']
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50 text-blue-700',
      green: 'border-green-200 bg-green-50 text-green-700',
      purple: 'border-purple-200 bg-purple-50 text-purple-700'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Template Excel Professionale</h3>
        <p className="text-muted-foreground">
          Scarica il template completo basato sul tuo settore di attività
        </p>
      </div>

      {/* Main Template Generator */}
      <div className="mb-6">
        <ExcelTemplateGenerator userIndustry={userIndustry} />
      </div>

      {/* Sector Information */}
      <div className="grid md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const Icon = template.icon;
          const isActive = template.id === userIndustry;
          
          return (
            <Card key={template.id} className={`${isActive ? 'ring-2 ring-blue-500' : ''} hover:shadow-md transition-shadow`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Icon className={`h-6 w-6 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  {isActive && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Il tuo settore
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base">{template.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="space-y-2">
                  <p className="text-xs font-medium">Metriche specifiche:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-semibold mb-2 text-blue-900">Struttura del Template</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-blue-800">Sezioni Finanziarie:</p>
            <ul className="text-blue-700 mt-1 space-y-1">
              <li>• Conto Economico (P&L)</li>
              <li>• Stato Patrimoniale</li>
              <li>• Dati Mensili</li>
              <li>• Informazioni Aziendali</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-green-800">KPI Automatici:</p>
            <ul className="text-green-700 mt-1 space-y-1">
              <li>• ROI e ROE</li>
              <li>• Margini e Crescita</li>
              <li>• Liquidità e Solvibilità</li>
              <li>• Analisi Trend</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorTemplates;
