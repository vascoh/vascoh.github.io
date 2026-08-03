from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import CandidateProfile, JobPosting


@dataclass
class CVAgentContext:
    profile: CandidateProfile
    job: JobPosting


@dataclass
class CVDraft:
    job_id: str
    content_markdown: str


class CVAgent(BaseAgent[CVAgentContext, CVDraft]):
    """Gera uma versão do CV adaptada a uma vaga específica.

    Requer LLM (`settings.model_for("writing")`) e `profile.resume_text` real — nunca deve
    inventar experiência/certificações que não estejam no CV original. Ainda não implementado
    (ROADMAP.md v2): devolve failure explícito em vez de gerar conteúdo fictício.
    """

    name = "cv_agent"
    requires_llm = True

    def run(self, context: CVAgentContext) -> AgentResult[CVDraft]:
        if not context.profile.resume_text:
            return AgentResult.failure("Sem CV original no perfil — nada para adaptar.")
        return AgentResult.failure(
            "CV Agent ainda não implementado (requer integração LLM, ver ROADMAP.md v2)."
        )
