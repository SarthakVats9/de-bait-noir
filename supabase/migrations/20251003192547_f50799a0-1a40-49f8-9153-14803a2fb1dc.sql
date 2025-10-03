-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create registrations table
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  member1_name TEXT NOT NULL,
  member1_roll TEXT NOT NULL,
  member1_email TEXT NOT NULL,
  member2_name TEXT,
  member2_roll TEXT,
  member2_email TEXT,
  member3_name TEXT,
  member3_roll TEXT,
  member3_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table for admin management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS on both tables
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS Policies for registrations table
-- Allow anyone (anon/authenticated) to insert registrations
CREATE POLICY "Anyone can register teams"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view registrations
CREATE POLICY "Admins can view all registrations"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles table (only admins can manage roles)
CREATE POLICY "Admins can view roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Prevent duplicate roll numbers across ALL teams (global unique constraint)
CREATE UNIQUE INDEX unique_roll_numbers_per_team 
  ON public.registrations (member1_roll);

CREATE UNIQUE INDEX unique_member2_roll 
  ON public.registrations (member2_roll) 
  WHERE member2_roll IS NOT NULL;

CREATE UNIQUE INDEX unique_member3_roll 
  ON public.registrations (member3_roll) 
  WHERE member3_roll IS NOT NULL;

-- Function to check for duplicate roll numbers WITHIN the same team
CREATE OR REPLACE FUNCTION public.check_duplicate_rolls()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if any roll numbers are duplicated within the same team
  IF NEW.member1_roll IS NOT NULL THEN
    IF (NEW.member2_roll IS NOT NULL AND NEW.member1_roll = NEW.member2_roll) OR
       (NEW.member3_roll IS NOT NULL AND NEW.member1_roll = NEW.member3_roll) THEN
      RAISE EXCEPTION 'Duplicate roll numbers within the same team are not allowed';
    END IF;
  END IF;
  
  IF NEW.member2_roll IS NOT NULL AND NEW.member3_roll IS NOT NULL THEN
    IF NEW.member2_roll = NEW.member3_roll THEN
      RAISE EXCEPTION 'Duplicate roll numbers within the same team are not allowed';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to validate roll numbers before insert/update
CREATE TRIGGER validate_roll_numbers
  BEFORE INSERT OR UPDATE ON public.registrations
  FOR EACH ROW
  EXECUTE FUNCTION public.check_duplicate_rolls();