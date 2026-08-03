export type ApplicationStatus =
  | "draft_ready"
  | "submitted"
  | "interviewing"
  | "offer"
  | "rejected";

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  source: string;
  url: string;
  postedAt: string;
}

export interface JobMatch {
  job: JobPosting;
  score: number;
  explanation: string;
  pros: string[];
  cons: string[];
  estimatedSalary?: string;
}

export interface Application {
  id: string;
  job: JobPosting;
  status: ApplicationStatus;
  updatedAt: string;
}

export interface CandidateProfile {
  seniority: string;
  topSkills: string[];
  targetRoles: string[];
  preferredLocations: string[];
  missingFields: string[];
}
