from app.agents.analytics_agent import AnalyticsAgent
from app.models.schemas import Application, ApplicationStatus, JobPosting


def make_app(status: ApplicationStatus, job_id: str) -> Application:
    job = JobPosting(
        id=job_id,
        title="Frontend Engineer",
        company="Acme",
        location="Remote",
        remote=True,
        source="RemoteOK",
        url=f"https://example.com/{job_id}",
    )
    return Application(id=f"app:{job_id}", job=job, status=status)


def test_empty_pipeline():
    result = AnalyticsAgent().run([])
    assert result.ok
    assert result.data.total == 0


def test_computes_rates():
    apps = [
        make_app(ApplicationStatus.DRAFT_READY, "1"),
        make_app(ApplicationStatus.SUBMITTED, "2"),
        make_app(ApplicationStatus.INTERVIEWING, "3"),
        make_app(ApplicationStatus.OFFER, "4"),
    ]
    result = AnalyticsAgent().run(apps)
    assert result.ok
    stats = result.data
    assert stats.total == 4
    # submitted_or_later = 3 (submitted, interviewing, offer); advanced = 2 (interviewing, offer)
    assert stats.response_rate == round(2 / 3 * 100, 1)
    assert stats.interview_rate == round(2 / 4 * 100, 1)
