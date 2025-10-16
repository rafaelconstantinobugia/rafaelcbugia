-- Create table for book pre-reservations
CREATE TABLE public.book_prereservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'Site Principal',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.book_prereservations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can submit a pre-reservation
CREATE POLICY "Anyone can submit book pre-reservation"
ON public.book_prereservations
FOR INSERT
WITH CHECK (true);

-- Policy: Admins can view all pre-reservations
CREATE POLICY "Admins can view all book pre-reservations"
ON public.book_prereservations
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy: Admins can delete pre-reservations
CREATE POLICY "Admins can delete book pre-reservations"
ON public.book_prereservations
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add site setting for book pre-reservation toggle
INSERT INTO public.site_settings (key, value)
VALUES ('book_prereservation_enabled', 'true'::jsonb)
ON CONFLICT (key) DO NOTHING;