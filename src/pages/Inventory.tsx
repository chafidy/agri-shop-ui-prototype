
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package, AlertTriangle, TrendingDown, TrendingUp, Archive } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const inventoryData = [
    {
      id: 1,
      produit: "Aliment pour vaches laitières",
      stockActuel: 150,
      stockMinimum: 50,
      stockMaximum: 300,
      unite: "sacs 50kg",
      dateExpiration: "2024-08-15",
      valeurStock: 2250000,
      status: "stock_ok"
    },
    {
      id: 2,
      produit: "Vaccin Newcastle",
      stockActuel: 5,
      stockMinimum: 20,
      stockMaximum: 100,
      unite: "flacons",
      dateExpiration: "2024-07-20",
      valeurStock: 15000,
      status: "stock_critique"
    },
    {
      id: 3,
      produit: "Abreuvoir automatique",
      stockActuel: 25,
      stockMinimum: 10,
      stockMaximum: 50,
      unite: "unités",
      dateExpiration: null,
      valeurStock: 300000,
      status: "stock_ok"
    },
    {
      id: 4,
      produit: "Désinfectant étable",
      stockActuel: 0,
      stockMinimum: 10,
      stockMaximum: 50,
      unite: "bidons 5L",
      dateExpiration: "2024-12-30",
      valeurStock: 0,
      status: "rupture"
    },
    {
      id: 5,
      produit: "Complément porcs croissance",
      stockActuel: 80,
      stockMinimum: 30,
      stockMaximum: 150,
      unite: "sacs 25kg",
      dateExpiration: "2024-09-10",
      valeurStock: 1440000,
      status: "stock_ok"
    }
  ];

  const mouvementsStock = [
    { id: 1, produit: "Aliment vaches", type: "entrée", quantite: 50, date: "2024-06-10", utilisateur: "Admin" },
    { id: 2, produit: "Vaccin Newcastle", type: "sortie", quantite: 15, date: "2024-06-09", utilisateur: "Marie" },
    { id: 3, produit: "Abreuvoir", type: "entrée", quantite: 10, date: "2024-06-08", utilisateur: "Admin" },
    { id: 4, produit: "Désinfectant", type: "sortie", quantite: 5, date: "2024-06-07", utilisateur: "Jean" }
  ];

  const getStatusBadge = (status: string, stockActuel: number, stockMinimum: number) => {
    if (stockActuel === 0) return <Badge variant="destructive" className="bg-red-100 text-red-800">Rupture</Badge>;
    if (stockActuel <= stockMinimum) return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Stock critique</Badge>;
    return <Badge variant="default" className="bg-green-100 text-green-800">Stock OK</Badge>;
  };

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.produit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === '' || 
      (filterType === 'critique' && item.stockActuel <= item.stockMinimum) ||
      (filterType === 'rupture' && item.stockActuel === 0) ||
      (filterType === 'ok' && item.stockActuel > item.stockMinimum);
    return matchesSearch && matchesFilter;
  });

  const handleInventaire = () => {
    toast({
      title: "Inventaire lancé",
      description: "L'inventaire physique a été démarré",
    });
  };

  const totalValeurStock = inventoryData.reduce((sum, item) => sum + item.valeurStock, 0);
  const produitsEnRupture = inventoryData.filter(item => item.stockActuel === 0).length;
  const produitsCritiques = inventoryData.filter(item => item.stockActuel <= item.stockMinimum && item.stockActuel > 0).length;

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Stocks</h1>
          <p className="text-gray-600 mt-1">Suivi et contrôle des inventaires</p>
        </div>
        <Button 
          onClick={handleInventaire}
          className="bg-farm-green hover:bg-farm-green-dark hover-scale"
        >
          <Archive className="w-4 h-4 mr-2" />
          Faire un inventaire
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Valeur totale stock</p>
                <p className="text-2xl font-bold text-farm-green">{totalValeurStock.toLocaleString()} Ar</p>
              </div>
              <Package className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produits en rupture</p>
                <p className="text-2xl font-bold text-red-600">{produitsEnRupture}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock critique</p>
                <p className="text-2xl font-bold text-orange-600">{produitsCritiques}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Références actives</p>
                <p className="text-2xl font-bold text-farm-green">{inventoryData.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tableau principal des stocks */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-farm-green-dark">
                <span className="flex items-center">
                  <Package className="w-5 h-5 mr-2 text-farm-green" />
                  État des Stocks
                </span>
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filtrer par état" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="ok">Stock OK</SelectItem>
                    <SelectItem value="critique">Stock critique</SelectItem>
                    <SelectItem value="rupture">Rupture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Produit</th>
                      <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Stock actuel</th>
                      <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Min/Max</th>
                      <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Unité</th>
                      <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Valeur</th>
                      <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100 hover:bg-farm-cream/20 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">{item.produit}</div>
                          {item.dateExpiration && (
                            <div className="text-xs text-gray-500">Exp: {item.dateExpiration}</div>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-lg">{item.stockActuel}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{item.stockMinimum} / {item.stockMaximum}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm">{item.unite}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-farm-green">{item.valeurStock.toLocaleString()} Ar</span>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(item.status, item.stockActuel, item.stockMinimum)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mouvements récents */}
        <div className="space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-farm-green-dark">Mouvements récents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mouvementsStock.map((mouvement) => (
                  <div key={mouvement.id} className="p-3 bg-farm-cream/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {mouvement.type === 'entrée' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{mouvement.produit}</p>
                          <p className="text-xs text-gray-500">{mouvement.date} - {mouvement.utilisateur}</p>
                        </div>
                      </div>
                      <span className={`font-semibold ${mouvement.type === 'entrée' ? 'text-green-600' : 'text-red-600'}`}>
                        {mouvement.type === 'entrée' ? '+' : '-'}{mouvement.quantite}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-farm-green-dark">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
                Ajustement stock
              </Button>
              <Button variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
                Importer données
              </Button>
              <Button variant="outline" className="w-full border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
                Export inventaire
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
