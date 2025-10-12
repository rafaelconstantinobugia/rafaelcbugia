import { useEffect } from "react";
import { SEO } from "@/components/SEO";

export default function KitDigital() {
  useEffect(() => {
    window.location.href = "https://kitdigital.lovable.app/";
  }, []);

  return (
    <>
      <SEO
        title="Kit Digital — Método SPRINT"
        description="Método SPRINT: do zero ao sistema digital funcional em 7 dias. Funis, Notion, automações e agente digital para o seu negócio."
        canonical="https://rafaelcbugia.com/kitdigital"
        ogImage="https://rafaelcbugia.com/opengraph/kitdigital.png"
      />
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">A redirecionar...</p>
      </div>
    </>
  );
}
