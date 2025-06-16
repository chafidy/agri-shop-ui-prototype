
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, TrendingDown, FileText, DollarSign, PieChart, BarChart3, Download } from 'lucide-react';

const Accounting = () => {
  const resumeFinancier = {
    chiffreAffaires: "2,450,000",
    beneficeNet: "485,000",
    chargesTotal: "1,965,000",
    tresorerie: "125,000",
    creances: "89,000",
    dettes: "156,000"
  };

  const ventesParCategorie = [
    { categorie: "Provende Porcs", montant: "890,000", pourcentage: 36 },
    { categorie: "Provende Volailles", montant: "735,000", pourcentage: 30 },
    { categorie: "Provende Bovins", montant: "490,000", pourcentage: 20 },
    { categorie: "Accessoires", montant: "335,000", pourcentage: 14 }
  ];

  const facturesEnAttente = [
    { numero: "FACT-2024-156", client: "Ferme Rasoamanana", montant: "45,000", echeance: "2024-06-20", statut: "en_attente" },
    { numero: "FACT-2024-157", client: "Élevage Andry", montant: "78,500", echeance: "2024-06-18", statut: "en_retard" },
    { numero: "FACT-2024-158", client: "Ferme Razafy", montant: "123,000", echeance: "2024-06-25", statut: "en_attente" }
  ];

  const getStatutBadge = (statut: string) => {
    switch(statut) {
      case 'en_attente':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'en_retard':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">En retard</Badge>;
      case 'paye':
        return <Badge variant="default" className="bg-green-100 text-green-800">Payé</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Comptabilité & Finances</h1>
          <p className="text-gray-600 mt-1">Suivi financier de votre boutique d'élevage</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
            <Download className="w-4 h-4 mr-2" />
            Export comptable
          </Button>
          <Button className="bg-farm-green hover:bg-farm-green-dark">
            <FileText className="w-4 h-4 mr-2" />
            Nouveau rapport
          </Button>
        </div>
      </div>

      {/* Résumé financier */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chiffre d'affaires</p>
                <p className="text-2xl font-bold text-farm-green">{resumeFinancier.chiffreAffaires} Ar</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% ce mois
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bénéfice net</p>
                <p className="text-2xl font-bold text-farm-green">{resumeFinancier.beneficeNet} Ar</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% ce mois
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trésorerie</p>
                <p className="text-2xl font-bold text-farm-green">{resumeFinancier.tresorerie} Ar</p>
                <p className="text-xs text-gray-600">Disponible</p>
              </div>
              <Calculator className="w-8 h-8 text-farm-green" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Créances clients</p>
                <p className="text-2xl font-bold text-orange-600">{resumeFinancier.creances} Ar</p>
                <p className="text-xs text-gray-600">À encaisser</p>
              </div>
              <FileText className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dettes fournisseurs</p>
                <p className="text-2xl font-bold text-red-600">{resumeFinancier.dettes} Ar</p>
                <p className="text-xs text-gray-600">À payer</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Charges totales</p>
                <p className="text-2xl font-bold text-gray-700">{resumeFinancier.chargesTotal} Ar</p>
                <p className="text-xs text-gray-600">Ce mois</p>
              </div>
              <BarChart3 className="w-8 h-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventes par catégorie */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-green-dark">
              <PieChart className="w-5 h-5 mr-2 text-farm-green" />
              Répartition des Ventes par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ventesParCategorie.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-farm-cream/20 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-farm-green-dark">{item.categorie}</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-farm-green h-2 rounded-full" 
                        style={{ width: `${item.pourcentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-farm-green">{item.montant} Ar</p>
                    <p className="text-sm text-gray-600">{item.pourcentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Factures en attente */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="flex items-center text-farm-green-dark">
              <FileText className="w-5 h-5 mr-2 text-farm-green" />
              Factures en Attente de Paiement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {facturesEnAttente.map((facture, index) => (
                <div key={index} className="p-3 border border-farm-cream rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-farm-green-dark">{facture.numero}</h4>
                      <p className="text-sm text-gray-600">{facture.client}</p>
                    </div>
                    {getStatutBadge(facture.statut)}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-farm-green">{facture.montant} Ar</span>
                    <span className="text-sm text-gray-500">Échéance: {facture.echeance}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
              Voir toutes les factures
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-farm-green-dark">Actions Comptables Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
              <FileText className="w-6 h-6 mb-2" />
              Nouvelle facture
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
              <Calculator className="w-6 h-6 mb-2" />
              Saisie d'écriture
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-farm-green text-farm-green hover:bg-farm-green hover:text-white">
              <BarChart3 className="w-6 h-6 mb-2" />
              Bilan mensuel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Accounting;
