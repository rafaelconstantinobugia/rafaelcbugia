import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { analytics } from "@/lib/analytics";
import { ExternalLink, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/translations";

export default function Media() {
  const { locale } = useLocale();
  const { data: articles, isLoading } = useQuery({
    queryKey: ["media-articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_articles")
        .select("*")
        .order("published_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: pressKitData } = useQuery({
    queryKey: ["press-kit"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "press_kit")
        .single();
      
      if (error) throw error;
      return data.value as {
        bio_pt: string;
        bio_en: string;
        bio_es: string;
        download_url: string;
      };
    },
  });

  const pressKitBio = pressKitData 
    ? (locale === 'en' ? pressKitData.bio_en : locale === 'es' ? pressKitData.bio_es : pressKitData.bio_pt)
    : "";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t('loading', locale)}</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={t('media.title', locale)}
        description={t('media.description', locale)}
        ogImage="https://rafaelcbugia.com/opengraph/media.png"
      />
      <div className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('media.heading', locale)}</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('media.intro', locale)}
          </p>
        </div>

        {/* Articles Grid */}
        {articles && articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {articles.map((article) => (
              <Card key={article.id} className="p-6 hover-lift hover:border-primary/50 transition-all flex flex-col">
                {article.thumbnail_url && (
                  <div className="mb-6 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={article.thumbnail_url} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                <div className="text-xs text-primary font-medium mb-2">
                  {article.source} • {format(new Date(article.published_date), "d 'de' MMMM, yyyy", { locale: pt })}
                </div>
                
                <h3 className="text-lg font-bold mb-3">{article.title}</h3>
                
                {article.excerpt && (
                  <p className="text-sm text-muted-foreground mb-6 flex-1">
                    {article.excerpt}
                  </p>
                )}
                
                <a 
                  href={article.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t('media.read_article', locale)}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-24">
            <p className="text-muted-foreground">{t('media.no_articles', locale)}</p>
          </div>
        )}

        {/* Press Kit Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-card">
            <h2 className="text-3xl font-bold mb-4 text-center">{t('media.press_kit_title', locale)}</h2>
            <p className="text-center text-muted-foreground mb-8">{t('media.press_kit_subtitle', locale)}</p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">{t('media.press_kit_bio_label', locale)}</h3>
                <p className="text-foreground/90 leading-relaxed">
                  {pressKitBio || t('media.description', locale)}
                </p>
              </div>

              <Button 
                asChild 
                size="lg" 
                className="w-full"
                onClick={() => analytics.pressKitDownload()}
              >
                <a 
                  href={pressKitData?.download_url || "https://rafaelcbugia.com/press-kit.pdf"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('media.press_kit_download', locale)}
                </a>
              </Button>

              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-semibold mb-3">{t('media.press_kit_contact_title', locale)}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('media.press_kit_contact_desc', locale)}
                </p>
                <Button asChild variant="outline">
                  <Link to={locale === 'en' ? '/en/contact' : locale === 'es' ? '/es/contacto' : '/contacto'}>
                    <Mail className="mr-2 h-4 w-4" />
                    {t('media.press_kit_contact_button', locale)}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
