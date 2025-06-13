
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, Package, Users, FileText } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: "Chiffre d'affaires du jour",
      value: "125,400 Ar",
      change: "+12.5%",
      icon: ShoppingCart,
      color: "text-farm-green",
      bgColor: "bg-farm-green/10"
    },
    {
      title: "Nombre de ventes",
      value: "28",
      change: "+8.2%",
      icon: FileText,
      color: "text-farm-yellow",
      bgColor: "bg-farm-yellow/10"
    },
    {
      title: "Produits en stock",
      value: "1,245",
      change: "-2.1%",
      icon: Package,
      color: "text-farm-green-dark",
      bgColor: "bg-farm-green-dark/10"
    },
    {
      title: "Clients actifs",
      value: "89",
      change: "+15.3%",
      icon: Users,
      color: "text-farm-yellow",
      bgColor: "bg-farm-yellow/10"
    }
  ];

  const lowStockProducts = [
    { name: "Aliment pour porcs", stock: 5, minimum: 20 },
    { name: "Vaccin aviaire", stock: 2, minimum: 10 },
    { name: "Désinfectant", stock: 8, minimum: 15 },
    { name: "Supplément vitaminé", stock: 3, minimum: 12 }
  ];

  const salesByCategory = [
    { category: "Aliments", amount: 45000, percentage: 35 },
    { category: "Vétérinaire", amount: 32000, percentage: 25 },
    { category: "Matériel", amount: 28000, percentage: 22 },
    { category: "Volailles", amount: 23000, percentage: 18 }
  ];

  return (
    <div className="p-6 space-y-6 bg-farm-cream/30 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-dark">Tableau de Bord</h1>
          <p className="text-gray-600 mt-1">Aperçu de votre activité aujourd'hui</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Dernière mise à jour</p>
          <p className="font-semibold">{new Date().toLocaleString('fr-FR')}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-scale shadow-sm border-0 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} vs hier
                  </p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-farm-green-dark flex items-center">
              <Package className="w-5 h-5 mr-2 text-red-500" />
              Produits en rupture de stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">Stock actuel: {product.stock}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-red-600 font-medium">
                      {((product.stock / product.minimum) * 100).toFixed(0)}%
                    </p>
                    <Progress 
                      value={(product.stock / product.minimum) * 100} 
                      className="w-20 mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-farm-green-dark flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-farm-green" />
              Ventes par catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesByCategory.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{item.category}</span>
                    <span className="text-sm font-semibold">{item.amount.toLocaleString()} Ar</span>
                  </div>
                  <Progress 
                    value={item.percentage} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500">{item.percentage}% des ventes totales</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-sm border-0 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-farm-green-dark">Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: "Vente", details: "Aliment pour vaches - 50kg", time: "Il y a 5 min", amount: "+8,500 Ar" },
              { action: "Achat", details: "Commande fournisseur Agrobio", time: "Il y a 1h", amount: "-45,000 Ar" },
              { action: "Stock", details: "Inventaire des vaccins", time: "Il y a 2h", amount: "" },
              { action: "Vente", details: "Matériel d'abreuvement", time: "Il y a 3h", amount: "+12,000 Ar" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-farm-cream/50 rounded-lg hover:bg-farm-yellow/10 transition-colors">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                {activity.amount && (
                  <span className={`font-semibold ${activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {activity.amount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
