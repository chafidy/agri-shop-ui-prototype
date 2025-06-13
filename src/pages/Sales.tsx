
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Plus, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Sales = () => {
  const [saleItems, setSaleItems] = useState([
    { id: 1, produit: '', quantite: 1, prix: 0, total: 0 }
  ]);
  const [client, setClient] = useState('');
  const [modePaiement, setModePaiement] = useState('');

  const products = [
    { id: 1, name: "Aliment pour vaches", prix: 15000 },
    { id: 2, name: "Vaccin Newcastle", prix: 3000 },
    { id: 3, name: "Abreuvoir automatique", prix: 12000 },
    { id: 4, name: "Complément porcs", prix: 18000 },
    { id: 5, name: "Désinfectant étable", prix: 4000 }
  ];

  const addSaleItem = () => {
    setSaleItems([...saleItems, { 
      id: Date.now(), 
      produit: '', 
      quantite: 1, 
      prix: 0, 
      total: 0 
    }]);
  };

  const updateSaleItem = (id: number, field: string, value: any) => {
    setSaleItems(items => items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'produit') {
          const product = products.find(p => p.name === value);
          updated.prix = product ? product.prix : 0;
        }
        if (field === 'quantite' || field === 'prix') {
          updated.total = updated.quantite * updated.prix;
        }
        return updated;
      }
      return item;
    }));
  };

  const removeSaleItem = (id: number) => {
    setSaleItems(items => items.filter(item => item.id !== id));
  };

  const totalGeneral = saleItems.reduce((sum, item) => sum + item.total, 0);

  const handleSubmitSale = () => {
    if (!client || !modePaiement || saleItems.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Vente enregistrée",
      description: `Vente de ${totalGeneral.toLocaleString()} FCFA enregistrée avec succès`,
    });

    // Reset form
    setSaleItems([{ id: 1, produit: '', quantite: 1, prix: 0, total: 0 }]);
    setClient('');
    setModePaiement('');
  };

  return (
    <div className="p-6 space-y-6 bg-farm-beige/50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nouvelle Vente</h1>
          <p className="text-gray-600 mt-1">Enregistrer une vente rapide</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sale Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2 text-farm-green" />
                Détails de la vente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Input
                    id="client"
                    placeholder="Nom du client"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="modePaiement">Mode de paiement</Label>
                  <Select value={modePaiement} onValueChange={setModePaiement}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir le mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="especes">Espèces</SelectItem>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                      <SelectItem value="acompte">Acompte</SelectItem>
                      <SelectItem value="credit">Crédit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Produits</span>
                <Button 
                  onClick={addSaleItem} 
                  size="sm" 
                  className="bg-farm-green hover:bg-farm-green-dark hover-scale"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Ajouter
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {saleItems.map((item, index) => (
                  <div key={item.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <Label>Produit</Label>
                        <Select 
                          value={item.produit} 
                          onValueChange={(value) => updateSaleItem(item.id, 'produit', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un produit" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.name}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantité</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantite}
                          onChange={(e) => updateSaleItem(item.id, 'quantite', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Prix unitaire</Label>
                        <Input
                          type="number"
                          value={item.prix}
                          onChange={(e) => updateSaleItem(item.id, 'prix', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        Total: {item.total.toLocaleString()} FCFA
                      </span>
                      {saleItems.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeSaleItem(item.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-farm-green" />
                Récapitulatif
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sous-total:</span>
                  <span>{totalGeneral.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA (0%):</span>
                  <span>0 FCFA</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-farm-green">{totalGeneral.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={handleSubmitSale}
                  className="w-full bg-farm-green hover:bg-farm-green-dark hover-scale"
                  disabled={totalGeneral === 0}
                >
                  Enregistrer la vente
                </Button>
                <Button variant="outline" className="w-full">
                  Générer le reçu
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle>Ventes récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { client: "Ferme Sanogo", total: 45000, temps: "Il y a 10 min" },
                  { client: "Élevage Diallo", total: 23000, temps: "Il y a 1h" },
                  { client: "Coopérative Nord", total: 67000, temps: "Il y a 2h" }
                ].map((vente, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{vente.client}</p>
                        <p className="text-xs text-gray-500">{vente.temps}</p>
                      </div>
                      <span className="font-semibold text-farm-green">
                        {vente.total.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Sales;
