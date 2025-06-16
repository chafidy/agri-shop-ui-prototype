
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';

export const NotificationSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [emailReports, setEmailReports] = useState(false);

  return (
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
  );
};
