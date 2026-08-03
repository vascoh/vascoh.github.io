from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import Application, ApplicationStatus, CandidateProfile, JobPosting


@dataclass
class ApplyAgentContext:
    profile: CandidateProfile
    job: JobPosting
    cv_version_id: str | None
    cover_letter: str | None


class ApplyAgent(BaseAgent[ApplyAgentContext, Application]):
    """Prepara uma candidatura completa.

    Decisão de produto (PLANNING.md secção 2, não alterar sem pedido explícito do
    utilizador): este agente **nunca** submete a candidatura. O único estado terminal que
    produz automaticamente é `draft_ready` — a submissão real é sempre um clique humano na UI
    (pipeline). Isto evita candidaturas em massa com dados incompletos e reduz risco de
    violação de ToS dos job boards.
    """

    name = "apply_agent"
    requires_llm = True

    def run(self, context: ApplyAgentContext) -> AgentResult[Application]:
        if not context.cv_version_id or not context.cover_letter:
            return AgentResult.failure(
                "CV adaptado e/ou carta de apresentação em falta — o CV Agent tem de correr "
                "primeiro (ver cv_agent.py, ainda não implementado)."
            )

        application = Application(
            id=f"draft:{context.job.id}",
            job=context.job,
            status=ApplicationStatus.DRAFT_READY,
            cv_version_id=context.cv_version_id,
            cover_letter=context.cover_letter,
        )
        return AgentResult.success(application, requires_human_confirmation=True)
