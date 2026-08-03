from abc import ABC, abstractmethod

from app.models.schemas import JobPosting


class JobConnector(ABC):
    """Interface comum a todos os conectores de vagas (ver PLANNING.md secção 5).

    Conectores API-based (RemoteOK, ITJobs.pt) implementam `search` diretamente com HTTP.
    Conectores sem API pública (LinkedIn, Indeed, ...) devem implementar `search` delegando no
    Browser Agent (Playwright) em vez de scraping direto aqui — mantém este ficheiro livre de
    lógica de automação de browser.
    """

    source_name: str

    @abstractmethod
    async def search(self, query: str, *, remote_only: bool = False, limit: int = 20) -> list[JobPosting]:
        raise NotImplementedError
