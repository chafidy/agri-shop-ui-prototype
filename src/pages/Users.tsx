
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, Users, Shield, Activity, Eye, Edit, Trash2, Store, Calculator, Truck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const utilisateurs = [
    {
      id: 1,
      nom: "Rakoto Andry",
      email: "proprietaire@farmshop.mg",
      role: "Propriétaire/Gérant",
      statut: "actif",
      dernierAcces: "2024-06-13 09:30",
      dateCreation: "2024-01-15",
      nombreConnexions: 145,
      permissions: ["Ventes", "Achats", "Stock", "Rapports", "Personnel", "Comptabilité", "Configuration"],
      telephone: "+261 34 12 345 67"
    },
    {
      id: 2,
      nom: "Rasoa Marie",
      email: "marie.vendeur@farmshop.mg",
      role: "Caissier/Vendeur",
      statut: "actif",
      dernierAcces: "2024-06-13 08:15",
      dateCreation: "2024-02-20",
      nombreConnexions: 89,
      permissions: ["Ventes", "Consultation stock", "Clients"],
      telephone: "+261 33 98 765 43"
    },
    {
      id: 3,
      nom: "Hery Rasoamanana",
      email: "hery.stock@farmshop.mg",
      role: "Gestionnaire Stock",
      statut: "actif",
      dernierAcces: "2024-06-12 16:45",
      dateCreation: "2024-03-10",
      nombreConnexions: 67,
      permissions: ["Gestion stock", "Réception marchandises", "Inventaire", "Rapports stock"],
      telephone: "+261 32 55 444 33"
    },
    {
      id: 4,
      nom: "Vola Andriamanalina",
      email: "vola.achat@farmshop.mg",
      role: "Responsable Achats",
      statut: "actif",
      dernierAcces: "2024-06-13 07:20",
      dateCreation: "2024-04-05",
      nombreConnexions: 45,
      permissions: ["Achats", "Fournisseurs", "Commandes", "Négociation prix"],
      telephone: "+261 34 77 888 99"
    },
    {
      id: 5,
      nom: "Naina Razafy",
      email: "naina.comptable@farmshop.mg",
      role: "Comptable/Financier",
      statut: "actif",
      dernierAcces: "2024-06-12 17:30",
      dateCreation: "2024-02-15",
      nombreConnexions: 78,
      permissions: ["Comptabilité", "Rapports financiers", "Trésorerie", "Facturation"],
      telephone: "+261 33 11 222 33"
    }
  ];

  const historiqueActions = [
    { utilisateur: "Rakoto Andry", action: "Validation commande fournisseur 'Aliments Bovins'", date: "2024-06-13 09:15", type: "validation" },
    { utilisateur: "Rasoa Marie", action: "Vente 150,000 Ar - Provende porc 25kg", date: "2024-06-13 08:30", type: "vente" },
    { utilisateur: "Hery Rasoamanana", action: "Réception stock 'Vaccin Newcastle 100 doses'", date: "2024-06-12 16:20", type: "stock" },
    { utilisateur: "Vola Andriamanalina", action: "Négociation prix avec fournisseur 'AgroMada'", date: "2024-06-12 14:45", type: "achat" },
    { utilisateur: "Naina Razafy", action: "Clôture comptable semaine 24", date: "2024-06-11 17:30", type: "comptabilite" }
  ];

  const roles = [
    "Tous", 
    "Propriétaire/Gérant", 
    "Manager/Administrateur",
    "Caissier/Vendeur", 
    "Gestionnaire Stock", 
    "Responsable Achats",
    "Comptable/Financier"
  ];

  const filteredUsers = utilisateurs.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === '' || selectedRole === 'Tous' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getStatusBadge = (statut: string) => {
    return statut === 'actif' 
      ? <Badge variant="default" className="bg-green-100 text-green-800">Actif</Badge>
      : <Badge variant="secondary" className="bg-gray-100 text-gray-800">Inactif</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      "Propriétaire/Gérant": "bg-purple-100 text-purple-800",
      "Manager/Administrateur": "bg-red-100 text-red-800",
      "Caissier/Vendeur": "bg-blue-100 text-blue-800",
      "Gestionnaire Stock": "bg-orange-100 text-orange-800",
      "Responsable Achats": "bg-green-100 text-green-800",
      "Comptable/Financier": "bg-indigo-100 text-indigo-800"
    };
    return <Badge variant="secondary" className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{role}</Badge>;
  };

  const getActionIcon = (type: string) => {
    switch(type) {
      case 'validation': return <Shield className="w-4 h-4 text-purple-600" />;
      case 'vente': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'stock': return <Activity className="w-4 h-4 text-orange-600" />;
      case 'achat': return <Truck className="w-4 h-4 text-green-600" />;
      case 'comptabilite': return <Calculator className="w-4 h-4 text-indigo-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddUser = () => {
    toast({
      title: "Utilisateur ajouté",
      description: "Le nouvel membre de l'équipe a été créé avec succès",
    });
    setIsAddDialogOpen(false);
  };

  const totalUtilisateurs = utilisateurs.length;
  const utilisateursActifs = utilisateurs.filter(u => u.statut === 'actif').length;
  const totalConnexions = utilisateurs.reduce((sum, u) => sum + u.nombreConnexions, 0);

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion de l'Équipe</h1>
          <p className="text-gray-600 mt-1">Personnel et utilisateurs de la boutique d'élevage</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un membre
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouveau Membre de l'Équipe</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom complet</Label>
                <Input id="nom" placeholder="Nom et prénom" />
              </div>
              <div>
                <Label htmlFor="email">Email professionnel</Label>
                <Input id="email" type="email" placeholder="nom@farmshop.mg" />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="+261 XX XX XXX XX" />
              </div>
              <div>
                <Label htmlFor="role">Poste/Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un poste" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proprietaire">Propriétaire/Gérant</SelectItem>
                    <SelectItem value="manager">Manager/Administrateur</SelectItem>
                    <SelectItem value="vendeur">Caissier/Vendeur</SelectItem>
                    <SelectItem value="stock">Gestionnaire Stock/Magasinier</SelectItem>
                    <SelectItem value="achat">Responsable Achats</SelectItem>
                    <SelectItem value="comptable">Comptable/Financier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">Mot de passe temporaire</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button onClick={handleAddUser} className="w-full bg-farm-green hover:bg-farm-green-dark">
                Ajouter à l'équipe
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
                <p className="text-sm text-gray-600">Total équipe</p>
                <p className="text-2xl font-bold text-farm-green">{totalUtilisateurs}</p>
              </div>
              <Users className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Membres actifs</p>
                <p className="text-2xl font-bold text-farm-green">{utilisateursActifs}</p>
              </div>
              <Shield className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total connexions</p>
                <p className="text-2xl font-bold text-farm-green">{totalConnexions}</p>
              </div>
              <Activity className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste de l'équipe */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-farm-green-dark">
                <Store className="w-5 h-5 mr-2 text-farm-green" />
                Équipe FarmShop ({filteredUsers.length})
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un membre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Poste" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="p-4 border border-farm-cream rounded-lg bg-farm-cream/10 hover:bg-farm-cream/20 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-farm-green-dark">{user.nom}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.telephone}</p>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(user.statut)}
                        {getRoleBadge(user.role)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                      <div className="space-y-1">
                        <div><strong>Dernière activité:</strong> {user.dernierAcces}</div>
                        <div><strong>Dans l'équipe depuis:</strong> {user.dateCreation}</div>
                        <div><strong>Connexions:</strong> {user.nombreConnexions}</div>
                      </div>
                      <div>
                        <strong>Permissions métier:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                        <Edit className="w-3 h-3 mr-1" />
                        Modifier
                      </Button>
                      <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                        <Shield className="w-3 h-3 mr-1" />
                        Permissions
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 border-red-300 hover:bg-red-50">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Retirer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activité récente et rôles */}
        <div className="space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-farm-green-dark">Activité de l'équipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {historiqueActions.map((action, index) => (
                  <div key={index} className="p-3 bg-farm-cream/30 rounded-lg">
                    <div className="flex items-start space-x-3">
                      {getActionIcon(action.type)}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{action.utilisateur}</p>
                        <p className="text-xs text-gray-600">{action.action}</p>
                        <p className="text-xs text-gray-500">{action.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-farm-green-dark">Postes & Responsabilités</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-sm text-purple-800">Propriétaire/Gérant</h4>
                <p className="text-xs text-purple-600">Supervision générale, décisions stratégiques</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm text-blue-800">Caissier/Vendeur</h4>
                <p className="text-xs text-blue-600">Vente, conseil client, encaissement</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-sm text-orange-800">Gestionnaire Stock</h4>
                <p className="text-xs text-orange-600">Inventaire, réception, organisation magasin</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-sm text-green-800">Responsable Achats</h4>
                <p className="text-xs text-green-600">Approvisionnement, négociation fournisseurs</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <h4 className="font-semibold text-sm text-indigo-800">Comptable/Financier</h4>
                <p className="text-xs text-indigo-600">Comptabilité, finances, rapports</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
