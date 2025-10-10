import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function KitDigital() {
  return (
    <div className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Kit Digital</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solução completa para negócios que querem crescer com tecnologia prática.
          </p>
        </div>

        <Card className="p-12 bg-card mb-12">
          <h2 className="text-2xl font-bold mb-6">O que está incluído</h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <span>Automações personalizadas para o seu negócio</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <span>Funis de conversão optimizados</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <span>Integração com ferramentas existentes</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <span>Suporte contínuo e iterações baseadas em resultados</span>
            </li>
          </ul>

          <div className="text-center">
            <Button size="lg" asChild>
              <a href="https://calendly.com/rafaelcbugia" target="_blank" rel="noopener noreferrer">
                Marcar chamada
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
