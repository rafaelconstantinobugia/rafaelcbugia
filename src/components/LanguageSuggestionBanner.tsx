import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { LOCALE_FULL_NAMES } from "@/lib/i18n";

export function LanguageSuggestionBanner() {
  const { showLangSuggestion, suggestedLang, dismissLangSuggestion, acceptLangSuggestion } = useLocale();

  if (!showLangSuggestion || !suggestedLang) return null;

  const suggestions = {
    'en': 'Prefer to view this page in English?',
    'es': '¿Prefieres ver esta página en español?',
    'pt-PT': 'Prefere ver esta página em português?',
  };

  const acceptButtons = {
    'en': 'View in English',
    'es': 'Ver en español',
    'pt-PT': 'Ver em português',
  };

  const dismissButtons = {
    'en': 'Keep Portuguese',
    'es': 'Mantener portugués',
    'pt-PT': 'Manter português',
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-in-right">
      <div className="bg-card border border-border rounded-lg shadow-elegant p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <p className="text-sm font-medium mb-3">
              {suggestions[suggestedLang]}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={acceptLangSuggestion}
                className="flex-1"
              >
                {acceptButtons[suggestedLang]}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={dismissLangSuggestion}
                className="flex-1"
              >
                {dismissButtons[suggestedLang]}
              </Button>
            </div>
          </div>
          <button
            onClick={dismissLangSuggestion}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
