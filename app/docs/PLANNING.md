# AI Job Hunter — Plano de Arquitetura (Fase 2)

> Estado: rascunho v1, gerado a partir da Fase 1 (Descoberta parcial) + master prompt.
> Este documento é o plano vivo do produto. Deve ser atualizado sempre que a arquitetura mudar.

## 1. Fase 1 — Descoberta (o que já sabemos vs. o que falta)

Sem acesso a CV, LinkedIn ou certificados, a descoberta baseou-se apenas no GitHub público `vascoh`:

- Repositórios públicos recentes: `patrao-mor-amora` (site para escola náutica, TypeScript),
  `anfitriao` (site para anfitriões/alojamento local, TypeScript), `robertaccakes` (site para
  negócio de bolos artesanais, privado), `vascoh.github.io` (portfolio, Jekyll).
- Padrão observado: freelancer/full-stack focado em **sites e produtos digitais para pequenos
  negócios em Portugal**, stack **TypeScript-first** (provavelmente Next.js/React), entregas
  ponta-a-ponta (design, SEO local, conversão).
- Sem sinal de projetos open-source de larga escala, sem indicação de senioridade formal, sem
  dados de mercado-alvo (remoto vs. PT, faixa salarial, tipo de empresa).

**Bloqueado — precisa de input humano antes de o Matching Agent poder funcionar com confiança:**
CV atualizado (PDF/texto), URL do LinkedIn, lista de certificados, preferências (localização,
remoto, faixa salarial mínima, tipos de empresa a evitar). Estes campos ficam marcados como
`TODO(human)` no schema da base de dados (tabela `candidate_profile`) e a UI deve pedi-los no
onboarding — o agente não deve continuar a inventar dados sobre o utilizador.

## 2. Decisão de produto: human-in-the-loop obrigatório no envio de candidaturas

Por decisão explícita do utilizador (risco de violação de ToS de LinkedIn/Indeed/Glassdoor e de
suspensão de conta real), o `Apply Agent` **nunca submete uma candidatura sozinho**. O fluxo
termina sempre em "pronta a enviar" (CV adaptado + carta + respostas às perguntas de triagem
geradas) e exige um clique humano de confirmação. Isto está refletido no modelo de dados
(`applications.status = draft_ready` é o estado terminal automático) e deve manter-se assim salvo
decisão explícita em contrário do utilizador.

## 3. Arquitetura

```
                        ┌─────────────────────┐
                        │   Frontend (Next.js) │  dashboard, pipeline, revisão de candidaturas
                        └──────────┬───────────┘
                                   │ REST/JSON
                        ┌──────────▼───────────┐
                        │   Backend (FastAPI)   │  orquestração de agentes, API
                        └──────────┬───────────┘
              ┌────────────────────┼─────────────────────┐
              │                    │                      │
     ┌────────▼───────┐  ┌─────────▼────────┐   ┌─────────▼────────┐
     │  Fila (BullMQ/  │  │  Supabase (Postgres│   │  Redis (cache +  │
     │  Redis Queue)   │  │  + auth + storage) │   │  rate limiting)  │
     └────────┬────────┘  └────────────────────┘   └──────────────────┘
              │
     ┌────────▼─────────────────────────────────────────────────────┐
     │  Agentes especializados (workers Python, um processo por tipo) │
     │  Career · CV · LinkedIn · JobHunter · Recruiter · Matching ·   │
     │  Apply · Browser(Playwright) · Email · Interview · Salary ·    │
     │  Analytics                                                     │
     └─────────────────────────────────────────────────────────────┘
```

Cada agente é um módulo Python independente com uma interface comum (`BaseAgent.run(context) ->
AgentResult`), corre como job de fila, e escreve o resultado em Supabase. Isto permite substituir
ou escalar um agente sem tocar nos outros.

## 4. Agentes (contrato mínimo de cada um)

| Agente | Input | Output | Modelo/Técnica |
|---|---|---|---|
| Career Agent | CV + LinkedIn + GitHub | perfil estruturado (senioridade, skills, pontos fortes/fracos) | LLM raciocínio (extração + análise) |
| CV Agent | perfil + vaga | CV adaptado (várias versões) | LLM escrita |
| LinkedIn Agent | perfil | sugestões de otimização de headline/about/skills | LLM escrita |
| Job Hunter | conectores de vagas | lista bruta de vagas novas | scraping/API, sem LLM |
| Recruiter Agent | empresa-alvo | lista de recrutadores/contactos | scraping/API |
| Matching Agent | perfil + vaga | score 0-100 + explicação + prós/contras + salário estimado | LLM raciocínio + regras |
| Apply Agent | vaga + CV + carta | candidatura pronta (nunca submete sozinho) | LLM escrita + regras |
| Browser Agent | ação de automação | resultado da ação (Playwright) | automação, sem LLM |
| Email Agent | contexto + destinatário | email personalizado (rascunho) | LLM escrita |
| Interview Agent | vaga + perfil | perguntas prováveis + guião de respostas | LLM raciocínio |
| Salary Agent | vaga + localização | estimativa de faixa salarial | LLM + dados de mercado |
| Analytics Agent | histórico de candidaturas | dashboard/relatórios (taxa de resposta, funil) | agregação, sem LLM |

**Seleção de modelo por tarefa** (mapeamento inicial, configurável em `backend/app/core/config.py`):
raciocínio complexo (Matching, Career, Interview) → modelo de maior capacidade; escrita (CV,
LinkedIn, Email) → modelo otimizado para linguagem/custo; scraping/automação (JobHunter,
Recruiter, Browser) → sem LLM sempre que possível (regras + seletores), só recorre a LLM para
parsing de HTML não estruturado.

## 5. Conectores de vagas

Interface comum `JobConnector.search(query, filters) -> list[JobPosting]` em
`backend/app/connectors/base.py`. Implementação inicial: `RemoteOK` e `ITJobsPT` (têm APIs/feeds
públicos, sem necessidade de browser automation). LinkedIn/Indeed/Glassdoor/Wellfound/etc. ficam
como conectores `BrowserConnector` (usam o Browser Agent + Playwright) e são adicionados
incrementalmente — cada um implica testar limites de uso e comportamento anti-bot do site antes de
ativar em produção.

## 6. Estrutura de pastas

```
app/
  docs/                 # este plano, roadmap, decisões de arquitetura
  backend/
    app/
      agents/            # um ficheiro por agente
      connectors/         # conectores de vagas (job boards)
      api/                 # routers FastAPI
      db/                  # cliente Supabase, schema.sql, migrations
      models/              # schemas Pydantic
      core/                # config, seleção de modelo, filas
      main.py
    tests/
    Dockerfile
    requirements.txt
  frontend/               # Next.js + TS + Tailwind + shadcn/ui
  docker-compose.yml
  .env.example
```

## 7. Base de dados (Supabase/Postgres) — tabelas principais

- `candidate_profile` — dados do candidato (CV parseado, links, preferências, `TODO(human)` para
  campos por preencher)
- `job_postings` — vagas recolhidas pelos conectores (deduplicadas por URL/hash)
- `matches` — score + explicação por (profile, job)
- `applications` — pipeline de candidatura (`draft_ready` → `submitted` (manual) → `interviewing`
  → `offer`/`rejected`)
- `contacts` — recrutadores/contactos por empresa
- `interactions` — emails/follow-ups enviados
- `cv_versions` — versões de CV geradas por vaga/perfil

## 8. Roadmap (ver `ROADMAP.md` para detalhe por sprint)

1. **v0 (este commit)** — scaffold do monorepo, plano, backend FastAPI com agentes em stub +
   Matching Agent funcional com regras determinísticas (sem chave de API externa ainda), frontend
   Next.js com dashboard esqueleto, docker-compose, CI.
2. **v1** — onboarding real (upload de CV, ligação LinkedIn/GitHub), Career Agent com LLM real,
   2 conectores de vagas a funcionar (RemoteOK, ITJobs.pt), Matching Agent com LLM.
3. **v2** — CV Agent + Apply Agent com geração real de candidatura, pipeline Kanban no frontend,
   Analytics Agent.
4. **v3** — Browser Agent (Playwright) para conectores adicionais, Interview Agent, Salary Agent,
   Email Agent com follow-ups.

## 9. Custos estimados (ordem de grandeza, a validar)

- LLM (raciocínio + escrita), uso moderado (~50 vagas analisadas/dia): ~15-40 EUR/mês conforme
  modelo escolhido.
- Supabase (plano free inicialmente, Pro ~25 USD/mês quando crescer).
- Redis gerido (Upstash free tier inicialmente).
- Hosting frontend (Vercel free/hobby) + backend (Railway/Render ~7-20 USD/mês).
- Total v0-v1: praticamente gratuito; a partir de v2 com uso real, ~50-80 EUR/mês.

## 10. Riscos

- **ToS de job boards**: automação de browser em LinkedIn/Indeed pode levar a bloqueio de conta.
  Mitigação: preferir APIs oficiais, limitar frequência, nunca automatizar login com credenciais
  reais sem consentimento explícito por site, começar só com conectores API-based.
  novos.
- **Dados incompletos**: o agente não deve inventar experiência, certificações ou datas. Campos
  em falta ficam explicitamente marcados, nunca preenchidos por inferência.
- **Candidaturas erradas em massa**: mitigado pelo gate human-in-the-loop (secção 2).
- **Custo de LLM descontrolado**: rate limiting + orçamento mensal configurável, com corte
  automático de novas análises ao atingir o limite.

## 11. Nota sobre o alojamento deste repositório

Este código vive em `vascoh.github.io/app/` por decisão do utilizador (a integração GitHub desta
sessão não tinha permissão para criar um repositório novo). O GitHub Pages deste repo só serve o
site estático da raiz — o backend/frontend em `app/` **não** é servido por Pages e precisa de
deploy próprio (ex.: Vercel para o frontend, Railway/Render para o backend). Recomenda-se mover
`app/` para um repositório dedicado assim que for possível criar um novo repo.
