-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table to manage user permissions
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Add RLS policies for quote_requests table (admin access)
CREATE POLICY "Admins can view all quote requests"
ON public.quote_requests FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update quote requests"
ON public.quote_requests FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete quote requests"
ON public.quote_requests FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add RLS policies for contact_inquiries table (admin access)
CREATE POLICY "Admins can view all contact inquiries"
ON public.contact_inquiries FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact inquiries"
ON public.contact_inquiries FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact inquiries"
ON public.contact_inquiries FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create chat_leads table for storing captured leads
CREATE TABLE public.chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company_name text,
  service_interest text NOT NULL,
  project_details text NOT NULL,
  intent text CHECK (intent IN ('quote', 'call', 'consultation')),
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create indexes for chat_leads
CREATE INDEX idx_chat_leads_conversation ON public.chat_leads(conversation_id);
CREATE INDEX idx_chat_leads_created ON public.chat_leads(created_at DESC);

-- Enable RLS on chat_leads
ALTER TABLE public.chat_leads ENABLE ROW LEVEL SECURITY;

-- RLS policies for chat_leads
CREATE POLICY "Admins can view all chat leads"
ON public.chat_leads FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can insert leads"
ON public.chat_leads FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update chat leads"
ON public.chat_leads FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix chat conversation privacy - remove NULL user access
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.chat_conversations;

-- Create new restrictive policies for chat_conversations (admin only)
CREATE POLICY "Admins can view all conversations"
ON public.chat_conversations FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can create conversations"
ON public.chat_conversations FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update conversations"
ON public.chat_conversations FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix chat_messages policies
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;

-- Create new restrictive policies for chat_messages (admin only)
CREATE POLICY "Admins can view all messages"
ON public.chat_messages FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Service role can create messages"
ON public.chat_messages FOR INSERT
WITH CHECK (true);