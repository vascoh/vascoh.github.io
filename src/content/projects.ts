import type { L } from "@/i18n/config";

/**
 * Projects & case studies.
 *
 * Rules (see docs/CONTENT.md):
 * - Never publish client names, internal server names, queries, credentials or proprietary structures.
 * - Never invent metrics, features or technologies. Use `pendingConfirmation: true` while content
 *   still needs to be validated by Vasco — a discreet badge is shown on the page.
 * - Images go in /public/images/projects. Use synthetic data only.
 */

export type ProjectKind = "bi" | "digital";
export type ProjectStatus = "professional" | "published" | "development" | "concept";
export type ProjectIcon = "database" | "gauge" | "file" | "trophy" | "home" | "cake" | "anchor" | "search";

export interface ArchitectureStage {
  label: L;
  nodes: string[];
}

export interface GalleryItem {
  /** Path inside /public, or null for a placeholder frame. */
  src: string | null;
  alt: L;
}

export interface Project {
  slug: string;
  kind: ProjectKind;
  /** Also list the project in the other portfolio section. */
  alsoIn?: ProjectKind;
  status: ProjectStatus;
  icon: ProjectIcon;
  featured?: boolean;
  personal?: boolean;
  confidential?: boolean;
  /** Content still to be validated by the author — shows a "pending confirmation" note. */
  pendingConfirmation?: boolean;
  title: L;
  summary: L;
  /** Technologies — also used by the portfolio filter. Only confirmed technologies. */
  tags: string[];
  url?: string;
  context?: L;
  problem?: L;
  objective?: L;
  architecture?: ArchitectureStage[];
  approach?: L[];
  challenges?: L[];
  solution?: L;
  results?: L;
  role?: L;
  aiUsage?: L;
  features?: L[];
  gallery?: GalleryItem[];
  demo?: "football" | "sql-diagnostics";
}

const confidentialResults: L = {
  en: "Quantified results are not published to protect client confidentiality. Outcomes can be discussed in an interview context, within the limits of confidentiality agreements.",
  pt: "Os resultados quantificados não são publicados para proteger a confidencialidade do cliente. Podem ser discutidos em contexto de entrevista, dentro dos limites dos acordos de confidencialidade.",
};

export const projects: Project[] = [
  // ───────────────────────────── Business Intelligence ─────────────────────────────
  {
    slug: "enterprise-power-bi-large-scale-analytics",
    kind: "bi",
    status: "professional",
    icon: "database",
    featured: true,
    confidential: true,
    pendingConfirmation: true,
    title: {
      en: "Enterprise Power BI & Large-Scale Data Analytics",
      pt: "Power BI Empresarial & Análise de Dados em Larga Escala",
    },
    summary: {
      en: "BI solutions over datasets in the hundreds of millions of records — including one project with roughly 500–600 million rows — where performance, modelling and efficient querying were central.",
      pt: "Soluções de BI sobre conjuntos de dados na ordem das centenas de milhões de registos — incluindo um projeto com cerca de 500–600 milhões de linhas — onde a performance, a modelação e a consulta eficiente foram centrais.",
    },
    tags: ["Power BI", "DAX", "Power Query", "SQL Server", "Data Modeling"],
    context: {
      en: "Enterprise environment with large fact tables, multiple business areas consuming the same data, and reports expected to remain responsive for daily decision-making.",
      pt: "Ambiente empresarial com tabelas de factos de grande dimensão, várias áreas de negócio a consumir os mesmos dados e relatórios que tinham de se manter rápidos para a tomada de decisão diária.",
    },
    problem: {
      en: "At this volume, naïve models and queries quickly become slow to refresh and slow to explore. Business users need reliable figures and responsive reports — without waiting minutes for a visual to load.",
      pt: "Com este volume, modelos e queries pouco cuidados tornam-se rapidamente lentos a atualizar e a explorar. Os utilizadores de negócio precisam de números fiáveis e relatórios rápidos — sem esperar minutos por um visual.",
    },
    objective: {
      en: "Deliver a semantic model and reports that scale to hundreds of millions of rows while keeping refresh times, memory footprint and query response under control.",
      pt: "Entregar um modelo semântico e relatórios que escalem para centenas de milhões de linhas, mantendo sob controlo os tempos de atualização, a memória utilizada e o tempo de resposta.",
    },
    architecture: [
      { label: { en: "Sources", pt: "Fontes" }, nodes: ["Operational systems", "SQL Server"] },
      { label: { en: "Data layer", pt: "Camada de dados" }, nodes: ["T-SQL views", "Stored procedures", "Indexing"] },
      { label: { en: "Semantic model", pt: "Modelo semântico" }, nodes: ["Star schema", "Power Query", "DAX measures"] },
      { label: { en: "Consumption", pt: "Consumo" }, nodes: ["Power BI reports", "Business users"] },
    ],
    approach: [
      {
        en: "Dimensional modelling (star schema) with clear separation between facts and dimensions.",
        pt: "Modelação dimensional (star schema) com separação clara entre factos e dimensões.",
      },
      {
        en: "Pushing heavy transformations upstream to SQL Server instead of the report layer.",
        pt: "Deslocar transformações pesadas para o SQL Server em vez da camada de relatório.",
      },
      {
        en: "Reducing column cardinality and removing unused columns to keep the model compact.",
        pt: "Reduzir a cardinalidade das colunas e remover colunas não utilizadas para manter o modelo compacto.",
      },
      {
        en: "Writing DAX measures with performance in mind and validating them against source figures.",
        pt: "Escrever medidas DAX com foco em performance e validá-las contra os valores de origem.",
      },
    ],
    challenges: [
      { en: "Refresh duration and memory consumption at this scale.", pt: "Duração das atualizações e consumo de memória a esta escala." },
      { en: "Keeping visuals responsive under heavy filtering.", pt: "Manter os visuais rápidos com filtragem intensiva." },
      { en: "Guaranteeing consistency between report figures and source systems.", pt: "Garantir consistência entre os valores dos relatórios e os sistemas de origem." },
    ],
    solution: {
      en: "A performance-oriented end-to-end design: optimized SQL data layer, compact dimensional model and carefully written measures — validated with business users.",
      pt: "Um desenho end-to-end orientado para a performance: camada SQL otimizada, modelo dimensional compacto e medidas cuidadosamente escritas — validados com os utilizadores de negócio.",
    },
    results: confidentialResults,
    gallery: [
      { src: null, alt: { en: "Conceptual model diagram (synthetic)", pt: "Diagrama conceptual do modelo (sintético)" } },
      { src: null, alt: { en: "Dashboard with synthetic data", pt: "Dashboard com dados sintéticos" } },
    ],
  },
  {
    slug: "sql-server-performance-optimization",
    kind: "bi",
    status: "professional",
    icon: "gauge",
    featured: true,
    confidential: true,
    pendingConfirmation: true,
    title: {
      en: "SQL Server Performance & Process Optimization",
      pt: "Performance SQL Server & Otimização de Processos",
    },
    summary: {
      en: "Optimization of queries, stored procedures and reporting processes in SQL Server — from diagnosis and execution plan analysis to bottleneck removal.",
      pt: "Otimização de queries, stored procedures e processos de reporting em SQL Server — do diagnóstico e análise de planos de execução à remoção de gargalos.",
    },
    tags: ["SQL Server", "T-SQL", "Performance Tuning", "Indexing"],
    problem: {
      en: "Reporting processes and stored procedures that took too long, competed for resources or failed to finish within their execution windows.",
      pt: "Processos de reporting e stored procedures que demoravam demasiado, competiam por recursos ou não terminavam dentro das janelas de execução.",
    },
    objective: {
      en: "Identify the real bottlenecks with evidence, fix them with minimal risk and make processes predictable.",
      pt: "Identificar os gargalos reais com base em evidência, corrigi-los com risco mínimo e tornar os processos previsíveis.",
    },
    architecture: [
      { label: { en: "Measure", pt: "Medir" }, nodes: ["Baseline timings", "I/O & CPU statistics"] },
      { label: { en: "Diagnose", pt: "Diagnosticar" }, nodes: ["Execution plans", "Wait analysis", "Hot spots"] },
      { label: { en: "Optimize", pt: "Otimizar" }, nodes: ["Query rewrite", "Indexing", "Set-based logic"] },
      { label: { en: "Validate", pt: "Validar" }, nodes: ["Result parity", "Before/after timings"] },
    ],
    approach: [
      { en: "Establish a baseline before changing anything.", pt: "Estabelecer uma baseline antes de alterar o que quer que seja." },
      {
        en: "Read execution plans to find expensive operators: scans on large tables, key lookups, spills, implicit conversions.",
        pt: "Ler planos de execução para encontrar operadores caros: scans em tabelas grandes, key lookups, spills, conversões implícitas.",
      },
      {
        en: "Replace row-by-row logic with set-based T-SQL where possible.",
        pt: "Substituir lógica linha-a-linha por T-SQL orientado a conjuntos sempre que possível.",
      },
      {
        en: "Review indexing and statistics, and validate that results are identical after each change.",
        pt: "Rever índices e estatísticas, e validar que os resultados são idênticos após cada alteração.",
      },
    ],
    challenges: [
      { en: "Changing critical processes without affecting results.", pt: "Alterar processos críticos sem afetar resultados." },
      { en: "Distinguishing symptoms from root causes.", pt: "Distinguir sintomas de causas reais." },
    ],
    solution: {
      en: "A repeatable diagnostic methodology — measure, diagnose, optimize, validate — applied to queries, procedures and reporting chains.",
      pt: "Uma metodologia de diagnóstico repetível — medir, diagnosticar, otimizar, validar — aplicada a queries, procedures e cadeias de reporting.",
    },
    results: confidentialResults,
    demo: "sql-diagnostics",
  },
  {
    slug: "financial-reporting-data-automation",
    kind: "bi",
    status: "professional",
    icon: "file",
    confidential: true,
    pendingConfirmation: true,
    title: {
      en: "Financial Reporting & Data Automation",
      pt: "Reporting Financeiro & Automatização de Dados",
    },
    summary: {
      en: "Development and maintenance of automated reporting processes — extraction, transformation and data validation — in a financial context.",
      pt: "Desenvolvimento e manutenção de processos automatizados de reporting — extração, transformação e validação de dados — em contexto financeiro.",
    },
    tags: ["SQL Server", "SSIS", "SSRS", "ETL", "Automation"],
    problem: {
      en: "Recurring reports that depend on several data sources, strict deadlines and zero tolerance for inconsistent figures.",
      pt: "Relatórios recorrentes que dependem de várias fontes, prazos rigorosos e tolerância zero para valores inconsistentes.",
    },
    objective: {
      en: "Automate extraction, transformation and validation so that reports are produced reliably and on time, with less manual effort.",
      pt: "Automatizar a extração, transformação e validação para que os relatórios sejam produzidos de forma fiável e atempada, com menos esforço manual.",
    },
    architecture: [
      { label: { en: "Extract", pt: "Extrair" }, nodes: ["Source systems", "Files"] },
      { label: { en: "Transform", pt: "Transformar" }, nodes: ["ETL packages", "T-SQL procedures"] },
      { label: { en: "Validate", pt: "Validar" }, nodes: ["Reconciliation checks", "Data-quality rules"] },
      { label: { en: "Report", pt: "Reportar" }, nodes: ["Paginated reports", "Distribution"] },
    ],
    approach: [
      { en: "Standardized ETL flows with clear, traceable steps.", pt: "Fluxos ETL normalizados, com passos claros e rastreáveis." },
      { en: "Validation and reconciliation checks before any figure is published.", pt: "Validações e reconciliações antes de qualquer valor ser publicado." },
      { en: "Ongoing maintenance as business rules and sources evolve.", pt: "Manutenção contínua à medida que regras de negócio e fontes evoluem." },
    ],
    solution: {
      en: "Automated, validated reporting pipelines — described here only in generic, anonymized terms.",
      pt: "Pipelines de reporting automatizados e validados — descritos aqui apenas em termos genéricos e anonimizados.",
    },
    results: confidentialResults,
  },
  {
    slug: "football-analytics-power-bi-ai",
    kind: "bi",
    alsoIn: "digital",
    status: "development",
    icon: "trophy",
    featured: true,
    personal: true,
    pendingConfirmation: true,
    title: {
      en: "Football Analytics with Power BI & AI",
      pt: "Football Analytics com Power BI & IA",
    },
    summary: {
      en: "Personal project analysing football statistics with Python, data modelling, Power BI and DAX — developed with LLM assistance. A learning and exploration project, not a commercial product.",
      pt: "Projeto pessoal de análise de estatísticas de futebol com Python, modelação de dados, Power BI e DAX — desenvolvido com apoio de LLMs. Um projeto de aprendizagem e exploração, não um produto comercial.",
    },
    tags: ["Python", "Power BI", "DAX", "Data Modeling", "LLMs"],
    problem: {
      en: "Football statistics are abundant but fragmented. The challenge is turning raw match and player data into a consistent model and meaningful indicators.",
      pt: "As estatísticas de futebol são abundantes mas fragmentadas. O desafio é transformar dados brutos de jogos e jogadores num modelo consistente e em indicadores com significado.",
    },
    objective: {
      en: "Build an end-to-end analytics project — data collection, modelling, DAX indicators and dashboards — while exploring how LLMs can speed up each step.",
      pt: "Construir um projeto de análise end-to-end — recolha de dados, modelação, indicadores DAX e dashboards — explorando a forma como os LLMs podem acelerar cada passo.",
    },
    architecture: [
      { label: { en: "Data", pt: "Dados" }, nodes: ["Football statistics"] },
      { label: { en: "Processing", pt: "Processamento" }, nodes: ["Python", "Cleaning & shaping"] },
      { label: { en: "Model", pt: "Modelo" }, nodes: ["Star schema", "DAX measures"] },
      { label: { en: "Insights", pt: "Insights" }, nodes: ["Power BI dashboards"] },
    ],
    approach: [
      { en: "Python scripts to collect and prepare the data.", pt: "Scripts Python para recolher e preparar os dados." },
      { en: "Dimensional model (matches, teams, players, competitions).", pt: "Modelo dimensional (jogos, equipas, jogadores, competições)." },
      { en: "DAX measures for performance indicators.", pt: "Medidas DAX para indicadores de desempenho." },
      { en: "LLMs used as a pair-programmer for code, DAX drafts and documentation — always reviewed.", pt: "LLMs usados como pair-programmer para código, rascunhos de DAX e documentação — sempre revistos." },
    ],
    role: { en: "Sole developer — data, model and dashboards.", pt: "Desenvolvimento integral — dados, modelo e dashboards." },
    aiUsage: {
      en: "LLMs helped draft Python and DAX, explain errors and document the model. Every output was tested and validated manually.",
      pt: "Os LLMs ajudaram a escrever rascunhos de Python e DAX, explicar erros e documentar o modelo. Todos os resultados foram testados e validados manualmente.",
    },
    gallery: [
      { src: null, alt: { en: "Team performance dashboard", pt: "Dashboard de desempenho de equipas" } },
      { src: null, alt: { en: "Data model diagram", pt: "Diagrama do modelo de dados" } },
    ],
    demo: "football",
  },

  // ───────────────────────────── AI & Digital ─────────────────────────────
  {
    slug: "anfitrioes-pt",
    kind: "digital",
    status: "published",
    icon: "home",
    featured: true,
    pendingConfirmation: true,
    title: { en: "Anfitrioes.pt", pt: "Anfitrioes.pt" },
    summary: {
      en: "Digital platform for the Portuguese short-term rental (Alojamento Local) sector, with solutions for hosts.",
      pt: "Plataforma digital para o setor do Alojamento Local, com soluções para anfitriões.",
    },
    tags: ["AI-assisted Development", "LLMs"],
    url: "https://anfitrioes.pt",
    problem: {
      en: "Hosts in the Alojamento Local sector need clear, accessible information and tools in one place.",
      pt: "Os anfitriões de Alojamento Local precisam de informação e ferramentas claras e acessíveis num só lugar.",
    },
    role: { en: "Concept, development and publication.", pt: "Conceito, desenvolvimento e publicação." },
    aiUsage: {
      en: "LLMs used as a development accelerator; architecture, review and validation done by me.",
      pt: "LLMs usados como acelerador de desenvolvimento; arquitetura, revisão e validação feitas por mim.",
    },
    gallery: [{ src: null, alt: { en: "Anfitrioes.pt homepage", pt: "Página inicial Anfitrioes.pt" } }],
  },
  {
    slug: "rc-cakes",
    kind: "digital",
    status: "published",
    icon: "cake",
    featured: true,
    pendingConfirmation: true,
    title: { en: "RC Cakes", pt: "RC Cakes" },
    summary: {
      en: "Website for a cake & pastry business — presenting products and services and enabling customer interaction.",
      pt: "Website para um negócio de confeitaria — apresentação de produtos e serviços e interação com clientes.",
    },
    tags: ["AI-assisted Development", "LLMs"],
    url: "https://robertaccakes.pt",
    problem: {
      en: "A small business needed a professional online presence to showcase its work and make it easy for customers to get in touch.",
      pt: "Um pequeno negócio precisava de uma presença online profissional para mostrar o seu trabalho e facilitar o contacto dos clientes.",
    },
    role: { en: "Design, development and publication.", pt: "Design, desenvolvimento e publicação." },
    aiUsage: {
      en: "LLMs used to accelerate development and content structure; decisions and review done by me.",
      pt: "LLMs usados para acelerar o desenvolvimento e a estrutura de conteúdos; decisões e revisão feitas por mim.",
    },
    gallery: [{ src: null, alt: { en: "RC Cakes homepage", pt: "Página inicial RC Cakes" } }],
  },
  {
    slug: "patrao-mor-amora",
    kind: "digital",
    status: "development",
    icon: "anchor",
    pendingConfirmation: true,
    title: { en: "Patrão Mor Amora", pt: "Patrão Mor Amora" },
    summary: {
      en: "Informative website project and digital presence.",
      pt: "Projeto de website informativo e presença digital.",
    },
    tags: ["AI-assisted Development", "LLMs"],
    aiUsage: {
      en: "LLM-assisted development, with human review of structure and content.",
      pt: "Desenvolvimento assistido por LLMs, com revisão humana da estrutura e dos conteúdos.",
    },
  },
  {
    slug: "sql-assessment-mis-monitor",
    kind: "digital",
    status: "development",
    icon: "search",
    pendingConfirmation: true,
    title: { en: "SQL Assessment / MIS Monitor", pt: "SQL Assessment / MIS Monitor" },
    summary: {
      en: "Technical analysis and assessment of SQL code, focused on performance, code quality and monitoring.",
      pt: "Análise e avaliação técnica de código SQL, com foco em performance, qualidade de código e monitorização.",
    },
    tags: ["SQL Server", "T-SQL", "Performance Tuning", "LLMs"],
    problem: {
      en: "SQL codebases grow over time and accumulate performance and quality issues that are hard to see without a structured assessment.",
      pt: "As bases de código SQL crescem com o tempo e acumulam problemas de performance e qualidade difíceis de identificar sem uma avaliação estruturada.",
    },
    aiUsage: {
      en: "LLMs assist in building the tooling and documentation; assessment criteria are defined from hands-on SQL Server experience.",
      pt: "Os LLMs ajudam na construção das ferramentas e documentação; os critérios de avaliação são definidos com base na experiência prática em SQL Server.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function projectsOf(kind: ProjectKind) {
  return projects.filter((p) => p.kind === kind || p.alsoIn === kind);
}

export const allTags = Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
