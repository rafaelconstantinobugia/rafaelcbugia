import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { analytics } from '@/lib/analytics';
import { 
  Locale, 
  DEFAULT_LOCALE, 
  getLocaleFromPath, 
  getStoredLanguage, 
  setStoredLanguage,
  detectBrowserLanguage,
  getTranslatedSlug,
  getPathWithoutLocale
} from '@/lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  showLangSuggestion: boolean;
  suggestedLang: Locale | null;
  dismissLangSuggestion: () => void;
  acceptLangSuggestion: () => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [showLangSuggestion, setShowLangSuggestion] = useState(false);
  const [suggestedLang, setSuggestedLang] = useState<Locale | null>(null);

  // Initialize locale from URL or storage
  useEffect(() => {
    const pathLocale = getLocaleFromPath(location.pathname);
    setLocaleState(pathLocale);
  }, [location.pathname]);

  // Check for language suggestion on first visit
  useEffect(() => {
    const stored = getStoredLanguage();
    if (stored) return; // User already chose a language

    const browserLang = detectBrowserLanguage();
    const currentLocale = getLocaleFromPath(location.pathname);
    
    // Only suggest if browser language differs from current locale
    if (browserLang && browserLang !== currentLocale && location.pathname === '/') {
      setSuggestedLang(browserLang);
      setShowLangSuggestion(true);
    }
  }, [location.pathname]);

  const setLocale = (newLocale: Locale) => {
    const currentLocale = locale;
    setStoredLanguage(newLocale);
    
    // Track language change
    analytics.languageChanged(currentLocale, newLocale);
    
    // Get base path without locale
    const basePath = getPathWithoutLocale(location.pathname);
    
    // Get translated path
    const newPath = getTranslatedSlug(basePath, newLocale);
    
    // Navigate to new path
    navigate(newPath);
  };

  const dismissLangSuggestion = () => {
    setShowLangSuggestion(false);
    setStoredLanguage(DEFAULT_LOCALE);
  };

  const acceptLangSuggestion = () => {
    if (suggestedLang) {
      setLocale(suggestedLang);
    }
    setShowLangSuggestion(false);
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
        showLangSuggestion,
        suggestedLang,
        dismissLangSuggestion,
        acceptLangSuggestion,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
