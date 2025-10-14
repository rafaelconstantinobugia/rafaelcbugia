import { ArrowRight, Zap, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SEO } from "@/components/SEO";
import { analytics } from "@/lib/analytics";
import heroImage from "@/assets/hero-abstract.jpg";

const services = [
  {
    icon: Zap,
    title: "Automações Inteligentes",
    subtitle: "Eficiência operacional",
    description: "Sistemas que trabalham por si, libertando tempo para o que realmente importa.",
    link: "/projectos"
  },
  {
    icon: Users,
    title: "Estratégia Digital",
    subtitle: "Crescimento sustentável",
    description: "Planos práticos baseados em dados reais e execução no terreno.",
    link: "/bio"
  },
  {
    icon: Target,
    title: "Funis de Conversão",
    subtitle: "Resultados medíveis",
    description: "Do primeiro contacto à conversão, sistemas optimizados para performance.",
    link: "/kitdigital"
  },
];

const proofPoints = [
  "Execução prática com ferramentas acessíveis",
  "Sistemas duplicáveis e mensuráveis",
  "Conteúdo público regular (Reels / Carrosséis)",
];

export default function Home() {
  return (
    <>
      <SEO
        title="Rafael Constantino Bugia — Empreendedor e Estratega Digital"
        description="Construo sistemas digitais simples que funcionam no mundo real. Empreendedor na Costa de Prata. Método SPRINT, Silver Coast Sitters, Celinda's Eco Retreat."
        canonical="https://rafaelcbugia.com"
        ogImage="https://rafaelcbugia.com/opengraph/home.png"
      />
      
      <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          role="img"
          aria-label="Fundo abstracto com halo laranja"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            Rafael Constantino Bugia
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            Empreendedor e estratega digital na Costa de Prata.
          </p>
          <p className="text-lg sm:text-xl font-medium text-foreground/90 mb-12 max-w-2xl mx-auto">
            Construo sistemas digitais simples que funcionam no mundo real. Resultados rápidos, impacto real.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="min-w-[200px]"
              onClick={() => analytics.ctaHomeProjectosClick()}
            >
              <Link to="/projectos">
                Ver projectos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="min-w-[200px]"
              onClick={() => analytics.ctaHomeContactoClick()}
            >
              <Link to="/contacto">
                Contacto
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-16">O que faço</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 hover-lift hover:border-primary/50 transition-all">
                <service.icon className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-primary mb-4">{service.subtitle}</p>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <Link 
                  to={service.link} 
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center"
                >
                  Saber mais
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Points Section */}
      <section className="py-24 px-6 lg:px-8 bg-card">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16">Destaques</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {proofPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-foreground/90">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kit Digital CTA */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Precisa de um sistema digital para o seu negócio?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Veja o Kit Digital — uma oferta completa para negócios que querem crescer com tecnologia prática.
          </p>
          <Button 
            asChild 
            size="lg"
            onClick={() => analytics.kitDigitalCtaClick()}
          >
            <Link to="/kitdigital">
              Conhecer o Kit Digital
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-6 lg:px-8 bg-card">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">Fique atualizado</h2>
          <p className="text-muted-foreground mb-8">
            Receba insights sobre tecnologia, operações e estratégia digital. Sem spam, apenas conteúdo útil.
          </p>
          
          <NewsletterForm />
        </div>
      </section>
    </div>
    </>
  );
}
