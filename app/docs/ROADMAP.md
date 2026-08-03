# Roadmap

## v0 — Scaffold (este commit)
- [x] Plano de arquitetura (`PLANNING.md`)
- [x] Backend FastAPI: estrutura, config, modelos Pydantic, agentes em stub
- [x] Matching Agent com scoring determinístico (baseline sem LLM)
- [x] Frontend Next.js + TS + Tailwind: layout + páginas esqueleto (dashboard, vagas, perfil)
- [x] `docker-compose.yml` (backend, frontend, redis)
- [x] CI (lint + testes) em `.github/workflows/`
- [x] Testes unitários iniciais (pytest)

## v1 — Onboarding + descoberta real
- [ ] Upload/parse de CV real (PDF → texto → perfil estruturado)
- [ ] Ligação a LinkedIn/GitHub (input manual de URLs, scraping público do GitHub via API)
- [ ] Career Agent com chamada LLM real (requer `ANTHROPIC_API_KEY` ou equivalente)
- [ ] Conector RemoteOK (API pública) a funcionar end-to-end
- [ ] Conector ITJobs.pt (feed/API) a funcionar end-to-end
- [ ] Matching Agent com LLM (explicação em linguagem natural)
- [ ] Persistência real em Supabase (schema aplicado via migration)

## v2 — Pipeline de candidatura
- [ ] CV Agent: gera versões adaptadas por vaga
- [ ] Apply Agent: prepara candidatura completa (`draft_ready`), nunca submete sozinho
- [ ] UI de revisão/aprovação de candidatura (o clique humano final)
- [ ] Pipeline Kanban no frontend (draft → submitted → interviewing → offer/rejected)
- [ ] Analytics Agent + dashboard de métricas

## v3 — Automação avançada
- [ ] Browser Agent (Playwright) para conectores sem API pública
- [ ] Novos conectores: LinkedIn Jobs, Indeed, Glassdoor, Wellfound, Otta, WWR, EURES,
      Landing.jobs, StepStone, IrishJobs, Monster (avaliar risco/ToS por site antes de ativar)
- [ ] Interview Agent (perguntas prováveis + guião)
- [ ] Salary Agent (estimativa por localização/senioridade)
- [ ] Email Agent com follow-ups automáticos (rascunho, envio ainda manual)
- [ ] Recruiter Agent (descoberta de contactos por empresa)

## Bloqueios ativos
- CV, LinkedIn URL e certificados do utilizador ainda não fornecidos (necessário para v1).
- Repositório dedicado para este projeto ainda não criado (a integração GitHub desta sessão não
  tem permissão `create_repository`); código vive temporariamente em `vascoh.github.io/app/`.
- Chaves de API (LLM, Supabase, Redis gerido) ainda não configuradas — `app/.env.example` lista
  todas as necessárias.
