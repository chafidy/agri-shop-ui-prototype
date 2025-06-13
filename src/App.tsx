
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
import Sales from "./pages/Sales";
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
          <Route path="/sales" element={
            <AppLayout>
              <Sales />
            </AppLayout>
          } />
          <Route path="/inventory" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Gestion des Stocks</h1>
                <p className="text-gray-600 mt-2">Page en cours de développement...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/suppliers" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Fournisseurs</h1>
                <p className="text-gray-600 mt-2">Page en cours de développement...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/reports" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Rapports</h1>
                <p className="text-gray-600 mt-2">Page en cours de développement...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/users" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
                <p className="text-gray-600 mt-2">Page en cours de développement...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Paramètres</h1>
                <p className="text-gray-600 mt-2">Page en cours de développement...</p>
              </div>
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
