import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Check, Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactProps {
  preselectedSubject?: string;
  onClearPreselected: () => void;
  onOpenAI: () => void;
}

export default function Contact({ preselectedSubject, onClearPreselected, onOpenAI }: ContactProps) {
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Direito Imobiliário');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preselectedSubject) {
      setSubject(preselectedSubject);
    }
  }, [preselectedSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setSubmitting(true);
    try {
      // 1. Send via FormSubmit service directly to amandacr@adv.oabsp.org.br (zero SMTP setup required)
      const formSubmitPromise = fetch('https://formsubmit.co/ajax/amandacr@adv.oabsp.org.br', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Nome: name,
          Email: email,
          Telefone: phone,
          "Área Jurídica": subject,
          Mensagem: message || "Nenhuma mensagem adicional",
          _subject: `Novo Contato do Site - ${subject} (${name})`
        })
      });

      // 2. Also register in local database server endpoint
      const internalServerPromise = fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      await Promise.allSettled([formSubmitPromise, internalServerPromise]);

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubject('Direito Imobiliário');
      onClearPreselected();
    } catch (err) {
      console.error(err);
      alert('Falha no envio. Por favor, tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Info Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[12px] uppercase tracking-widest text-gold-leaf font-semibold mb-3 block">
                Canais Diretos
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-primary tracking-tight mb-6">
                Estamos prontos <br />para ouvir você
              </h2>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed mb-10">
                Entre em contato pelos nossos canais corporativos oficiais ou utilize nosso formulário digital para registrar sua consulta. Retornamos em até 2 horas úteis.
              </p>

              {/* Direct channels */}
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/5 p-3 rounded group-hover:bg-gold-leaf/10 border border-gold-leaf/20 transition-colors">
                    <Mail className="w-5 h-5 text-gold-leaf" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">E-mail Corporativo</h4>
                    <p className="text-sm text-primary font-bold mt-0.5">amandacr@adv.oabsp.org.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/5 p-3 rounded group-hover:bg-gold-leaf/10 border border-gold-leaf/20 transition-colors">
                    <Phone className="w-5 h-5 text-gold-leaf" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Telefone / Central WhatsApp</h4>
                    <p className="text-sm text-primary font-bold mt-0.5">+55 (11) 95649-2055</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/5 p-3 rounded group-hover:bg-gold-leaf/10 border border-gold-leaf/20 transition-colors">
                    <MapPin className="w-5 h-5 text-gold-leaf" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Endereço Executivo</h4>
                    <p className="text-sm text-primary font-medium mt-0.5">Av. Paulista, 1000 - Bela Vista, São Paulo/SP</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Call to Action */}
            <div className="p-6 bg-primary text-white rounded-lg border border-gold-leaf/25 shadow-md relative overflow-hidden">
              <span className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 text-white/5 font-serif select-none pointer-events-none text-9xl">AI</span>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-gold-leaf">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Triador Virtual Inteligente</span>
                </div>
                <p className="text-xs text-on-primary-container leading-relaxed mb-4">
                  Deseja triar seu caso imobiliário, cível, de família ou societário de forma interativa? Nossa inteligência jurídica extrai orientações úteis para você.
                </p>
                <button
                  onClick={onOpenAI}
                  className="bg-gold-leaf hover:bg-[#c29e2f] text-primary text-xs uppercase tracking-wider font-bold p-3 px-5 rounded leading-none transition-colors cursor-pointer"
                >
                  Experimentar Triagem Grátis
                </button>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-surface p-6 sm:p-10 rounded-lg border border-outline-variant/30 shadow-xs flex flex-col relative">

            {/* Header */}
            <div className="mb-8 shrink-0">
              <span className="text-[10px] uppercase tracking-widest text-gold-leaf font-semibold mb-2 block">
                Formulário de Contato
              </span>
              <h3 className="font-serif text-2xl text-primary font-bold">
                Solicite uma consultoria jurídica personalizada
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 flex-1">

              {/* Nome + E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">
                    Nome Completo <span className="text-gold-leaf">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Arthur de Souza"
                    className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">
                    E-mail para Contato <span className="text-gold-leaf">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ex: arthur@souza.com"
                    className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all"
                  />
                </div>
              </div>

              {/* Telefone + Área */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">
                    Telefone / WhatsApp <span className="text-gold-leaf">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: (11) 98765-4321"
                    className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">
                    Área Jurídica Pretendida
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all"
                  >
                    <option value="Direito Imobiliário">Direito Imobiliário</option>
                    <option value="Direito Civil">Direito Civil</option>
                    <option value="Família e Sucessões">Família e Sucessões</option>
                    <option value="Direito do Trabalho">Direito do Trabalho</option>
                    <option value="Direito Corporativo">Direito Corporativo</option>
                  </select>
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">
                  Descreva seu caso <span className="text-on-surface-variant font-normal">(Opcional)</span>
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Forneça detalhes sobre sua situação jurídica para que possamos orientá-lo da melhor forma..."
                  className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-ink-dark disabled:bg-primary/50 text-white font-bold text-xs uppercase tracking-widest py-4 rounded transition-all cursor-pointer shadow flex items-center justify-center gap-2 group"
              >
                {submitting ? 'Enviando...' : 'Solicitar Consultoria'}
                <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* POP-UP MODAL OVERLAY */}
      {success && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-xs animate-fadeIn">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white border border-gold-leaf/40 rounded-xl p-8 sm:p-10 max-w-md w-full shadow-2xl text-center relative space-y-6"
          >
            <div className="w-16 h-16 bg-gold-leaf/10 border-2 border-gold-leaf rounded-full flex items-center justify-center mx-auto text-gold-leaf shadow-md">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                Mensagem Enviada!
              </h3>
              <p className="font-sans text-xs uppercase tracking-widest text-gold-leaf font-semibold">
                Amanda Ribeiro Advocacia
              </p>
            </div>

            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Sua consulta foi registrada com sucesso e encaminhada para <strong>amandacr@adv.oabsp.org.br</strong>. Nossa equipe analisará as informações e entrará em contato em breve.
            </p>

            <button
              onClick={() => setSuccess(false)}
              className="w-full bg-primary hover:bg-ink-dark text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded transition-all duration-300 cursor-pointer shadow border border-gold-leaf/30"
            >
              Fechar Janela
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
