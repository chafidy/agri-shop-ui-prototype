
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Package, Filter } from 'lucide-react';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const products = [
    {
      id: 1,
      name: "Aliment pour vaches laitières",
      category: "Aliments",
      stock: 150,
      prixAchat: 12000,
      prixVente: 15000,
      fournisseur: "Agrobio SARL",
      status: "En stock"
    },
    {
      id: 2,
      name: "Vaccin Newcastle",
      category: "Vétérinaire",
      stock: 5,
      prixAchat: 2500,
      prixVente: 3000,
      fournisseur: "VetSupply",
      status: "Stock faible"
    },
    {
      id: 3,
      name: "Abreuvoir automatique",
      category: "Matériel",
      stock: 25,
      prixAchat: 8500,
      prixVente: 12000,
      fournisseur: "EquipFarm",
      status: "En stock"
    },
    {
      id: 4,
      name: "Complément porcs croissance",
      category: "Aliments",
      stock: 80,
      prixAchat: 15000,
      prixVente: 18000,
      fournisseur: "Agrobio SARL",
      status: "En stock"
    },
    {
      id: 5,
      name: "Désinfectant étable",
      category: "Vétérinaire",
      stock: 0,
      prixAchat: 3200,
      prixVente: 4000,
      fournisseur: "ChemAgri",
      status: "Rupture"
    }
  ];

  const categories = ["Tous", "Aliments", "Vétérinaire", "Matériel"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tous' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Rupture</Badge>;
    if (stock < 20) return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Stock faible</Badge>;
    return <Badge variant="default" className="bg-green-100 text-green-800">En stock</Badge>;
  };

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Produits</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-sm border-0 bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <Package className="w-5 h-5 mr-2 text-farm-green" />
            Liste des Produits ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Nom du produit</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Catégorie</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Stock</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Prix d'achat</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Prix de vente</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Fournisseur</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Statut</th>
                  <th className="text-left py-3 px-4 font-semibold text-farm-green-dark">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-farm-cream/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 bg-farm-yellow/20 text-farm-green-dark rounded-md text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">{product.stock}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{product.prixAchat.toLocaleString()} Ar</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-farm-green">{product.prixVente.toLocaleString()} Ar</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">{product.fournisseur}</span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(product.status, product.stock)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="hover-scale text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover-scale">
                          Supprimer
                        </Button>
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

export default Products;
