from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class ApplicationStatus(str, Enum):
    DRAFT_READY = "draft_ready"
    SUBMITTED = "submitted"
    INTERVIEWING = "interviewing"
    OFFER = "offer"
    REJECTED = "rejected"


class CandidateProfile(BaseModel):
    """Perfil do candidato. Campos None/[] em missing_fields nunca devem ser inferidos."""

    seniority: str | None = None
    top_skills: list[str] = Field(default_factory=list)
    target_roles: list[str] = Field(default_factory=list)
    preferred_locations: list[str] = Field(default_factory=list)
    min_salary_eur: int | None = None
    resume_text: str | None = None
    linkedin_url: str | None = None
    github_username: str | None = None
    missing_fields: list[str] = Field(default_factory=list)


class JobPosting(BaseModel):
    id: str
    title: str
    company: str
    location: str
    remote: bool
    source: str
    url: str
    description: str = ""
    tags: list[str] = Field(default_factory=list)
    posted_at: datetime | None = None


class JobMatch(BaseModel):
    job: JobPosting
    score: int = Field(ge=0, le=100)
    explanation: str
    pros: list[str] = Field(default_factory=list)
    cons: list[str] = Field(default_factory=list)
    estimated_salary: str | None = None


class Application(BaseModel):
    id: str
    job: JobPosting
    status: ApplicationStatus = ApplicationStatus.DRAFT_READY
    cv_version_id: str | None = None
    cover_letter: str | None = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)
