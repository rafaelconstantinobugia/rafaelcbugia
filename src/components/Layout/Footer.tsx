import { Mail, Twitter, Linkedin, Instagram, Youtube, Cookie } from "lucide-react";
import { reopenCookieBanner } from "@/components/CookieBanner";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Legal Links Section */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <a 
              href="/politica-privacidade" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Política de Privacidade
            </a>
            <a 
              href="/termos-condicoes" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Termos e Condições
            </a>
            <a 
              href="/politica-cookies" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Política de Cookies
            </a>
            <a 
              href="/aviso-legal" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Aviso Legal
            </a>
            <button
              onClick={reopenCookieBanner}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-left"
            >
              <Cookie className="h-3 w-3" />
              Gerir Cookies
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rafael Constantino Bugia. Todos os direitos reservados.
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a 
              href="mailto:contacto@rafaelcbugia.com" 
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              contacto@rafaelcbugia.com
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/rafaelcbugia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/rafaelcbugia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a 
              href="https://x.com/rafaelcbugia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="https://www.youtube.com/@rafaelcbugia" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Handle & Domain Note */}
        <div className="mt-6 text-center text-xs text-muted-foreground space-y-1">
          <div>@rafaelcbugia</div>
          <div className="text-muted-foreground/60">
            Este site substitui rafaelconstantinobugia.pt
          </div>
        </div>
      </div>
    </footer>
  );
};
