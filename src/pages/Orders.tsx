
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, Plus, Eye, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Orders = () => {
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [orderItems, setOrderItems] = useState([
    { id: 1, produit: '', quantite: 1, prix: 0, total: 0, stockDisponible: 0 }
  ]);
  const [client, setClient] = useState('');
  const [modePaiement, setModePaiement] = useState('');

  const [orders, setOrders] = useState([
    {
      id: 'CMD-2024-001',
      client: 'Ferme Rakoto',
      total: 45000,
      statut: 'En attente de paiement',
      dateCommande: '2024-01-15',
      modePaiement: 'Mobile Money',
      items: [
        { produit: 'Aliment pour vaches', quantite: 3, prix: 15000 }
      ]
    },
    {
      id: 'CMD-2024-002',
      client: 'Élevage Andry',
      total: 27000,
      statut: 'Confirmée',
      dateCommande: '2024-01-14',
      modePaiement: 'Espèces',
      items: [
        { produit: 'Vaccin Newcastle', quantite: 9, prix: 3000 }
      ]
    },
    {
      id: 'CMD-2024-003',
      client: 'Coopérative Sud',
      total: 72000,
      statut: 'En préparation',
      dateCommande: '2024-01-13',
      modePaiement: 'Crédit',
      items: [
        { produit: 'Complément porcs', quantite: 4, prix: 18000 }
      ]
    }
  ]);

  const products = [
    { id: 1, name: "Aliment pour vaches", prix: 15000, stock: 150 },
    { id: 2, name: "Vaccin Newcastle", prix: 3000, stock: 5 },
    { id: 3, name: "Abreuvoir automatique", prix: 12000, stock: 25 },
    { id: 4, name: "Complément porcs", prix: 18000, stock: 80 },
    { id: 5, name: "Désinfectant étable", prix: 4000, stock: 0 }
  ];

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const orderCount = orders.length + 1;
    return `CMD-${year}-${orderCount.toString().padStart(3, '0')}`;
  };

  const addOrderItem = () => {
    setOrderItems([...orderItems, { 
      id: Date.now(), 
      produit: '', 
      quantite: 1, 
      prix: 0, 
      total: 0,
      stockDisponible: 0
    }]);
  };

  const updateOrderItem = (id: number, field: string, value: any) => {
    setOrderItems(items => items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'produit') {
          const product = products.find(p => p.name === value);
          updated.prix = product ? product.prix : 0;
          updated.stockDisponible = product ? product.stock : 0;
        }
        if (field === 'quantite' || field === 'prix') {
          updated.total = updated.quantite * updated.prix;
        }
        return updated;
      }
      return item;
    }));
  };

  const removeOrderItem = (id: number) => {
    setOrderItems(items => items.filter(item => item.id !== id));
  };

  const totalGeneral = orderItems.reduce((sum, item) => sum + item.total, 0);

  const checkStockAvailability = () => {
    for (const item of orderItems) {
      if (item.produit && item.quantite > item.stockDisponible) {
        return {
          isValid: false,
          message: `Stock insuffisant pour ${item.produit}. Disponible: ${item.stockDisponible}, Demandé: ${item.quantite}`
        };
      }
    }
    return { isValid: true, message: '' };
  };

  const handleCreateOrder = () => {
    if (!client || !modePaiement || orderItems.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    const stockCheck = checkStockAvailability();
    if (!stockCheck.isValid) {
      toast({
        title: "Stock insuffisant",
        description: stockCheck.message,
        variant: "destructive"
      });
      return;
    }

    const newOrder = {
      id: generateOrderNumber(),
      client: client,
      total: totalGeneral,
      statut: 'En attente de paiement',
      dateCommande: new Date().toISOString().split('T')[0],
      modePaiement: modePaiement,
      items: orderItems.filter(item => item.produit).map(item => ({
        produit: item.produit,
        quantite: item.quantite,
        prix: item.prix
      }))
    };

    setOrders([newOrder, ...orders]);
    toast({
      title: "Commande créée",
      description: `Commande ${newOrder.id} créée avec succès`,
    });

    // Reset form
    setOrderItems([{ id: 1, produit: '', quantite: 1, prix: 0, total: 0, stockDisponible: 0 }]);
    setClient('');
    setModePaiement('');
    setIsNewOrderOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En attente de paiement':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'Confirmée':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Confirmée</Badge>;
      case 'En préparation':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">En préparation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Commandes</h1>
          <p className="text-gray-600 mt-1">Enregistrer et suivre les commandes clients</p>
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
              <DialogTitle>Nouvelle Commande</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    placeholder="Nom du client"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="modePaiement">Mode de paiement *</Label>
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

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-farm-green-dark">Articles commandés</h3>
                  <Button onClick={addOrderItem} size="sm" variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter un article
                  </Button>
                </div>

                {orderItems.map((item, index) => (
                  <div key={item.id} className="p-4 border border-farm-cream rounded-lg space-y-3 bg-farm-cream/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <Label>Produit *</Label>
                        <Select 
                          value={item.produit} 
                          onValueChange={(value) => updateOrderItem(item.id, 'produit', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un produit" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.name}>
                                {product.name} (Stock: {product.stock})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Quantité *</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantite}
                          onChange={(e) => updateOrderItem(item.id, 'quantite', parseInt(e.target.value))}
                        />
                        {item.stockDisponible > 0 && item.quantite > item.stockDisponible && (
                          <p className="text-xs text-red-600 mt-1 flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Stock insuffisant ({item.stockDisponible} disponible)
                          </p>
                        )}
                      </div>
                      <div>
                        <Label>Prix unitaire</Label>
                        <Input
                          type="number"
                          value={item.prix}
                          onChange={(e) => updateOrderItem(item.id, 'prix', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-farm-green">
                        Total: {item.total.toLocaleString()} Ar
                      </span>
                      {orderItems.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeOrderItem(item.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total général:</span>
                  <span className="text-farm-green">{totalGeneral.toLocaleString()} Ar</span>
                </div>
              </div>

              <Button 
                onClick={handleCreateOrder}
                className="w-full bg-farm-green hover:bg-farm-green-dark"
                disabled={totalGeneral === 0}
              >
                Créer la commande
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total commandes</p>
                <p className="text-2xl font-bold text-farm-green">{orders.length}</p>
              </div>
              <ClipboardList className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.statut === 'En attente de paiement').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmées</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.statut === 'Confirmée').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valeur totale</p>
                <p className="text-2xl font-bold text-farm-green">
                  {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} Ar
                </p>
              </div>
              <ClipboardList className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des commandes */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <ClipboardList className="w-5 h-5 mr-2 text-farm-green" />
            Liste des Commandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Mode paiement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium">{order.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{order.client}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{order.dateCommande}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-farm-green">
                      {order.total.toLocaleString()} Ar
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-farm-yellow/20 text-farm-green-dark">
                      {order.modePaiement}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(order.statut)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
