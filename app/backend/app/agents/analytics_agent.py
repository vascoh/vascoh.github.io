from collections import Counter
from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import Application, ApplicationStatus


@dataclass
class PipelineStats:
    total: int
    by_status: dict[str, int]
    response_rate: float  # % de submetidas que saíram de "submitted"
    interview_rate: float  # % de submetidas que chegaram a "interviewing" ou além


class AnalyticsAgent(BaseAgent[list[Application], PipelineStats]):
    """Agrega métricas do pipeline de candidaturas. Sem LLM — só agregação determinística."""

    name = "analytics_agent"
    requires_llm = False

    def run(self, context: list[Application]) -> AgentResult[PipelineStats]:
        if not context:
            return AgentResult.success(
                PipelineStats(total=0, by_status={}, response_rate=0.0, interview_rate=0.0)
            )

        by_status = Counter(app.status.value for app in context)
        submitted_or_later = [
            app for app in context if app.status != ApplicationStatus.DRAFT_READY
        ]
        advanced = [
            app
            for app in context
            if app.status in (ApplicationStatus.INTERVIEWING, ApplicationStatus.OFFER)
        ]

        response_rate = (
            len(advanced) / len(submitted_or_later) * 100 if submitted_or_later else 0.0
        )
        interview_rate = len(advanced) / len(context) * 100 if context else 0.0

        stats = PipelineStats(
            total=len(context),
            by_status=dict(by_status),
            response_rate=round(response_rate, 1),
            interview_rate=round(interview_rate, 1),
        )
        return AgentResult.success(stats)
