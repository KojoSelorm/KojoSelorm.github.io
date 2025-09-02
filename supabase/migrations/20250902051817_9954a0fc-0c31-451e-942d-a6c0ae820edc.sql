-- Create enum for conversation status
CREATE TYPE conversation_status AS ENUM ('active', 'closed', 'escalated');

-- Create enum for message types
CREATE TYPE message_type AS ENUM ('user', 'assistant', 'system');

-- Create table for chat conversations
CREATE TABLE public.chat_conversations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    status conversation_status DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for chat messages
CREATE TABLE public.chat_messages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    conversation_id UUID REFERENCES public.chat_conversations(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    message_type message_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for knowledge base
CREATE TABLE public.knowledge_base (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT,
    tags TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for contact inquiries
CREATE TABLE public.contact_inquiries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for quote requests
CREATE TABLE public.quote_requests (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_interest TEXT NOT NULL,
    project_details TEXT NOT NULL,
    budget_range TEXT,
    timeline TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for chat conversations (users can only see their own or anonymous sessions)
CREATE POLICY "Users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for chat messages
CREATE POLICY "Users can view messages from their conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.chat_conversations 
        WHERE id = conversation_id 
        AND (auth.uid() = user_id OR user_id IS NULL)
    )
);

CREATE POLICY "Users can create messages in their conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.chat_conversations 
        WHERE id = conversation_id 
        AND (auth.uid() = user_id OR user_id IS NULL)
    )
);

-- Create policies for knowledge base (public read access)
CREATE POLICY "Anyone can read active knowledge base entries" 
ON public.knowledge_base 
FOR SELECT 
USING (is_active = true);

-- Create policies for contact inquiries (anyone can create)
CREATE POLICY "Anyone can create contact inquiries" 
ON public.contact_inquiries 
FOR INSERT 
WITH CHECK (true);

-- Create policies for quote requests (anyone can create)
CREATE POLICY "Anyone can create quote requests" 
ON public.quote_requests 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_chat_conversations_updated_at
    BEFORE UPDATE ON public.chat_conversations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_knowledge_base_updated_at
    BEFORE UPDATE ON public.knowledge_base
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample knowledge base content
INSERT INTO public.knowledge_base (title, content, category, tags) VALUES
('Company Overview', 'MCHAMMAH Engineering Company Limited is a leading manufacturer specializing in food processing machinery, marine manufacturing (including catamaran boats), electromechanical systems, and industrial equipment. We are committed to innovation, quality, and excellence in engineering solutions.', 'company', ARRAY['company', 'overview', 'about']),
('Food Processing Machinery', 'We manufacture industrial-grade food processing equipment including industrial mixers, conveyor systems, processing lines, and packaging equipment. Our machinery is designed for efficiency, durability, and compliance with food safety standards.', 'products', ARRAY['food', 'processing', 'machinery', 'industrial']),
('Marine Manufacturing', 'Our marine division specializes in custom boat building, particularly catamaran boats. We provide marine components, custom designs, and maintain the highest standards of craftsmanship in boat construction.', 'products', ARRAY['marine', 'boats', 'catamaran', 'manufacturing']),
('Electromechanical Systems', 'We offer comprehensive electrical and mechanical engineering solutions including system design, installation, maintenance, and consultancy services for industrial applications.', 'services', ARRAY['electromechanical', 'engineering', 'systems', 'consultation']),
('Industrial Equipment', 'Our industrial equipment range includes soap making equipment, agricultural machinery, and custom solutions with comprehensive after-sales support.', 'products', ARRAY['industrial', 'equipment', 'soap', 'agriculture']),
('Contact Information', 'You can reach us for quotes, consultations, or general inquiries. We provide 24/7 customer support and are always ready to discuss your engineering needs and provide customized solutions.', 'contact', ARRAY['contact', 'support', 'quotes', 'consultation']),
('Quality Standards', 'All our products meet international quality standards and are manufactured with precision engineering. We maintain strict quality control processes and provide comprehensive warranties on our equipment.', 'quality', ARRAY['quality', 'standards', 'warranty', 'certification']);