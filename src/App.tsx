import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "./components/Layout/Layout";
import { CookieBanner } from "./components/CookieBanner";
import { LocaleProvider } from "./contexts/LocaleContext";
import { LanguageSuggestionBanner } from "./components/LanguageSuggestionBanner";
import { initGA } from "./lib/analytics";
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

const App = () => {
  useEffect(() => {
    // Initialize GA4 if user has given consent
    const consent = localStorage.getItem('cookie-consent');
    if (consent) {
      const consentData = JSON.parse(consent);
      if (consentData.analytics) {
        // Replace with your GA4 Measurement ID
        initGA('G-XXXXXXXXXX');
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <LocaleProvider>
            <Toaster />
            <Sonner />
            <CookieBanner />
            <LanguageSuggestionBanner />
            <Routes>
              {/* Portuguese (default) */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/bio" element={<Layout><Bio /></Layout>} />
              <Route path="/projectos" element={<Layout><Projectos /></Layout>} />
              <Route path="/media" element={<Layout><Media /></Layout>} />
              <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
              <Route path="/kitdigital" element={<Layout><KitDigital /></Layout>} />
              
              {/* English */}
              <Route path="/en" element={<Layout><Home /></Layout>} />
              <Route path="/en/bio" element={<Layout><Bio /></Layout>} />
              <Route path="/en/projects" element={<Layout><Projectos /></Layout>} />
              <Route path="/en/media" element={<Layout><Media /></Layout>} />
              <Route path="/en/contact" element={<Layout><Contacto /></Layout>} />
              <Route path="/en/kitdigital" element={<Layout><KitDigital /></Layout>} />
              
              {/* Spanish */}
              <Route path="/es" element={<Layout><Home /></Layout>} />
              <Route path="/es/bio" element={<Layout><Bio /></Layout>} />
              <Route path="/es/proyectos" element={<Layout><Projectos /></Layout>} />
              <Route path="/es/media" element={<Layout><Media /></Layout>} />
              <Route path="/es/contacto" element={<Layout><Contacto /></Layout>} />
              <Route path="/es/kitdigital" element={<Layout><KitDigital /></Layout>} />
              
              {/* Legal pages (all locales) */}
              <Route path="/politica-privacidade" element={<Layout><PoliticaPrivacidade /></Layout>} />
              <Route path="/en/privacy-policy" element={<Layout><PoliticaPrivacidade /></Layout>} />
              <Route path="/es/politica-privacidad" element={<Layout><PoliticaPrivacidade /></Layout>} />
              
              <Route path="/termos-condicoes" element={<Layout><TermosCondicoes /></Layout>} />
              <Route path="/en/terms-conditions" element={<Layout><TermosCondicoes /></Layout>} />
              <Route path="/es/terminos-condiciones" element={<Layout><TermosCondicoes /></Layout>} />
              
              <Route path="/politica-cookies" element={<Layout><PoliticaCookies /></Layout>} />
              <Route path="/en/cookie-policy" element={<Layout><PoliticaCookies /></Layout>} />
              <Route path="/es/politica-cookies" element={<Layout><PoliticaCookies /></Layout>} />
              
              <Route path="/aviso-legal" element={<Layout><AvisoLegal /></Layout>} />
              <Route path="/en/legal-notice" element={<Layout><AvisoLegal /></Layout>} />
              <Route path="/es/aviso-legal" element={<Layout><AvisoLegal /></Layout>} />
              
              {/* Admin (no locale) */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LocaleProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
