-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create bio_content table
CREATE TABLE public.bio_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intro_text TEXT NOT NULL,
  bio_image_url TEXT,
  timeline JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on bio_content
ALTER TABLE public.bio_content ENABLE ROW LEVEL SECURITY;

-- Bio content policies (public read, admin write)
CREATE POLICY "Anyone can view bio"
  ON public.bio_content FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update bio"
  ON public.bio_content FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert bio"
  ON public.bio_content FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Insert initial bio content
INSERT INTO public.bio_content (intro_text, timeline)
VALUES (
  'Sou o Rafael Constantino Bugia. Trabalho na intersecção entre hospitalidade, operações e tecnologia. Crio sistemas digitais práticos para negócios pequenos mas ambiciosos: funis, automações e agentes que reduzem ruído e aumentam resultados. Opero a partir da Costa de Prata, com foco em execução e prova no terreno.',
  '[
    {"year": "2024", "title": "Sistemas Digitais", "description": "Foco em automações e agentes para negócios locais", "icon": "Zap"},
    {"year": "2020-2023", "title": "Hospitalidade & Tech", "description": "Operações e estratégia digital", "icon": "Building"},
    {"year": "2015-2020", "title": "Primeiros Passos", "description": "Fundamentos em tecnologia e empreendedorismo", "icon": "Rocket"}
  ]'::jsonb
);

-- Create projectos table
CREATE TABLE public.projectos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  external_url TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on projectos
ALTER TABLE public.projectos ENABLE ROW LEVEL SECURITY;

-- Projectos policies
CREATE POLICY "Anyone can view active projects"
  ON public.projectos FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all projects"
  ON public.projectos FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert projects"
  ON public.projectos FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects"
  ON public.projectos FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete projects"
  ON public.projectos FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create media_articles table
CREATE TABLE public.media_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  published_date DATE NOT NULL,
  excerpt TEXT,
  external_url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on media_articles
ALTER TABLE public.media_articles ENABLE ROW LEVEL SECURITY;

-- Media articles policies
CREATE POLICY "Anyone can view media articles"
  ON public.media_articles FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert media articles"
  ON public.media_articles FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update media articles"
  ON public.media_articles FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete media articles"
  ON public.media_articles FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create site_settings table for editable content
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Site settings policies
CREATE POLICY "Anyone can view site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON public.site_settings FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert site settings"
  ON public.site_settings FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Insert initial site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('home_hero', '{"title": "Rafael Constantino Bugia", "subtitle": "Empreendedor e estratega digital na Costa de Prata.", "tagline": "Construo sistemas digitais simples que funcionam no mundo real. Resultados rápidos, impacto real."}'::jsonb),
  ('contact_intro', '{"text": "Vamos conversar sobre o seu projeto. Respondo normalmente em 24 horas."}'::jsonb),
  ('contact_success', '{"message": "Mensagem enviada com sucesso! Entrarei em contacto em breve."}'::jsonb),
  ('how_i_work', '{"text": "Trabalho com foco em execução prática e resultados medíveis. Cada projeto começa com uma análise clara do problema, seguida de implementação rápida e iteração baseada em dados reais."}'::jsonb);

-- Create testimonials table for Kit Digital
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  testimonial TEXT NOT NULL,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT true,
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Testimonials policies
CREATE POLICY "Anyone can view active testimonials"
  ON public.testimonials FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON public.testimonials FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bio_content_updated_at
  BEFORE UPDATE ON public.bio_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projectos_updated_at
  BEFORE UPDATE ON public.projectos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_media_articles_updated_at
  BEFORE UPDATE ON public.media_articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to populate profiles on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();