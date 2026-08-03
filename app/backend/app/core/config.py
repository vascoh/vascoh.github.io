from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict

TaskKind = Literal["reasoning", "writing", "scraping"]


class Settings(BaseSettings):
    """Configuração da aplicação, lida de variáveis de ambiente (ver .env.example)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # LLM: qual chave/modelo usar por tipo de tarefa. Ver PLANNING.md secção 4.
    anthropic_api_key: str | None = None
    model_reasoning: str = "claude-opus-4-5"
    model_writing: str = "claude-sonnet-5"

    # Infra
    supabase_url: str | None = None
    supabase_service_key: str | None = None
    redis_url: str = "redis://localhost:6379/0"

    # Regras de negócio
    # O Apply Agent nunca submete sozinho (decisão de produto, ver PLANNING.md secção 2).
    # Este limiar só controla a partir de que score uma vaga é destacada como prioritária.
    match_score_priority_threshold: int = 70

    def model_for(self, task_kind: TaskKind) -> str | None:
        if task_kind == "reasoning":
            return self.model_reasoning
        if task_kind == "writing":
            return self.model_writing
        return None  # scraping/automation: sem LLM por omissão


@lru_cache
def get_settings() -> Settings:
    return Settings()
