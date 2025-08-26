import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Plus, Search, Eye, Download, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);

  const [invoices, setInvoices] = useState([
    {
      id: 'FACT-2024-001',
      client: 'Ferme Rakoto',
      montant: 157500,
      dateEmission: '2024-06-10',
      dateEcheance: '2024-06-25',
      statut: 'en_attente',
      items: [
        { produit: 'Aliment vaches laitières', quantite: 5, prix: 15000 },
        { produit: 'Vaccin Newcastle', quantite: 25, prix: 3000 }
      ]
    },
    {
      id: 'FACT-2024-002',
      client: 'Élevage Andry',
      montant: 89000,
      dateEmission: '2024-06-08',
      dateEcheance: '2024-06-18',
      statut: 'en_retard',
      items: [
        { produit: 'Complément porcs', quantite: 3, prix: 18000 },
        { produit: 'Abreuvoir automatique', quantite: 2, prix: 12000 }
      ]
    },
    {
      id: 'FACT-2024-003',
      client: 'Coopérative Sud',
      montant: 245000,
      dateEmission: '2024-06-05',
      dateEcheance: '2024-06-20',
      statut: 'payee',
      items: [
        { produit: 'Aliment vaches laitières', quantite: 8, prix: 15000 },
        { produit: 'Désinfectant étable', quantite: 16, prix: 4000 }
      ]
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />En attente</Badge>;
      case 'payee':
        return <Badge variant="default" className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Payée</Badge>;
      case 'en_retard':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">En retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const invoiceCount = invoices.length + 1;
    return `FACT-${year}-${invoiceCount.toString().padStart(3, '0')}`;
  };

  const handleCreateInvoice = () => {
    const newInvoice = {
      id: generateInvoiceNumber(),
      client: 'Nouveau Client',
      montant: 0,
      dateEmission: new Date().toISOString().split('T')[0],
      dateEcheance: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      statut: 'en_attente' as const,
      items: []
    };

    setInvoices([newInvoice, ...invoices]);
    toast({
      title: "Facture créée",
      description: `Facture ${newInvoice.id} créée avec succès`,
    });
    setIsNewInvoiceOpen(false);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || invoice.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter(i => i.statut === 'payee').length;
  const overdueInvoices = invoices.filter(i => i.statut === 'en_retard').length;
  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.montant, 0);

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Gestion des Factures</h1>
          <p className="text-gray-600 mt-1">Créer et suivre vos factures clients</p>
        </div>
        <Dialog open={isNewInvoiceOpen} onOpenChange={setIsNewInvoiceOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle facture
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvelle Facture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="client">Client</Label>
                <Input id="client" placeholder="Nom du client" />
              </div>
              <div>
                <Label htmlFor="dateEcheance">Date d'échéance</Label>
                <Input id="dateEcheance" type="date" />
              </div>
              <div>
                <Label htmlFor="conditions">Conditions de paiement</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir les conditions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15j">15 jours</SelectItem>
                    <SelectItem value="30j">30 jours</SelectItem>
                    <SelectItem value="45j">45 jours</SelectItem>
                    <SelectItem value="comptant">Comptant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleCreateInvoice} className="w-full bg-farm-green hover:bg-farm-green-dark">
                Créer la facture
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
                <p className="text-sm text-gray-600">Total factures</p>
                <p className="text-2xl font-bold text-farm-green">{totalInvoices}</p>
              </div>
              <FileText className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Factures payées</p>
                <p className="text-2xl font-bold text-green-600">{paidInvoices}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-red-600">{overdueInvoices}</p>
              </div>
              <Clock className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Montant total</p>
                <p className="text-2xl font-bold text-farm-green">{totalAmount.toLocaleString()} Ar</p>
              </div>
              <DollarSign className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des factures */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-farm-green-dark">
            <span className="flex items-center">
              <FileText className="w-5 h-5 mr-2 text-farm-green" />
              Liste des Factures
            </span>
          </CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une facture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="payee">Payée</SelectItem>
                <SelectItem value="en_retard">En retard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Facture</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date émission</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <span className="font-mono text-sm font-medium">{invoice.id}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{invoice.client}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{invoice.dateEmission}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{invoice.dateEcheance}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-farm-green">
                      {invoice.montant.toLocaleString()} Ar
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(invoice.statut)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                        <Eye className="w-3 h-3 mr-1" />
                        Voir
                      </Button>
                      <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white">
                        <Download className="w-3 h-3 mr-1" />
                        PDF
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

export default Invoices;