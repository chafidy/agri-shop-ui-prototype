
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Package, Filter, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      nom: "Aliment pour vaches laitières",
      categorie: "Aliments pour animaux",
      stock: 150,
      prixAchat: 12000,
      prixVente: 15000,
      unite: "sac",
      seuilCritique: 20,
      fournisseur: "Agrobio SARL",
      datePeremption: "2024-12-31",
      status: "En stock",
      description: "Aliment complet pour vaches laitières"
    },
    {
      id: 2,
      nom: "Vaccin Newcastle",
      categorie: "Produits vétérinaires",
      stock: 5,
      prixAchat: 2500,
      prixVente: 3000,
      unite: "dose",
      seuilCritique: 10,
      fournisseur: "VetSupply",
      datePeremption: "2024-08-15",
      status: "Stock faible",
      description: "Vaccin contre la maladie de Newcastle"
    },
    {
      id: 3,
      nom: "Abreuvoir automatique",
      categorie: "Matériels d'élevage",
      stock: 25,
      prixAchat: 8500,
      prixVente: 12000,
      unite: "pièce",
      seuilCritique: 5,
      fournisseur: "EquipFarm",
      datePeremption: null,
      status: "En stock",
      description: "Abreuvoir automatique pour volailles"
    },
    {
      id: 4,
      nom: "Complément porcs croissance",
      categorie: "Aliments pour animaux",
      stock: 80,
      prixAchat: 15000,
      prixVente: 18000,
      unite: "sac",
      seuilCritique: 15,
      fournisseur: "Agrobio SARL",
      datePeremption: "2025-03-20",
      status: "En stock",
      description: "Complément alimentaire pour porcs en croissance"
    },
    {
      id: 5,
      nom: "Désinfectant étable",
      categorie: "Produits vétérinaires",
      stock: 0,
      prixAchat: 3200,
      prixVente: 4000,
      unite: "litre",
      seuilCritique: 10,
      fournisseur: "ChemAgri",
      datePeremption: "2024-11-30",
      status: "Rupture",
      description: "Désinfectant pour étables et porcheries"
    }
  ]);

  const categories = ["Tous", "Aliments pour animaux", "Produits vétérinaires", "Matériels d'élevage"];
  const unites = ["sac", "litre", "pièce", "dose", "kg", "ml"];
  const fournisseurs = ["Agrobio SARL", "VetSupply", "EquipFarm", "ChemAgri"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tous' || product.categorie === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, stock: number, seuilCritique: number) => {
    if (stock === 0) return <Badge variant="destructive">Rupture</Badge>;
    if (stock <= seuilCritique) return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Stock faible</Badge>;
    return <Badge variant="default" className="bg-green-100 text-green-800">En stock</Badge>;
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      nom: "Nouveau produit",
      categorie: "Aliments pour animaux",
      stock: 0,
      prixAchat: 0,
      prixVente: 0,
      unite: "pièce",
      seuilCritique: 10,
      fournisseur: "Agrobio SARL",
      datePeremption: null,
      status: "Rupture",
      description: ""
    };
    setProducts([...products, newProduct]);
    toast({
      title: "Produit ajouté",
      description: "Le nouveau produit a été créé avec succès",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(prod => prod.id !== id));
    toast({
      title: "Produit supprimé",
      description: "Le produit a été supprimé avec succès",
    });
  };

  const totalProduits = products.length;
  const produitsEnStock = products.filter(p => p.stock > p.seuilCritique).length;
  const produitsStockFaible = products.filter(p => p.stock > 0 && p.stock <= p.seuilCritique).length;
  const produitsRupture = products.filter(p => p.stock === 0).length;

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Produits</h1>
          <p className="text-gray-600 mt-1">Gérez votre catalogue de produits</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nouveau Produit</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom du produit</Label>
                <Input id="nom" placeholder="Nom du produit" />
              </div>
              <div>
                <Label htmlFor="categorie">Catégorie</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="prixAchat">Prix d'achat (Ar)</Label>
                <Input id="prixAchat" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="prixVente">Prix de vente (Ar)</Label>
                <Input id="prixVente" type="number" placeholder="0" />
              </div>
              <div>
                <Label htmlFor="unite">Unité de mesure</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une unité" />
                  </SelectTrigger>
                  <SelectContent>
                    {unites.map((unite) => (
                      <SelectItem key={unite} value={unite}>{unite}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="seuilCritique">Seuil critique</Label>
                <Input id="seuilCritique" type="number" placeholder="10" />
              </div>
              <div>
                <Label htmlFor="fournisseur">Fournisseur</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un fournisseur" />
                  </SelectTrigger>
                  <SelectContent>
                    {fournisseurs.map((fournisseur) => (
                      <SelectItem key={fournisseur} value={fournisseur}>{fournisseur}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="datePeremption">Date de péremption (optionnel)</Label>
                <Input id="datePeremption" type="date" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Description du produit" />
              </div>
            </div>
            <Button onClick={handleAddProduct} className="w-full bg-farm-green hover:bg-farm-green-dark mt-4">
              Créer le produit
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total produits</p>
                <p className="text-2xl font-bold text-farm-green">{totalProduits}</p>
              </div>
              <Package className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En stock</p>
                <p className="text-2xl font-bold text-green-600">{produitsEnStock}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Stock faible</p>
                <p className="text-2xl font-bold text-orange-600">{produitsStockFaible}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rupture</p>
                <p className="text-2xl font-bold text-red-600">{produitsRupture}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Péremption</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{product.nom}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-farm-yellow/20 text-farm-green-dark">
                      {product.categorie}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium">{product.stock} {product.unite}</span>
                      <div className="text-xs text-gray-500">Seuil: {product.seuilCritique}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm text-gray-600">Achat: {product.prixAchat.toLocaleString()} Ar</div>
                      <div className="font-medium text-farm-green">Vente: {product.prixVente.toLocaleString()} Ar</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-600">{product.fournisseur}</span>
                  </TableCell>
                  <TableCell>
                    {product.datePeremption ? (
                      <span className="text-sm">{product.datePeremption}</span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(product.status, product.stock, product.seuilCritique)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Supprimer
                      </Button>
                    </div>
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

export default Products;
