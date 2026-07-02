import React from 'react';
import { Shield, Share2 } from 'lucide-react';
import logoImg from '../assets/images/elegant_ar_sig_logo_1780440446516.png';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-gold-leaf/20 text-white">
      {/* Upper footer links and brand area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">

          {/* Brand Col */}
          <div className="md:w-2/5 shrink-0">
            <div className="flex items-center gap-3 mb-6">
              <img
                alt="Amanda Ribeiro Logo"
                className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-110 mix-blend-screen -my-2"
                src={logoImg}
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

          {/* Three equal content columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

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
                  Inscrição OAB/SP sob nº 499.477. Atuação pautada estritamente segundo as provisões do Estatuto da Advocacia e o Código de Ética e Disciplina da OAB.
                </p>
              </div>
            </div>

            {/* Redes Sociais */}
            <div className="md:ml-10">
              <h5 className="text-[10px] uppercase tracking-widest text-gold-leaf font-bold mb-6">Redes Sociais</h5>
              <p className="text-xs text-on-primary-container font-light mb-4">Acompanhe nosso conteúdo jurídico e novidades nas redes sociais.</p>
              <div className="flex flex-wrap gap-3">
                {/* Instagram */}
                <a
                  href="#"
                  className="w-10 h-10 border border-white/10 rounded hover:border-gold-leaf hover:text-gold-leaf flex items-center justify-center text-white transition-all"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 border border-white/10 rounded hover:border-gold-leaf hover:text-gold-leaf flex items-center justify-center text-white transition-all"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="#"
                  className="w-10 h-10 border border-white/10 rounded hover:border-gold-leaf hover:text-gold-leaf flex items-center justify-center text-white transition-all"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  className="w-10 h-10 border border-white/10 rounded hover:border-gold-leaf hover:text-gold-leaf flex items-center justify-center text-white transition-all"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                {/* Compartilhar */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: 'Amanda Ribeiro Advogados', url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="w-10 h-10 border border-white/10 rounded hover:border-gold-leaf hover:text-gold-leaf flex items-center justify-center text-white transition-all cursor-pointer"
                  aria-label="Compartilhar site"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
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
