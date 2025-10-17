import { useState } from "react";
import { SEO } from "@/components/SEO";
import { StructuredData } from "@/components/StructuredData";
import { BookPrereservationModal } from "@/components/BookPrereservationModal";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Instagram, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { Link } from "react-router-dom";

export default function Livro() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCTAClick = (location: "hero" | "footer") => {
    trackEvent("book_preorder_cta_click", { location });
    setModalOpen(true);
  };

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "IA para a Minha Avó",
    "author": { 
      "@type": "Person", 
      "name": "Rafael C. Bugia", 
      "url": "https://rafaelcbugia.com" 
    },
    "isbn": "9798270049614",
    "inLanguage": "pt-PT",
    "bookFormat": "EBook",
    "publisher": { 
      "@type": "Organization", 
      "name": "Independente (Amazon KDP)" 
    },
    "image": "https://rafaelcbugia.com/media/livro-ia-para-a-minha-avo-cover.png",
    "description": "Guia prático e humano sobre como usar ferramentas inteligentes no dia-a-dia sem perder a cabeça.",
    "offers": {
      "@type": "Offer",
      "url": "https://rafaelcbugia.com/livro",
      "availability": "https://schema.org/PreOrder",
      "price": "12.90",
      "priceCurrency": "EUR",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <>
      <SEO
        title="IA para a Minha Avó — Livro de Rafael C. Bugia"
        description="Guia prático e humano sobre como usar IA no dia-a-dia. Pré-reserve o novo livro de Rafael C. Bugia."
        canonical="https://rafaelcbugia.com/livro"
        ogImage="https://rafaelcbugia.com/media/livro-ia-para-a-minha-avo-cover-og.png"
        ogType="book"
        keywords={["IA para a Minha Avó", "Rafael C. Bugia", "inteligência artificial", "livro IA", "guia prático IA", "IA português"]}
      />
      <StructuredData data={bookSchema} />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="max-w-[1080px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left: Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground">
                IA para a Minha Avó — o novo livro de Rafael C. Bugia
              </h1>
              <p className="text-xl md:text-2xl font-medium text-muted-foreground">
                Como usar ferramentas inteligentes no dia-a-dia sem perder a cabeça.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Guia humano e prático: mensagens, e-mails, consultas, papéis e viagens. Primeiro segurança, depois prática.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => handleCTAClick("hero")}
                    aria-label="Reservar exemplar do livro IA para a Minha Avó"
                    className="text-base"
                  >
                    Reservar exemplar
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-border hover:bg-accent"
                  >
                    <Link to="/media">
                      Ver Press Kit
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <ShareButton
                  url="/livro"
                  title="IA para a Minha Avó — Rafael C. Bugia"
                  description="Livro prático e humano sobre como usar IA no dia-a-dia"
                  size="default"
                  variant="secondary"
                />
              </div>
            </div>

            {/* Right: Book Cover */}
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden glow-orange shadow-2xl">
                <img
                  src="/media/livro-ia-para-a-minha-avo-cover.png"
                  alt="Capa do livro IA para a Minha Avó"
                  className="w-full h-full object-cover"
                  loading="eager"
                  width="600"
                  height="800"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What's Inside Section */}
        <section className="bg-ui py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto px-6 md:px-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12 text-center">
              O que vai encontrar neste livro
            </h2>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {[
                "Casos práticos explicados passo a passo",
                "Exercícios simples e checklists",
                "40 prompts prontos (CPR)",
                "Regras claras de segurança e privacidade",
                "Linguagem em português simples (Portugal)",
                "Dicas realistas para o dia-a-dia"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-lg text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="max-w-[1080px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Card className="border-primary/20 glow-orange">
            <CardContent className="p-8 md:p-12">
              <blockquote className="text-2xl md:text-3xl font-medium text-foreground text-center leading-relaxed mb-4">
                "A IA não substitui a nossa cabeça; ajuda-a a trabalhar menos nas tarefas repetitivas."
              </blockquote>
              <p className="text-sm text-muted-foreground text-center">do Capítulo 1</p>
            </CardContent>
          </Card>
        </section>

        {/* About Author Section */}
        <section className="bg-ui py-16 md:py-24">
          <div className="max-w-[1080px] mx-auto px-6 md:px-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 text-center">
              Sobre o autor
            </h2>
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rafael C. Bugia trabalha na intersecção entre operações e tecnologia. Defende sistemas simples, automação útil e bom senso digital. Vive na Costa de Prata.
              </p>
              <div className="flex justify-center gap-6 pt-4">
                <a
                  href="https://instagram.com/rafaelcbugia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram de Rafael C. Bugia"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/rafaelcbugia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn de Rafael C. Bugia"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://x.com/rafaelcbugia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="X (Twitter) de Rafael C. Bugia"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-[1080px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12 text-center">
            Perguntas frequentes
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Para quem é este livro?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Para quem quer usar IA com clareza e segurança, sem jargão — especialmente leitores 45–70.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Preciso de saber tecnologia?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Não. O livro evita botões; ensina processos e linguagem simples.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-semibold">
                É sobre ferramentas específicas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Foca-se em princípios e exemplos práticos. Quando cita ferramentas, dá alternativas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Posso comprar versão digital e impressa?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Sim — a pré-reserva dá prioridade e extras digitais.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-lg font-semibold">
                Quando é o lançamento?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Previsão: Novembro de 2025. Os pré-registos recebem aviso por e-mail.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Final CTA Section */}
        <section className="max-w-[1080px] mx-auto px-6 md:px-10 py-16 md:py-24">
          <Card className="border-primary/20 glow-orange bg-ui">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Pré-reserve o seu exemplar
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Acesso antecipado, desconto de lançamento e extras digitais.
              </p>
              <Button
                size="lg"
                onClick={() => handleCTAClick("footer")}
                aria-label="Quero reservar o livro IA para a Minha Avó"
                className="text-base"
              >
                Quero reservar
              </Button>
              <p className="text-sm text-muted-foreground">
                Privacidade garantida — sem spam, só novidades relevantes.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <BookPrereservationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
