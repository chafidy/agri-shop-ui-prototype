
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const GeneralSettings = () => {
  const handleSaveGeneral = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres généraux ont été mis à jour",
    });
  };

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-farm-green-dark">
          <SettingsIcon className="w-5 h-5 mr-2 text-farm-green" />
          Paramètres Généraux
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="entreprise">Nom de l'entreprise</Label>
          <Input id="entreprise" defaultValue="FarmShop Madagascar" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="adresse">Adresse</Label>
          <Input id="adresse" defaultValue="Antananarivo, Madagascar" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telephone">Téléphone</Label>
          <Input id="telephone" defaultValue="+261 20 22 123 45" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email de contact</Label>
          <Input id="email" type="email" defaultValue="contact@farmshop.mg" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="devise">Devise</Label>
          <Select defaultValue="MGA">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MGA">Ariary (Ar)</SelectItem>
              <SelectItem value="EUR">Euro (€)</SelectItem>
              <SelectItem value="USD">Dollar US ($)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="langue">Langue</Label>
          <Select defaultValue="fr">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="mg">Malagasy</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleSaveGeneral} className="w-full bg-farm-green hover:bg-farm-green-dark">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder
        </Button>
      </CardContent>
    </Card>
  );
};
