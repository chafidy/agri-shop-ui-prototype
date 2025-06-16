
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Hash, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const NumberingSettings = () => {
  const handleSaveNumerotation = () => {
    toast({
      title: "Numérotation sauvegardée",
      description: "Les formats de numérotation ont été configurés",
    });
  };

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-farm-green-dark">
          <Hash className="w-5 h-5 mr-2 text-farm-green" />
          Format de Numérotation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="format-vente">Format bon de vente</Label>
            <Input id="format-vente" defaultValue="VTE-{YYYY}-{NNN}" />
            <p className="text-xs text-gray-500">Exemple : VTE-2024-001</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format-achat">Format bon d'achat</Label>
            <Input id="format-achat" defaultValue="ACH-{YYYY}-{NNN}" />
            <p className="text-xs text-gray-500">Exemple : ACH-2024-001</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format-livraison">Format bon de livraison</Label>
            <Input id="format-livraison" defaultValue="LIV-{YYYY}-{NNN}" />
            <p className="text-xs text-gray-500">Exemple : LIV-2024-001</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="format-devis">Format devis</Label>
            <Input id="format-devis" defaultValue="DEV-{YYYY}-{NNN}" />
            <p className="text-xs text-gray-500">Exemple : DEV-2024-001</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Variables disponibles</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><code>{"{YYYY}"}</code> - Année sur 4 chiffres</p>
            <p><code>{"{YY}"}</code> - Année sur 2 chiffres</p>
            <p><code>{"{MM}"}</code> - Mois sur 2 chiffres</p>
            <p><code>{"{NNN}"}</code> - Numéro séquentiel</p>
          </div>
        </div>
        
        <Button onClick={handleSaveNumerotation} className="w-full bg-farm-green hover:bg-farm-green-dark">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder les formats
        </Button>
      </CardContent>
    </Card>
  );
};
