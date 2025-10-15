-- Add press kit settings
INSERT INTO site_settings (key, value) 
VALUES 
  ('press_kit', '{"bio_pt": "Rafael Constantino Bugia é empreendedor e estratega digital na Costa de Prata, Portugal. Construtor de sistemas digitais práticos e mensuráveis. Fundador do Método SPRINT, Silver Coast Sitters, Celinda''s Eco Retreat e 1VAU.", "bio_en": "Rafael Constantino Bugia is an entrepreneur and digital strategist on the Silver Coast, Portugal. Builder of practical and measurable digital systems. Founder of SPRINT Method, Silver Coast Sitters, Celinda''s Eco Retreat and 1VAU.", "bio_es": "Rafael Constantino Bugia es emprendedor y estratega digital en la Costa de Plata, Portugal. Constructor de sistemas digitales prácticos y mensurables. Fundador del Método SPRINT, Silver Coast Sitters, Celinda''s Eco Retreat y 1VAU.", "download_url": "https://rafaelcbugia.com/press-kit.pdf"}'::jsonb)
ON CONFLICT (key) DO UPDATE 
SET value = EXCLUDED.value;