import React from 'react';
import { Mail, Phone, MapPin, Scale, Share2, Globe, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-gold-leaf/20 text-white">
      {/* Upper footer links and brand area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                alt="Amanda Ribeiro Logo" 
                className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-110 mix-blend-screen -my-2" 
                src="/src/assets/images/elegant_ar_sig_logo_1780440446516.png"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif tracking-widest text-white font-bold text-base uppercase">
                Amanda Ribeiro
              </span>
            </div>
            <p className="text-xs text-on-primary-container leading-relaxed font-light mb-4">
              Excelência jurídica em soluções consultivas e contenciosas de alto impacto. Transparência, inovação digital e sigilo profissional inabalável.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-gold-leaf font-bold mb-6">Navegação</h5>
            <ul className="space-y-3 text-xs text-on-primary-container font-light">
              <li>
                <button 
                  onClick={() => onNavigate('inicio')}
                  className="hover:text-gold-leaf transition-colors cursor-pointer text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sobre')}
                  className="hover:text-gold-leaf transition-colors cursor-pointer text-left"
                >
                  Sobre a Firma
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('areas')}
                  className="hover:text-gold-leaf transition-colors cursor-pointer text-left"
                >
                  Áreas de Atuação
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('depoimentos')}
                  className="hover:text-gold-leaf transition-colors cursor-pointer text-left"
                >
                  Clientes e Avaliações
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Regulation */}
          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-gold-leaf font-bold mb-6">Códigos e Ética</h5>
            <div className="flex items-start gap-2.5 text-xs text-on-primary-container font-light leading-relaxed">
              <Shield className="w-5 h-5 text-gold-leaf shrink-0 mt-0.5" />
              <p>
                Inscrição OAB/SP sob nº 000.000. Atuação pautada estritamente segundo as provisões do Estatuto da Advocacia e o Código de Ética e Disciplina da OAB.
              </p>
            </div>
          </div>

          {/* Share / Social links */}
          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-gold-leaf font-bold mb-6">Rede Corporativa</h5>
            <p className="text-xs text-on-primary-container font-light mb-4">Acompanhe opiniões técnicas semanais e decisões dos tribunais superiores.</p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 border border-white/10 rounded hover:border-gold-leaf hover:text-gold-leaf flex items-center justify-center text-white transition-all"
                aria-label="Artigos de Direito"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 border border-white/10 rounded hover:border-gold-leaf hover:text-gold-leaf flex items-center justify-center text-white transition-all"
                aria-label="Compartilhar Link da Firma"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-8 text-center text-xs text-on-primary-container font-light">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Amanda Ribeiro Advogados Associados. Todos os direitos reservados.</p>
          <p className="text-[10px] opacity-60">Desenvolvido com excelência técnica responsiva corporativa.</p>
        </div>
      </div>
    </footer>
  );
}
