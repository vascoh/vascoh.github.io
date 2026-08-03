from datetime import datetime

import httpx

from app.connectors.base import JobConnector
from app.models.schemas import JobPosting

REMOTEOK_API_URL = "https://remoteok.com/api"


class RemoteOKConnector(JobConnector):
    """Conector para a API pública do RemoteOK (sem necessidade de chave)."""

    source_name = "RemoteOK"

    def __init__(self, client: httpx.AsyncClient | None = None) -> None:
        self._client = client

    async def search(self, query: str, *, remote_only: bool = False, limit: int = 20) -> list[JobPosting]:
        owns_client = self._client is None
        client = self._client or httpx.AsyncClient(
            headers={"User-Agent": "ai-job-hunter-agent/0.1"}, timeout=10.0
        )
        try:
            response = await client.get(REMOTEOK_API_URL)
            response.raise_for_status()
            raw_items = response.json()
        finally:
            if owns_client:
                await client.aclose()

        query_lower = query.lower()
        postings: list[JobPosting] = []
        for item in raw_items:
            # O primeiro elemento é sempre um aviso legal da API, não uma vaga.
            if "id" not in item or "position" not in item:
                continue

            position = item.get("position", "")
            tags = item.get("tags", [])
            haystack = f"{position} {' '.join(tags)} {item.get('company', '')}".lower()
            if query_lower and query_lower not in haystack:
                continue

            posted_at = None
            if item.get("date"):
                try:
                    posted_at = datetime.fromisoformat(item["date"].replace("Z", "+00:00"))
                except ValueError:
                    posted_at = None

            postings.append(
                JobPosting(
                    id=f"remoteok:{item['id']}",
                    title=position,
                    company=item.get("company", "N/D"),
                    location=item.get("location") or "Remoto",
                    remote=True,
                    source=self.source_name,
                    url=item.get("url") or f"https://remoteok.com/remote-jobs/{item['id']}",
                    description=item.get("description", ""),
                    tags=tags,
                    posted_at=posted_at,
                )
            )
            if len(postings) >= limit:
                break

        return postings
