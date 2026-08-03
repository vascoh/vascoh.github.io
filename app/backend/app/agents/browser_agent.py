from dataclasses import dataclass
from typing import Any


@dataclass
class BrowserAction:
    """Descreve uma ação de automação (ex.: preencher formulário de candidatura).

    Implementação real usa Playwright e corre isolada num processo/worker próprio (não
    diretamente no processo da API) — ver PLANNING.md secção 3. Nunca deve automatizar login
    com credenciais reais do utilizador sem consentimento explícito por site (PLANNING.md
    secção 10, riscos de ToS).
    """

    url: str
    steps: list[dict[str, Any]]


class BrowserAgent:
    """Placeholder — implementação com Playwright entra em ROADMAP.md v3.

    Propositadamente não herda de BaseAgent com run() concreto: até haver uma implementação
    real com Playwright instalado e testado, expor um `run()` que finge sucesso seria mais
    perigoso do que não o expor.
    """

    name = "browser_agent"

    def __init__(self) -> None:
        raise NotImplementedError(
            "Browser Agent ainda não implementado (requer Playwright + revisão de ToS por "
            "site antes de ativar, ver ROADMAP.md v3)."
        )
