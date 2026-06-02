import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, PhoneCall } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  onOpenAI: () => void;
}

export default function Hero({ onNavigate, onOpenAI }: HeroProps) {
  return (
    <section 
      id="inicio"
      className="hero-gradient min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 border border-gold-leaf/10 rounded-full pointer-events-none" />
      <div className="absolute bottom-12 -left-20 w-80 h-80 border-2 border-gold-leaf/5 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-gold-leaf/10 border border-gold-leaf/25 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-gold-leaf animate-pulse" />
            <span className="text-[11px] font-sans text-gold-leaf font-semibold uppercase tracking-widest">
              Advocacia de Alta Performance
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-none mb-6"
          >
            Transformamos a burocracia <br className="hidden sm:inline" />
            em <span className="text-gold-leaf font-serif italic text-glow">simplicidade estratégica</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-on-primary-container max-w-2xl leading-relaxed mb-10 font-sans"
          >
            Soluções jurídicas preventivas e contenciosas sob medida para proteger seu patrimônio com a agilidade, sigilo e rigor que o mundo corporativo exige.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={() => onNavigate('contato')}
              className="bg-gold-leaf hover:bg-[#c29e2f] text-primary font-bold px-8 py-4 rounded-md shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer transform hover:-translate-y-0.5"
            >
              Agendar Consultoria
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={onOpenAI}
              className="bg-primary-container/80 hover:bg-primary-container text-white hover:text-gold-leaf border border-gold-leaf/30 hover:border-gold-leaf px-8 py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-gold-leaf" />
              Triagem de IA Gratuita
            </button>
          </motion.div>
        </div>

        {/* Bottom Feature Pill Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 pt-10 border-t border-white/10">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 rounded-full border border-white/10 text-gold-leaf mt-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Segurança Plena</h3>
              <p className="text-xs text-on-primary-container mt-1">Teses sólidas atualizadas semanalmente com as cortes superiores.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 rounded-full border border-white/10 text-gold-leaf mt-1">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Comunicação Sem Ruído</h3>
              <p className="text-xs text-on-primary-container mt-1">Contato direto e transparente com o advogado titular, sem jargões.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/5 rounded-full border border-white/10 text-gold-leaf mt-1">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Inovação Digital</h3>
              <p className="text-xs text-on-primary-container mt-1">Processos 100% digitalizados e painéis online de status ágil.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
