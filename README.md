<div align="center">

# ⚖️ Amanda Ribeiro Advocacia

**Website institucional e plataforma de consultoria jurídica inteligente**

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_AI-3.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/Licença-MIT-green?style=for-the-badge)

</div>

---

## 📋 Sobre o Projeto

Plataforma web completa desenvolvida para o escritório **Amanda Ribeiro Advogados Associados**, combinando um site institucional moderno com funcionalidades avançadas de agendamento de consultas e triagem jurídica inteligente via IA (Gemini 3.5 Flash).

O sistema foi projetado com foco em **experiência premium do usuário**, utilizando animações fluidas (Framer Motion), design responsivo e uma paleta visual elegante voltada ao público jurídico.

---

## ✨ Funcionalidades

### 🏛️ Site Institucional
- **Hero Section** — Apresentação principal com chamada para ação e acesso ao assistente de IA
- **Sobre o Escritório** — Seção institucional com informações do escritório e da equipe
- **Áreas de Atuação** — Layout Bento Grid com as 4 áreas de especialização:
  - Direito Civil
  - Família e Sucessões
  - Direito do Trabalho
  - Direito Corporativo
- **Navegação inteligente** — Header com indicador dinâmico da seção ativa via scroll

### 🤖 Assistente Jurídico com IA (Gemini 3.5 Flash)
- **Triagem jurídica automatizada** — Analisa o relato do cliente e identifica a área de atuação mais adequada
- **Orientação de documentos** — Sugere documentos necessários para a consulta
- **Histórico de conversa** — Mantém contexto da conversa para interações mais naturais
- **Modo simulado** — Funciona mesmo sem chave de API, com respostas pré-programadas inteligentes

### 📅 Sistema de Agendamento de Consultas
- **Formulário completo** — Campos para nome, e-mail, telefone, assunto, mensagem, data e horário preferido
- **Pré-seleção de área** — Ao clicar em uma área de atuação, o formulário já vem com o assunto preenchido
- **Gerenciamento de consultas** — Listagem, criação e cancelamento de agendamentos (CRUD)
- **Status de acompanhamento** — Agendamentos com status: Pendente, Confirmado ou Concluído

### ⭐ Sistema de Depoimentos
- **Depoimentos de clientes** — Exibição de avaliações com nota em estrelas
- **Envio de novos depoimentos** — Formulário para clientes enviarem feedback
- **Atualização em tempo real** — Novos depoimentos aparecem instantaneamente

### 📱 Integrações e UX
- **Botão flutuante do WhatsApp** — Acesso rápido ao contato via WhatsApp com animação pulsante
- **Animações com Framer Motion** — Transições suaves e micro-animações em toda a interface
- **Design 100% responsivo** — Adaptado para desktop, tablet e mobile
- **Scroll suave** — Navegação entre seções com scroll animado

---

## 🛠️ Tecnologias Utilizadas

| Camada        | Tecnologia                                                        |
|---------------|-------------------------------------------------------------------|
| **Frontend**  | React 19, TypeScript 5.8, Tailwind CSS 4, Framer Motion (Motion) |
| **Backend**   | Node.js, Express 4, TSX                                           |
| **IA**        | Google Gemini 3.5 Flash (`@google/genai` SDK)                     |
| **Build**     | Vite 6, ESBuild                                                   |
| **Ícones**    | Lucide React                                                      |
| **Ambiente**  | dotenv                                                            |

---

## 📁 Estrutura do Projeto

```
Amanda-Ribeiro-Advogados/
├── index.html                  # Ponto de entrada HTML
├── server.ts                   # Servidor Express + API REST + Gemini AI
├── vite.config.ts              # Configuração do Vite
├── tsconfig.json               # Configuração do TypeScript
├── package.json                # Dependências e scripts
├── metadata.json               # Metadados do projeto
├── .env.example                # Variáveis de ambiente de exemplo
├── dist/                       # Build de produção
└── src/
    ├── main.tsx                # Ponto de entrada React
    ├── App.tsx                 # Componente raiz com roteamento de seções
    ├── index.css               # Estilos globais
    ├── types.ts                # Interfaces TypeScript
    ├── assets/                 # Recursos estáticos
    └── components/
        ├── Header.tsx          # Barra de navegação com indicador ativo
        ├── Hero.tsx            # Seção principal / banner
        ├── About.tsx           # Sobre o escritório
        ├── Expertise.tsx       # Áreas de atuação (Bento Grid)
        ├── Feedback.tsx        # Depoimentos de clientes
        ├── Contact.tsx         # Formulário de agendamento e contato
        ├── AIAssistant.tsx     # Drawer do assistente de IA
        └── Footer.tsx          # Rodapé institucional
```

---

## 🔌 API REST

O servidor Express expõe os seguintes endpoints:

| Método   | Endpoint                  | Descrição                                  |
|----------|---------------------------|--------------------------------------------|
| `GET`    | `/api/practice-areas`     | Lista as áreas de atuação do escritório    |
| `GET`    | `/api/testimonials`       | Lista os depoimentos de clientes           |
| `POST`   | `/api/testimonials`       | Envia um novo depoimento                   |
| `GET`    | `/api/appointments`       | Lista os agendamentos de consultas         |
| `POST`   | `/api/appointments`       | Cria um novo agendamento de consulta       |
| `DELETE` | `/api/appointments/:id`   | Remove/cancela um agendamento              |
| `POST`   | `/api/consult`            | Envia mensagem ao assistente de IA Gemini  |

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [npm](https://www.npmjs.com/) (incluso com o Node.js)

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/DanielSantanaSilva/Amanda-Ribeiro-Advogados.git

# 2. Acesse o diretório do projeto
cd Amanda-Ribeiro-Advogados

# 3. Instale as dependências
npm install
```

### Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure:

```env
GEMINI_API_KEY="sua-chave-api-gemini-aqui"
APP_URL="http://localhost:3000"
```

> **💡 Nota:** O assistente de IA funciona em modo simulado mesmo sem a chave do Gemini, com respostas inteligentes pré-programadas.

### Executando em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Executar em produção
npm run start
```

---

## 📜 Scripts Disponíveis

| Script          | Comando            | Descrição                                    |
|-----------------|--------------------|----------------------------------------------|
| `dev`           | `npm run dev`      | Inicia o servidor de desenvolvimento         |
| `build`         | `npm run build`    | Gera o build de produção (Vite + ESBuild)    |
| `start`         | `npm run start`    | Executa o build de produção                  |
| `preview`       | `npm run preview`  | Pré-visualiza o build de produção via Vite   |
| `clean`         | `npm run clean`    | Remove arquivos de build                     |
| `lint`          | `npm run lint`     | Verifica erros de tipagem com TypeScript     |

---

## 👨‍💻 Criador

<div align="center">

Desenvolvido com ❤️ por **Daniel Santana**

[![GitHub](https://img.shields.io/badge/GitHub-DanielSantanaSilva-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/DanielSantanaSilva)

</div>

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
