from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent


@dataclass
class RecruiterAgentContext:
    company: str


@dataclass
class RecruiterContact:
    name: str
    role: str
    company: str
    profile_url: str | None = None


class RecruiterAgent(BaseAgent[RecruiterAgentContext, list[RecruiterContact]]):
    """Descobre recrutadores/contactos de uma empresa-alvo.

    Sem API pública fiável para isto — precisa do Browser Agent (LinkedIn Sales Navigator ou
    pesquisa pública) ou de uma API paga (ex.: Apollo, Hunter.io). Não implementado
    (ROADMAP.md v3).
    """

    name = "recruiter_agent"
    requires_llm = False

    def run(self, context: RecruiterAgentContext) -> AgentResult[list[RecruiterContact]]:
        return AgentResult.failure(
            "Recruiter Agent ainda não implementado — requer Browser Agent ou API de "
            "contactos configurada (ver ROADMAP.md v3)."
        )
