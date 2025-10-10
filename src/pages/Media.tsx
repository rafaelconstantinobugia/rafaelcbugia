import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default function Media() {
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Media</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Artigos, entrevistas e menções na imprensa.
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
                  Ler artigo
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 mb-24">
            <p className="text-muted-foreground">Nenhum artigo disponível no momento.</p>
          </div>
        )}

        {/* Press Kit Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-card">
            <h2 className="text-3xl font-bold mb-8 text-center">Press Kit</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-bold mb-2">Bio oficial</h3>
                <p className="text-muted-foreground">
                  Rafael Constantino Bugia é empreendedor e estratega digital na Costa de Prata, Portugal. 
                  Especializado em criar sistemas digitais práticos para negócios pequenos mas ambiciosos, 
                  trabalha na intersecção entre hospitalidade, operações e tecnologia.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold mb-2">Contacto para imprensa</h3>
                <p className="text-muted-foreground">
                  Para entrevistas, citações ou informações adicionais, contactar através de{" "}
                  <a href="mailto:contacto@rafaelcbugia.com" className="text-primary hover:underline">
                    contacto@rafaelcbugia.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Bio + Foto
              </Button>
              <Button asChild size="lg">
                <Link to="/contacto">
                  Contactar para imprensa
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
