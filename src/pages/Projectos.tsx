import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/translations";

export default function Projectos() {
  const { locale } = useLocale();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projectos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projectos")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: howIWorkData } = useQuery({
    queryKey: ["how-i-work"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "how_i_work")
        .single();
      
      if (error) throw error;
      return data.value as { text: string };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">{t('projects.loading', locale)}</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={t('projects.seo_title', locale)}
        description={t('projects.description', locale)}
        canonical="https://rafaelcbugia.com/projectos"
        ogImage="https://rafaelcbugia.com/opengraph/projectos.png"
        keywords={['rafael bugia', 'projetos', 'silver coast sitters', 'método sprint', 'celindasecoretreat']}
      />
      <main role="main" className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={[{ label: t('nav.projects', locale) }]} />
        
        {/* Header */}
        <header className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{t('projects.title', locale)}</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.intro', locale)}
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {projects?.map((project) => (
            <Card key={project.id} className="p-6 hover-lift hover:border-primary/50 transition-all flex flex-col">
              {project.image_url && (
                <div className="mb-6 rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              
              {project.subtitle && (
                <p className="text-sm text-primary mb-4">{project.subtitle}</p>
              )}
              
              <p className="text-muted-foreground mb-6 flex-1">
                {project.description}
              </p>
              
              {project.external_url && (
                <a 
                  href={project.external_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t('projects.visit', locale)}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              )}
            </Card>
          ))}
        </div>

        {/* How I Work Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-card">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('projects.how_i_work_title', locale)}</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-foreground/90">
                {howIWorkData?.text || t('projects.how_i_work_default', locale)}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </main>
    </>
  );
}
