import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, Plus, Package, Truck, CreditCard, FileText, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Purchases = () => {
  const [purchaseItems, setPurchaseItems] = useState([
    { id: 1, produit: '', quantite: 1, prixUnitaire: 0, total: 0 }
  ]);
  const [fournisseur, setFournisseur] = useState('');
  const [modePaiement, setModePaiement] = useState('');
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewOrderOpen, setIsViewOrderOpen] = useState(false);

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
      dateLivraisonReelle: "2024-06-15",
      statut: "livré",
      montantTotal: 750000,
      montantPaye: 750000,
      modePaiement: "virement",
      produits: [
        { nom: "Aliment vaches", quantite: 50, prix: 15000, total: 750000 }
      ]
    },
    {
      id: 2,
      numero: "CMD-2024-002",
      fournisseur: "VetSupply Madagascar",
      dateCommande: "2024-06-08",
      dateLivraison: "2024-06-12",
      dateLivraisonReelle: null,
      statut: "en_transit",
      montantTotal: 125000,
      montantPaye: 62500,
      modePaiement: "credit",
      produits: [
        { nom: "Vaccin Newcastle", quantite: 50, prix: 2500, total: 125000 }
      ]
    },
    {
      id: 3,
      numero: "CMD-2024-003",
      fournisseur: "EquipFarm Ltd",
      dateCommande: "2024-06-05",
      dateLivraison: "2024-06-20",
      dateLivraisonReelle: null,
      statut: "commandé",
      montantTotal: 850000,
      montantPaye: 0,
      modePaiement: "cheque",
      produits: [
        { nom: "Abreuvoir automatique", quantite: 10, prix: 85000, total: 850000 }
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
      "commandé": { 
        variant: "secondary" as const, 
        className: "bg-blue-100 text-blue-800 border-blue-200", 
        text: "Commandé",
        icon: Clock
      },
      "en_transit": { 
        variant: "secondary" as const, 
        className: "bg-orange-100 text-orange-800 border-orange-200", 
        text: "En transit",
        icon: Truck
      },
      "livré": { 
        variant: "default" as const, 
        className: "bg-green-100 text-green-800 border-green-200", 
        text: "Livré",
        icon: CheckCircle
      },
      "annulé": { 
        variant: "destructive" as const, 
        className: "bg-red-100 text-red-800 border-red-200", 
        text: "Annulé",
        icon: XCircle
      }
    };
    
    const config = statusConfig[statut as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className={`${config.className} flex items-center gap-1`}>
        <IconComponent className="w-3 h-3" />
        {config.text}
      </Badge>
    );
  };

  const handleViewOrder = (commande: any) => {
    setSelectedOrder(commande);
    setIsViewOrderOpen(true);
  };

  const handleReceiveOrder = (commandeId: number) => {
    toast({
      title: "Commande réceptionnée",
      description: "La commande a été marquée comme livrée",
    });
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
                      <div className="flex flex-col">
                        <span className="text-gray-600">{commande.dateLivraison}</span>
                        {commande.dateLivraisonReelle && (
                          <span className="text-xs text-green-600">
                            Livré le {commande.dateLivraisonReelle}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-farm-green">{commande.montantTotal.toLocaleString()} Ar</span>
                        {commande.montantPaye < commande.montantTotal && (
                          <span className="text-xs text-orange-600">
                            Payé: {commande.montantPaye.toLocaleString()} Ar
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(commande.statut)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewOrder(commande)}
                          className="hover-scale text-farm-green border-farm-green hover:bg-farm-green hover:text-white"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Voir
                        </Button>
                        {commande.statut === 'en_transit' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReceiveOrder(commande.id)}
                            className="hover-scale text-farm-green border-farm-green hover:bg-farm-green hover:text-white"
                          >
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

      {/* Modale de visualisation des détails de commande */}
      <Dialog open={isViewOrderOpen} onOpenChange={setIsViewOrderOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-farm-green" />
              Détails de la commande {selectedOrder?.numero}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Informations générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-farm-green-dark">Informations générales</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fournisseur:</span>
                      <span className="font-medium">{selectedOrder.fournisseur}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date de commande:</span>
                      <span className="font-medium">{selectedOrder.dateCommande}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison prévue:</span>
                      <span className="font-medium">{selectedOrder.dateLivraison}</span>
                    </div>
                    {selectedOrder.dateLivraisonReelle && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Livraison réelle:</span>
                        <span className="font-medium text-green-600">{selectedOrder.dateLivraisonReelle}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut:</span>
                      {getStatusBadge(selectedOrder.statut)}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-farm-green-dark">Informations financières</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant total:</span>
                      <span className="font-bold text-farm-green">{selectedOrder.montantTotal.toLocaleString()} Ar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Montant payé:</span>
                      <span className="font-medium">{selectedOrder.montantPaye.toLocaleString()} Ar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Solde restant:</span>
                      <span className={`font-medium ${selectedOrder.montantPaye < selectedOrder.montantTotal ? 'text-orange-600' : 'text-green-600'}`}>
                        {(selectedOrder.montantTotal - selectedOrder.montantPaye).toLocaleString()} Ar
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode de paiement:</span>
                      <span className="font-medium capitalize">{selectedOrder.modePaiement}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Produits commandés */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-farm-green-dark">Produits commandés</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Produit</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Quantité</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Prix unitaire</th>
                          <th className="text-left py-2 px-3 font-semibold text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.produits.map((produit: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-3 font-medium">{produit.nom}</td>
                            <td className="py-3 px-3">{produit.quantite}</td>
                            <td className="py-3 px-3">{produit.prix.toLocaleString()} Ar</td>
                            <td className="py-3 px-3 font-medium text-farm-green">{produit.total.toLocaleString()} Ar</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                {selectedOrder.statut === 'en_transit' && (
                  <Button 
                    onClick={() => {
                      handleReceiveOrder(selectedOrder.id);
                      setIsViewOrderOpen(false);
                    }}
                    className="bg-farm-green hover:bg-farm-green-dark"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marquer comme livré
                  </Button>
                )}
                <Button variant="outline" onClick={() => setIsViewOrderOpen(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Purchases;
