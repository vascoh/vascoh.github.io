from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import CandidateProfile


@dataclass
class LinkedInSuggestions:
    headline: str | None
    about_suggestions: list[str]
    skills_to_add: list[str]


class LinkedInAgent(BaseAgent[CandidateProfile, LinkedInSuggestions]):
    """Sugere otimizações de headline/about/skills no LinkedIn.

    Requer LLM. Não implementado nesta versão (ROADMAP.md v1/v2) — devolve failure explícito.
    """

    name = "linkedin_agent"
    requires_llm = True

    def run(self, context: CandidateProfile) -> AgentResult[LinkedInSuggestions]:
        if not context.linkedin_url:
            return AgentResult.failure("Perfil sem linkedin_url definido.")
        return AgentResult.failure(
            "LinkedIn Agent ainda não implementado (requer integração LLM, ver ROADMAP.md)."
        )
