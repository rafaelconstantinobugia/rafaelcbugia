import { ArrowRight, Zap, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewsletterForm } from "@/components/NewsletterForm";
import { SEO } from "@/components/SEO";
import { analytics } from "@/lib/analytics";
import heroImage from "@/assets/hero-abstract.jpg";
import { useLocale } from "@/contexts/LocaleContext";
import { t } from "@/lib/translations";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  const { locale } = useLocale();
  return (
    <>
      <SEO
        title={t('home.title', locale)}
        description={t('home.description', locale)}
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
            {t('home.hero_subtitle', locale)}
          </p>
          <p className="text-lg sm:text-xl font-medium text-foreground/90 mb-12 max-w-2xl mx-auto">
            {t('home.hero_tagline', locale)}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="min-w-[200px]"
              onClick={() => analytics.ctaHomeProjectosClick()}
            >
              <Link to={t('nav.projects', locale) === 'Projects' ? '/en/projects' : t('nav.projects', locale) === 'Proyectos' ? '/es/proyectos' : '/projectos'}>
                {t('home.cta_projects', locale)}
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
              <Link to={locale === 'en' ? '/en/contact' : locale === 'es' ? '/es/contacto' : '/contacto'}>
                {t('home.cta_contact', locale)}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t('home.what_i_do', locale)}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover-lift hover:border-primary/50 transition-all">
              <Zap className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-2">{t('home.service_automation_title', locale)}</h3>
              <p className="text-sm text-primary mb-4">{t('home.service_automation_subtitle', locale)}</p>
              <p className="text-muted-foreground mb-6">{t('home.service_automation_desc', locale)}</p>
              <Link 
                to={locale === 'en' ? '/en/projects' : locale === 'es' ? '/es/proyectos' : '/projectos'}
                className="text-sm font-medium text-primary hover:underline inline-flex items-center"
              >
                {t('home.learn_more', locale)}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Card>
            <Card className="p-8 hover-lift hover:border-primary/50 transition-all">
              <Users className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-2">{t('home.service_strategy_title', locale)}</h3>
              <p className="text-sm text-primary mb-4">{t('home.service_strategy_subtitle', locale)}</p>
              <p className="text-muted-foreground mb-6">{t('home.service_strategy_desc', locale)}</p>
              <Link 
                to={locale === 'en' ? '/en/bio' : locale === 'es' ? '/es/bio' : '/bio'}
                className="text-sm font-medium text-primary hover:underline inline-flex items-center"
              >
                {t('home.learn_more', locale)}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Card>
            <Card className="p-8 hover-lift hover:border-primary/50 transition-all">
              <Target className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-2">{t('home.service_funnels_title', locale)}</h3>
              <p className="text-sm text-primary mb-4">{t('home.service_funnels_subtitle', locale)}</p>
              <p className="text-muted-foreground mb-6">{t('home.service_funnels_desc', locale)}</p>
              <Link 
                to={locale === 'en' ? '/en/kitdigital' : locale === 'es' ? '/es/kitdigital' : '/kitdigital'}
                className="text-sm font-medium text-primary hover:underline inline-flex items-center"
              >
                {t('home.learn_more', locale)}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Proof Points Section */}
      <section className="py-24 px-6 lg:px-8 bg-card">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16">{t('home.highlights', locale)}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <p className="text-foreground/90">{t('home.proof_1', locale)}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <p className="text-foreground/90">{t('home.proof_2', locale)}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <p className="text-foreground/90">{t('home.proof_3', locale)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Kit Digital CTA */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.kitdigital_cta_title', locale)}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('home.kitdigital_cta_desc', locale)}
          </p>
          <Button 
            asChild 
            size="lg"
            onClick={() => analytics.kitDigitalCtaClick()}
          >
            <Link to={locale === 'en' ? '/en/kitdigital' : locale === 'es' ? '/es/kitdigital' : '/kitdigital'}>
              {t('home.kitdigital_cta_button', locale)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <section className="py-24 px-6 lg:px-8 bg-card">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-6">{t('home.newsletter_title', locale)}</h2>
          <p className="text-muted-foreground mb-8">
            {t('home.newsletter_desc', locale)}
          </p>
          
          <NewsletterForm />
        </div>
      </section>
    </div>
    </>
  );
}
