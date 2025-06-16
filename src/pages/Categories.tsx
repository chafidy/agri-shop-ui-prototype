import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    nom: '',
    description: ''
  });

  const [categories, setCategories] = useState([
    {
      id: 1,
      nom: "Aliments pour animaux",
      description: "Tous types d'aliments pour bétail et volailles",
      nombreProduits: 15,
      dateCreation: "2024-01-15",
      actif: true
    },
    {
      id: 2,
      nom: "Matériels d'élevage",
      description: "Équipements et outils pour l'élevage",
      nombreProduits: 8,
      dateCreation: "2024-01-20",
      actif: true
    },
    {
      id: 3,
      nom: "Produits vétérinaires",
      description: "Médicaments, vaccins et soins vétérinaires",
      nombreProduits: 12,
      dateCreation: "2024-02-01",
      actif: true
    },
    {
      id: 4,
      nom: "Produits chimiques",
      description: "Désinfectants et autres produits chimiques",
      nombreProduits: 5,
      dateCreation: "2024-02-10",
      actif: false
    }
  ]);

  const filteredCategories = categories.filter(category =>
    category.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      nom: '',
      description: ''
    });
  };

  const handleAddCategory = () => {
    if (!formData.nom) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est obligatoire",
        variant: "destructive"
      });
      return;
    }

    const newCategory = {
      id: Date.now(),
      nom: formData.nom,
      description: formData.description,
      nombreProduits: 0,
      dateCreation: new Date().toISOString().split('T')[0],
      actif: true
    };
    setCategories([...categories, newCategory]);
    toast({
      title: "Catégorie ajoutée",
      description: "La nouvelle catégorie a été créée avec succès",
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setFormData({
      nom: category.nom,
      description: category.description
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (!formData.nom) {
      toast({
        title: "Erreur",
        description: "Le nom de la catégorie est obligatoire",
        variant: "destructive"
      });
      return;
    }

    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id 
        ? {
            ...category,
            nom: formData.nom,
            description: formData.description
          }
        : category
    );
    
    setCategories(updatedCategories);
    toast({
      title: "Catégorie modifiée",
      description: "La catégorie a été mise à jour avec succès",
    });
    setIsEditDialogOpen(false);
    setEditingCategory(null);
    resetForm();
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
    toast({
      title: "Catégorie supprimée",
      description: "La catégorie a été supprimée avec succès",
    });
  };

  const toggleCategoryStatus = (id: number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, actif: !cat.actif } : cat
    ));
    toast({
      title: "Statut modifié",
      description: "Le statut de la catégorie a été changé",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Catégories</h1>
          <p className="text-gray-600 mt-1">Organisez vos produits par catégories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une catégorie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvelle Catégorie</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom de la catégorie *</Label>
                <Input 
                  id="nom" 
                  placeholder="Ex: Aliments pour volailles" 
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Description de la catégorie" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <Button onClick={handleAddCategory} className="w-full bg-farm-green hover:bg-farm-green-dark">
                Créer la catégorie
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
                <p className="text-sm text-gray-600">Total catégories</p>
                <p className="text-2xl font-bold text-farm-green">{categories.length}</p>
              </div>
              <Package className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Catégories actives</p>
                <p className="text-2xl font-bold text-farm-green">{categories.filter(c => c.actif).length}</p>
              </div>
              <Package className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total produits</p>
                <p className="text-2xl font-bold text-farm-green">{categories.reduce((sum, c) => sum + c.nombreProduits, 0)}</p>
              </div>
              <Package className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Moyenne/catégorie</p>
                <p className="text-2xl font-bold text-farm-green">{Math.round(categories.reduce((sum, c) => sum + c.nombreProduits, 0) / categories.length)}</p>
              </div>
              <Package className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table des catégories */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <Package className="w-5 h-5 mr-2 text-farm-green" />
            Liste des Catégories ({filteredCategories.length})
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher une catégorie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Nombre de produits</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="font-medium text-farm-green-dark">{category.nom}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600">{category.description}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-farm-yellow/20">
                      {category.nombreProduits} produits
                    </Badge>
                  </TableCell>
                  <TableCell>{category.dateCreation}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCategoryStatus(category.id)}
                      className={category.actif ? "text-green-600" : "text-gray-500"}
                    >
                      {category.actif ? 
                        <Badge className="bg-green-100 text-green-800">Actif</Badge> : 
                        <Badge variant="secondary">Inactif</Badge>
                      }
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                        className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Modifier
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-300 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            Supprimer
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer la catégorie "{category.nom}" ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCategory(category.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier la Catégorie</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-nom">Nom de la catégorie *</Label>
              <Input 
                id="edit-nom" 
                placeholder="Ex: Aliments pour volailles" 
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea 
                id="edit-description" 
                placeholder="Description de la catégorie" 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <Button onClick={handleUpdateCategory} className="w-full bg-farm-green hover:bg-farm-green-dark">
              Mettre à jour la catégorie
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
