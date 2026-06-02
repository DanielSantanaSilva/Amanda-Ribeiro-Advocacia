import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, User, Scale, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject?: string;
}

export default function AIAssistant({ isOpen, onClose, initialSubject }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested preset prompts (Portuguese)
  const presets = [
    { label: "Planejamento Sucessório", prompt: "Gostaria de entender como funciona uma holding familiar para herança de bens." },
    { label: "Contratos Corporativos", prompt: "Minha empresa precisa contratar um prestador de serviços. Como mitigar riscos trabalhistas?" },
    { label: "Disputa Imobiliária", prompt: "Estou tendo problemas com rescisão contratual de aluguel comercial, o que fazer?" },
    { label: "Cálculos Trabalhistas", prompt: "Fui desligado da empresa e suspeito que as verbas rescisórias estão erradas." }
  ];

  useEffect(() => {
    if (messages.length === 0) {
      // Warm welcome
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          parts: [{ text: "Olá! Seja muito bem-vindo ao escritório Amanda Ribeiro Advogados Associados. Eu sou a Dra. Sofia, a inteligência jurídica do escritório.\n\nComo posso ajudar você hoje? Conte-me resumidamente a sua situação familiar ou corporativa para que eu possa triar as soluções e indicar os melhores passos." }],
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  useEffect(() => {
    if (initialSubject) {
      handleSendAndQuery(`Gostaria de agendar uma consulta sobre o tema de: ${initialSubject}. Poderia me dar orientações iniciais do que preciso providenciar?`);
    }
  }, [initialSubject]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  const handleSendAndQuery = async (textToSend: string) => {
    if (!textToSend.trim() || sending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      parts: [{ text: textToSend }],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSending(true);

    try {
      const response = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          // Extract last few messages for chat thread memory context
          history: messages.slice(-6).map(m => ({
            role: m.role,
            parts: m.parts
          }))
        })
      });

      const data = await response.json();
      if (response.ok && data.response) {
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          role: 'model',
          parts: [{ text: data.response }],
          timestamp: new Date()
        }]);
      } else {
        throw new Error(data.error || "Erro desconhecido");
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        parts: [{ text: "Prezado cliente, enfrentei uma pequena instabilidade na conexão. Se preferir, agende uma conversa diretamente no formulário abaixo ou fale imediatamente com Dra. Amanda via canal WhatsApp de urgência!" }],
        timestamp: new Date()
      }]);
    } finally {
      setSending(false);
    }
  };

  // Safe client-side light markdown compiler (handles bold, italic, and clean linefeeds)
  const renderMessageContent = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let content = line;
      // Bold rendering (**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      
      const elements: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          elements.push(line.substring(lastIndex, match.index));
        }
        elements.push(<strong key={match.index} className="text-primary font-bold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      
      if (lastIndex < line.length) {
        elements.push(line.substring(lastIndex));
      }

      return (
        <p key={idx} className="my-1.5 leading-relaxed text-sm">
          {elements.length > 0 ? elements : content}
        </p>
      );
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-xs z-[1000] flex justify-end animate-fadeIn">
      <div className="w-full max-w-lg bg-white h-screen shadow-2xl flex flex-col relative border-l border-gold-leaf/20">
        
        {/* Header bar */}
        <div className="bg-primary px-6 py-5 flex items-center justify-between border-b border-gold-leaf/30 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-leaf/20 flex items-center justify-center text-gold-leaf border border-gold-leaf/40">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-tight">Triagem Jurídica Digital</h3>
              <p className="text-[10px] text-on-primary-container font-light">Powered by Gemini 3.5 AI Client</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gold-leaf p-1.5 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Info advice card */}
        <div className="bg-gold-leaf/5 border-b border-gold-leaf/10 p-3.5 px-6 flex items-start gap-2 shrink-0">
          <HelpCircle className="w-4 h-4 text-gold-leaf shrink-0 mt-0.5" />
          <p className="text-[11px] text-on-surface-variant leading-normal">
            <strong>Intenção Informativa:</strong> Esta assessoria é consultiva para fins de entendimento prévio e coleta de fatos. Não substitui parecer técnico formal.
          </p>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-surface">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border text-xs ${
                  isUser 
                    ? 'bg-gold-leaf text-primary border-gold-leaf' 
                    : 'bg-primary text-white border-primary'
                }`}>
                  {isUser ? <User size={14} /> : <Scale size={14} />}
                </div>
                <div>
                  <div className={`rounded-lg px-4 py-3 shadow-xs ${
                    isUser 
                      ? 'bg-primary text-on-primary rounded-tr-none' 
                      : 'bg-white text-on-surface border border-outline-variant/30 rounded-tl-none'
                  }`}>
                    {renderMessageContent(msg.parts[0].text)}
                  </div>
                  <span className="block text-[9px] text-on-surface-variant opacity-60 mt-1 px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Shimmer loader for sending */}
          {sending && (
            <div className="flex gap-3 max-w-[80%] mr-auto">
              <div className="w-8 h-8 rounded-full shrink-0 bg-primary text-white flex items-center justify-center">
                <Scale size={14} />
              </div>
              <div className="bg-white rounded-lg px-4 py-3 border border-outline-variant/30 rounded-tl-none shadow-xs w-full">
                <div className="flex gap-1 items-center justify-start h-5">
                  <div className="w-2.5 h-2.5 bg-gold-leaf/40 rounded-full animate-bounce" />
                  <div className="w-2.5 h-2.5 bg-gold-leaf/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2.5 h-2.5 bg-gold-leaf/90 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Presets suggestions bar */}
        {messages.length < 3 && (
          <div className="px-6 py-3 border-t border-outline-variant/30 bg-white shrink-0 scroll-x">
            <p className="text-[10px] uppercase font-bold text-primary mb-2 tracking-wider">Perguntas Frequentes</p>
            <div className="flex flex-wrap gap-2">
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendAndQuery(p.prompt)}
                  className="text-[11px] text-on-surface-variant hover:text-white bg-surface hover:bg-gold-leaf border border-outline-variant/40 hover:border-gold-leaf/50 px-3 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form area */}
        <div className="p-4 bg-white border-t border-outline-variant/50 shrink-0">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendAndQuery(input);
            }} 
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Descreva seu caso resumidamente..."
              disabled={sending}
              className="flex-1 bg-surface border border-outline-variant rounded px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-gold-leaf text-primary"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="bg-primary hover:bg-ink-dark disabled:bg-primary/50 text-white p-3 rounded transition-all cursor-pointer flex items-center justify-center shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
