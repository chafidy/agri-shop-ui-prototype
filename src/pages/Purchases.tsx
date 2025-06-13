
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, Plus, Package, Truck, CreditCard, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Purchases = () => {
  const [purchaseItems, setPurchaseItems] = useState([
    { id: 1, produit: '', quantite: 1, prixUnitaire: 0, total: 0 }
  ]);
  const [fournisseur, setFournisseur] = useState('');
  const [modePaiement, setModePaiement] = useState('');
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  const fournisseurs = [
    { id: 1, nom: "Agrobio SARL" },
    { id: 2, nom: "VetSupply Madagascar" },
    { id: 3, nom: "EquipFarm Ltd" },
    { id: 4, nom: "ChemAgri Solutions" }
  ];

  const products = [
    { id: 1, name: "Aliment pour vaches", fournisseur: "Agrobio SARL" },
    { id: 2, name: "Vaccin Newcastle", fournisseur: "VetSupply Madagascar" },
    { id: 3, name: "Abreuvoir automatique", fournisseur: "EquipFarm Ltd" },
    { id: 4, name: "Complément porcs", fournisseur: "Agrobio SARL" },
    { id: 5, name: "Désinfectant étable", fournisseur: "ChemAgri Solutions" }
  ];

  const commandes = [
    {
      id: 1,
      numero: "CMD-2024-001",
      fournisseur: "Agrobio SARL",
      dateCommande: "2024-06-10",
      dateLivraison: "2024-06-15",
      statut: "livré",
      montantTotal: 750000,
      produits: [
        { nom: "Aliment vaches", quantite: 50, prix: 15000 }
      ]
    },
    {
      id: 2,
      numero: "CMD-2024-002",
      fournisseur: "VetSupply Madagascar",
      dateCommande: "2024-06-08",
      dateLivraison: "2024-06-12",
      statut: "en_transit",
      montantTotal: 125000,
      produits: [
        { nom: "Vaccin Newcastle", quantite: 50, prix: 2500 }
      ]
    },
    {
      id: 3,
      numero: "CMD-2024-003",
      fournisseur: "EquipFarm Ltd",
      dateCommande: "2024-06-05",
      dateLivraison: "2024-06-20",
      statut: "commandé",
      montantTotal: 850000,
      produits: [
        { nom: "Abreuvoir automatique", quantite: 10, prix: 85000 }
      ]
    }
  ];

  const addPurchaseItem = () => {
    setPurchaseItems([...purchaseItems, { 
      id: Date.now(), 
      produit: '', 
      quantite: 1, 
      prixUnitaire: 0, 
      total: 0 
    }]);
  };

  const updatePurchaseItem = (id: number, field: string, value: any) => {
    setPurchaseItems(items => items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'quantite' || field === 'prixUnitaire') {
          updated.total = updated.quantite * updated.prixUnitaire;
        }
        return updated;
      }
      return item;
    }));
  };

  const removePurchaseItem = (id: number) => {
    setPurchaseItems(items => items.filter(item => item.id !== id));
  };

  const totalGeneral = purchaseItems.reduce((sum, item) => sum + item.total, 0);

  const handleSubmitPurchase = () => {
    if (!fournisseur || !modePaiement || purchaseItems.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Commande créée",
      description: `Bon de commande de ${totalGeneral.toLocaleString()} Ar envoyé à ${fournisseur}`,
    });

    // Reset form
    setPurchaseItems([{ id: 1, produit: '', quantite: 1, prixUnitaire: 0, total: 0 }]);
    setFournisseur('');
    setModePaiement('');
    setIsNewOrderOpen(false);
  };

  const getStatusBadge = (statut: string) => {
    const statusConfig = {
      "commandé": { variant: "secondary" as const, className: "bg-blue-100 text-blue-800", text: "Commandé" },
      "en_transit": { variant: "secondary" as const, className: "bg-orange-100 text-orange-800", text: "En transit" },
      "livré": { variant: "default" as const, className: "bg-green-100 text-green-800", text: "Livré" },
      "annulé": { variant: "destructive" as const, className: "bg-red-100 text-red-800", text: "Annulé" }
    };
    
    const config = statusConfig[statut as keyof typeof statusConfig];
    return <Badge variant={config.variant} className={config.className}>{config.text}</Badge>;
  };

  const commandesEnCours = commandes.filter(c => c.statut !== 'livré').length;
  const montantEnCours = commandes.filter(c => c.statut !== 'livré').reduce((sum, c) => sum + c.montantTotal, 0);
  const totalAchats = commandes.reduce((sum, c) => sum + c.montantTotal, 0);

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Achats</h1>
          <p className="text-gray-600 mt-1">Commandes fournisseurs et réceptions</p>
        </div>
        <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle commande
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Bon de commande fournisseur</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Informations générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fournisseur">Fournisseur</Label>
                  <Select value={fournisseur} onValueChange={setFournisseur}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {fournisseurs.map((f) => (
                        <SelectItem key={f.id} value={f.nom}>
                          {f.nom}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="modePaiement">Mode de paiement</Label>
                  <Select value={modePaiement} onValueChange={setModePaiement}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir le mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="virement">Virement bancaire</SelectItem>
                      <SelectItem value="cheque">Chèque</SelectItem>
                      <SelectItem value="especes">Espèces</SelectItem>
                      <SelectItem value="credit">Crédit fournisseur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Produits */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-farm-green-dark">Produits à commander</h3>
                  <Button onClick={addPurchaseItem} size="sm" variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </Button>
                </div>
                
                {purchaseItems.map((item, index) => (
                  <div key={item.id} className="p-4 border border-farm-cream rounded-lg space-y-3 bg-farm-cream/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <Label>Produit</Label>
                        <Select 
                          value={item.produit} 
                          onValueChange={(value) => updatePurchaseItem(item.id, 'produit', value)}
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
                          onChange={(e) => updatePurchaseItem(item.id, 'quantite', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Prix unitaire</Label>
                        <Input
                          type="number"
                          value={item.prixUnitaire}
                          onChange={(e) => updatePurchaseItem(item.id, 'prixUnitaire', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-farm-green">
                        Total: {item.total.toLocaleString()} Ar
                      </span>
                      {purchaseItems.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removePurchaseItem(item.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Total et actions */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total de la commande:</span>
                  <span className="text-2xl font-bold text-farm-green">{totalGeneral.toLocaleString()} Ar</span>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleSubmitPurchase}
                    className="flex-1 bg-farm-green hover:bg-farm-green-dark"
                    disabled={totalGeneral === 0}
                  >
                    Envoyer la commande
                  </Button>
                  <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
                    Sauvegarder brouillon
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commandes en cours</p>
                <p className="text-2xl font-bold text-farm-green">{commandesEnCours}</p>
              </div>
              <Package className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Montant en cours</p>
                <p className="text-2xl font-bold text-farm-green">{montantEnCours.toLocaleString()} Ar</p>
              </div>
              <CreditCard className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total achats mois</p>
                <p className="text-2xl font-bold text-farm-green">{totalAchats.toLocaleString()} Ar</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des commandes */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <FileText className="w-5 h-5 mr-2 text-farm-green" />
            Historique des commandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">N° Commande</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Fournisseur</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Date commande</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Livraison prévue</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Montant</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commandes.map((commande) => (
                  <tr key={commande.id} className="border-b border-gray-100 hover:bg-farm-cream/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{commande.numero}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{commande.fournisseur}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">{commande.dateCommande}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">{commande.dateLivraison}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-farm-green">{commande.montantTotal.toLocaleString()} Ar</span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(commande.statut)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover-scale text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                          <FileText className="w-3 h-3 mr-1" />
                          Voir
                        </Button>
                        {commande.statut === 'en_transit' && (
                          <Button variant="outline" size="sm" className="hover-scale text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                            <Truck className="w-3 h-3 mr-1" />
                            Réceptionner
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Purchases;
