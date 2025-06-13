
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Users, Phone, Mail, MapPin, Plus, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const fournisseurs = [
    {
      id: 1,
      nom: "Agrobio SARL",
      contact: "Rakoto Andry",
      telephone: "+261 34 12 345 67",
      email: "contact@agrobio.mg",
      adresse: "Antananarivo, Madagascar",
      specialite: "Aliments pour bétail",
      totalAchats: 15420000,
      dernierAchat: "2024-06-10",
      status: "actif",
      delaiPaiement: 30,
      noteInterne: "Fournisseur fiable, livraisons toujours à temps"
    },
    {
      id: 2,
      nom: "VetSupply Madagascar",
      contact: "Dr. Rasoa Marie",
      telephone: "+261 33 98 765 43",
      email: "vetsupply@gmail.com",
      adresse: "Antsirabe, Madagascar",
      specialite: "Produits vétérinaires",
      totalAchats: 8950000,
      dernierAchat: "2024-06-08",
      status: "actif",
      delaiPaiement: 15,
      noteInterne: "Spécialiste vaccins, prix compétitifs"
    },
    {
      id: 3,
      nom: "EquipFarm Ltd",
      contact: "Hery Rasoamanana",
      telephone: "+261 32 55 444 33",
      email: "equipfarm@yahoo.fr",
      adresse: "Toamasina, Madagascar",
      specialite: "Matériel agricole",
      totalAchats: 12300000,
      dernierAchat: "2024-05-25",
      status: "actif",
      delaiPaiement: 45,
      noteInterne: "Matériel de qualité, service après-vente correct"
    },
    {
      id: 4,
      nom: "ChemAgri Solutions",
      contact: "Andry Rakotobe",
      telephone: "+261 34 77 888 99",
      email: "chemagri@moov.mg",
      adresse: "Fianarantsoa, Madagascar",
      specialite: "Produits chimiques",
      totalAchats: 4200000,
      dernierAchat: "2024-04-15",
      status: "inactif",
      delaiPaiement: 30,
      noteInterne: "Fournisseur occasionnel, vérifier stock avant commande"
    }
  ];

  const historiqueFournisseur = [
    { date: "2024-06-10", fournisseur: "Agrobio SARL", produit: "Aliment vaches", montant: 750000, statut: "Payé" },
    { date: "2024-06-08", fournisseur: "VetSupply", produit: "Vaccins Newcastle", montant: 125000, statut: "En attente" },
    { date: "2024-05-25", fournisseur: "EquipFarm", produit: "Abreuvoirs", montant: 850000, statut: "Payé" },
    { date: "2024-05-20", fournisseur: "Agrobio SARL", produit: "Complément porcs", montant: 450000, statut: "Payé" }
  ];

  const categories = ["Tous", "Aliments pour bétail", "Produits vétérinaires", "Matériel agricole", "Produits chimiques"];

  const filteredSuppliers = fournisseurs.filter(fournisseur => {
    const matchesSearch = fournisseur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fournisseur.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tous' || fournisseur.specialite === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    return status === 'actif' 
      ? <Badge variant="default" className="bg-green-100 text-green-800">Actif</Badge>
      : <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactif</Badge>;
  };

  const handleAddSupplier = () => {
    toast({
      title: "Fournisseur ajouté",
      description: "Le nouveau fournisseur a été enregistré avec succès",
    });
    setIsAddDialogOpen(false);
  };

  const totalFournisseurs = fournisseurs.length;
  const fournisseursActifs = fournisseurs.filter(f => f.status === 'actif').length;
  const totalAchatsAnnee = fournisseurs.reduce((sum, f) => sum + f.totalAchats, 0);

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Fournisseurs</h1>
          <p className="text-gray-600 mt-1">Gérez vos partenaires commerciaux</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un fournisseur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouveau Fournisseur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom de l'entreprise</Label>
                <Input id="nom" placeholder="Nom du fournisseur" />
              </div>
              <div>
                <Label htmlFor="contact">Personne de contact</Label>
                <Input id="contact" placeholder="Nom du contact" />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="+261 XX XX XXX XX" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemple.com" />
              </div>
              <div>
                <Label htmlFor="specialite">Spécialité</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aliments">Aliments pour bétail</SelectItem>
                    <SelectItem value="veterinaire">Produits vétérinaires</SelectItem>
                    <SelectItem value="materiel">Matériel agricole</SelectItem>
                    <SelectItem value="chimique">Produits chimiques</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddSupplier} className="w-full bg-farm-green hover:bg-farm-green-dark">
                Enregistrer
              </Button>
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
                <p className="text-sm text-gray-600">Total fournisseurs</p>
                <p className="text-2xl font-bold text-farm-green">{totalFournisseurs}</p>
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
                <p className="text-2xl font-bold text-farm-green">{fournisseursActifs}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Achats cette année</p>
                <p className="text-2xl font-bold text-farm-green">{totalAchatsAnnee.toLocaleString()} Ar</p>
              </div>
              <CreditCard className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des fournisseurs */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-farm-green-dark">
                <Users className="w-5 h-5 mr-2 text-farm-green" />
                Liste des Fournisseurs ({filteredSuppliers.length})
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un fournisseur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Spécialité" />
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
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSuppliers.map((fournisseur) => (
                  <div key={fournisseur.id} className="p-4 border border-farm-cream rounded-lg bg-farm-cream/10 hover:bg-farm-cream/20 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-farm-green-dark">{fournisseur.nom}</h3>
                        <p className="text-sm text-gray-600">{fournisseur.specialite}</p>
                      </div>
                      {getStatusBadge(fournisseur.status)}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{fournisseur.contact}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{fournisseur.telephone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{fournisseur.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{fournisseur.adresse}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium">Total achats: </span>
                          <span className="text-farm-green font-bold">{fournisseur.totalAchats.toLocaleString()} Ar</span>
                        </div>
                        <div>
                          <span className="font-medium">Dernier achat: </span>
                          <span>{fournisseur.dernierAchat}</span>
                        </div>
                        <div>
                          <span className="font-medium">Délai paiement: </span>
                          <span>{fournisseur.delaiPaiement} jours</span>
                        </div>
                      </div>
                    </div>
                    
                    {fournisseur.noteInterne && (
                      <div className="mt-3 p-2 bg-farm-yellow/20 rounded text-sm">
                        <strong>Note: </strong>{fournisseur.noteInterne}
                      </div>
                    )}
                    
                    <div className="flex space-x-2 mt-3">
                      <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                        Historique
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historique des achats */}
        <div className="space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-farm-green-dark">Derniers achats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historiqueFournisseur.map((achat, index) => (
                  <div key={index} className="p-3 bg-farm-cream/30 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{achat.fournisseur}</p>
                        <p className="text-xs text-gray-600">{achat.produit}</p>
                        <p className="text-xs text-gray-500">{achat.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-farm-green">{achat.montant.toLocaleString()} Ar</p>
                        <Badge variant={achat.statut === 'Payé' ? 'default' : 'secondary'} className="text-xs">
                          {achat.statut}
                        </Badge>
                      </div>
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

export default Suppliers;
