import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookPrereservationModal } from "./BookPrereservationModal";
import bookCover from "@/assets/livro-ia-capa.png";

export function BookBanner() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 text-center md:text-left order-2 md:order-1">
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                <span className="text-sm font-semibold text-primary">📘 NOVO LIVRO</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                IA PARA A MINHA AVÓ
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                Como usar ferramentas inteligentes no dia-a-dia sem perder a cabeça.
              </p>
              
              <p className="text-base text-muted-foreground max-w-xl">
                Um guia humano e prático sobre IA — pensado para quem quer clareza, segurança e resultados reais.
              </p>
              
              <p className="text-sm text-muted-foreground italic">
                Por Rafael C. Bugia
              </p>
              
              <Button 
                size="lg"
                onClick={() => setModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all glow-orange"
              >
                Reservar exemplar
              </Button>
            </div>

            {/* Right: Book Cover */}
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg blur-3xl group-hover:blur-2xl transition-all" />
                <div className="relative p-4 rounded-lg">
                  <img 
                    src={bookCover} 
                    alt="IA para a Minha Avó - Capa do Livro"
                    className="aspect-[2/3] w-64 md:w-72 lg:w-80 rounded-lg shadow-2xl hover:shadow-primary/20 transition-all object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BookPrereservationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
