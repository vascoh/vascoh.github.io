from dataclasses import dataclass

from app.agents.base import AgentResult, BaseAgent
from app.models.schemas import CandidateProfile, JobMatch, JobPosting


@dataclass
class MatchingContext:
    profile: CandidateProfile
    job: JobPosting


class MatchingAgent(BaseAgent[MatchingContext, JobMatch]):
    """Baseline determinístico (sem LLM) para v0.

    Calcula compatibilidade por sobreposição de skills/cargo-alvo/localização. A v1 substitui
    (ou complementa) isto por uma chamada LLM que também produz a explicação em linguagem
    natural — ver PLANNING.md secção 4 e ROADMAP.md v1.
    """

    name = "matching_agent"
    requires_llm = False

    def run(self, context: MatchingContext) -> AgentResult[JobMatch]:
        profile, job = context.profile, context.job

        if not profile.top_skills and not profile.target_roles:
            return AgentResult.failure(
                "Perfil sem skills nem cargos-alvo definidos — não é possível calcular match "
                "com confiança. Completa o perfil antes de correr o Matching Agent."
            )

        job_text = f"{job.title} {job.description} {' '.join(job.tags)}".lower()

        matched_skills = [s for s in profile.top_skills if s.lower() in job_text]
        skill_ratio = len(matched_skills) / len(profile.top_skills) if profile.top_skills else 0.0

        role_match = any(role.lower() in job.title.lower() for role in profile.target_roles)

        location_match = (
            job.remote
            or not profile.preferred_locations
            or any(loc.lower() in job.location.lower() for loc in profile.preferred_locations)
        )

        score = round(skill_ratio * 60 + (25 if role_match else 0) + (15 if location_match else 0))
        score = max(0, min(100, score))

        pros = []
        cons = []
        if matched_skills:
            pros.append(f"Skills compatíveis: {', '.join(matched_skills)}")
        else:
            cons.append("Nenhuma das skills principais do perfil aparece na descrição da vaga")
        if role_match:
            pros.append("Título da vaga alinhado com um dos cargos-alvo")
        else:
            cons.append("Título da vaga não corresponde a nenhum cargo-alvo definido")
        if not location_match:
            cons.append("Localização fora das preferências e vaga não é remota")

        explanation = (
            f"Score {score}/100: {len(matched_skills)}/{len(profile.top_skills)} skills "
            f"principais encontradas na vaga; "
            f"{'cargo-alvo compatível' if role_match else 'cargo-alvo não confirmado'}; "
            f"{'localização compatível' if location_match else 'localização não compatível'}."
        )

        match = JobMatch(
            job=job,
            score=score,
            explanation=explanation,
            pros=pros,
            cons=cons,
        )
        return AgentResult.success(match, matched_skills=matched_skills)
