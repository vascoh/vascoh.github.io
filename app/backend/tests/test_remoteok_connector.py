import httpx
import pytest
import respx

from app.connectors.remoteok import REMOTEOK_API_URL, RemoteOKConnector

SAMPLE_RESPONSE = [
    {"legal": "https://remoteok.com/legal"},
    {
        "id": "123",
        "position": "Senior Frontend Engineer",
        "company": "Acme Remote",
        "location": "Worldwide",
        "url": "https://remoteok.com/remote-jobs/123",
        "description": "Build things with TypeScript and React.",
        "tags": ["typescript", "react"],
        "date": "2026-07-01T00:00:00+00:00",
    },
    {
        "id": "456",
        "position": "Backend Engineer (Go)",
        "company": "Other Co",
        "location": "Worldwide",
        "url": "https://remoteok.com/remote-jobs/456",
        "description": "Go microservices.",
        "tags": ["go", "kubernetes"],
        "date": "2026-07-02T00:00:00+00:00",
    },
]


@pytest.mark.asyncio
@respx.mock
async def test_search_filters_by_query_and_maps_fields():
    respx.get(REMOTEOK_API_URL).mock(
        return_value=httpx.Response(200, json=SAMPLE_RESPONSE)
    )

    connector = RemoteOKConnector()
    results = await connector.search("frontend")

    assert len(results) == 1
    job = results[0]
    assert job.id == "remoteok:123"
    assert job.title == "Senior Frontend Engineer"
    assert job.remote is True
    assert "typescript" in job.tags


@pytest.mark.asyncio
@respx.mock
async def test_search_skips_legal_notice_entry():
    respx.get(REMOTEOK_API_URL).mock(
        return_value=httpx.Response(200, json=SAMPLE_RESPONSE)
    )

    connector = RemoteOKConnector()
    results = await connector.search("")

    assert len(results) == 2
    assert all(job.id.startswith("remoteok:") for job in results)
