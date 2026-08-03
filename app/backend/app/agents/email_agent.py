from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent


@dataclass
class EmailDraftContext:
    recipient_name: str
    recipient_role: str
    company: str
    purpose: str  # ex.: "follow-up candidatura", "apresentação inicial"


@dataclass
class EmailDraft:
    subject: str
    body: str


class EmailAgent(BaseAgent[EmailDraftContext, EmailDraft]):
    """Gera rascunhos de email personalizados. O envio real é sempre uma ação manual/separada
    — este agente só produz o rascunho (ROADMAP.md v3, requer LLM)."""

    name = "email_agent"
    requires_llm = True

    def run(self, context: EmailDraftContext) -> AgentResult[EmailDraft]:
        return AgentResult.failure(
            "Email Agent ainda não implementado (requer integração LLM, ver ROADMAP.md v3)."
        )
