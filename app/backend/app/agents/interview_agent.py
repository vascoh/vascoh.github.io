from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import CandidateProfile, JobPosting


@dataclass
class InterviewPrepContext:
    profile: CandidateProfile
    job: JobPosting


@dataclass
class InterviewPrep:
    likely_questions: list[str]
    talking_points: list[str]


class InterviewAgent(BaseAgent[InterviewPrepContext, InterviewPrep]):
    """Gera perguntas prováveis e guião de respostas para uma entrevista.

    Requer LLM. Não implementado (ROADMAP.md v3) — devolve failure explícito.
    """

    name = "interview_agent"
    requires_llm = True

    def run(self, context: InterviewPrepContext) -> AgentResult[InterviewPrep]:
        return AgentResult.failure(
            "Interview Agent ainda não implementado (requer integração LLM, ver ROADMAP.md v3)."
        )
