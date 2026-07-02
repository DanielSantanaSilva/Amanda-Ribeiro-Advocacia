import React from 'react';
import { CheckCircle2, Award, History, Landmark } from 'lucide-react';
import amandaImg from '../assets/images/dra_amanda_ribeiro.png';

export default function About() {
  const valuePills = [
    {
      title: "Atendimento Humanizado & Direto",
      desc: "Tratamento individual de excelência que aproxima o cliente da tomada de decisões cruciais."
    },
    {
      title: "Processos 100% Digitalizados",
      desc: "Agilidade com protocolos eletrônicos imediatos e acesso digital às peças processuais."
    },
    {
      title: "Compliance e Ética Inegociáveis",
      desc: "Total alinhamento com metodologias de integridade e leis anti-corrupção corporativa."
    }
  ];

  return (
    <section id="sobre" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Visual Canvas Side */}
          <div className="relative">
            <div className="aspect-square bg-surface-container overflow-hidden rounded-lg shadow-xl border border-outline-variant/50 relative group">
              <div className="absolute inset-0 bg-primary/10 lg:group-hover:bg-transparent transition-all duration-500 z-10" />
              <img
                alt="Dra. Amanda Ribeiro"
                className="w-full h-full object-cover lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700 transform lg:group-hover:scale-105"
                src={amandaImg}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Overlay Badge of Distinction */}
            <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 shadow-2xl rounded-sm border-l-4 border-gold-leaf hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold-leaf/20 rounded text-gold-leaf">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold tracking-tight text-white">+10 Anos</p>
                  <p className="text-gold-leaf text-[10px] uppercase tracking-widest font-semibold mt-0.5">De Atuação Dedicada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description Content Side */}
          <div className="lg:pl-6">
            <span className="text-[12px] uppercase tracking-widest text-gold-leaf font-semibold mb-3 block">
              Quem Somos
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-primary tracking-tight mb-6">
              Amanda Ribeiro Advocacia Especializada
            </h2>
            <p className="text-base text-on-surface-variant font-light leading-relaxed mb-6">
              Nascemos da convicção de que o Direito deve atuar como um habilitador de novos negócios e um protetor seguro da estrutura familiar. Combinamos a sabedoria e a etiqueta da advocacia tradicional com as mais inovadoras ferramentas tecnológicas da modernidade.
            </p>
            <p className="text-sm text-on-surface-variant leading-relaxed mb-10">
              Cada cliente do nosso escritório tem o titular acompanhando diretamente seu caso. Acreditamos no modelo boutique, onde o volume de causas é controlado para maximizar a assertividade, a diligência pessoal e a eficiência econômica dos resultados.
            </p>

            {/* Values loop with custom items styling */}
            <div className="space-y-6">
              {valuePills.map((val, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="p-1 bg-gold-leaf/10 text-gold-leaf rounded-full mt-1 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm tracking-wide">{val.title}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Milestone Grid Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-outline-variant/30 text-center">
          <div>
            <span className="block font-serif text-3xl sm:text-4xl text-primary font-bold">100%</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mt-1">Processos Digitais</span>
          </div>
          <div>
            <span className="block font-serif text-3xl sm:text-4xl text-primary font-bold">90%</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mt-1">Eficácia em Acordos</span>
          </div>
          <div>
            <span className="block font-serif text-3xl sm:text-4xl text-primary font-bold">900+</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mt-1">Clientes Satisfeitos</span>
          </div>
          <div>
            <span className="block font-serif text-3xl sm:text-4xl text-primary font-bold">R$ 10M+</span>
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mt-1">De Patrimônio Gerido</span>
          </div>
        </div>

      </div>
    </section>
  );
}
