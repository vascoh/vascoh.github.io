import type { Application, CandidateProfile, JobMatch } from "@/types/domain";

// Dados de exemplo — a substituir pela API do backend (ver app/backend).
export const mockProfile: CandidateProfile = {
  seniority: "Mid-level (estimativa provisória)",
  topSkills: ["TypeScript", "Next.js", "React", "SEO local"],
  targetRoles: ["Frontend Developer", "Full-stack Developer"],
  preferredLocations: ["Remoto", "Portugal"],
  missingFields: ["CV", "LinkedIn URL", "faixa salarial mínima", "certificados"],
};

export const mockMatches: JobMatch[] = [
  {
    job: {
      id: "1",
      title: "Frontend Engineer",
      company: "Exemplo Remote Co.",
      location: "Remoto (EU)",
      remote: true,
      source: "RemoteOK",
      url: "#",
      postedAt: "2026-08-01",
    },
    score: 82,
    explanation: "Forte alinhamento em TypeScript/Next.js; falta experiência sénior indicada no perfil.",
    pros: ["Stack compatível", "Remoto full-time"],
    cons: ["Faixa salarial não confirmada"],
    estimatedSalary: "45.000–55.000 EUR/ano",
  },
];

export const mockApplications: Application[] = [
  {
    id: "1",
    job: mockMatches[0].job,
    status: "draft_ready",
    updatedAt: "2026-08-02",
  },
];
