from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import JobPosting


@dataclass
class SalaryEstimate:
    range_low_eur: int
    range_high_eur: int
    confidence: str  # "baixa" | "média" | "alta"
    basis: str


class SalaryAgent(BaseAgent[JobPosting, SalaryEstimate]):
    """Estima a faixa salarial de uma vaga por localização/senioridade/tecnologias.

    Requer dados de mercado (LLM com acesso a pesquisa, ou dataset próprio) — não implementado
    nesta versão (ROADMAP.md v3). Nunca deve devolver um número sem indicar `confidence` e
    `basis`, para o Matching Agent não tratar uma estimativa como facto.
    """

    name = "salary_agent"
    requires_llm = True

    def run(self, context: JobPosting) -> AgentResult[SalaryEstimate]:
        return AgentResult.failure(
            "Salary Agent ainda não implementado (requer dados de mercado, ver ROADMAP.md v3)."
        )
