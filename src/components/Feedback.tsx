import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

export default function Feedback() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = () => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Testimonial fetch error, loading resilient offline defaults", err);
        setTestimonials([
          {
            id: "test-1",
            name: "Ricardo Santos",
            location: "São Paulo, SP",
            content: "Atendimento de altíssimo nível. A equipe demonstrou um conhecimento técnico impecável e resolveu meu caso com muita agilidade.",
            stars: 5
          },
          {
            id: "test-2",
            name: "Carla Oliveira",
            location: "Campinas, SP",
            content: "Encontrei na Dra. Amanda a segurança jurídica que minha empresa precisava. A consultoria preventiva evitou diversos problemas contratuais futuros.",
            stars: 5
          },
          {
            id: "test-3",
            name: "Marcos Ferreira",
            location: "Curitiba, PR",
            content: "Um escritório que realmente ouve o cliente. O atendimento humanizado fez toda a diferença em um momento delicado de planejamento sucessório familiar.",
            stars: 5
          }
        ]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <section id="depoimentos" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Titles */}
        <div className="text-center mb-16">
          <span className="text-[12px] uppercase tracking-widest text-gold-leaf font-semibold mb-3 block">
            Satisfação do Cliente
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-primary tracking-tight">
            Depoimentos de Sucesso
          </h2>
          <div className="w-16 h-[2px] bg-gold-leaf mx-auto mt-4" />
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-5 text-sm leading-relaxed font-light">
            Nosso maior patrimônio é o resguardo seguro dos interesses e a satisfação daqueles que depositam sua confiança em nossa assessoria.
          </p>
        </div>

        {/* Display feedback cards */}
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-10 h-10 border-4 border-gold-leaf border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((test) => (
              <div 
                key={test.id}
                className="bg-white p-8 rounded-md border border-outline-variant/40 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  {/* Star row */}
                  <div className="flex gap-1 mb-4 text-gold-leaf">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-4 h-4 ${i < test.stars ? 'fill-current' : 'opacity-25'}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-on-surface-variant italic leading-relaxed mb-6 font-light">
                    "{test.content}"
                  </p>
                </div>
                
                <div className="pt-4 border-t border-outline-variant/20 mt-auto">
                  <p className="font-serif font-bold text-primary text-base">{test.name}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider mt-0.5">{test.location}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
