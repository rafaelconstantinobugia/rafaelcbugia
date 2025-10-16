import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, Zap, Building, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/translations";
import ReactMarkdown from "react-markdown";
import { getLocalizedPath } from "@/lib/i18n";

const iconMap: Record<string, any> = {
  Zap,
  Building,
  Rocket,
};

export default function Bio() {
  const { locale } = useLocale();
  const { data: bioData, isLoading } = useQuery({
    queryKey: ["bio-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bio_content")
        .select("*")
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t('bio.loading', locale)}</div>
      </div>
    );
  }

  const timeline = bioData?.timeline as Array<{
    year: string;
    title: string;
    description: string;
    icon: string;
  }> || [];

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://rafaelcbugia.com/#person",
      "name": "Rafael Constantino Bugia",
      "jobTitle": "Empreendedor e Estratega Digital",
      "description": bioData?.intro_text || t('bio.description', locale),
      "image": bioData?.bio_image_url || "https://rafaelcbugia.com/opengraph/bio.png",
      "url": "https://rafaelcbugia.com"
    }
  };

  return (
    <>
      <SEO
        title={t('bio.seo_title', locale)}
        description={t('bio.description', locale)}
        canonical="https://rafaelcbugia.com/bio"
        ogImage="https://rafaelcbugia.com/opengraph/bio.png"
        ogType="profile"
        keywords={['rafael bugia', 'biografia', 'empreendedor', 'costa de prata', 'óbidos']}
      />
      <StructuredData data={profilePageSchema} />
      <main role="main" className="py-24 px-6 lg:px-8">
      <article className="mx-auto max-w-4xl" itemScope itemType="https://schema.org/Person">
        <Breadcrumbs items={[{ label: t('nav.bio', locale) }]} />
        
        {/* Header */}
        <header className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" itemProp="name">{t('bio.heading', locale)}</h1>
          <meta itemProp="jobTitle" content="Empreendedor e Estratega Digital" />
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
        </header>

        {/* Intro Text */}
        <div className="prose prose-lg prose-invert max-w-none mb-20" itemProp="description">
          <ReactMarkdown>{bioData?.intro_text || ""}</ReactMarkdown>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('bio.timeline_title', locale)}</h2>
          
          <div className="space-y-8">
            {timeline.map((item, index) => {
              const Icon = iconMap[item.icon] || Zap;
              
              return (
                <Card key={index} className="p-8 hover-lift">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-sm font-bold text-primary mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bio Image Placeholder */}
        {bioData?.bio_image_url && (
          <div className="mb-20 rounded-2xl overflow-hidden">
            <img 
              src={bioData.bio_image_url} 
              alt="Rafael Constantino Bugia" 
              className="w-full h-auto object-cover"
              itemProp="image"
            />
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-6">{t('bio.cta_title', locale)}</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('bio.cta_description', locale)}
          </p>
          <Button asChild size="lg">
            <Link to={getLocalizedPath('/projectos', locale)}>
              {t('bio.cta_button', locale)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </article>
    </main>
    </>
  );
}
