from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import CandidateProfile

REQUIRED_FIELDS = ("resume_text", "linkedin_url", "github_username")


@dataclass
class CareerAgentContext:
    resume_text: str | None
    linkedin_url: str | None
    github_username: str | None


class CareerAgent(BaseAgent[CareerAgentContext, CandidateProfile]):
    """Analisa CV/LinkedIn/GitHub e produz um CandidateProfile estruturado.

    v0: só valida quais fontes estão disponíveis e marca `missing_fields` — não inventa
    senioridade, skills ou cargos-alvo sem dados reais (ver PLANNING.md secção 1).
    v1: substituir o corpo por uma chamada LLM (`requires_llm = True`,
    `settings.model_for("reasoning")`) que extrai o perfil a partir das fontes disponíveis.
    """

    name = "career_agent"
    requires_llm = True

    def run(self, context: CareerAgentContext) -> AgentResult[CandidateProfile]:
        missing = [
            field
            for field, value in (
                ("resume_text", context.resume_text),
                ("linkedin_url", context.linkedin_url),
                ("github_username", context.github_username),
            )
            if not value
        ]

        if len(missing) == len(REQUIRED_FIELDS):
            return AgentResult.failure(
                "Nenhuma fonte de dados fornecida (CV, LinkedIn, GitHub). Não é possível "
                "gerar um perfil sem inventar informação."
            )

        profile = CandidateProfile(
            resume_text=context.resume_text,
            linkedin_url=context.linkedin_url,
            github_username=context.github_username,
            missing_fields=missing
            + (["análise LLM ainda não configurada (ANTHROPIC_API_KEY em falta)"]),
        )
        return AgentResult.success(profile, partial=True)
