
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const SecuritySettings = () => {
  const handleSaveSecurity = () => {
    toast({
      title: "Sécurité mise à jour",
      description: "Les paramètres de sécurité ont été modifiés",
    });
  };

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-farm-green-dark">
          <Shield className="w-5 h-5 mr-2 text-farm-green" />
          Sécurité
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="session-timeout">Durée de session (minutes)</Label>
          <Select defaultValue="60">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 heure</SelectItem>
              <SelectItem value="120">2 heures</SelectItem>
              <SelectItem value="480">8 heures</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password-policy">Politique de mot de passe</Label>
          <Select defaultValue="medium">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Faible (6 caractères min)</SelectItem>
              <SelectItem value="medium">Moyenne (8 caractères + majuscule)</SelectItem>
              <SelectItem value="high">Forte (12 caractères + chiffres + symboles)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tentatives-max">Tentatives de connexion max</Label>
          <Input id="tentatives-max" type="number" defaultValue="5" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-password">Nouveau mot de passe admin</Label>
          <Input id="new-password" type="password" placeholder="••••••••" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
          <Input id="confirm-password" type="password" placeholder="••••••••" />
        </div>
        
        <Button onClick={handleSaveSecurity} className="w-full bg-farm-green hover:bg-farm-green-dark">
          <Save className="w-4 h-4 mr-2" />
          Mettre à jour la sécurité
        </Button>
      </CardContent>
    </Card>
  );
};
