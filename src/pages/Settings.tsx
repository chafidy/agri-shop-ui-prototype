
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Save, Database, Bell, Shield, Palette, Globe, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [emailReports, setEmailReports] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  // États pour les modes de paiement
  const [especes, setEspeces] = useState(true);
  const [mobileMoney, setMobileMoney] = useState(true);
  const [cheque, setCheque] = useState(false);

  const handleSaveGeneral = () => {
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres généraux ont été mis à jour",
    });
  };

  const handleSaveSecurity = () => {
    toast({
      title: "Sécurité mise à jour",
      description: "Les paramètres de sécurité ont été modifiés",
    });
  };

  const handleSavePayment = () => {
    toast({
      title: "Modes de paiement mis à jour",
      description: "Les modes de paiement ont été configurés",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Sauvegarde lancée",
      description: "La sauvegarde des données est en cours",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Paramètres</h1>
          <p className="text-gray-600 mt-1">Configuration de l'application</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paramètres généraux */}
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

        {/* Modes de paiement */}
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

        {/* Paramètres de notification */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-green-dark">
              <Bell className="w-5 h-5 mr-2 text-farm-green" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">Notifications générales</Label>
                <p className="text-sm text-gray-600">Recevoir les notifications de l'application</p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="stock-alerts">Alertes de stock</Label>
                <p className="text-sm text-gray-600">Alertes quand le stock est faible</p>
              </div>
              <Switch
                id="stock-alerts"
                checked={stockAlerts}
                onCheckedChange={setStockAlerts}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-reports">Rapports par email</Label>
                <p className="text-sm text-gray-600">Recevoir les rapports quotidiens par email</p>
              </div>
              <Switch
                id="email-reports"
                checked={emailReports}
                onCheckedChange={setEmailReports}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="seuil-stock">Seuil d'alerte stock</Label>
              <Input id="seuil-stock" type="number" defaultValue="10" />
              <p className="text-xs text-gray-500">Nombre minimum avant alerte</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email-admin">Email administrateur</Label>
              <Input id="email-admin" type="email" defaultValue="admin@farmshop.mg" />
            </div>
          </CardContent>
        </Card>

        {/* Sécurité */}
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

        {/* Sauvegarde et maintenance */}
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
      </div>

      {/* Paramètres d'affichage */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <Palette className="w-5 h-5 mr-2 text-farm-green" />
            Apparence et Affichage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Mode sombre</Label>
                <p className="text-sm text-gray-600">Interface en mode sombre</p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="items-per-page">Éléments par page</Label>
              <Select defaultValue="20">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-format">Format de date</Label>
              <Select defaultValue="dd/mm/yyyy">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
