# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Users:** Students and aspiring student founders at BIT Mesra (Ranchi). They visit to discover entrepreneurial events, participate in hackathons/ideathons (e.g., Innovate-a-Thon), submit venture ideas and pitch decks for incubation and feedback, join the cell during recruitment drives, and access mentorship.
- **Secondary Users:** BIT Mesra alumni entrepreneurs, investors, ecosystem mentors, guest speakers, and corporate sponsors who evaluate student ventures, deliver keynote sessions, or partner with the E-Cell.
- **Internal Operators:** Student coordinators, leads, and administrators of EDC BIT Mesra who manage article publishing, announcements, and evaluate incoming startup submissions.

## Product Purpose

EDC BIT Mesra's digital platform exists to cultivate, showcase, and accelerate collegiate entrepreneurship across campus. It provides a cohesive digital launchpad connecting students from curiosity to venture realization—linking them with peer collaborators, alumni founders, structured competitions, and mentorship. Success means active participation in flagship events, a steady stream of student venture submissions, seamless recruitment cycles, and an inspiring showcase of campus innovation.

## Positioning

An all-in-one campus entrepreneurial launchpad — uniting high-energy flagship competitions (Innovate-a-Thon), an interactive student idea incubation and pitch submission pipeline, a comprehensive archive celebrating BIT Mesra's 60+ year startup legacy (from 1958 Bhoruka to modern unicorns and high-growth ventures like Zluri and Floworks), and student-led editorial insights.

## Operating Context

- **Devices & Environment:** Accessed predominantly via mobile devices and laptops by students on campus Wi-Fi or cellular networks, as well as alumni and partners globally.
- **Key Seasonal Rhythms:** Annual student recruitment cycles, flagship event timelines (Innovate-a-Thon / E-Summit) integrated with registration portals (e.g., Unstop), speaker sessions, and rolling startup idea submissions.
- **Operational Workflows:** Protected admin portal for cell coordinators to review submissions, manage articles/blogs with rich-text publishing (Lexical editor), and update announcements.

## Capabilities and Constraints

- **Capabilities:**
  - Modern client-side single page application built with React 19, Vite, Tailwind CSS, Framer Motion, and TanStack Query.
  - Dedicated flagship event microsite (`/iat` - Innovate-a-Thon) with timelines, problem statements, and speaker showcases.
  - Alumni startup heritage timeline (`/Startups`) tracking ventures across decades.
  - Pitch & startup idea submission portal (`/Submissions`) with feedback loops.
  - Multi-author student blog & editorial section (`/Blogs`).
  - Protected admin portal (`/admin/auth`, `/admin/dashboard`, `/admin/submissions`, `/admin/editor`) backed by a Fastify + Prisma + MongoDB REST API (`edc-server`).
  - Cloudinary asset integration for optimized media delivery.
- **Constraints:**
  - Decoupled architecture: client SPA deployed to static hosting (Netlify/Vercel) communicating with a separate REST API backend.
  - Must remain lightweight, fast-loading, and responsive across varying mobile network conditions on campus.
- **Terminology:**
  - *EDC:* Entrepreneurship Development Cell.
  - *BIT Mesra:* Birla Institute of Technology, Mesra.
  - *IAT:* Innovate-a-Thon (flagship hackathon / ideathon).

## Brand Commitments

- **Entity Name:** Entrepreneurship Development Cell, BIT Mesra (EDC BIT Mesra).
- **Core Assets:** 3D EDC emblem (`/edclogo3d.png`), official domain/deployments (`https://edcbitmesra.netlify.app`).
- **Tone & Ethos:** Ambitious, energetic, student-driven, engineering-grounded ("Igniting Tomorrow's Tech Today").

## Evidence on Hand

- **Documented Startup History:** Verified roster of BIT Mesra alumni-founded ventures across eras including Bhoruka (1958), Aura Inc., TriVium, Tejas, Netwoven, CRMnext, Eko, DBSync, Lenskart, CropIn, Indibni, MyOperator, Easebuzz, Piggy, Khabri, WhiteHat Jr, Quolum, Swiftskill, Floworks, Alcheymist, and Zluri.
- **Live Assets:** Production event imagery, team directory, and Cloudinary media registry (`src/data/CldImage.json`).
- **Verified External Proof:** Innovate-a-Thon 3.0 registration and partnership listings on Unstop.

## Product Principles

1. **Student-Centric Agency:** Minimize barriers between a student developing an idea and receiving mentorship, team formation, or incubator resources.
2. **Living Legacy as Inspiration:** Ground forward-looking innovation in BIT Mesra's authentic 60+ year heritage of technological enterprise.
3. **Clarity in Action:** Every registration, pitch submission, or event schedule must be friction-free, unambiguous, and immediately responsive.
4. **Authenticity over Pretense:** Represent verified student initiatives, real alumni achievements, and actual event milestones without inflated claims or artificial fluff.

## Accessibility & Inclusion

- Responsive, touch-friendly layouts supporting diverse student devices (from budget smartphones to large desktop displays).
- Accessible typography contrast ratios, intuitive form validation, and clear status feedback for pitch submissions and registrations.
