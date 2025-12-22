-- Create DataPulse profiles table
CREATE TABLE public.datapulse_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create connected stores table
CREATE TABLE public.datapulse_stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform TEXT NOT NULL DEFAULT 'shopify',
  store_name TEXT NOT NULL,
  store_url TEXT NOT NULL,
  api_key TEXT,
  api_secret TEXT,
  access_token TEXT,
  is_connected BOOLEAN NOT NULL DEFAULT false,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.datapulse_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.datapulse_stores ENABLE ROW LEVEL SECURITY;

-- RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.datapulse_profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.datapulse_profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.datapulse_profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS policies for stores
CREATE POLICY "Users can view their own stores" 
ON public.datapulse_stores FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stores" 
ON public.datapulse_stores FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stores" 
ON public.datapulse_stores FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stores" 
ON public.datapulse_stores FOR DELETE 
USING (auth.uid() = user_id);

-- Trigger for auto-creating profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_datapulse_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.datapulse_profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_datapulse_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_datapulse_user();

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_datapulse_profiles_updated_at
  BEFORE UPDATE ON public.datapulse_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_datapulse_stores_updated_at
  BEFORE UPDATE ON public.datapulse_stores
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();