import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Package, Plus, Minus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface StockAdjustmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const StockAdjustmentDialog = ({ isOpen, onClose }: StockAdjustmentDialogProps) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [adjustmentType, setAdjustmentType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  const products = [
    { id: 1, name: "Aliment pour vaches laitières", currentStock: 150 },
    { id: 2, name: "Vaccin Newcastle", currentStock: 5 },
    { id: 3, name: "Abreuvoir automatique", currentStock: 25 },
    { id: 4, name: "Désinfectant étable", currentStock: 0 },
    { id: 5, name: "Complément porcs croissance", currentStock: 80 }
  ];

  const adjustmentReasons = [
    "Inventaire physique",
    "Perte/Casse",
    "Vol/Disparition",
    "Produit périmé",
    "Erreur de saisie",
    "Retour fournisseur",
    "Autre"
  ];

  const handleSubmit = () => {
    if (!selectedProduct || !adjustmentType || !quantity || !reason) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const product = products.find(p => p.name === selectedProduct);
    const adjustmentValue = adjustmentType === 'increase' ? parseInt(quantity) : -parseInt(quantity);
    const newStock = product ? product.currentStock + adjustmentValue : 0;

    toast({
      title: "Ajustement de stock effectué",
      description: `Stock de "${selectedProduct}" ajusté de ${adjustmentValue > 0 ? '+' : ''}${adjustmentValue}. Nouveau stock: ${newStock}`,
    });

    // Reset form
    setSelectedProduct('');
    setAdjustmentType('');
    setQuantity('');
    setReason('');
    setNotes('');
    onClose();
  };

  const selectedProductData = products.find(p => p.name === selectedProduct);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-farm-green-dark">
            <Package className="w-5 h-5 mr-2 text-farm-green" />
            Ajustement de Stock
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="product">Produit *</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un produit" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.name}>
                    {product.name} (Stock actuel: {product.currentStock})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProductData && (
            <div className="p-3 bg-farm-cream/20 rounded-lg">
              <p className="text-sm font-medium text-farm-green-dark">Stock actuel</p>
              <p className="text-lg font-bold text-farm-green">{selectedProductData.currentStock} unités</p>
            </div>
          )}

          <div>
            <Label htmlFor="adjustmentType">Type d'ajustement *</Label>
            <Select value={adjustmentType} onValueChange={setAdjustmentType}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="increase">
                  <div className="flex items-center">
                    <Plus className="w-4 h-4 mr-2 text-green-600" />
                    Augmentation (+)
                  </div>
                </SelectItem>
                <SelectItem value="decrease">
                  <div className="flex items-center">
                    <Minus className="w-4 h-4 mr-2 text-red-600" />
                    Diminution (-)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quantity">Quantité *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="Nombre d'unités"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="reason">Motif de l'ajustement *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un motif" />
              </SelectTrigger>
              <SelectContent>
                {adjustmentReasons.map((reasonOption) => (
                  <SelectItem key={reasonOption} value={reasonOption}>
                    {reasonOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes additionnelles</Label>
            <Textarea
              id="notes"
              placeholder="Détails supplémentaires (optionnel)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {selectedProductData && adjustmentType && quantity && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Aperçu de l'ajustement</p>
              <p className="text-sm text-blue-600">
                Stock actuel: {selectedProductData.currentStock} → Stock après ajustement: {' '}
                <span className="font-bold">
                  {adjustmentType === 'increase' 
                    ? selectedProductData.currentStock + parseInt(quantity || '0')
                    : selectedProductData.currentStock - parseInt(quantity || '0')
                  }
                </span>
              </p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="flex-1 bg-farm-green hover:bg-farm-green-dark"
            >
              Confirmer l'ajustement
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StockAdjustmentDialog;