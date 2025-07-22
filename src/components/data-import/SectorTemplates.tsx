
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileSpreadsheet, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as XLSX from 'xlsx';

interface SectorTemplatesProps {
  userIndustry?: string;
}

const SectorTemplates = ({ userIndustry = 'commerce' }: SectorTemplatesProps) => {
  const [selectedSector, setSelectedSector] = useState(userIndustry);
  const { toast } = useToast();

  const sectorTemplates = {
    commerce: {
      name: 'Commercio',
      description: 'Template per attività commerciali tradizionali',
      icon: '🏪',
      fields: [
        ['Campo', 'Valore Esempio', 'Descrizione'],
        ['Ricavi Annui', '250000', 'Fatturato totale annuale'],
        ['Numero Vendite', '1500', 'Numero totale transazioni'],  
        ['Costo Merce Venduta', '125000', 'Costo diretto prodotti'],
        ['Spese Operative', '75000', 'Affitto, utenze, personale'],
        ['Margine Lordo', '50%', 'Percentuale margine lordo']
      ]
    },
    ecommerce: {
      name: 'E-commerce',
      description: 'Template per negozi online e marketplace',
      icon: '🛒',
      fields: [
        ['Campo', 'Valore Esempio', 'Descrizione'],
        ['Ricavi Online', '180000', 'Vendite totali online'],
        ['Ordini Ricevuti', '2100', 'Numero ordini completati'],
        ['Clienti Attivi', '1400', 'Clienti unici attivi'],
        ['Tasso Conversione', '3.2%', 'Percentuale conversioni'],
        ['AOV (Scontrino Medio)', '85', 'Valore medio ordine']
      ]
    },
    consulting: {
      name: 'Consulenza',
      description: 'Template per studi professionali e consulenti',
      icon: '💼',
      fields: [
        ['Campo', 'Valore Esempio', 'Descrizione'],
        ['Fatture Emesse', '320000', 'Fatturato totale consulenze'],
        ['Crediti vs Clienti', '45000', 'Crediti in essere'],
        ['Ore Fatturabili', '1800', 'Ore lavorate fatturate'],
        ['Tariffa Oraria Media', '120', 'Tariffa media per ora'],
        ['Progetti Attivi', '15', 'Numero progetti in corso']
      ]
    },
    'real-estate': {
      name: 'Real Estate',
      description: 'Template per agenzie immobiliari',
      icon: '🏠',
      fields: [
        ['Campo', 'Valore Esempio', 'Descrizione'],
        ['Commissioni Vendite', '180000', 'Commissioni da vendite'],
        ['Commissioni Affitti', '60000', 'Commissioni da locazioni'],
        ['Proprieta Gestite', '120', 'Numero immobili in gestione'],
        ['Transazioni Chiuse', '45', 'Vendite/affitti conclusi'],
        ['Valore Medio Immobile', '280000', 'Valore medio proprietà']
      ]
    },
    manufacturing: {
      name: 'Produzione',
      description: 'Template per aziende manifatturiere',
      icon: '🏭',
      fields: [
        ['Campo', 'Valore Esempio', 'Descrizione'],
        ['Ricavi Produzione', '450000', 'Fatturato da prodotti'],
        ['Costi Materie Prime', '200000', 'Costo materiali'],
        ['Costi Manodopera', '120000', 'Costi del personale'],
        ['Unita Prodotte', '15000', 'Pezzi prodotti annualmente'],
        ['Capacita Produttiva', '85%', 'Utilizzo impianti']
      ]
    },
    services: {
      name: 'Servizi',
      description: 'Template per aziende di servizi generici',
      icon: '🛠️',
      fields: [
        ['Campo', 'Valore Esempio', 'Descrizione'],
        ['Ricavi Servizi', '220000', 'Fatturato servizi'],
        ['Contratti Attivi', '35', 'Contratti in essere'],
        ['Clienti Ricorrenti', '28', 'Clienti con contratti continuativi'],
        ['Valore Medio Contratto', '6500', 'Valore medio contratto'],
        ['Tasso Retention', '92%', 'Percentuale mantenimento clienti']
      ]
    }
  };

  const generateTemplate = (sectorKey: string) => {
    const sector = sectorTemplates[sectorKey as keyof typeof sectorTemplates];
    if (!sector) return;

    const templateData = {
      [`${sector.name} - Dati Aziendali`]: sector.fields,
      'Dati Mensili': [
        ['Mese', 'Ricavi', 'Costi', 'Utile', 'Note'],
        ['Gennaio', '20000', '15000', '5000', ''],
        ['Febbraio', '18000', '14000', '4000', ''],
        ['Marzo', '25000', '18000', '7000', ''],
        ['Aprile', '22000', '16000', '6000', ''],
        ['Maggio', '28000', '20000', '8000', ''],
        ['Giugno', '30000', '22000', '8000', ''],
        ['Luglio', '26000', '19000', '7000', ''],
        ['Agosto', '15000', '12000', '3000', 'Periodo estivo'],
        ['Settembre', '24000', '17000', '7000', ''],
        ['Ottobre', '27000', '19000', '8000', ''],
        ['Novembre', '29000', '21000', '8000', ''],
        ['Dicembre', '32000', '24000', '8000', 'Chiusura anno']
      ]
    };

    const wb = XLSX.utils.book_new();
    Object.entries(templateData).forEach(([sheetName, data]) => {
      const ws = XLSX.utils.aoa_to_sheet(data);
      const colWidths = [{ wch: 25 }, { wch: 15 }, { wch: 35 }];
      ws['!cols'] = colWidths;
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    const fileName = `Template_${sector.name.replace(/\s+/g, '_')}.xlsx`;
    XLSX.writeFile(wb, fileName);

    toast({
      title: "Template Scaricato",
      description: `Template per ${sector.name} scaricato con successo.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <Building2 className="h-6 w-6 text-blue-600" />
        <div>
          <h3 className="text-lg font-semibold">Template per Settore</h3>
          <p className="text-sm text-gray-600">Scegli il template più adatto al tuo settore</p>
        </div>
      </div>

      <div className="mb-4">
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleziona il tuo settore" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(sectorTemplates).map(([key, sector]) => (
              <SelectItem key={key} value={key}>
                <div className="flex items-center space-x-2">
                  <span>{sector.icon}</span>
                  <span>{sector.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedSector && sectorTemplates[selectedSector as keyof typeof sectorTemplates] && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{sectorTemplates[selectedSector as keyof typeof sectorTemplates].icon}</span>
              <div>
                <CardTitle>{sectorTemplates[selectedSector as keyof typeof sectorTemplates].name}</CardTitle>
                <CardDescription>{sectorTemplates[selectedSector as keyof typeof sectorTemplates].description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Campi inclusi nel template:</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {sectorTemplates[selectedSector as keyof typeof sectorTemplates].fields.slice(1).map((field, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{field[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={() => generateTemplate(selectedSector)}
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 rounded-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Scarica Template {sectorTemplates[selectedSector as keyof typeof sectorTemplates].name}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SectorTemplates;
