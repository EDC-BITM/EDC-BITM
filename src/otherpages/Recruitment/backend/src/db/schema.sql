-- Table: recruitment_applications
-- Stores all applicant details for EDC BIT Mesra recruitment drives

CREATE TABLE IF NOT EXISTS recruitment_applications (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    whatsapp_number VARCHAR(20) NOT NULL,
    calling_number VARCHAR(20),
    why_join TEXT,
    experience TEXT,
    other_societies TEXT,
    commitment TEXT,
    sub_teams TEXT[] NOT NULL,
    discovery_source VARCHAR(100) NOT NULL,
    portfolio_link TEXT,
    resume_link TEXT,
    campus_ideas TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for duplicate lookup and fast search
CREATE INDEX IF NOT EXISTS idx_recruitment_email ON recruitment_applications (email);
CREATE INDEX IF NOT EXISTS idx_recruitment_roll ON recruitment_applications (roll_number);
