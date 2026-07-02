import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      // Graceful fallback during dev if key is not yet set
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI consulting will load with simulated intake feedback.");
    }
    ai = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// In-Memory Database for Consultation Contacts & Appointments
const appointments: any[] = [
  {
    id: "app-1",
    name: "Arthur de Souza",
    email: "arthur.souza@corp.com.br",
    phone: "(11) 98765-4321",
    subject: "Empresarial",
    message: "Necessitamos de uma análise preventiva para um novo contrato de prestação de serviços internacional.",
    date: "2026-06-15",
    preferredTimeSlot: "14:00 - 15:00",
    status: "Confirmado",
    createdAt: new Date().toISOString()
  },
  {
    id: "app-2",
    name: "Mariana Alencar",
    email: "mariana.alencar@outlook.com",
    phone: "(11) 99888-2222",
    subject: "Família e Sucessões",
    message: "Gostaria de agendar uma consulta para orientação sobre holding familiar e planejamento sucessório patrimonial.",
    date: "2026-06-18",
    preferredTimeSlot: "10:00 - 11:00",
    status: "Pendente",
    createdAt: new Date().toISOString()
  }
];

// Testimonials pre-population
const testimonials = [
  {
    id: "test-1",
    name: "Ricardo Santos",
    location: "São Paulo, SP",
    content: "Atendimento excepcional e resultados rápidos. A equipe demonstrou um conhecimento técnico impecável e resolveu meu caso com muita agilidade. Recomendo fortemente.",
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
    content: "Um escritório que realmente ouve o cliente. O atendimento humanizado fez toda a diferença em um momento delicado de planejamento sucessório familiar e testamento.",
    stars: 5
  }
];

// 1. Practice Areas Details
app.get("/api/practice-areas", (req, res) => {
  res.json([
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
      longDescription: "Nosso departamento civil atua de forma estratégica tanto na esfera consultiva e contratual quanto no contencioso de alta complexidade. Protegemos os interesses patrimoniais e existenciais de nossos clientes através de soluções criativas e seguras.",
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
      longDescription: "Oferecemos assessoria jurídica focada na mitigação de riscos trabalhistas para corporações (Compliance Trabalhista) e na defesa integral dos direitos trabalhistas de executivos e profissionais de alta gerência.",
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
      longDescription: "Atuamos como um verdadeiro parceiro de negócios das empresas. Desde a estruturação societária inicial até transações de fusões e aquisições (M&A), governança e blindagem patrimonial.",
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
});

// 2. Get Testimonials
app.get("/api/testimonials", (req, res) => {
  res.json(testimonials);
});

// 3. Post Testimonial (Dynamic Customer Feedback Loop)
app.post("/api/testimonials", (req, res) => {
  const { name, location, content, stars } = req.body;
  if (!name || !content || !stars) {
    return res.status(400).json({ error: "Por favor, preencha nome, depoimento e nota." });
  }
  const newT: any = {
    id: `test-${Date.now()}`,
    name,
    location: location || "São Paulo, SP",
    content,
    stars: Math.max(1, Math.min(5, Number(stars)))
  };
  testimonials.push(newT);
  res.status(201).json(newT);
});

// 4. Get Appointments / Consultation Requests
app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

// 5. Create Appointment / Consultation Request
app.post("/api/appointments", (req, res) => {
  const { name, email, phone, subject, message, date, preferredTimeSlot } = req.body;
  if (!name || !email || !phone || !subject) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes (nome, email, telefone, assunto)." });
  }

  const newApp = {
    id: `app-${Date.now()}`,
    name,
    email,
    phone,
    subject,
    message: message || "Nenhuma mensagem complementar adicionada.",
    date: date || new Date().toISOString().split('T')[0],
    preferredTimeSlot: preferredTimeSlot || "A combinar",
    status: "Pendente",
    createdAt: new Date().toISOString()
  };

  appointments.unshift(newApp);
  res.status(201).json(newApp);
});

// 6. Delete or Cancel Appointment (CRUD)
app.delete("/api/appointments/:id", (req, res) => {
  const { id } = req.params;
  const index = appointments.findIndex(a => a.id === id);
  if (index !== -1) {
    appointments.splice(index, 1);
    return res.json({ success: true, message: "Agendamento removido com sucesso." });
  }
  res.status(404).json({ error: "Agendamento não encontrado." });
});

// 7. Premium AI Consulting Assitant based on Gemini 3.5 Flash
app.post("/api/consult", async (req, res) => {
  const { prompt, history } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Por favor, envie o seu relato ou dúvida para prosseguir." });
  }

  try {
    const gemini = getGeminiClient();
    const isMock = process.env.GEMINI_API_KEY ? false : true;

    if (isMock) {
      // Realistic pre-written triage answer to guarantee excellent client UX even without live API key locally
      setTimeout(() => {
        const pLower = prompt.toLowerCase();
        let matchedArea = "Direito Civil";
        let tip = "Recomendamos que traga uma cópia de todos os contratos e comunicações trocadas.";

        if (pLower.includes("divorcio") || pLower.includes("guarda") || pLower.includes("inventario") || pLower.includes("filho") || pLower.includes("sucess")) {
          matchedArea = "Família e Sucessões";
          tip = "Questões de família necessitam de sensibilidade e sigilo. Guarde documentos civis (certidões) prontas para agilizarmos.";
        } else if (pLower.includes("empresa") || pLower.includes("socio") || pLower.includes("contrato social") || pLower.includes("comercial") || pLower.includes("m&a")) {
          matchedArea = "Direito Corporativo";
          tip = "Faremos uma auditoria do contrato social atual corporativo e traçaremos uma estratégia preventiva de compliance.";
        } else if (pLower.includes("trabalho") || pLower.includes("emprego") || pLower.includes("horas extra") || pLower.includes("demiss") || pLower.includes("rescis")) {
          matchedArea = "Direito do Trabalho";
          tip = "Tenha em mãos sua carteira de trabalho (CTPS), holerites e eventuais mensagens ou provas da relação trabalhista para análise rápida.";
        }

        res.json({
          response: `Olá! Eu sou o assistente de triagem jurídica inteligente da Dra. Amanda Ribeiro. Analisando o seu relato, seu caso se enquadra primariamente em **${matchedArea}**. \n\n**Próximo Passo Orientativo:** ${tip} \n\nAbaixo, no nosso formulário de agendamento na página principal, você já pode solicitar um horário e nossa equipe retornará com a melhor consultoria boutique personalizada!`,
          isSimulated: true
        });
      }, 800);
      return;
    }

    // Live backend connection to @google/genai SDK
    const systemInstruction =
      "Você é o assistente virtual inteligente e sofisticado de triagem do escritório 'Amanda Ribeiro Advogados Associados'. " +
      "Seu objetivo é acolher o visitante, triar o problema jurídico apresentado e " +
      "orientar quais documentos ou atitude tomar a seguir, indicando qual área do escritório lidará melhor com o caso: " +
      "Direito Civil, Direito do Trabalho, Família e Sucessões ou Direito Corporativo. " +
      "Escreva de maneira altamente refinada, acolhedor, profissional e prestativa em português do Brasil. " +
      "Mantenha a resposta curta, estruturada e objetiva em no máximo 150 palavras. Finalize sugerindo usar o formulário de agendamento do site.";

    // Convert client message history format to @google/genai contents format
    // For simplicity, we can pass it as formatted context or chat parts
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((msg: any) => {
        contents.push({
          role: msg.role === 'model' ? 'model' : 'user',
          parts: [{ text: msg.parts[0].text }]
        });
      });
    }
    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const aiRes = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = aiRes.text || "Pedimos desculpas, mas não foi possível processar sua triagem no momento. Por favor, utilize o WhatsApp direto para agendar.";
    res.json({ response: reply, isSimulated: false });

  } catch (err: any) {
    console.error("Gemini Intake Error:", err);
    res.status(500).json({ error: "Erro de processamento da IA: " + err.message });
  }
});

// Configure Vite middleware in development or express.static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION static delivery mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operative and listening on port http://localhost:${PORT}`);
  });
}

startServer();
