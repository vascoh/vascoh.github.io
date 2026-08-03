from app.agents.matching_agent import MatchingAgent, MatchingContext
from app.models.schemas import CandidateProfile, JobPosting


def make_job(**overrides) -> JobPosting:
    defaults = dict(
        id="remoteok:1",
        title="Frontend Engineer",
        company="Acme",
        location="Remote",
        remote=True,
        source="RemoteOK",
        url="https://example.com/job/1",
        description="We use TypeScript and Next.js",
        tags=["typescript", "nextjs", "react"],
    )
    defaults.update(overrides)
    return JobPosting(**defaults)


def test_fails_without_profile_data():
    agent = MatchingAgent()
    profile = CandidateProfile()
    result = agent.run(MatchingContext(profile=profile, job=make_job()))
    assert not result.ok
    assert "Perfil sem skills" in result.error


def test_high_score_for_strong_match():
    agent = MatchingAgent()
    profile = CandidateProfile(
        top_skills=["TypeScript", "Next.js"],
        target_roles=["Frontend Engineer"],
        preferred_locations=["Remoto"],
    )
    result = agent.run(MatchingContext(profile=profile, job=make_job()))
    assert result.ok
    assert result.data.score >= 70
    assert "TypeScript" in result.data.pros[0]


def test_low_score_for_weak_match():
    agent = MatchingAgent()
    profile = CandidateProfile(
        top_skills=["COBOL", "Mainframe"],
        target_roles=["Backend Engineer"],
        preferred_locations=["Lisboa"],
    )
    job = make_job(remote=False, location="New York")
    result = agent.run(MatchingContext(profile=profile, job=job))
    assert result.ok
    assert result.data.score < 40
    assert len(result.data.cons) >= 2
