-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  gdpr_consent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (will be rate-limited in edge function)
CREATE POLICY "Anyone can submit contact form"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view all contact submissions"
ON public.contact_submissions
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Only admins can update/delete
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create table for newsletter subscriptions
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  consent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed BOOLEAN DEFAULT false,
  confirmation_token TEXT UNIQUE,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscriptions
FOR INSERT
WITH CHECK (true);

-- Only admins can view subscriptions
CREATE POLICY "Admins can view all newsletter subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Only admins can update/delete
CREATE POLICY "Admins can update newsletter subscriptions"
ON public.newsletter_subscriptions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete newsletter subscriptions"
ON public.newsletter_subscriptions
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Create table for cookie consents
CREATE TABLE public.cookie_consents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  analytics_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  preferences_consent BOOLEAN DEFAULT false,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ip_address TEXT
);

-- Enable RLS
ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;

-- Allow public to insert
CREATE POLICY "Anyone can record cookie consent"
ON public.cookie_consents
FOR INSERT
WITH CHECK (true);

-- Only admins can view consents
CREATE POLICY "Admins can view all cookie consents"
ON public.cookie_consents
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for newsletter updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
BEFORE UPDATE ON public.newsletter_subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();