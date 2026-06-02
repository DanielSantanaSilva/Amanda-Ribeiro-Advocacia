/**
 * Types & Interfaces for Amanda Ribeiro Advogados Associados
 */

export interface PracticeArea {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string; // Lucide icon reference
  services: string[];
  gridSpan: string; // Tailwind class
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  stars: number;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  preferredTimeSlot?: string;
  status: 'Pendente' | 'Confirmado' | 'Concluido';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  parts: { text: string }[];
  timestamp: Date;
}
