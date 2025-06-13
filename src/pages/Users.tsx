
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, UserPlus, Users, Shield, Activity, Eye, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const utilisateurs = [
    {
      id: 1,
      nom: "Rakoto Andry",
      email: "admin@farmshop.mg",
      role: "Administrateur",
      statut: "actif",
      dernierAcces: "2024-06-13 09:30",
      dateCreation: "2024-01-15",
      nombreConnexions: 145,
      permissions: ["Ventes", "Achats", "Stock", "Rapports", "Utilisateurs"],
      telephone: "+261 34 12 345 67"
    },
    {
      id: 2,
      nom: "Rasoa Marie",
      email: "marie@farmshop.mg",
      role: "Vendeur",
      statut: "actif",
      dernierAcces: "2024-06-13 08:15",
      dateCreation: "2024-02-20",
      nombreConnexions: 89,
      permissions: ["Ventes", "Stock"],
      telephone: "+261 33 98 765 43"
    },
    {
      id: 3,
      nom: "Hery Rasoamanana",
      email: "hery@farmshop.mg",
      role: "Gestionnaire Stock",
      statut: "actif",
      dernierAcces: "2024-06-12 16:45",
      dateCreation: "2024-03-10",
      nombreConnexions: 67,
      permissions: ["Stock", "Achats", "Rapports"],
      telephone: "+261 32 55 444 33"
    },
    {
      id: 4,
      nom: "Vola Andriamanalina",
      email: "vola@farmshop.mg",
      role: "Vendeur",
      statut: "inactif",
      dernierAcces: "2024-05-28 14:20",
      dateCreation: "2024-04-05",
      nombreConnexions: 23,
      permissions: ["Ventes"],
      telephone: "+261 34 77 888 99"
    }
  ];

  const historiqueActions = [
    { utilisateur: "Rakoto Andry", action: "Création produit 'Aliment vaches'", date: "2024-06-13 09:15", type: "creation" },
    { utilisateur: "Rasoa Marie", action: "Vente 150,000 Ar client 'Ferme Sanogo'", date: "2024-06-13 08:30", type: "vente" },
    { utilisateur: "Hery Rasoamanana", action: "Mise à jour stock 'Vaccin Newcastle'", date: "2024-06-12 16:20", type: "stock" },
    { utilisateur: "Rasoa Marie", action: "Connexion système", date: "2024-06-12 08:00", type: "connexion" },
    { utilisateur: "Rakoto Andry", action: "Export rapport mensuel", date: "2024-06-11 17:30", type: "rapport" }
  ];

  const roles = ["Tous", "Administrateur", "Vendeur", "Gestionnaire Stock"];

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
      "Administrateur": "bg-red-100 text-red-800",
      "Vendeur": "bg-blue-100 text-blue-800",
      "Gestionnaire Stock": "bg-purple-100 text-purple-800"
    };
    return <Badge variant="secondary" className={colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{role}</Badge>;
  };

  const getActionIcon = (type: string) => {
    switch(type) {
      case 'creation': return <UserPlus className="w-4 h-4 text-green-600" />;
      case 'vente': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'stock': return <Activity className="w-4 h-4 text-orange-600" />;
      case 'connexion': return <Eye className="w-4 h-4 text-gray-600" />;
      case 'rapport': return <Activity className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddUser = () => {
    toast({
      title: "Utilisateur ajouté",
      description: "Le nouvel utilisateur a été créé avec succès",
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
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 mt-1">Administration des comptes et permissions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvel Utilisateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nom">Nom complet</Label>
                <Input id="nom" placeholder="Nom et prénom" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@exemple.com" />
              </div>
              <div>
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="+261 XX XX XXX XX" />
              </div>
              <div>
                <Label htmlFor="role">Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrateur</SelectItem>
                    <SelectItem value="vendeur">Vendeur</SelectItem>
                    <SelectItem value="stock">Gestionnaire Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">Mot de passe temporaire</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button onClick={handleAddUser} className="w-full bg-farm-green hover:bg-farm-green-dark">
                Créer l'utilisateur
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
                <p className="text-sm text-gray-600">Total utilisateurs</p>
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
                <p className="text-sm text-gray-600">Utilisateurs actifs</p>
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
        {/* Liste des utilisateurs */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-farm-green-dark">
                <Users className="w-5 h-5 mr-2 text-farm-green" />
                Liste des Utilisateurs ({filteredUsers.length})
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Rôle" />
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
                        <div><strong>Dernier accès:</strong> {user.dernierAcces}</div>
                        <div><strong>Membre depuis:</strong> {user.dateCreation}</div>
                        <div><strong>Connexions:</strong> {user.nombreConnexions}</div>
                      </div>
                      <div>
                        <strong>Permissions:</strong>
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
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historique des actions */}
        <div className="space-y-6">
          <Card className="shadow-sm border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-farm-green-dark">Activité récente</CardTitle>
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
              <CardTitle className="text-farm-green-dark">Gestion des rôles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-sm text-red-800">Administrateur</h4>
                <p className="text-xs text-red-600">Accès complet à toutes les fonctionnalités</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-sm text-blue-800">Vendeur</h4>
                <p className="text-xs text-blue-600">Gestion des ventes et consultation des stocks</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-sm text-purple-800">Gestionnaire Stock</h4>
                <p className="text-xs text-purple-600">Gestion des stocks, achats et rapports</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
