
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { CreditCard, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const PaymentSettings = () => {
  const [especes, setEspeces] = useState(true);
  const [mobileMoney, setMobileMoney] = useState(true);
  const [cheque, setCheque] = useState(false);

  const handleSavePayment = () => {
    toast({
      title: "Modes de paiement mis à jour",
      description: "Les modes de paiement ont été configurés",
    });
  };

  return (
    <Card className="shadow-sm border-0 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center text-farm-green-dark">
          <CreditCard className="w-5 h-5 mr-2 text-farm-green" />
          Modes de Paiement
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="especes">Espèces</Label>
            <p className="text-sm text-gray-600">Accepter les paiements en espèces</p>
          </div>
          <Switch
            id="especes"
            checked={especes}
            onCheckedChange={setEspeces}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="mobile-money">Mobile Money</Label>
            <p className="text-sm text-gray-600">Orange Money, MVola, Airtel Money</p>
          </div>
          <Switch
            id="mobile-money"
            checked={mobileMoney}
            onCheckedChange={setMobileMoney}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="cheque">Chèque</Label>
            <p className="text-sm text-gray-600">Accepter les paiements par chèque</p>
          </div>
          <Switch
            id="cheque"
            checked={cheque}
            onCheckedChange={setCheque}
          />
        </div>

        {mobileMoney && (
          <div className="space-y-3 p-4 bg-farm-cream/30 rounded-lg">
            <h4 className="font-semibold text-farm-green-dark">Configuration Mobile Money</h4>
            <div className="space-y-2">
              <Label htmlFor="orange-money">Numéro Orange Money</Label>
              <Input id="orange-money" placeholder="034 XX XXX XX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mvola">Numéro MVola</Label>
              <Input id="mvola" placeholder="034 XX XXX XX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="airtel-money">Numéro Airtel Money</Label>
              <Input id="airtel-money" placeholder="033 XX XXX XX" />
            </div>
          </div>
        )}

        {cheque && (
          <div className="space-y-3 p-4 bg-farm-cream/30 rounded-lg">
            <h4 className="font-semibold text-farm-green-dark">Configuration Chèque</h4>
            <div className="space-y-2">
              <Label htmlFor="bank-name">Nom de la banque</Label>
              <Input id="bank-name" placeholder="BNI Madagascar" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">Numéro de compte</Label>
              <Input id="account-number" placeholder="00123456789" />
            </div>
          </div>
        )}
        
        <Button onClick={handleSavePayment} className="w-full bg-farm-green hover:bg-farm-green-dark">
          <Save className="w-4 h-4 mr-2" />
          Sauvegarder les modes de paiement
        </Button>
      </CardContent>
    </Card>
  );
};
