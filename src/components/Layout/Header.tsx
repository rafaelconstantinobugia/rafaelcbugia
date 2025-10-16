import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/translations";
import { getLocalizedPath } from "@/lib/i18n";

export const Header = () => {
  const location = useLocation();
  const { locale } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { nameKey: "nav.home", path: "/" },
    { nameKey: "nav.bio", path: "/bio" },
    { nameKey: "nav.projects", path: "/projectos" },
    { nameKey: "nav.media", path: "/media" },
    { nameKey: "nav.contact", path: "/contacto" },
    { nameKey: "nav.kitdigital", path: "/kitdigital" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={getLocalizedPath('/', locale)} className="text-lg font-bold tracking-tight hover:text-primary transition-colors">
            Rafael C. Bugia
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => {
              const localizedPath = getLocalizedPath(item.path, locale);
              return (
                <Link
                  key={item.path}
                  to={localizedPath}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === localizedPath ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {t(item.nameKey, locale)}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => {
                const localizedPath = getLocalizedPath(item.path, locale);
                return (
                  <Link
                    key={item.path}
                    to={localizedPath}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-primary ${
                      location.pathname === localizedPath ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {t(item.nameKey, locale)}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
