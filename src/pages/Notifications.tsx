import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Check, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'stock_alert',
      title: 'Stock critique',
      message: 'Le stock de Vaccin Newcastle est critique (5 unités restantes)',
      date: '2024-06-13 09:30',
      read: false,
      urgent: true
    },
    {
      id: 2,
      type: 'order_new',
      title: 'Nouvelle commande',
      message: 'Commande CMD-2024-004 reçue de Ferme Rakoto (67,000 Ar)',
      date: '2024-06-13 08:15',
      read: false,
      urgent: false
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Paiement reçu',
      message: 'Paiement de 45,000 Ar reçu pour la facture FACT-2024-156',
      date: '2024-06-12 16:45',
      read: true,
      urgent: false
    },
    {
      id: 4,
      type: 'expiration_warning',
      title: 'Produits à expirer',
      message: '3 produits expirent dans les 7 prochains jours',
      date: '2024-06-12 14:20',
      read: false,
      urgent: true
    },
    {
      id: 5,
      type: 'system_update',
      title: 'Mise à jour système',
      message: 'Nouvelle version disponible avec des améliorations de sécurité',
      date: '2024-06-11 10:00',
      read: true,
      urgent: false
    }
  ]);

  const getIcon = (type: string) => {
    switch(type) {
      case 'stock_alert': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'order_new': return <Bell className="w-5 h-5 text-blue-600" />;
      case 'payment_received': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'expiration_warning': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'system_update': return <Info className="w-5 h-5 text-gray-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
    toast({
      title: "Notification marquée comme lue",
      description: "La notification a été marquée comme lue"
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification supprimée",
      description: "La notification a été supprimée"
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    toast({
      title: "Toutes les notifications marquées comme lues",
      description: "Toutes les notifications ont été marquées comme lues"
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => !n.read && n.urgent).length;

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Notifications</h1>
          <p className="text-gray-600 mt-1">Centre de notifications et alertes</p>
        </div>
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            onClick={markAllAsRead}
            className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
          >
            <Check className="w-4 h-4 mr-2" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Non lues</p>
                <p className="text-2xl font-bold text-farm-green">{unreadCount}</p>
              </div>
              <Bell className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-600">{urgentCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-farm-green">{notifications.length}</p>
              </div>
              <Info className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des notifications */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <Bell className="w-5 h-5 mr-2 text-farm-green" />
            Toutes les notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  notification.read 
                    ? 'border-gray-200 bg-gray-50' 
                    : 'border-farm-green bg-farm-cream/20'
                } ${notification.urgent && !notification.read ? 'border-red-300 bg-red-50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`font-semibold ${
                          notification.read ? 'text-gray-700' : 'text-farm-green-dark'
                        }`}>
                          {notification.title}
                        </h3>
                        {notification.urgent && !notification.read && (
                          <Badge variant="destructive" className="text-xs">Urgent</Badge>
                        )}
                        {!notification.read && (
                          <Badge variant="default" className="text-xs bg-farm-green">Nouveau</Badge>
                        )}
                      </div>
                      <p className={`text-sm ${
                        notification.read ? 'text-gray-600' : 'text-gray-800'
                      }`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    {!notification.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white"
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 border-red-300 hover:bg-red-50"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;