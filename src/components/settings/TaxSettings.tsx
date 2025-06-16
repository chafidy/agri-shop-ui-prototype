
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const TaxSettings = () => {
  const [tvaApplicable, setTvaApplicable] = useState(true);

  const handleSaveTva = () => {
    toast({
      title: "TVA configurée",
      description: "Les paramètres de TVA ont été sauvegardés",
    });
  };

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-farm-green-dark">
          <Calculator className="w-5 h-5 mr-2 text-farm-green" />
          Configuration TVA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="tva-applicable">TVA applicable</Label>
            <p className="text-sm text-gray-600">Appliquer la TVA sur les ventes</p>
          </div>
          <Switch
            id="tva-applicable"
            checked={tvaApplicable}
            onCheckedChange={setTvaApplicable}
          />
        </div>

        {tvaApplicable && (
          <div className="space-y-4 p-4 bg-farm-cream/30 rounded-lg">
            <div className="space-y-2">
              <Label htmlFor="taux-tva-standard">Taux TVA standard (%)</Label>
              <Input id="taux-tva-standard" type="number" defaultValue="20" step="0.01" />
              <p className="text-xs text-gray-500">Taux par défaut appliqué aux produits</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="taux-tva-reduit">Taux TVA réduit (%)</Label>
              <Input id="taux-tva-reduit" type="number" defaultValue="5.5" step="0.01" />
              <p className="text-xs text-gray-500">Pour produits alimentaires de base</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numero-tva">Numéro de TVA</Label>
              <Input id="numero-tva" placeholder="MG-12345678901" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regime-tva">Régime TVA</Label>
              <Select defaultValue="normal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Régime normal</SelectItem>
                  <SelectItem value="simplifie">Régime simplifié</SelectItem>
                  <SelectItem value="franchise">Franchise en base</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        <Button onClick={handleSaveTva} className="w-full bg-farm-green hover:bg-farm-green-dark">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder la configuration TVA
        </Button>
      </CardContent>
    </Card>
  );
};
