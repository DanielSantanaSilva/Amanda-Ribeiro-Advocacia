import React, { useState, useEffect } from 'react';
import { Scale, HeartHandshake, Briefcase, Building2, X, ArrowUpRight, Check, Landmark } from 'lucide-react';
import { PracticeArea } from '../types';

interface ExpertiseProps {
  onSelectArea: (subject: string) => void;
}

export default function Expertise({ onSelectArea }: ExpertiseProps) {
  const [areas, setAreas] = useState<PracticeArea[]>([]);
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/practice-areas')
      .then((res) => res.json())
      .then((data) => {
        setAreas(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed fetching practice areas, loading defaults", err);
        // Resilient Fallback
        setAreas([
          {
            id: "realestate",
            title: "Direito Imobiliário",
            description: "Assessoria completa em negócios imobiliários, regularização de imóveis, contratos e incorporações.",
            longDescription: "Nossa advocacia imobiliária oferece soluções estratégicas para proprietários, investidores e construtoras. Atuamos na segurança documental, contratos de compra e venda, locações, incorporações e regularização de imóveis.",
            iconName: "Landmark",
            services: [
              "Regularização e Averbação de Imóveis",
              "Contratos de Compra, Venda e Locação",
              "Assessoria em Incorporações Imobiliárias",
              "Ações Possessórias e Usucapião"
            ],
            gridSpan: "md:col-span-8"
          },
          {
            id: "family",
            title: "Família e Sucessões",
            description: "Mediação e planejamento sucessório com a discrição e sensibilidade necessárias.",
            longDescription: "Entendemos que questões familiares exigem um olhar técnico altamente especializado somado a uma sensibilidade humana diferenciada. Atuamos fortemente na pacificação e proteção do patrimônio familiar.",
            iconName: "HeartHandshake",
            services: [
              "Planejamento Sucessório & Holding Familiar",
              "Divórcios (Consensual ou Litigioso)",
              "Inventários e Partilhas Judiciais ou Extrajudiciais",
              "Pactos Antenupciais e Regulamentação de Guarda"
            ],
            gridSpan: "md:col-span-4"
          },
          {
            id: "civil",
            title: "Direito Civil",
            description: "Soluções em contratos, responsabilidade civil e direitos reais com foco em prevenção de litígios.",
            longDescription: "Nosso departamento civil atua de forma estratégica tanto na esfera consultiva e contratual quanto no contencioso de alta complexidade. Protegemos os interesses patrimoniais e existenciais de nossos clientes.",
            iconName: "Scale",
            services: [
              "Elaboração e análise de Contratos Complexos",
              "Ações de Responsabilidade Civil e Indenizações",
              "Direito de Propriedade e Posse (Imobiliário)",
              "Cobranças e Recuperação de Crédito"
            ],
            gridSpan: "md:col-span-4"
          },
          {
            id: "labor",
            title: "Direito do Trabalho",
            description: "Consultoria preventiva para empresas e defesa estratégica de direitos individuais.",
            longDescription: "Oferecemos assessoria jurídica focada na mitigação de riscos trabalhistas para corporações (Compliance Trabalhista) e na defesa integral dos direitos trabalhistas de executivos.",
            iconName: "Briefcase",
            services: [
              "Auditoria e Assessoria de Prevenção de Riscos Trabalhistas",
              "Defesa em Reclamações Trabalhistas Individuais",
              "Cálculos Rescisórios e Planejamento Salarial",
              "Negociações Coletivas e Relações Sindicais"
            ],
            gridSpan: "md:col-span-4"
          },
          {
            id: "corporate",
            title: "Direito Corporativo",
            description: "Suporte completo para estruturação de negócios, M&A e governança corporativa.",
            longDescription: "Atuamos como um verdadeiro parceiro de negócios das empresas. Desde a estruturação societária inicial até transações de fusões e aquisições (M&A).",
            iconName: "Building2",
            services: [
              "Constituição e Reestruturação de Sociedades Anônimas e Limitadas",
              "Processos de Fusões e Aquisições (M&A) e Due Diligence",
              "Acordo de Sócios e Governança Corporativa",
              "Blindagem Patrimonial de Sócios e Diretores"
            ],
            gridSpan: "md:col-span-4"
          }
        ]);
        setLoading(false);
      });
  }, []);

  // Map icon name to Lucide Component
  const getIcon = (name: string) => {
    switch (name) {
      case 'Scale':
        return <Scale className="w-10 h-10 text-gold-leaf" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-10 h-10 text-gold-leaf" />;
      case 'Briefcase':
        return <Briefcase className="w-10 h-10 text-gold-leaf" />;
      case 'Building2':
        return <Building2 className="w-10 h-10 text-gold-leaf" />;
      case 'Landmark':
        return <Landmark className="w-10 h-10 text-gold-leaf" />;
      default:
        return <Scale className="w-10 h-10 text-gold-leaf" />;
    }
  };

  const handleQuickAgendar = (subject: string) => {
    onSelectArea(subject);
    setSelectedArea(null);
  };

  return (
    <section id="areas" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[12px] uppercase tracking-widest text-gold-leaf font-semibold mb-3 block">
            Nossa Competência
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-primary tracking-tight">
            Áreas de Especialidade
          </h2>
          <div className="w-16 h-[2px] bg-gold-leaf mx-auto mt-4" />
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-5 text-sm leading-relaxed font-light">
            Soluções corporativas e familiares pautadas na excelência técnica e na personalização absoluta de cada tese jurídica.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-gold-leaf border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {areas.map((area) => {
              const isDark = area.id === 'realestate';
              return (
                <div
                  key={area.id}
                  onClick={() => setSelectedArea(area)}
                  className={`${area.gridSpan} group relative overflow-hidden rounded-md border p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:shadow-xl hover:-translate-y-1 ${isDark
                    ? 'bg-primary border-gold-leaf/20 text-white'
                    : 'bg-surface border-outline-variant/50 text-primary'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-white/5 border border-white/10 rounded">
                      {getIcon(area.iconName)}
                    </div>
                    <span className="text-xs font-semibold tracking-wider text-gold-leaf flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver detalhes
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="mt-12">
                    <h3 className="font-serif text-2xl font-bold tracking-tight mb-2">
                      {area.title}
                    </h3>
                    <p className={`text-sm leading-relaxed font-light ${isDark ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                      {area.description}
                    </p>
                    <div className="mt-4 h-[2px] w-0 group-hover:w-16 bg-gold-leaf transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Expertise Details Modal */}
      {selectedArea && (
        <div className="fixed inset-0 bg-primary/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 md:p-10 border border-gold-leaf/20 shadow-2xl relative animate-scaleIn">

            {/* Close */}
            <button
              onClick={() => setSelectedArea(null)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/5 rounded border border-gold-leaf/20">
                {getIcon(selectedArea.iconName)}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-gold-leaf font-bold">Amanda Ribeiro Advogados</span>
                <h3 className="text-3xl font-serif text-primary tracking-tight font-bold">{selectedArea.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
              {selectedArea.longDescription}
            </p>

            {/* Services List */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-widest font-bold text-primary mb-4">Serviços Especializados</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedArea.services.map((svc, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-on-surface-variant">
                    <div className="p-0.5 bg-gold-leaf/10 text-gold-leaf rounded-full mt-0.5 shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span>{svc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer triggers */}
            <div className="flex items-center gap-4 justify-end pt-4 border-t border-outline-variant/30">
              <button
                onClick={() => setSelectedArea(null)}
                className="px-5 py-2 text-xs uppercase tracking-wider font-semibold text-on-surface-variant hover:text-primary"
              >
                Voltar
              </button>
              <button
                onClick={() => handleQuickAgendar(selectedArea.title)}
                className="bg-primary hover:bg-ink-dark text-white text-xs uppercase tracking-wider font-bold py-3 px-6 rounded transition-all cursor-pointer"
              >
                Solicitar Consultoria
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
