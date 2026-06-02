import React, { useState, useEffect } from 'react';
import { Star, MessageSquareCode, Check, Send } from 'lucide-react';
import { Testimonial } from '../types';

export default function Feedback() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // New review form states
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('São Paulo, SP');
  const [newContent, setNewContent] = useState('');
  const [newStars, setNewStars] = useState(5);

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newContent.trim()) {
      alert("Por favor, informe seu nome e escreva seu relato.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName,
          location: newLocation,
          content: newContent,
          stars: newStars
        })
      });
      if (res.ok) {
        setSuccess(true);
        setNewName('');
        setNewContent('');
        setNewStars(5);
        fetchFeedback(); // Reload feedback live
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
      alert("Falha ao salvar seu depoimento na rede.");
    } finally {
      setSubmitting(false);
    }
  };

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

        {/* Client Review form */}
        <div className="max-w-3xl mx-auto bg-primary text-white p-8 md:p-12 rounded-lg border border-gold-leaf/20 shadow-xl mt-16 relative overflow-hidden">
          {/* Background visuals */}
          <div className="absolute top-0 right-0 p-8 text-white/5 opacity-50 select-none pointer-events-none">
            <MessageSquareCode size={180} />
          </div>

          <div className="relative z-10">
            <h3 className="font-serif text-2xl font-bold tracking-tight mb-2">Já é nosso cliente?</h3>
            <p className="text-xs text-on-primary-container mb-8">
              Sua opinião contribui ativamente para a nossa melhoria contínua. Conte resumidamente como foi sua experiência de assessoria técnica.
            </p>

            {success ? (
              <div className="bg-gold-leaf/10 border border-gold-leaf text-gold-leaf p-4 rounded flex items-center gap-3 animate-fadeIn">
                <div className="p-1 bg-gold-leaf/20 rounded-full">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold">Muito obrigado! Seu depoimento foi registrado com sucesso.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gold-leaf font-semibold mb-1">Seu Nome</label>
                    <input 
                      type="text" 
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Ex: Dr. Roberto Alencar" 
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm font-light text-white focus:outline-none focus:border-gold-leaf transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gold-leaf font-semibold mb-1">Cidade / Estado</label>
                    <input 
                      type="text" 
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="Ex: São Paulo, SP" 
                      className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm font-light text-white focus:outline-none focus:border-gold-leaf transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-gold-leaf font-semibold mb-1">Nota (Estrelas)</label>
                    <div className="flex gap-2 text-gold-leaf cursor-pointer">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setNewStars(s)}
                          className="hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star className={`w-6 h-6 ${s <= newStars ? 'fill-current' : 'opacity-25'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gold-leaf font-semibold mb-1">Depoimento</label>
                  <textarea 
                    rows={3}
                    required
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Escreva como foi nosso atendimento, discrição e presteza nos prazos..." 
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm font-light text-white focus:outline-none focus:border-gold-leaf transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-gold-leaf hover:bg-[#c29e2f] text-primary font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? "Gravando depoimento..." : "Publicar Depoimento"}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
