
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Edit, Trash2, Users, Phone, Mail, MapPin, ShoppingBag, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [formData, setFormData] = useState({
    nom: '',
    contact: '',
    telephone: '',
    email: '',
    adresse: '',
    notes: ''
  });

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      nom: "Agrobio SARL",
      contact: "Jean Rakoto",
      telephone: "034 12 345 67",
      email: "contact@agrobio.mg",
      adresse: "Lot 123 Antananarivo",
      notes: "Fournisseur principal d'aliments",
      totalCommandes: 15,
      montantTotal: 2500000,
      derniereCommande: "2024-06-10",
      statut: "Actif"
    },
    {
      id: 2,
      nom: "VetSupply",
      contact: "Marie Rabe",
      telephone: "033 98 765 43",
      email: "info@vetsupply.mg",
      adresse: "Zone industrielle Ankorondrano",
      notes: "Spécialisé en produits vétérinaires",
      totalCommandes: 8,
      montantTotal: 800000,
      derniereCommande: "2024-06-05",
      statut: "Actif"
    },
    {
      id: 3,
      nom: "EquipFarm",
      contact: "Paul Andry",
      telephone: "032 55 666 77",
      email: "sales@equipfarm.mg",
      adresse: "Ivato Antananarivo",
      notes: "Matériels et équipements agricoles",
      totalCommandes: 12,
      montantTotal: 1800000,
      derniereCommande: "2024-05-28",
      statut: "Actif"
    }
  ]);

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      nom: '',
      contact: '',
      telephone: '',
      email: '',
      adresse: '',
      notes: ''
    });
  };

  const handleAddSupplier = () => {
    if (!formData.nom || !formData.contact) {
      toast({
        title: "Erreur",
        description: "Le nom et le contact sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    const newSupplier = {
      id: Date.now(),
      nom: formData.nom,
      contact: formData.contact,
      telephone: formData.telephone,
      email: formData.email,
      adresse: formData.adresse,
      notes: formData.notes,
      totalCommandes: 0,
      montantTotal: 0,
      derniereCommande: null,
      statut: "Actif"
    };
    
    setSuppliers([...suppliers, newSupplier]);
    toast({
      title: "Fournisseur ajouté",
      description: "Le nouveau fournisseur a été créé avec succès",
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditSupplier = (supplier: any) => {
    setEditingSupplier(supplier);
    setFormData({
      nom: supplier.nom,
      contact: supplier.contact,
      telephone: supplier.telephone,
      email: supplier.email,
      adresse: supplier.adresse,
      notes: supplier.notes
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateSupplier = () => {
    if (!formData.nom || !formData.contact) {
      toast({
        title: "Erreur",
        description: "Le nom et le contact sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    const updatedSuppliers = suppliers.map(supplier => 
      supplier.id === editingSupplier.id 
        ? {
            ...supplier,
            nom: formData.nom,
            contact: formData.contact,
            telephone: formData.telephone,
            email: formData.email,
            adresse: formData.adresse,
            notes: formData.notes
          }
        : supplier
    );
    
    setSuppliers(updatedSuppliers);
    toast({
      title: "Fournisseur modifié",
      description: "Le fournisseur a été mis à jour avec succès",
    });
    setIsEditDialogOpen(false);
    setEditingSupplier(null);
    resetForm();
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    toast({
      title: "Fournisseur supprimé",
      description: "Le fournisseur a été supprimé avec succès",
    });
  };

  const totalSuppliers = suppliers.length;
  const activeSuppliers = suppliers.filter(s => s.statut === "Actif").length;
  const totalMontant = suppliers.reduce((sum, s) => sum + s.montantTotal, 0);
  const totalCommandes = suppliers.reduce((sum, s) => sum + s.totalCommandes, 0);

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Fournisseurs</h1>
          <p className="text-gray-600 mt-1">Gérez vos partenaires fournisseurs</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un fournisseur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouveau Fournisseur</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom de l'entreprise *</Label>
                <Input 
                  id="nom" 
                  placeholder="Ex: Agrobio SARL" 
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="contact">Personne de contact *</Label>
                <Input 
                  id="contact" 
                  placeholder="Ex: Jean Rakoto" 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input 
                  id="telephone" 
                  placeholder="Ex: 034 12 345 67" 
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="Ex: contact@entreprise.mg" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input 
                  id="adresse" 
                  placeholder="Adresse complète" 
                  value={formData.adresse}
                  onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes internes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Notes sur le fournisseur" 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleAddSupplier} className="w-full bg-farm-green hover:bg-farm-green-dark mt-4">
              Créer le fournisseur
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
                <p className="text-sm text-gray-600">Total fournisseurs</p>
                <p className="text-2xl font-bold text-farm-green">{totalSuppliers}</p>
              </div>
              <Users className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fournisseurs actifs</p>
                <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total commandes</p>
                <p className="text-2xl font-bold text-farm-green">{totalCommandes}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Montant total</p>
                <p className="text-2xl font-bold text-farm-green">{totalMontant.toLocaleString()} Ar</p>
              </div>
              <FileText className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table des fournisseurs */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <Users className="w-5 h-5 mr-2 text-farm-green" />
            Liste des Fournisseurs ({filteredSuppliers.length})
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un fournisseur..."
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
                <TableHead>Fournisseur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Coordonnées</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Montant total</TableHead>
                <TableHead>Dernière commande</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{supplier.nom}</div>
                      <div className="text-sm text-gray-500">{supplier.notes}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{supplier.contact}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {supplier.telephone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {supplier.telephone}
                        </div>
                      )}
                      {supplier.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1" />
                          {supplier.email}
                        </div>
                      )}
                      {supplier.adresse && (
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          {supplier.adresse}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-farm-yellow/20">
                      {supplier.totalCommandes} commandes
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-farm-green">
                      {supplier.montantTotal.toLocaleString()} Ar
                    </span>
                  </TableCell>
                  <TableCell>
                    {supplier.derniereCommande ? (
                      <span className="text-sm">{supplier.derniereCommande}</span>
                    ) : (
                      <span className="text-gray-400">Aucune</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditSupplier(supplier)}
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
                              Êtes-vous sûr de vouloir supprimer le fournisseur "{supplier.nom}" ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteSupplier(supplier.id)}
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

      {/* Edit Supplier Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le Fournisseur</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-nom">Nom de l'entreprise *</Label>
              <Input 
                id="edit-nom" 
                placeholder="Ex: Agrobio SARL" 
                value={formData.nom}
                onChange={(e) => setFormData({...formData, nom: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-contact">Personne de contact *</Label>
              <Input 
                id="edit-contact" 
                placeholder="Ex: Jean Rakoto" 
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-telephone">Téléphone</Label>
              <Input 
                id="edit-telephone" 
                placeholder="Ex: 034 12 345 67" 
                value={formData.telephone}
                onChange={(e) => setFormData({...formData, telephone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                type="email"
                placeholder="Ex: contact@entreprise.mg" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="edit-adresse">Adresse</Label>
              <Input 
                id="edit-adresse" 
                placeholder="Adresse complète" 
                value={formData.adresse}
                onChange={(e) => setFormData({...formData, adresse: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="edit-notes">Notes internes</Label>
              <Textarea 
                id="edit-notes" 
                placeholder="Notes sur le fournisseur" 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>
          <Button onClick={handleUpdateSupplier} className="w-full bg-farm-green hover:bg-farm-green-dark mt-4">
            Mettre à jour le fournisseur
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Suppliers;
