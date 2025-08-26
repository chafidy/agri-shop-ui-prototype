import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Shield, Store, ShoppingCart, Package, Users, BarChart3, Calculator, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: number;
  nom: string;
  permissions: string[];
}

interface UserPermissionsDialogProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: number, permissions: string[]) => void;
}

const UserPermissionsDialog = ({ user, isOpen, onClose, onSave }: UserPermissionsDialogProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(user?.permissions || []);

  const permissionCategories = [
    {
      category: "Ventes & Commerce",
      icon: ShoppingCart,
      permissions: [
        { id: "ventes", label: "Effectuer des ventes", description: "Créer et finaliser des ventes" },
        { id: "commandes", label: "Gérer les commandes", description: "Créer et modifier les commandes clients" },
        { id: "devis", label: "Créer des devis", description: "Établir des devis pour les clients" },
        { id: "remises", label: "Appliquer des remises", description: "Accorder des remises sur les ventes" }
      ]
    },
    {
      category: "Gestion des stocks",
      icon: Package,
      permissions: [
        { id: "stock_consultation", label: "Consulter les stocks", description: "Voir l'état des stocks" },
        { id: "stock_modification", label: "Modifier les stocks", description: "Ajuster les quantités en stock" },
        { id: "inventaire", label: "Faire des inventaires", description: "Effectuer des comptages physiques" },
        { id: "reception", label: "Réceptionner des marchandises", description: "Enregistrer les livraisons" }
      ]
    },
    {
      category: "Clients & Fournisseurs",
      icon: Users,
      permissions: [
        { id: "clients", label: "Gérer les clients", description: "Créer et modifier les fiches clients" },
        { id: "fournisseurs", label: "Gérer les fournisseurs", description: "Créer et modifier les fiches fournisseurs" },
        { id: "achats", label: "Passer des commandes d'achat", description: "Commander auprès des fournisseurs" },
        { id: "negociation", label: "Négocier les prix", description: "Modifier les prix d'achat et de vente" }
      ]
    },
    {
      category: "Rapports & Analyses",
      icon: BarChart3,
      permissions: [
        { id: "rapports_ventes", label: "Rapports de ventes", description: "Consulter les statistiques de vente" },
        { id: "rapports_stock", label: "Rapports de stock", description: "Analyser les mouvements de stock" },
        { id: "rapports_financiers", label: "Rapports financiers", description: "Voir les données financières" },
        { id: "export_donnees", label: "Exporter des données", description: "Télécharger les rapports" }
      ]
    },
    {
      category: "Comptabilité",
      icon: Calculator,
      permissions: [
        { id: "facturation", label: "Créer des factures", description: "Émettre des factures clients" },
        { id: "comptabilite", label: "Saisies comptables", description: "Enregistrer les écritures comptables" },
        { id: "tresorerie", label: "Gérer la trésorerie", description: "Suivre les encaissements et décaissements" },
        { id: "cloture", label: "Clôtures périodiques", description: "Effectuer les clôtures mensuelles" }
      ]
    },
    {
      category: "Administration",
      icon: Settings,
      permissions: [
        { id: "personnel", label: "Gérer le personnel", description: "Créer et modifier les comptes utilisateurs" },
        { id: "configuration", label: "Configuration système", description: "Modifier les paramètres de l'application" },
        { id: "sauvegarde", label: "Sauvegardes", description: "Effectuer et restaurer des sauvegardes" },
        { id: "logs", label: "Consulter les logs", description: "Voir l'historique des actions" }
      ]
    }
  ];

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions(prev => [...prev, permissionId]);
    } else {
      setSelectedPermissions(prev => prev.filter(p => p !== permissionId));
    }
  };

  const handleSave = () => {
    if (!user) return;

    onSave(user.id, selectedPermissions);
    toast({
      title: "Permissions mises à jour",
      description: `Les permissions de ${user.nom} ont été modifiées`,
    });
    onClose();
  };

  const handleSelectAll = (categoryPermissions: any[]) => {
    const categoryIds = categoryPermissions.map(p => p.id);
    const allSelected = categoryIds.every(id => selectedPermissions.includes(id));
    
    if (allSelected) {
      // Déselectionner tous les permissions de cette catégorie
      setSelectedPermissions(prev => prev.filter(p => !categoryIds.includes(p)));
    } else {
      // Sélectionner tous les permissions de cette catégorie
      const newPermissions = [...new Set([...selectedPermissions, ...categoryIds])];
      setSelectedPermissions(newPermissions);
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-farm-green-dark">
            <Shield className="w-5 h-5 mr-2 text-farm-green" />
            Permissions de {user.nom}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {permissionCategories.map((category) => {
            const CategoryIcon = category.icon;
            const categoryPermissions = category.permissions;
            const selectedCount = categoryPermissions.filter(p => selectedPermissions.includes(p.id)).length;
            const allSelected = selectedCount === categoryPermissions.length;
            
            return (
              <div key={category.category} className="border border-farm-cream rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <CategoryIcon className="w-5 h-5 mr-2 text-farm-green" />
                    <h3 className="font-semibold text-farm-green-dark">{category.category}</h3>
                    <span className="ml-2 text-sm text-gray-500">
                      ({selectedCount}/{categoryPermissions.length})
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSelectAll(categoryPermissions)}
                    className="text-xs border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
                  >
                    {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-3 p-3 bg-farm-cream/10 rounded-lg">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={permission.id} className="font-medium text-sm cursor-pointer">
                          {permission.label}
                        </Label>
                        <p className="text-xs text-gray-600 mt-1">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Résumé des permissions</h4>
            <p className="text-sm text-blue-600">
              <strong>{selectedPermissions.length}</strong> permissions sélectionnées sur {' '}
              <strong>{permissionCategories.reduce((sum, cat) => sum + cat.permissions.length, 0)}</strong> disponibles
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleSave} 
              className="bg-farm-green hover:bg-farm-green-dark"
            >
              Enregistrer les permissions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionsDialog;