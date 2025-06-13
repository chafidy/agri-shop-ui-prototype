
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, TrendingUp, DollarSign, Package, FileText, Download, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Reports = () => {
  const [periode, setPeriode] = useState('mois');
  const [categorie, setCategorie] = useState('');

  // Données pour les graphiques
  const ventesParJour = [
    { date: '01/06', ventes: 120000 },
    { date: '02/06', ventes: 85000 },
    { date: '03/06', ventes: 150000 },
    { date: '04/06', ventes: 95000 },
    { date: '05/06', ventes: 180000 },
    { date: '06/06', ventes: 110000 },
    { date: '07/06', ventes: 75000 }
  ];

  const ventesParCategorie = [
    { name: 'Aliments', value: 450000, color: '#708A58' },
    { name: 'Vétérinaire', value: 180000, color: '#FFB823' },
    { name: 'Matériel', value: 320000, color: '#2D4F2B' },
    { name: 'Autres', value: 125000, color: '#FFF1CA' }
  ];

  const topProduits = [
    { produit: 'Aliment vaches laitières', quantite: 45, ca: 675000 },
    { produit: 'Complément porcs', quantite: 32, ca: 576000 },
    { produit: 'Abreuvoir automatique', quantite: 15, ca: 180000 },
    { produit: 'Vaccin Newcastle', quantite: 28, ca: 84000 },
    { produit: 'Désinfectant étable', quantite: 22, ca: 88000 }
  ];

  const marges = [
    { produit: 'Aliment vaches', coutAchat: 12000, prixVente: 15000, marge: 25 },
    { produit: 'Vaccin Newcastle', coutAchat: 2500, prixVente: 3000, marge: 20 },
    { produit: 'Abreuvoir', coutAchat: 8500, prixVente: 12000, marge: 41.2 },
    { produit: 'Complément porcs', coutAchat: 15000, prixVente: 18000, marge: 20 },
    { produit: 'Désinfectant', coutAchat: 3200, prixVente: 4000, marge: 25 }
  ];

  const produitsExpiration = [
    { produit: 'Vaccin Newcastle', quantite: 15, dateExpiration: '2024-07-20', joursRestants: 7 },
    { produit: 'Médicament porc', quantite: 8, dateExpiration: '2024-07-25', joursRestants: 12 },
    { produit: 'Complément vitaminé', quantite: 12, dateExpiration: '2024-08-10', joursRestants: 28 }
  ];

  const exportReport = (type: string) => {
    // Simulation de l'export
    console.log(`Export ${type} en cours...`);
  };

  const caTotal = ventesParJour.reduce((sum, item) => sum + item.ventes, 0);
  const margesMoyenne = marges.reduce((sum, item) => sum + item.marge, 0) / marges.length;
  const produitsVendus = topProduits.reduce((sum, item) => sum + item.quantite, 0);

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Rapports & Statistiques</h1>
          <p className="text-gray-600 mt-1">Analyse de performance et tableaux de bord</p>
        </div>
        <div className="flex space-x-3">
          <Select value={periode} onValueChange={setPeriode}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jour">Jour</SelectItem>
              <SelectItem value="semaine">Semaine</SelectItem>
              <SelectItem value="mois">Mois</SelectItem>
              <SelectItem value="annee">Année</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-farm-green hover:bg-farm-green-dark hover-scale">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA Total (7 jours)</p>
                <p className="text-2xl font-bold text-farm-green">{caTotal.toLocaleString()} Ar</p>
                <p className="text-xs text-green-600">+12% vs période précédente</p>
              </div>
              <DollarSign className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Produits vendus</p>
                <p className="text-2xl font-bold text-farm-green">{produitsVendus}</p>
                <p className="text-xs text-green-600">+8% vs période précédente</p>
              </div>
              <Package className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Marge moyenne</p>
                <p className="text-2xl font-bold text-farm-green">{margesMoyenne.toFixed(1)}%</p>
                <p className="text-xs text-orange-600">-2% vs période précédente</p>
              </div>
              <TrendingUp className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nombre de ventes</p>
                <p className="text-2xl font-bold text-farm-green">47</p>
                <p className="text-xs text-green-600">+15% vs période précédente</p>
              </div>
              <FileText className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des ventes par jour */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-green-dark">
              <TrendingUp className="w-5 h-5 mr-2 text-farm-green" />
              Évolution des ventes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ventesParJour}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`${Number(value).toLocaleString()} Ar`, 'Ventes']} />
                <Line type="monotone" dataKey="ventes" stroke="#708A58" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par catégorie */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-green-dark">
              <Package className="w-5 h-5 mr-2 text-farm-green" />
              Ventes par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ventesParCategorie}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {ventesParCategorie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${Number(value).toLocaleString()} Ar`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top produits */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-farm-green-dark">Top 5 Produits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProduits.map((produit, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-farm-cream/30 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{produit.produit}</p>
                    <p className="text-xs text-gray-600">{produit.quantite} unités</p>
                  </div>
                  <span className="font-bold text-farm-green">{produit.ca.toLocaleString()} Ar</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analyse des marges */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-farm-green-dark">Analyse des marges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marges.map((marge, index) => (
                <div key={index} className="p-3 bg-farm-cream/30 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">{marge.produit}</p>
                    <span className="font-bold text-farm-green">{marge.marge.toFixed(1)}%</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <span>Achat: {marge.coutAchat.toLocaleString()} Ar</span>
                    <span className="mx-2">•</span>
                    <span>Vente: {marge.prixVente.toLocaleString()} Ar</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Produits à expiration */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-farm-green-dark">Produits bientôt expirés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {produitsExpiration.map((produit, index) => (
                <div key={index} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">{produit.produit}</p>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      {produit.joursRestants} jours
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <span>Stock: {produit.quantite}</span>
                    <span className="mx-2">•</span>
                    <span>Exp: {produit.dateExpiration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions d'export */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-farm-green-dark">Export des rapports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => exportReport('ventes')}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Rapport ventes PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportReport('stock')}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              État stock Excel
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportReport('marges')}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Analyse marges PDF
            </Button>
            <Button 
              variant="outline" 
              onClick={() => exportReport('complet')}
              className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Rapport complet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
