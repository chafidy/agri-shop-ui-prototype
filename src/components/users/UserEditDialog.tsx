import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: number;
  nom: string;
  email: string;
  role: string;
  statut: string;
  telephone: string;
}

interface UserEditDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}

const UserEditDialog = ({ user, isOpen, onClose, onSave }: UserEditDialogProps) => {
  const [editedUser, setEditedUser] = useState<User | null>(user);

  const roles = [
    "Propriétaire/Gérant",
    "Manager/Administrateur", 
    "Caissier/Vendeur",
    "Gestionnaire Stock",
    "Responsable Achats",
    "Comptable/Financier"
  ];

  const handleSave = () => {
    if (!editedUser) return;

    if (!editedUser.nom || !editedUser.email || !editedUser.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    onSave(editedUser);
    toast({
      title: "Utilisateur modifié",
      description: `Les informations de ${editedUser.nom} ont été mises à jour`,
    });
    onClose();
  };

  const handleInputChange = (field: keyof User, value: string) => {
    if (editedUser) {
      setEditedUser({ ...editedUser, [field]: value });
    }
  };

  if (!user || !editedUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-farm-green-dark">
            <Edit className="w-5 h-5 mr-2 text-farm-green" />
            Modifier l'utilisateur
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nom">Nom complet *</Label>
            <Input
              id="nom"
              value={editedUser.nom}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              placeholder="Nom et prénom"
            />
          </div>

          <div>
            <Label htmlFor="email">Email professionnel *</Label>
            <Input
              id="email"
              type="email"
              value={editedUser.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="email@farmshop.mg"
            />
          </div>

          <div>
            <Label htmlFor="telephone">Téléphone *</Label>
            <Input
              id="telephone"
              value={editedUser.telephone}
              onChange={(e) => handleInputChange('telephone', e.target.value)}
              placeholder="+261 XX XX XXX XX"
            />
          </div>

          <div>
            <Label htmlFor="role">Poste/Rôle</Label>
            <Select 
              value={editedUser.role} 
              onValueChange={(value) => handleInputChange('role', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un poste" />
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

          <div>
            <Label htmlFor="statut">Statut</Label>
            <Select 
              value={editedUser.statut} 
              onValueChange={(value) => handleInputChange('statut', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="inactif">Inactif</SelectItem>
                <SelectItem value="suspendu">Suspendu</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1 bg-farm-green hover:bg-farm-green-dark"
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;