import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, Trash2, Check, Sparkles, Server } from 'lucide-react';
import { ConsultationRequest } from '../types';

interface ContactProps {
  preselectedSubject?: string;
  onClearPreselected: () => void;
  onOpenAI: () => void;
}

export default function Contact({ preselectedSubject, onClearPreselected, onOpenAI }: ContactProps) {
  const [activeTab, setActiveTab] = useState<'form' | 'dashboard'>('form');
  const [appointments, setAppointments] = useState<ConsultationRequest[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Direito Civil');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 - 11:00');
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preselectedSubject) {
      setSubject(preselectedSubject);
      setActiveTab('form');
    }
  }, [preselectedSubject]);

  const loadAppointments = () => {
    setLoadingDashboard(true);
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoadingDashboard(false);
      })
      .catch(err => {
        console.error("Failed to load appointments:", err);
        setLoadingDashboard(false);
      });
  };

  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadAppointments();
    }
  }, [activeTab]);

  const handleCancelAppointment = async (id: string) => {
    if (!confirm("Tem certeza que deseja cancelar e excluir esta solicitação de consultoria?")) return;

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        loadAppointments(); // Reload
      }
    } catch (err) {
      console.error(err);
      alert("Falha de conexão ao cancelar.");
    }
  };

  const handleSubmitSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !date) {
      alert("Por favor, preencha todos os campos fundamentais e informe a data pretendida.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          date,
          preferredTimeSlot: timeSlot
        })
      });

      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setDate('');
        onClearPreselected();
        setTimeout(() => {
          setSuccess(false);
          setActiveTab('dashboard'); // Switch to let user view their scheduled appt!
        }, 3000);
      } else {
        const err = await res.json();
        alert(err.error || "Algo deu errado durante a gravação judicial.");
      }
    } catch (err) {
      console.error(err);
      alert("Falha de comunicação de agendamento na rede.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Columns (4 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[12px] uppercase tracking-widest text-gold-leaf font-semibold mb-3 block">
                Canais Diretos
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-primary tracking-tight mb-6">
                Estamos prontos <br />para ouvir você
              </h2>
              <p className="text-sm text-on-surface-variant font-light leading-relaxed mb-10">
                Entre em contato pelos nossos canais corporativos oficiais ou utilize nosso formulário de intake digital para registrar sua consulta. Retornares em até 2 horas úteis.
              </p>

              {/* Direct channels List container */}
              <div className="space-y-8 mb-10">
                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/5 p-3 rounded group-hover:bg-gold-leaf/10 border border-gold-leaf/20 transition-colors">
                    <Mail className="w-5 h-5 text-gold-leaf" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">E-mail Corporativo</h4>
                    <p className="text-sm text-primary font-bold mt-0.5">contato@ribeiroadv.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/5 p-3 rounded group-hover:bg-gold-leaf/10 border border-gold-leaf/20 transition-colors">
                    <Phone className="w-5 h-5 text-gold-leaf" />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Telefone / Central WhatsApp</h4>
                    <p className="text-sm text-primary font-bold mt-0.5">+55 (11) 99999-0000</p>
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

            {/* AI Call to Action banner */}
            <div className="p-6 bg-primary text-white rounded-lg border border-gold-leaf/25 shadow-md relative overflow-hidden">
              <span className="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 text-white/5 font-serif select-none pointer-events-none text-9xl">AI</span>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2 text-gold-leaf">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Triador Virtual Inteligente</span>
                </div>
                <p className="text-xs text-on-primary-container leading-relaxed mb-4">
                  Deseja triar seu caso civil, de família ou societário antes do agendamento de forma interativa? Nossa inteligência jurídica extrai orientações úteis para você.
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

          {/* Intake Interactive Form Workspace (7 cols) */}
          <div className="lg:col-span-7 bg-surface p-6 sm:p-10 rounded-lg border border-outline-variant/30 shadow-xs flex flex-col">
            
            {/* Nav tabs for workspace layout */}
            <div className="flex border-b border-outline-variant/50 mb-8 shrink-0">
              <button
                onClick={() => setActiveTab('form')}
                className={`py-3 px-4 font-sans text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors relative cursor-pointer ${
                  activeTab === 'form' 
                    ? 'border-gold-leaf text-primary font-bold' 
                    : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                1. Solicitar Agendamento
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`py-3 px-4 font-sans text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors relative flex items-center gap-2 cursor-pointer ${
                  activeTab === 'dashboard' 
                    ? 'border-gold-leaf text-primary font-bold' 
                    : 'border-transparent text-on-surface-variant hover:text-primary'
                }`}
              >
                2. Consultas Solicitadas
                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Gerenciar
                </span>
              </button>
            </div>

            {/* TAB CONTENT: FORM */}
            {activeTab === 'form' && (
              <div className="flex-1">
                {success ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-10 animate-scaleIn">
                    <div className="w-16 h-16 bg-gold-leaf/10 border border-gold-leaf rounded-full flex items-center justify-center text-gold-leaf mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-primary mb-2">Envio Concluído!</h3>
                    <p className="text-sm text-on-surface-variant max-w-md">
                      Sua solicitação está sendo revisada pela Dra. Amanda. Vamos analisar a situação e entrar em contato em instantes no telefone informado.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitSchedule} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">Nome Completo</label>
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
                        <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">E-mail para Contato</label>
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">Telefone / WhatsApp</label>
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
                        <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">Área Pretendida</label>
                        <select 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all"
                        >
                          <option value="Direito Civil">Direito Civil</option>
                          <option value="Família e Sucessões">Família e Sucessões</option>
                          <option value="Direito do Trabalho">Direito do Trabalho</option>
                          <option value="Direito Corporativo">Direito Corporativo</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-gold-leaf" />
                          Data Sugerida
                        </label>
                        <input 
                          type="date" 
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gold-leaf" />
                          Horário de Preferência
                        </label>
                        <select 
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all"
                        >
                          <option value="10:00 - 11:00">Manhã (10h às 11h)</option>
                          <option value="14:00 - 15:00">Tarde (14h às 15h)</option>
                          <option value="16:00 - 17:00">Tarde (16h às 17h)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-primary font-semibold mb-1">Mensagem Complementar (Opcional)</label>
                      <textarea 
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Forneça detalhes adicionais para otimizarmos a nossa consulta de triagem..." 
                        className="w-full bg-white border border-outline-variant/60 rounded px-4 py-2.5 text-sm font-light text-primary focus:outline-none focus:border-gold-leaf focus:ring-1 focus:ring-gold-leaf transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-primary hover:bg-ink-dark disabled:bg-primary/50 text-white font-bold text-xs uppercase tracking-widest py-4 rounded transition-all cursor-pointer shadow"
                    >
                      {submitting ? "Gravando Solicitação..." : "Enviar Solicitação de Horário"}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB CONTENT: DASHBOARD (CRUD list of appts) */}
            {activeTab === 'dashboard' && (
              <div id="agendamentos" className="flex-1 flex flex-col justify-between">
                {loadingDashboard ? (
                  <div className="py-12 flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-gold-leaf border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="py-16 text-center">
                    <Calendar className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-4" />
                    <p className="text-sm text-on-surface-variant font-light">Nenhum agendamento pendente registrado no sistema comercial.</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
                    {appointments.map((appt) => (
                      <div 
                        key={appt.id}
                        className="bg-white border border-outline-variant/40 p-4 sm:p-5 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-xs transition-shadow"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-primary font-serif">{appt.name}</span>
                            <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                              appt.status === 'Confirmado' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gold-leaf/20 text-gold-leaf-deep text-amber-800'
                            }`}>
                              {appt.status}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-2.5 text-xs text-on-surface-variant font-light">
                            <p>Assunto: <strong className="font-semibold text-primary">{appt.subject}</strong></p>
                            <p>Data: <strong className="font-semibold">{appt.date}</strong></p>
                            <p>Telefone: <strong>{appt.phone}</strong></p>
                            <p>Horário: <strong>{appt.preferredTimeSlot}</strong></p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleCancelAppointment(appt.id)}
                          className="p-2 text-on-surface-variant hover:text-red-600 rounded bg-red-50 hover:bg-red-100 transition-colors cursor-pointer self-end sm:self-auto"
                          aria-label="Cancelar Agendamento"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Dashboard helper tip */}
                <div className="mt-6 pt-4 border-t border-outline-variant/30 text-[10px] text-on-surface-variant leading-relaxed flex items-center gap-2">
                  <Server className="w-4 h-4 text-gold-leaf shrink-0" />
                  <span>Sincronizado ativamente com o servidor de banco de dados do escritório boutique.</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
