import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell, AlertTriangle, CheckCircle, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationsPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const recentNotifications = [
    {
      id: 1,
      type: 'stock_alert',
      title: 'Stock critique',
      message: 'Vaccin Newcastle: 5 unités restantes',
      time: '10 min',
      urgent: true
    },
    {
      id: 2,
      type: 'order_new',
      title: 'Nouvelle commande',
      message: 'CMD-2024-004 - Ferme Rakoto',
      time: '1h',
      urgent: false
    },
    {
      id: 3,
      type: 'expiration_warning',
      title: 'Expiration proche',
      message: '3 produits expirent bientôt',
      time: '2h',
      urgent: true
    },
    {
      id: 4,
      type: 'payment_received',
      title: 'Paiement reçu',
      message: '45,000 Ar - FACT-2024-156',
      time: '3h',
      urgent: false
    }
  ];

  const getIcon = (type: string) => {
    switch(type) {
      case 'stock_alert': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'order_new': return <Bell className="w-4 h-4 text-blue-600" />;
      case 'payment_received': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'expiration_warning': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const unreadCount = recentNotifications.filter(n => n.urgent).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b bg-farm-cream/20">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-farm-green-dark">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs">
                {unreadCount} urgent{unreadCount > 1 ? 'es' : 'e'}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto">
          {recentNotifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-3 border-b border-gray-100 hover:bg-farm-cream/10 transition-colors cursor-pointer ${
                notification.urgent ? 'bg-red-50/50' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-medium text-sm text-farm-green-dark truncate">
                      {notification.title}
                    </p>
                    {notification.urgent && (
                      <Badge variant="destructive" className="text-xs px-1 py-0">
                        !
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Il y a {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t bg-farm-cream/10">
          <Link to="/notifications" onClick={() => setIsOpen(false)}>
            <Button 
              variant="ghost" 
              className="w-full text-farm-green hover:bg-farm-green hover:text-white"
            >
              Voir toutes les notifications
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;