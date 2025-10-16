-- Drop existing public read policy if exists
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Create new policies: users can view their own profile, admins can view all
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));