import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { CookieBanner } from "./components/CookieBanner";
import Home from "./pages/Home";
import Bio from "./pages/Bio";
import Projectos from "./pages/Projectos";
import Media from "./pages/Media";
import Contacto from "./pages/Contacto";
import KitDigital from "./pages/KitDigital";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosCondicoes from "./pages/TermosCondicoes";
import PoliticaCookies from "./pages/PoliticaCookies";
import AvisoLegal from "./pages/AvisoLegal";
import AdminLogin from "./pages/Admin/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CookieBanner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/bio" element={<Layout><Bio /></Layout>} />
          <Route path="/projectos" element={<Layout><Projectos /></Layout>} />
          <Route path="/media" element={<Layout><Media /></Layout>} />
          <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
          <Route path="/kitdigital" element={<Layout><KitDigital /></Layout>} />
          <Route path="/politica-privacidade" element={<Layout><PoliticaPrivacidade /></Layout>} />
          <Route path="/termos-condicoes" element={<Layout><TermosCondicoes /></Layout>} />
          <Route path="/politica-cookies" element={<Layout><PoliticaCookies /></Layout>} />
          <Route path="/aviso-legal" element={<Layout><AvisoLegal /></Layout>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
