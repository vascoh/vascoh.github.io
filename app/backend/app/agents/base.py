from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Any, Generic, TypeVar

InputT = TypeVar("InputT")
OutputT = TypeVar("OutputT")


@dataclass
class AgentResult(Generic[OutputT]):
    """Resultado padronizado devolvido por qualquer agente."""

    ok: bool
    data: OutputT | None = None
    error: str | None = None
    meta: dict[str, Any] = field(default_factory=dict)

    @classmethod
    def success(cls, data: OutputT, **meta: Any) -> "AgentResult[OutputT]":
        return cls(ok=True, data=data, meta=meta)

    @classmethod
    def failure(cls, error: str, **meta: Any) -> "AgentResult[OutputT]":
        return cls(ok=False, error=error, meta=meta)


class BaseAgent(ABC, Generic[InputT, OutputT]):
    """Contrato comum a todos os agentes. Ver PLANNING.md secção 4."""

    name: str = "base_agent"
    requires_llm: bool = False

    @abstractmethod
    def run(self, context: InputT) -> AgentResult[OutputT]:
        """Executa o agente de forma síncrona sobre `context` e devolve um AgentResult.

        Implementações que chamam um LLM ou um serviço externo devem apanhar exceções e
        devolver AgentResult.failure(...) em vez de deixar propagar — os workers de fila
        tratam falhas como jobs para retry/alerta, não como crashes do processo.
        """
        raise NotImplementedError
