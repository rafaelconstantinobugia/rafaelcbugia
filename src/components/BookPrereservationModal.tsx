import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

interface BookPrereservationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookPrereservationModal({ open, onOpenChange }: BookPrereservationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('book_prereservations')
        .insert({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          source: 'Site Principal',
        });

      if (error) {
        throw error;
      }

      trackEvent('book_prereservation_submitted', { email });
      setSubmitted(true);
      setName("");
      setEmail("");
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onOpenChange(false);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Book pre-reservation error:', error);
      toast.error("Erro ao submeter pré-reserva. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[620px] bg-background border-border">
        {!submitted ? (
          <>
            <DialogHeader>
              <div className="text-2xl mb-2">👋</div>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Está quase a sair o meu primeiro livro
              </DialogTitle>
              <div className="space-y-2 text-left">
                <h3 className="text-xl font-bold text-foreground">IA PARA A MINHA AVÓ</h3>
                <p className="text-sm text-muted-foreground">
                  Como usar ferramentas inteligentes no dia-a-dia sem perder a cabeça.
                </p>
              </div>
              <DialogDescription className="text-left text-muted-foreground">
                Receba acesso antecipado, desconto de lançamento e extras digitais.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="book-name" className="text-foreground">Nome</Label>
                <Input
                  id="book-name"
                  type="text"
                  placeholder="O seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="book-email" className="text-foreground">E-mail</Label>
                <Input
                  id="book-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-border text-foreground"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={loading}
              >
                {loading ? "A enviar..." : "Quero reservar o meu exemplar"}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Lançamento oficial em Novembro de 2025. Garantia de privacidade total — sem spam, só novidades relevantes.
              </p>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="text-5xl mb-4">✅</div>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Obrigado por reservar!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Assim que a pré-venda de <strong>IA para a Minha Avó</strong> abrir, receberá o link exclusivo.
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
