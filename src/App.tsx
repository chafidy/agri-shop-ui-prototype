
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Clients from "./pages/Clients";
import Sales from "./pages/Sales";
import Purchases from "./pages/Purchases";
import Inventory from "./pages/Inventory";
import Suppliers from "./pages/Suppliers";
import Reports from "./pages/Reports";
import UsersPage from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <main className="flex-1">
        <div className="p-4 border-b border-gray-200 bg-white shadow-sm">
          <SidebarTrigger className="hover-scale" />
        </div>
        {children}
      </main>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/products" element={
            <AppLayout>
              <Products />
            </AppLayout>
          } />
          <Route path="/categories" element={
            <AppLayout>
              <Categories />
            </AppLayout>
          } />
          <Route path="/clients" element={
            <AppLayout>
              <Clients />
            </AppLayout>
          } />
          <Route path="/sales" element={
            <AppLayout>
              <Sales />
            </AppLayout>
          } />
          <Route path="/purchases" element={
            <AppLayout>
              <Purchases />
            </AppLayout>
          } />
          <Route path="/inventory" element={
            <AppLayout>
              <Inventory />
            </AppLayout>
          } />
          <Route path="/suppliers" element={
            <AppLayout>
              <Suppliers />
            </AppLayout>
          } />
          <Route path="/reports" element={
            <AppLayout>
              <Reports />
            </AppLayout>
          } />
          <Route path="/users" element={
            <AppLayout>
              <UsersPage />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <Settings />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
