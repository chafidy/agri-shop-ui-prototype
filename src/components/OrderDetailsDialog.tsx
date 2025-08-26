import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, User, Calendar, CreditCard, Package, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OrderItem {
  produit: string;
  quantite: number;
  prix: number;
}

interface Order {
  id: string;
  client: string;
  total: number;
  statut: string;
  dateCommande: string;
  modePaiement: string;
  items: OrderItem[];
}

interface OrderDetailsDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsDialog = ({ order, isOpen, onClose }: OrderDetailsDialogProps) => {
  if (!order) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En attente de paiement':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'Confirmée':
        return <Badge variant="default" className="bg-green-100 text-green-800">Confirmée</Badge>;
      case 'En préparation':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">En préparation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handlePrintOrder = () => {
    toast({
      title: "Commande imprimée",
      description: `Le bon de commande ${order.id} a été envoyé à l'impression`,
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: `La commande ${order.id} a été exportée en PDF`,
    });
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.quantite * item.prix), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-farm-green-dark">
            <ClipboardList className="w-5 h-5 mr-2 text-farm-green" />
            Détails de la commande {order.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-farm-cream/20 rounded-lg">
                <h3 className="font-semibold text-farm-green-dark mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Informations client
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Client:</span>
                    <span className="ml-2 font-semibold">{order.client}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Date de commande:</span>
                    <span className="ml-2">{order.dateCommande}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Mode de paiement:</span>
                    <span className="ml-2">{order.modePaiement}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-farm-cream/20 rounded-lg">
                <h3 className="font-semibold text-farm-green-dark mb-3 flex items-center">
                  <Package className="w-4 h-4 mr-2" />
                  Statut de la commande
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Statut actuel:</span>
                    {getStatusBadge(order.statut)}
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Montant total:</span>
                    <span className="ml-2 font-bold text-farm-green text-lg">
                      {order.total.toLocaleString()} Ar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Articles commandés */}
          <div className="p-4 bg-white border border-farm-cream rounded-lg">
            <h3 className="font-semibold text-farm-green-dark mb-4">Articles commandés</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-center">Quantité</TableHead>
                  <TableHead className="text-right">Prix unitaire</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.produit}</TableCell>
                    <TableCell className="text-center">{item.quantite}</TableCell>
                    <TableCell className="text-right">{item.prix.toLocaleString()} Ar</TableCell>
                    <TableCell className="text-right font-semibold">
                      {(item.quantite * item.prix).toLocaleString()} Ar
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Récapitulatif */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-2 p-4 bg-farm-cream/20 rounded-lg">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{subtotal.toLocaleString()} Ar</span>
              </div>
              <div className="flex justify-between">
                <span>TVA (0%):</span>
                <span>0 Ar</span>
              </div>
              <div className="flex justify-between">
                <span>Frais de livraison:</span>
                <span>0 Ar</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-farm-green">{order.total.toLocaleString()} Ar</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrintOrder}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Package className="w-4 h-4 mr-2" />
              Imprimer bon de commande
            </Button>
            <Button 
              variant="outline" 
              onClick={handleExportPDF}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter PDF
            </Button>
            <Button 
              onClick={onClose} 
              className="bg-farm-green hover:bg-farm-green-dark"
            >
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;