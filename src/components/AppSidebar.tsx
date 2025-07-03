
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings,
  FileText,
  Archive,
  UserPlus,
  ShoppingBag,
  FolderOpen,
  UserCheck,
  Truck,
  Calculator,
  BarChart3,
  Store,
  ClipboardList
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Ventes",
    url: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Commandes",
    url: "/orders",
    icon: ClipboardList,
  },
  {
    title: "Achats & Approvisionnement",
    url: "/purchases",
    icon: ShoppingBag,
  },
  {
    title: "Produits d'élevage",
    url: "/products",
    icon: Package,
  },
  {
    title: "Catégories produits",
    url: "/categories",
    icon: FolderOpen,
  },
  {
    title: "Gestion des stocks",
    url: "/inventory",
    icon: Archive,
  },
  {
    title: "Éleveurs & Clients",
    url: "/clients",
    icon: UserCheck,
  },
  {
    title: "Fournisseurs",
    url: "/suppliers",
    icon: Truck,
  },
  {
    title: "Rapports & Analyses",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Comptabilité",
    url: "/accounting",
    icon: Calculator,
  },
  {
    title: "Équipe & Personnel",
    url: "/users",
    icon: UserPlus,
  },
  {
    title: "Configuration",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-farm-cream/50">
      <SidebarHeader className="h-[73px] p-6 border-b border-farm-cream/50 bg-farm-cream flex items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-farm-green rounded-lg w-10 h-10 flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-farm-green-dark">FarmShop Pro</h2>
            <p className="text-sm text-gray-600">Produits d'élevage</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-farm-cream/30">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`transition-all duration-200 hover:bg-farm-yellow/20 ${
                        isActive ? 'bg-farm-green text-white hover:bg-farm-green-dark' : 'text-farm-green-dark'
                      }`}
                    >
                      <Link to={item.url} className="flex items-center space-x-3 p-3 rounded-lg">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
