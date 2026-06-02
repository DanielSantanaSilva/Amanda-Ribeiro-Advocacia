import React, { useState, useEffect } from 'react';
import { Menu, X, Scale } from 'lucide-react';
import logoImg from '../assets/images/elegant_ar_sig_logo_1780440446516.png';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre a Firma' },
    { id: 'areas', label: 'Áreas de Atuação' },
    { id: 'agendamentos', label: 'Agendamentos' },
    { id: 'depoimentos', label: 'Depoimentos' },
    { id: 'contato', label: 'Contato' }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      id="main-app-header"
      className={`fixed top-0 w-full z-50 border-b transition-all duration-300 backdrop-blur-md ${
        isScrolled 
          ? 'bg-primary/95 py-3 shadow-lg border-gold-leaf/20' 
          : 'bg-primary/90 py-5 border-outline-variant/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand area */}
          <div 
            onClick={() => handleItemClick('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img 
              alt="Amanda Ribeiro Logo" 
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-110 mix-blend-screen -my-2" 
              src={logoImg}
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-white font-serif tracking-[0.08em] font-bold text-sm sm:text-lg leading-tight">
                AMANDA RIBEIRO
              </span>
              <span className="text-gold-leaf text-[8px] sm:text-[9px] uppercase tracking-[0.25em] font-semibold">
                Advocacia Especializada
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-[13px] uppercase tracking-wider font-semibold transition-all hover:text-gold-leaf relative py-2 ${
                  activeSection === item.id 
                    ? 'text-gold-leaf' 
                    : 'text-on-primary-container'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-leaf rounded-md" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold-leaf p-2 transition-colors cursor-pointer"
              aria-label="Abrir Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary border-t border-gold-leaf/20 py-4 px-6 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-left text-sm uppercase tracking-widest font-semibold py-2 border-b border-white/5 ${
                  activeSection === item.id 
                    ? 'text-gold-leaf font-bold pl-2' 
                    : 'text-on-primary-container hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
