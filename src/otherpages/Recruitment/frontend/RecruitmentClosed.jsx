import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarX2,
  CheckCircle2,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import { FluidParticlesBackground } from "../../../components/ui/fluid-particles-background.jsx";
import { readRecruitmentSubmission } from "./recruitmentSubmission.js";

const SOCIAL_LINKS = [
  {
    href: "https://chat.whatsapp.com/DkNrnobcUFNIfZNw04syzM?mode=gi_t",
    label: "WhatsApp",
    icon: MessageCircle,
  },
  {
    href: "https://www.instagram.com/edcbitmesra?psln=ZTNwNDcxZjN1ZXcy",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/company/edcbitmesra/",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export default function RecruitmentClosed() {
  const [existingSubmission] = useState(readRecruitmentSubmission);

  return (
    <main className="relative isolate flex min-h-[100dvh] flex-col justify-center overflow-x-clip bg-[#090909] px-4 py-10 text-white sm:px-6 lg:px-10 selection:bg-[#FED853] selection:text-black">
      <FluidParticlesBackground />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(254,216,83,0.08),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-[#FED853] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2.5 text-xs font-semibold text-white/80 transition hover:text-[#FED853]"
          >
            <img
              src={EDCLogo?.src || EDCLogo}
              alt="EDC BIT Mesra"
              className="h-8 w-8 object-contain"
            />
            <span className="hidden sm:inline">EDC BIT Mesra</span>
          </Link>
        </div>

        <section
          aria-labelledby="recruitment-closed-title"
          className="rounded-3xl border border-white/10 bg-[#111114]/90 p-6 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-10"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FED853]/35 bg-[#FED853]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#FED853]">
              EDC | Recruitment 2026
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
              <CalendarX2 size={13} aria-hidden="true" />
              Registrations Closed
            </span>
          </div>

          <h1
            id="recruitment-closed-title"
            className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl"
          >
            Recruitment applications are now{" "}
            <span className="text-[#FED853]">closed.</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
            Thank you for your interest in joining the Entrepreneurship
            Development Cell, BIT Mesra. The submission window for this
            recruitment drive has officially ended and we are no longer
            accepting new applications.
          </p>

          {existingSubmission && (
            <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <CheckCircle2
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-emerald-400"
                />
                <div className="text-sm">
                  <p className="font-semibold text-white">
                    You already submitted an application
                    {existingSubmission.applicationId
                      ? ` (${existingSubmission.applicationId})`
                      : ""}
                    .
                  </p>
                  <p className="text-white/70">
                    You can still view your confirmation and download your
                    acknowledgement letter.
                  </p>
                </div>
              </div>
              <Link
                to="/recruitment/success"
                state={existingSubmission}
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-emerald-400 px-4 py-2 text-xs font-bold text-black transition hover:bg-emerald-300"
              >
                View Submission
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#FED853]">
                What&apos;s Next
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Our team is reviewing all received applications. Shortlisted
                candidates will be contacted via WhatsApp and email with
                details for the upcoming interview rounds.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#FED853]">
                Missed This Cycle?
              </h2>
              <p className="mt-2 text-sm leading-6 text-white/70">
                Stay connected with EDC BIT Mesra for upcoming workshops,
                speaker sessions, E-Summit updates, and future recruitment
                announcements.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#FED853] px-6 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853]"
            >
              Return to Home
            </Link>
            <Link
              to="/Events"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:border-[#FED853] hover:text-[#FED853] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853]"
            >
              Explore Events
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link
              to="/announcement"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:border-[#FED853] hover:text-[#FED853] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853]"
            >
              Announcements
            </Link>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 text-xs font-medium text-[#FED853] transition hover:border-[#FED853]/40 hover:text-white"
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            <a
              href="mailto:team.edc@bitmesra.ac.in"
              className="inline-flex items-center gap-1.5 text-xs text-white/60 transition hover:text-[#FED853]"
            >
              <Mail size={14} aria-hidden="true" />
              <span>team.edc@bitmesra.ac.in</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
