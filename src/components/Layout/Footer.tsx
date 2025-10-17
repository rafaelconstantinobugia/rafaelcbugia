import { Mail, Twitter, Linkedin, Instagram, Youtube, Cookie } from "lucide-react";
import { reopenCookieBanner } from "@/components/CookieBanner";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/translations";
import { getLocalizedPath } from "@/lib/i18n";

export const Footer = () => {
  const { locale } = useLocale();
  
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Legal Links Section */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
              <a 
                href={getLocalizedPath('/politica-privacidade', locale)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {t('footer.privacy', locale)}
              </a>
              <a 
                href="/gerir-dados"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Gerir Dados
              </a>
            <a 
              href={getLocalizedPath('/termos-condicoes', locale)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.terms', locale)}
            </a>
            <a 
              href={getLocalizedPath('/politica-cookies', locale)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.cookies', locale)}
            </a>
            <a 
              href={getLocalizedPath('/aviso-legal', locale)}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.legal', locale)}
            </a>
            <button
              onClick={reopenCookieBanner}
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-left"
            >
              <Cookie className="h-3 w-3" />
              {t('footer.manage_cookies', locale)}
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <a href="/bio" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.bio', locale)}
            </a>
            <a href={getLocalizedPath('/projects', locale)} className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.projects', locale)}
            </a>
            <a href="/media" className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.media', locale)}
            </a>
            <a href="/livro" className="text-muted-foreground hover:text-primary transition-colors">
              Livro
            </a>
            <a href={getLocalizedPath('/contact', locale)} className="text-muted-foreground hover:text-primary transition-colors">
              {t('footer.contact', locale)}
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a 
              href={`mailto:${t('footer.email', locale)}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.email', locale)}
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
          <div>{t('footer.handle', locale)}</div>
          <div className="text-muted-foreground/60">
            {t('footer.domainNote', locale)}
          </div>
        </div>
      </div>
    </footer>
  );
};
