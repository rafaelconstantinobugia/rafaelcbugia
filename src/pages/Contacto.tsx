import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      toast.error("Por favor, aceite a política de privacidade para continuar.");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Mensagem enviada com sucesso! Entrarei em contacto em breve.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        gdprConsent: false,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contacto</h1>
          <div className="w-20 h-1 bg-primary mx-auto mb-8" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Vamos conversar sobre o seu projecto. Respondo normalmente em 24 horas.
          </p>
        </div>

        {/* Contact Form */}
        <Card className="p-8 md:p-12 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="O seu nome"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="seu@email.com"
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="subject">Assunto *</Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                placeholder="Como posso ajudar?"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="message">Mensagem *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                placeholder="Conte-me sobre o seu projecto..."
                rows={6}
                className="mt-2"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="gdpr"
                checked={formData.gdprConsent}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, gdprConsent: checked as boolean })
                }
              />
              <Label htmlFor="gdpr" className="text-sm leading-relaxed cursor-pointer">
                Concordo que os meus dados sejam utilizados para responder ao meu pedido, 
                de acordo com a política de privacidade. *
              </Label>
            </div>

            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? "A enviar..." : "Enviar mensagem"}
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>

        {/* Direct Email */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Ou contacte directamente:</p>
          <a 
            href="mailto:contacto@rafaelcbugia.com"
            className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:underline"
          >
            <Mail className="h-5 w-5" />
            contacto@rafaelcbugia.com
          </a>
        </div>
      </div>
    </div>
  );
}
