
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Package, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const StockSettings = () => {
  const [seuilStockGlobal, setSeuilStockGlobal] = useState(10);

  const handleSaveStock = () => {
    toast({
      title: "Configuration stock sauvegardée",
      description: "Les paramètres de gestion de stock ont été mis à jour",
    });
  };

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-farm-green-dark">
          <Package className="w-5 h-5 mr-2 text-farm-green" />
          Configuration Stock
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seuil-global">Seuil de stock critique global</Label>
          <Input 
            id="seuil-global" 
            type="number" 
            value={seuilStockGlobal}
            onChange={(e) => setSeuilStockGlobal(Number(e.target.value))}
          />
          <p className="text-xs text-gray-500">Seuil par défaut pour nouveaux produits</p>
        </div>

        <div className="space-y-3">
          <Label>Unités de mesure disponibles</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input defaultValue="Sac 25kg" placeholder="Ex: Sac 25kg" />
            <Input defaultValue="Sac 50kg" placeholder="Ex: Sac 50kg" />
            <Input defaultValue="Litre" placeholder="Ex: Litre" />
            <Input defaultValue="Pièce" placeholder="Ex: Pièce" />
            <Input defaultValue="Kg" placeholder="Ex: Kg" />
            <Input defaultValue="Flacon" placeholder="Ex: Flacon" />
          </div>
          <Button variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
            Ajouter une unité
          </Button>
        </div>

        <div className="space-y-3 p-4 bg-farm-cream/30 rounded-lg">
          <h4 className="font-semibold text-farm-green-dark">Seuils par catégorie</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Aliments pour animaux</Label>
              <Input className="w-20" type="number" defaultValue="20" />
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-sm">Vaccins et médicaments</Label>
              <Input className="w-20" type="number" defaultValue="5" />
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-sm">Équipements</Label>
              <Input className="w-20" type="number" defaultValue="3" />
            </div>
            <div className="flex justify-between items-center">
              <Label className="text-sm">Produits d'entretien</Label>
              <Input className="w-20" type="number" defaultValue="10" />
            </div>
          </div>
        </div>
        
        <Button onClick={handleSaveStock} className="w-full bg-farm-green hover:bg-farm-green-dark">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder la configuration stock
        </Button>
      </CardContent>
    </Card>
  );
};
