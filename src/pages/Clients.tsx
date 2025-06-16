
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit, Trash2, Users, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [clients, setClients] = useState([
    {
      id: 1,
      nom: "Ferme Sanogo",
      contact: "Ibrahim Sanogo",
      telephone: "+223 76 12 34 56",
      email: "ferme.sanogo@email.com",
      adresse: "Bamako, Mali",
      totalAchats: 2450000,
      dernierAchat: "2024-06-10",
      solde: 150000,
      typeClient: "Professionnel",
      nombreCommandes: 15
    },
    {
      id: 2,
      nom: "Élevage Diallo",
      contact: "Aminata Diallo",
      telephone: "+223 65 98 76 54",
      email: "diallo.elevage@gmail.com",
      adresse: "Sikasso, Mali",
      totalAchats: 1850000,
      dernierAchat: "2024-06-08",
      solde: 0,
      typeClient: "Professionnel",
      nombreCommandes: 12
    },
    {
      id: 3,
      nom: "Coopérative Nord",
      contact: "Ousmane Traoré",
      telephone: "+223 78 45 67 89",
      email: "coop.nord@yahoo.fr",
      adresse: "Mopti, Mali",
      totalAchats: 3200000,
      dernierAchat: "2024-06-05",
      solde: 75000,
      typeClient: "Coopérative",
      nombreCommandes: 22
    },
    {
      id: 4,
      nom: "Particulier Keita",
      contact: "Sekou Keita",
      telephone: "+223 66 33 22 11",
      email: "s.keita@hotmail.com",
      adresse: "Kayes, Mali",
      totalAchats: 450000,
      dernierAchat: "2024-05-28",
      solde: 25000,
      typeClient: "Particulier",
      nombreCommandes: 5
    }
  ]);

  const historiqueAchats = [
    { date: "2024-06-10", client: "Ferme Sanogo", produit: "Aliment vaches", montant: 150000, statut: "Payé", solde: 0 },
    { date: "2024-06-08", client: "Élevage Diallo", produit: "Vaccins", montant: 85000, statut: "Acompte", solde: 25000 },
    { date: "2024-06-05", client: "Coopérative Nord", produit: "Matériel", montant: 220000, statut: "Crédit", solde: 75000 },
    { date: "2024-05-28", client: "Particulier Keita", produit: "Aliments", montant: 45000, statut: "Payé", solde: 0 }
  ];

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.telephone.includes(searchTerm)
  );

  const handleAddClient = () => {
    toast({
      title: "Client ajouté",
      description: "Le nouveau client a été enregistré avec succès",
    });
    setIsAddDialogOpen(false);
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      "Professionnel": "bg-blue-100 text-blue-800",
      "Coopérative": "bg-green-100 text-green-800",
      "Particulier": "bg-purple-100 text-purple-800"
    };
    return <Badge variant="secondary" className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  const getSoldeBadge = (solde: number) => {
    if (solde === 0) return <Badge className="bg-green-100 text-green-800">À jour</Badge>;
    return <Badge variant="destructive">{solde.toLocaleString()} Ar</Badge>;
  };

  const totalClients = clients.length;
  const clientsActifs = clients.filter(c => c.dernierAchat >= "2024-05-01").length;
  const totalCreances = clients.reduce((sum, c) => sum + c.solde, 0);
  const chiffreAffaires = clients.reduce((sum, c) => sum + c.totalAchats, 0);

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Clients</h1>
          <p className="text-gray-600 mt-1">Gérez votre portefeuille clients</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouveau Client</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom / Raison sociale</Label>
                <Input id="nom" placeholder="Nom du client" />
              </div>
              <div>
                <Label htmlFor="contact">Personne de contact</Label>
                <Input id="contact" placeholder="Nom du contact" />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="+223 XX XX XX XX" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemple.com" />
              </div>
              <div>
                <Label htmlFor="adresse">Adresse</Label>
                <Textarea id="adresse" placeholder="Adresse complète" />
              </div>
              <Button onClick={handleAddClient} className="w-full bg-farm-green hover:bg-farm-green-dark">
                Enregistrer le client
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
                <p className="text-sm text-gray-600">Total clients</p>
                <p className="text-2xl font-bold text-farm-green">{totalClients}</p>
              </div>
              <Users className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Clients actifs</p>
                <p className="text-2xl font-bold text-farm-green">{clientsActifs}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Créances totales</p>
                <p className="text-2xl font-bold text-red-600">{totalCreances.toLocaleString()} Ar</p>
              </div>
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA total</p>
                <p className="text-2xl font-bold text-farm-green">{chiffreAffaires.toLocaleString()} Ar</p>
              </div>
              <CreditCard className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des clients */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-farm-green-dark">
                <Users className="w-5 h-5 mr-2 text-farm-green" />
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
                    <TableHead>Type</TableHead>
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
                          <div className="font-medium text-farm-green-dark">{client.nom}</div>
                          <div className="text-sm text-gray-600">{client.contact}</div>
                          <div className="text-xs text-gray-500">{client.dernierAchat}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1 text-gray-400" />
                            {client.telephone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-3 h-3 mr-1 text-gray-400" />
                            {client.email}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                            {client.adresse}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(client.typeClient)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-farm-green">{client.totalAchats.toLocaleString()} Ar</div>
                          <div className="text-xs text-gray-500">{client.nombreCommandes} commandes</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getSoldeBadge(client.solde)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                            <Trash2 className="w-3 h-3" />
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

        {/* Historique des achats */}
        <div className="space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-farm-green-dark">Derniers achats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historiqueAchats.map((achat, index) => (
                  <div key={index} className="p-3 bg-farm-cream/30 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{achat.client}</p>
                        <p className="text-xs text-gray-600">{achat.produit}</p>
                        <p className="text-xs text-gray-500">{achat.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-farm-green">{achat.montant.toLocaleString()} Ar</p>
                        <Badge variant={achat.statut === 'Payé' ? 'default' : 'secondary'} className="text-xs">
                          {achat.statut}
                        </Badge>
                        {achat.solde > 0 && (
                          <p className="text-xs text-red-600">Solde: {achat.solde.toLocaleString()} Ar</p>
                        )}
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

export default Clients;
