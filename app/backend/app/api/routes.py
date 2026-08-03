from fastapi import APIRouter, HTTPException

from app.agents.job_hunter_agent import JobHunterAgent, JobHunterContext
from app.agents.matching_agent import MatchingAgent, MatchingContext
from app.connectors.remoteok import RemoteOKConnector
from app.models.schemas import CandidateProfile, JobMatch, JobPosting

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/jobs/search", response_model=list[JobPosting])
async def search_jobs(query: str, remote_only: bool = False, limit: int = 20) -> list[JobPosting]:
    agent = JobHunterAgent()
    result = await agent.run_async(
        JobHunterContext(
            query=query,
            connectors=[RemoteOKConnector()],
            remote_only=remote_only,
            limit_per_connector=limit,
        )
    )
    if not result.ok:
        raise HTTPException(status_code=502, detail=result.error)
    return result.data


@router.post("/matches", response_model=JobMatch)
def compute_match(profile: CandidateProfile, job: JobPosting) -> JobMatch:
    agent = MatchingAgent()
    result = agent.run(MatchingContext(profile=profile, job=job))
    if not result.ok:
        raise HTTPException(status_code=400, detail=result.error)
    return result.data
