from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.connectors.base import JobConnector
from app.models.schemas import JobPosting


@dataclass
class JobHunterContext:
    query: str
    connectors: list[JobConnector]
    remote_only: bool = False
    limit_per_connector: int = 20


class JobHunterAgent(BaseAgent[JobHunterContext, list[JobPosting]]):
    """Corre a pesquisa em todos os conectores configurados e deduplica por URL."""

    name = "job_hunter_agent"
    requires_llm = False

    async def run_async(self, context: JobHunterContext) -> AgentResult[list[JobPosting]]:
        if not context.connectors:
            return AgentResult.failure("Nenhum conector configurado.")

        seen_urls: set[str] = set()
        results: list[JobPosting] = []
        errors: list[str] = []

        for connector in context.connectors:
            try:
                postings = await connector.search(
                    context.query,
                    remote_only=context.remote_only,
                    limit=context.limit_per_connector,
                )
            except Exception as exc:  # conectores externos falham de formas imprevisíveis
                errors.append(f"{connector.source_name}: {exc}")
                continue

            for posting in postings:
                if posting.url in seen_urls:
                    continue
                seen_urls.add(posting.url)
                results.append(posting)

        return AgentResult.success(results, errors=errors)

    def run(self, context: JobHunterContext) -> AgentResult[list[JobPosting]]:
        raise NotImplementedError("JobHunterAgent é assíncrono — usa run_async().")
