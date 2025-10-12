import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { ExternalLink } from "lucide-react";

export default function Projectos() {
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
        <div className="animate-pulse text-muted-foreground">A carregar...</div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Projectos — Método SPRINT, Silver Coast Sitters, Celinda's"
        description="Descubra os projectos que estou a desenvolver: Método SPRINT, Silver Coast Sitters, Celinda's Eco Retreat, 1VAU e mais."
        canonical="https://rafaelcbugia.com/projectos"
        ogImage="https://rafaelcbugia.com/opengraph/projectos.png"
      />
      <div className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Projectos</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sistemas digitais que resolvem problemas reais. Cada projecto é construído com foco em resultados medíveis.
          </p>
        </div>

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
                  Visitar projecto
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              )}
            </Card>
          ))}
        </div>

        {/* How I Work Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Como trabalho</h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-foreground/90">
                {howIWorkData?.text || "Trabalho com foco em execução prática e resultados medíveis. Cada projeto começa com uma análise clara do problema, seguida de implementação rápida e iteração baseada em dados reais."}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
