import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie_consent");
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const saveConsent = async (newConsent: CookieConsent) => {
    localStorage.setItem("cookie_consent", JSON.stringify(newConsent));
    
    const sessionId = crypto.randomUUID();
    
    try {
      await supabase.from("cookie_consents").insert({
        session_id: sessionId,
        analytics_consent: newConsent.analytics,
        marketing_consent: newConsent.marketing,
        preferences_consent: true,
      });
    } catch (error) {
      console.error("Error saving cookie consent:", error);
    }
    
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    const allConsent = { essential: true, analytics: true, marketing: true };
    setConsent(allConsent);
    saveConsent(allConsent);
  };

  const rejectAll = () => {
    const minimalConsent = { essential: true, analytics: false, marketing: false };
    setConsent(minimalConsent);
    saveConsent(minimalConsent);
  };

  const savePreferences = () => {
    saveConsent(consent);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-2xl p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">Este website utiliza cookies</h2>
            <p className="text-sm text-muted-foreground mt-2">
              Utilizamos cookies para melhorar a sua experiência, personalizar conteúdos e analisar o tráfego do website. 
              Pode gerir as suas preferências abaixo.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={rejectAll}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {showPreferences && (
          <div className="space-y-4 border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="essential">Cookies Essenciais</Label>
                <p className="text-xs text-muted-foreground">
                  Necessários para o funcionamento básico do website
                </p>
              </div>
              <Switch
                id="essential"
                checked={consent.essential}
                disabled
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="analytics">Cookies Analíticos</Label>
                <p className="text-xs text-muted-foreground">
                  Ajudam-nos a entender como os visitantes interagem com o website
                </p>
              </div>
              <Switch
                id="analytics"
                checked={consent.analytics}
                onCheckedChange={(checked) =>
                  setConsent({ ...consent, analytics: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="marketing">Cookies de Marketing</Label>
                <p className="text-xs text-muted-foreground">
                  Utilizados para mostrar anúncios relevantes
                </p>
              </div>
              <Switch
                id="marketing"
                checked={consent.marketing}
                onCheckedChange={(checked) =>
                  setConsent({ ...consent, marketing: checked })
                }
              />
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border">
          {!showPreferences ? (
            <>
              <Button onClick={acceptAll} className="flex-1">
                Aceitar todos
              </Button>
              <Button onClick={rejectAll} variant="outline" className="flex-1">
                Rejeitar todos
              </Button>
              <Button
                onClick={() => setShowPreferences(true)}
                variant="outline"
                className="flex-1"
              >
                Personalizar
              </Button>
            </>
          ) : (
            <>
              <Button onClick={savePreferences} className="flex-1">
                Guardar preferências
              </Button>
              <Button
                onClick={() => setShowPreferences(false)}
                variant="outline"
                className="flex-1"
              >
                Voltar
              </Button>
            </>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Para mais informações, consulte a nossa{" "}
          <a href="/politica-cookies" className="text-primary hover:underline">
            Política de Cookies
          </a>{" "}
          e{" "}
          <a href="/politica-privacidade" className="text-primary hover:underline">
            Política de Privacidade
          </a>
        </p>
      </Card>
    </div>
  );
};

export const reopenCookieBanner = () => {
  localStorage.removeItem("cookie_consent");
  window.location.reload();
};
