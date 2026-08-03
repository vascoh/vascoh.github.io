# AI Job Hunter — v0 (scaffold)

Agente autónomo de procura de emprego. Ver [`docs/PLANNING.md`](docs/PLANNING.md) para a
arquitetura completa e [`docs/ROADMAP.md`](docs/ROADMAP.md) para o que falta.

> ⚠️ Este código vive em `vascoh.github.io/app/` por limitação temporária (a integração GitHub
> desta sessão não tinha permissão para criar um novo repositório). O GitHub Pages deste repo só
> serve o site estático da raiz — esta app precisa de deploy próprio. Recomenda-se mover para um
> repositório dedicado quando possível.

## Estado atual (v0)

- **Backend** (`backend/`, FastAPI): estrutura de agentes definida, `MatchingAgent` e
  `AnalyticsAgent` funcionais com lógica determinística, `JobHunterAgent` + conector RemoteOK a
  funcionar contra a API pública real. Os restantes agentes (Career, CV, LinkedIn, Apply,
  Recruiter, Browser, Email, Interview, Salary) estão definidos com contrato claro mas devolvem
  `AgentResult.failure(...)` explícito até serem implementados (precisam de `ANTHROPIC_API_KEY` e,
  nalguns casos, Playwright) — nunca inventam dados.
- **Frontend** (`frontend/`, Next.js 16 + TypeScript + Tailwind v4): dashboard, vagas, pipeline e
  perfil com dados de exemplo (`src/lib/mock-data.ts`), pronto a ligar à API.
- **Decisão de produto fixa**: candidaturas nunca são submetidas automaticamente — o pipeline
  para sempre em "pronta a rever" e a submissão é um clique humano.

## Correr localmente

### Backend

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
# testes: python -m pytest -q
# lint: python -m ruff check app tests
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# lint: npm run lint · build: npm run build
```

### Com Docker

```bash
cp .env.example .env   # preencher ANTHROPIC_API_KEY, SUPABASE_URL, etc. antes do v1
docker compose up --build
```

## Próximos passos

Ver `docs/ROADMAP.md`. Bloqueios ativos: CV/LinkedIn/certificados do utilizador ainda não
fornecidos, chaves de API (LLM/Supabase) ainda não configuradas, repositório dedicado ainda não
criado.
