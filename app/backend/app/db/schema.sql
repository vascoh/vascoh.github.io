-- AI Job Hunter — schema inicial (Supabase/Postgres). Ver PLANNING.md secção 7.
-- Aplicar com: supabase db push, ou colar no SQL editor do projeto Supabase.

create table if not exists candidate_profile (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    seniority text,
    top_skills text[] not null default '{}',
    target_roles text[] not null default '{}',
    preferred_locations text[] not null default '{}',
    min_salary_eur integer,
    resume_text text,
    linkedin_url text,
    github_username text,
    -- Campos que o utilizador ainda não forneceu; o Career/Matching Agent nunca os infere.
    missing_fields text[] not null default '{}',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists job_postings (
    id text primary key, -- "<fonte>:<id-externo>", ex. "remoteok:123456"
    title text not null,
    company text not null,
    location text not null,
    remote boolean not null default false,
    source text not null,
    url text not null unique,
    description text not null default '',
    tags text[] not null default '{}',
    posted_at timestamptz,
    fetched_at timestamptz not null default now()
);

create table if not exists matches (
    id uuid primary key default gen_random_uuid(),
    profile_id uuid not null references candidate_profile (id) on delete cascade,
    job_id text not null references job_postings (id) on delete cascade,
    score integer not null check (score between 0 and 100),
    explanation text not null,
    pros text[] not null default '{}',
    cons text[] not null default '{}',
    estimated_salary text,
    created_at timestamptz not null default now(),
    unique (profile_id, job_id)
);

create table if not exists cv_versions (
    id uuid primary key default gen_random_uuid(),
    profile_id uuid not null references candidate_profile (id) on delete cascade,
    job_id text references job_postings (id) on delete set null,
    content_markdown text not null,
    created_at timestamptz not null default now()
);

create table if not exists applications (
    id uuid primary key default gen_random_uuid(),
    profile_id uuid not null references candidate_profile (id) on delete cascade,
    job_id text not null references job_postings (id) on delete cascade,
    cv_version_id uuid references cv_versions (id) on delete set null,
    cover_letter text,
    -- draft_ready é o único estado que os agentes atingem sozinhos; os restantes exigem ação
    -- humana na UI (ver PLANNING.md secção 2 — o Apply Agent nunca submete sozinho).
    status text not null default 'draft_ready'
        check (status in ('draft_ready', 'submitted', 'interviewing', 'offer', 'rejected')),
    updated_at timestamptz not null default now(),
    unique (profile_id, job_id)
);

create table if not exists contacts (
    id uuid primary key default gen_random_uuid(),
    company text not null,
    name text not null,
    role text,
    profile_url text,
    created_at timestamptz not null default now()
);

create table if not exists interactions (
    id uuid primary key default gen_random_uuid(),
    application_id uuid references applications (id) on delete cascade,
    contact_id uuid references contacts (id) on delete set null,
    channel text not null check (channel in ('email', 'linkedin', 'other')),
    subject text,
    body text,
    sent_at timestamptz,
    created_at timestamptz not null default now()
);

create index if not exists idx_job_postings_source on job_postings (source);
create index if not exists idx_matches_profile on matches (profile_id, score desc);
create index if not exists idx_applications_profile on applications (profile_id, status);
