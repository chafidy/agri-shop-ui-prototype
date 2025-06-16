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
import { Search, Plus, Edit, Trash2, UserCheck, Phone, Mail, MapPin, ShoppingCart, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [formData, setFormData] = useState({
    nom: '',
    contact: '',
    telephone: '',
    email: '',
    adresse: '',
    notes: ''
  });

  const [clients, setClients] = useState([
    {
      id: 1,
      nom: "Ferme Rakoto",
      contact: "Jean Rakoto",
      telephone: "034 12 345 67",
      email: "contact@ferme.mg",
      adresse: "Lot 123 Ambohimanarina",
      notes: "Client fidèle depuis 2020",
      totalAchats: 1250000,
      nombreCommandes: 15,
      derniereCommande: "2024-06-15",
      solde: 50000,
      statut: "Actif"
    },
    {
      id: 2,
      nom: "Élevage Gasikara",
      contact: "Marie Rasoa",
      telephone: "033 88 999 00",
      email: "info@gasikara.mg",
      adresse: "Route d'Andraisoro",
      notes: "Achats réguliers d'aliments",
      totalAchats: 800000,
      nombreCommandes: 10,
      derniereCommande: "2024-06-10",
      solde: -25000,
      statut: "Actif"
    },
    {
      id: 3,
      nom: "Volaille Mada",
      contact: "Luc Ratsimba",
      telephone: "032 55 112 23",
      email: "contact@volaille.mg",
      adresse: "Antanimena",
      notes: "Grand compte, paiements rapides",
      totalAchats: 2100000,
      nombreCommandes: 22,
      derniereCommande: "2024-06-05",
      solde: 0,
      statut: "Actif"
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleAddClient = () => {
    if (!formData.nom || !formData.contact) {
      toast({
        title: "Erreur",
        description: "Le nom et le contact sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    const newClient = {
      id: Date.now(),
      nom: formData.nom,
      contact: formData.contact,
      telephone: formData.telephone,
      email: formData.email,
      adresse: formData.adresse,
      notes: formData.notes,
      totalAchats: 0,
      nombreCommandes: 0,
      derniereCommande: null,
      solde: 0,
      statut: "Actif"
    };
    
    setClients([...clients, newClient]);
    toast({
      title: "Client ajouté",
      description: "Le nouveau client a été créé avec succès",
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setFormData({
      nom: client.nom,
      contact: client.contact,
      telephone: client.telephone,
      email: client.email,
      adresse: client.adresse,
      notes: client.notes
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateClient = () => {
    if (!formData.nom || !formData.contact) {
      toast({
        title: "Erreur",
        description: "Le nom et le contact sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    const updatedClients = clients.map(client => 
      client.id === editingClient.id 
        ? {
            ...client,
            nom: formData.nom,
            contact: formData.contact,
            telephone: formData.telephone,
            email: formData.email,
            adresse: formData.adresse,
            notes: formData.notes
          }
        : client
    );
    
    setClients(updatedClients);
    toast({
      title: "Client modifié",
      description: "Le client a été mis à jour avec succès",
    });
    setIsEditDialogOpen(false);
    setEditingClient(null);
    resetForm();
  };

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter(client => client.id !== id));
    toast({
      title: "Client supprimé",
      description: "Le client a été supprimé avec succès",
    });
  };

  const getSoldeBadge = (solde: number) => {
    if (solde > 0) return <Badge variant="destructive">Dette: {solde.toLocaleString()} Ar</Badge>;
    if (solde < 0) return <Badge className="bg-green-100 text-green-800">Crédit: {Math.abs(solde).toLocaleString()} Ar</Badge>;
    return <Badge variant="secondary">Soldé</Badge>;
  };

  const totalClients = clients.length;
  const totalAchats = clients.reduce((sum, client) => sum + client.totalAchats, 0);
  const moyenneAchats = totalClients > 0 ? Math.round(totalAchats / totalClients) : 0;

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Clients</h1>
          <p className="text-gray-600 mt-1">Gérez votre base clients</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouveau Client</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom/Entreprise *</Label>
                <Input 
                  id="nom" 
                  placeholder="Ex: Ferme Rakoto" 
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
                  placeholder="Ex: contact@ferme.mg" 
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
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Notes sur le client" 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleAddClient} className="w-full bg-farm-green hover:bg-farm-green-dark mt-4">
              Créer le client
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total clients</p>
                <p className="text-2xl font-bold text-farm-green">{totalClients}</p>
              </div>
              <UserCheck className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total achats</p>
                <p className="text-2xl font-bold text-farm-green">{totalAchats.toLocaleString()} Ar</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Moyenne par client</p>
                <p className="text-2xl font-bold text-farm-green">{moyenneAchats.toLocaleString()} Ar</p>
              </div>
              <CreditCard className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table des clients */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center text-farm-green-dark">
            <UserCheck className="w-5 h-5 mr-2 text-farm-green" />
            Liste des Clients ({filteredClients.length})
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Rechercher un client..."
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
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Coordonnées</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Total achats</TableHead>
                <TableHead>Solde</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{client.nom}</div>
                      <div className="text-sm text-gray-500">{client.notes}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{client.contact}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {client.telephone && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1" />
                          {client.telephone}
                        </div>
                      )}
                      {client.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1" />
                          {client.email}
                        </div>
                      )}
                      {client.adresse && (
                        <div className="flex items-center text-sm">
                          <MapPin className="w-3 h-3 mr-1" />
                          {client.adresse}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-farm-yellow/20">
                      {client.nombreCommandes} commandes
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-farm-green">
                      {client.totalAchats.toLocaleString()} Ar
                    </span>
                  </TableCell>
                  <TableCell>
                    {getSoldeBadge(client.solde)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditClient(client)}
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
                              Êtes-vous sûr de vouloir supprimer le client "{client.nom}" ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteClient(client.id)}
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

      {/* Edit Client Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le Client</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-nom">Nom/Entreprise *</Label>
              <Input 
                id="edit-nom" 
                placeholder="Ex: Ferme Rakoto" 
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
                placeholder="Ex: contact@ferme.mg" 
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
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea 
                id="edit-notes" 
                placeholder="Notes sur le client" 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
              />
            </div>
          </div>
          <Button onClick={handleUpdateClient} className="w-full bg-farm-green hover:bg-farm-green-dark mt-4">
            Mettre à jour le client
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Clients;
