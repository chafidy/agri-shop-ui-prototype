
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const BackupSettings = () => {
  const handleBackup = () => {
    toast({
      title: "Sauvegarde lancée",
      description: "La sauvegarde des données est en cours",
    });
  };

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-farm-green-dark">
          <Database className="w-5 h-5 mr-2 text-farm-green" />
          Sauvegarde & Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-farm-cream/30 rounded-lg">
          <h4 className="font-semibold text-farm-green-dark mb-2">Sauvegarde automatique</h4>
          <p className="text-sm text-gray-600 mb-3">
            Dernière sauvegarde : 2024-06-13 à 02:00
          </p>
          <Select defaultValue="daily">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Quotidienne</SelectItem>
              <SelectItem value="weekly">Hebdomadaire</SelectItem>
              <SelectItem value="monthly">Mensuelle</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleBackup} variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
          <Database className="w-4 h-4 mr-2" />
          Lancer une sauvegarde manuelle
        </Button>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-farm-green-dark">Maintenance</h4>
          <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50">
            Nettoyer les logs anciens
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50">
            Optimiser la base de données
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-50">
            Vérifier l'intégrité des données
          </Button>
        </div>
        
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-1">Informations système</h4>
          <div className="text-sm text-yellow-700">
            <p>Version : FarmShop v2.1.0</p>
            <p>Base de données : 15.2 MB</p>
            <p>Dernière maintenance : 2024-06-10</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
