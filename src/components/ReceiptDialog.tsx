import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Receipt, Printer, Download, Store } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SaleItem {
  produit: string;
  quantite: number;
  prix: number;
  total: number;
}

interface ReceiptDialogProps {
  saleItems: SaleItem[];
  client: string;
  modePaiement: string;
  total: number;
  isOpen: boolean;
  onClose: () => void;
}

const ReceiptDialog = ({ saleItems, client, modePaiement, total, isOpen, onClose }: ReceiptDialogProps) => {
  const generateReceiptId = () => {
    const date = new Date();
    const timestamp = date.getTime().toString().slice(-6);
    return `RCU-${date.getFullYear()}-${timestamp}`;
  };

  const receiptId = generateReceiptId();
  const currentDate = new Date().toLocaleString('fr-FR');

  const handlePrint = () => {
    toast({
      title: "Reçu envoyé à l'impression",
      description: `Reçu ${receiptId} en cours d'impression`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Reçu téléchargé",
      description: `Reçu ${receiptId} téléchargé en PDF`,
    });
  };

  const validItems = saleItems.filter(item => item.produit && item.quantite > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-farm-green-dark">
            <Receipt className="w-5 h-5 mr-2 text-farm-green" />
            Reçu de vente
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Reçu de vente */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            {/* En-tête du reçu */}
            <div className="text-center border-b pb-4 mb-4">
              <div className="flex items-center justify-center mb-2">
                <div className="bg-farm-green rounded-lg w-10 h-10 flex items-center justify-center mr-3">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-farm-green-dark">FarmShop Pro</h2>
                  <p className="text-sm text-gray-600">Produits d'élevage</p>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <p>Adresse de la boutique • Téléphone • Email</p>
              </div>
            </div>

            {/* Informations du reçu */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p><strong>Reçu N°:</strong> {receiptId}</p>
                <p><strong>Date:</strong> {currentDate}</p>
              </div>
              <div>
                <p><strong>Client:</strong> {client || 'Client sans nom'}</p>
                <p><strong>Mode de paiement:</strong> {modePaiement || 'Non spécifié'}</p>
              </div>
            </div>

            {/* Articles vendus */}
            <div className="mb-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Article</TableHead>
                    <TableHead className="text-xs text-center">Qté</TableHead>
                    <TableHead className="text-xs text-right">P.U.</TableHead>
                    <TableHead className="text-xs text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs">{item.produit}</TableCell>
                      <TableCell className="text-xs text-center">{item.quantite}</TableCell>
                      <TableCell className="text-xs text-right">{item.prix.toLocaleString()} Ar</TableCell>
                      <TableCell className="text-xs text-right font-semibold">
                        {item.total.toLocaleString()} Ar
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totaux */}
            <div className="border-t pt-4">
              <div className="flex justify-end">
                <div className="space-y-1 text-right">
                  <div className="flex justify-between items-center min-w-[200px]">
                    <span className="text-sm">Sous-total:</span>
                    <span className="text-sm">{total.toLocaleString()} Ar</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">TVA (0%):</span>
                    <span className="text-sm">0 Ar</span>
                  </div>
                  <div className="flex justify-between items-center border-t pt-2">
                    <span className="font-bold">TOTAL:</span>
                    <span className="font-bold text-lg text-farm-green">{total.toLocaleString()} Ar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pied de page */}
            <div className="text-center mt-6 pt-4 border-t text-xs text-gray-500">
              <p>Merci pour votre achat !</p>
              <p>Conservez ce reçu pour tout échange ou réclamation</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Télécharger PDF
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

export default ReceiptDialog;