
import { 
  Home, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings,
  FileText,
  Archive,
  UserPlus
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
    title: "Produits",
    url: "/products",
    icon: Package,
  },
  {
    title: "Stocks",
    url: "/inventory",
    icon: Archive,
  },
  {
    title: "Fournisseurs",
    url: "/suppliers",
    icon: Users,
  },
  {
    title: "Rapports",
    url: "/reports",
    icon: FileText,
  },
  {
    title: "Utilisateurs",
    url: "/users",
    icon: UserPlus,
  },
  {
    title: "Paramètres",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-farm-beige-dark">
      <SidebarHeader className="p-6 border-b border-farm-beige-dark">
        <div className="flex items-center space-x-3">
          <div className="bg-farm-green rounded-lg w-10 h-10 flex items-center justify-center">
            <span className="text-xl text-white">🚜</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">FarmShop</h2>
            <p className="text-sm text-gray-500">Gestion d'élevage</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-farm-green font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`transition-all duration-200 hover:bg-farm-green/10 ${
                        isActive ? 'bg-farm-green text-white hover:bg-farm-green' : ''
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
