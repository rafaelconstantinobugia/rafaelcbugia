import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { analytics } from "@/lib/analytics";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/translations";
import { getLocalizedPath } from "@/lib/i18n";

export function NewsletterForm() {
  const { locale } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gdprConsent) {
      toast.error(t('newsletter.errorConsent', locale));
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('newsletter_subscriptions')
        .insert({
          email: email.trim().toLowerCase(),
          consent_timestamp: new Date().toISOString(),
          ip_address: null, // Could be collected via edge function
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast.error(t('newsletter.errorDuplicate', locale));
        } else {
          throw error;
        }
      } else {
        toast.success(t('newsletter.success', locale));
        analytics.newsletterSubmitted(email);
        setName("");
        setEmail("");
        setGdprConsent(false);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(t('newsletter.errorGeneral', locale));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder={t('newsletter.namePlaceholder', locale)}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="email"
          placeholder={t('newsletter.emailPlaceholder', locale)}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      
      <div className="flex items-start gap-3 text-sm text-left">
        <Checkbox
          id="newsletter-gdpr"
          checked={gdprConsent}
          onCheckedChange={(checked) => setGdprConsent(checked as boolean)}
          required
        />
        <label htmlFor="newsletter-gdpr" className="text-muted-foreground leading-tight cursor-pointer">
          {t('newsletter.gdprConsent', locale)}{" "}
          <Link to={getLocalizedPath('/politica-privacidade', locale)} className="text-primary hover:underline">
            {t('newsletter.gdprLink', locale)}
          </Link>{" "}
          {t('newsletter.gdprText', locale)}
        </label>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? t('newsletter.submitting', locale) : t('newsletter.submit', locale)}
      </Button>
    </form>
  );
}
