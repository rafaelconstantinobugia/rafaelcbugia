-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'application/zip']
);

-- Storage policies for site-images bucket
CREATE POLICY "Public read access for site images"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-images');

CREATE POLICY "Authenticated users can upload site images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'site-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can update site images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'site-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Authenticated users can delete site images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'site-images' 
  AND auth.uid() IS NOT NULL
);