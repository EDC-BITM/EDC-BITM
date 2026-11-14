import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import { FluidParticlesBackground } from "../../../components/ui/fluid-particles-background.jsx";
import {
  clearRecruitmentDraft,
  readRecruitmentDraft,
  readRecruitmentSubmission,
  saveRecruitmentDraft,
  saveRecruitmentSubmission,
} from "./recruitmentSubmission.js";

const RECRUITMENT_API_URL =
  import.meta.env.VITE_RECRUITMENT_API_URL || "http://localhost:8081";

const inputClassName =
  "mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#FED853] focus:ring-2 focus:ring-[#FED853]/20";

const labelClassName = "block text-sm font-medium text-white/85";

function Field({ label, name, ...props }) {
  return (
    <label className={labelClassName}>
      {label}
      <input className={inputClassName} name={name} {...props} />
    </label>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default function RecruitmentPage() {
  const [teamError, setTeamError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingSubmission] = useState(readRecruitmentSubmission);
  const [draft] = useState(() => readRecruitmentDraft() || {});
  const [keyboardInset, setKeyboardInset] = useState(0);
  const navigate = useNavigate();

  // 1. Non-blocking background health check on page open
  useEffect(() => {
    const wakeUpUrl = `${RECRUITMENT_API_URL}/health`;
    fetch(wakeUpUrl, { method: "GET" }).catch(() => {
      // Silently ignore warm-up errors; server warms up in background
    });
  }, []);

  // 2. Viewport resize tracking for mobile keyboard
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return undefined;

    const updateKeyboardInset = () => {
      const obscuredHeight =
        window.innerHeight - viewport.height - viewport.offsetTop;
      setKeyboardInset(Math.max(0, Math.round(obscuredHeight)));
    };

    updateKeyboardInset();
    viewport.addEventListener("resize", updateKeyboardInset);
    viewport.addEventListener("scroll", updateKeyboardInset);

    return () => {
      viewport.removeEventListener("resize", updateKeyboardInset);
      viewport.removeEventListener("scroll", updateKeyboardInset);
    };
  }, []);

  // 3. Draft Auto-saving to localStorage on user typing/selecting
  const handleFormChange = (event) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const subTeams = formData.getAll("subTeams").map(String);

    const currentDraft = {
      fullName: String(formData.get("fullName") || ""),
      branch: String(formData.get("branch") || ""),
      email: String(formData.get("email") || ""),
      rollNumber: String(formData.get("rollNumber") || ""),
      whatsappNumber: String(formData.get("whatsappNumber") || ""),
      callingNumber: String(formData.get("callingNumber") || ""),
      whyJoin: String(formData.get("whyJoin") || ""),
      experience: String(formData.get("experience") || ""),
      otherSocieties: String(formData.get("otherSocieties") || ""),
      commitment: String(formData.get("commitment") || ""),
      subTeams,
      discoverySource: String(formData.get("discoverySource") || ""),
      portfolioLink: String(formData.get("portfolioLink") || ""),
      resumeLink: String(formData.get("resumeLink") || ""),
      campusIdeas: String(formData.get("campusIdeas") || ""),
    };

    saveRecruitmentDraft(currentDraft);
  };

  // 4. Form submission handler
  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const subTeams = formData.getAll("subTeams").map(String);

    if (subTeams.length < 1) {
      setTeamError("Please select at least one sub-team.");
      return;
    }
    if (subTeams.length > 2) {
      setTeamError("You can select at most two sub-teams.");
      return;
    }

    setTeamError("");
    setSubmissionError("");
    setIsSubmitting(true);

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      branch: String(formData.get("branch") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      rollNumber: String(formData.get("rollNumber") || "").trim(),
      whatsappNumber: String(formData.get("whatsappNumber") || "").trim(),
      callingNumber: String(formData.get("callingNumber") || "").trim() || null,
      whyJoin: String(formData.get("whyJoin") || "").trim() || null,
      experience: String(formData.get("experience") || "").trim() || null,
      otherSocieties: String(formData.get("otherSocieties") || "").trim() || null,
      commitment: String(formData.get("commitment") || "").trim() || null,
      subTeams,
      discoverySource: String(formData.get("discoverySource") || "").trim(),
      portfolioLink: String(formData.get("portfolioLink") || "").trim() || null,
      resumeLink: String(formData.get("resumeLink") || "").trim() || null,
      campusIdeas: String(formData.get("campusIdeas") || "").trim() || null,
      _hp: String(formData.get("_hp") || ""),
    };

    const controller = new AbortController();
    // 75 second timeout allows sleeping Render free instances to boot
    const timeoutId = setTimeout(() => controller.abort(), 75000);

    try {
      const response = await fetch(`${RECRUITMENT_API_URL}/api/recruitment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        let msg = result?.message || "Failed to submit application. Please try again.";
        if (result?.errors && typeof result.errors === "object") {
          const details = Object.entries(result.errors)
            .map(([field, errs]) => `${field}: ${Array.isArray(errs) ? errs.join(", ") : errs}`)
            .join(" | ");
          if (details && (!result?.message || result.message === "Validation failed")) {
            msg = `Validation failed: ${details}`;
          }
        }
        throw new Error(msg);
      }

      // Submission successful
      clearRecruitmentDraft();
      const submissionInfo = {
        name: payload.fullName,
        subTeams: payload.subTeams,
      };
      saveRecruitmentSubmission(submissionInfo);

      navigate("/recruitment/success", {
        replace: true,
        state: submissionInfo,
      });
    } catch (error) {
      clearTimeout(timeoutId);
      setIsSubmitting(false);

      if (error.name === "AbortError") {
        setSubmissionError(
          "Connecting to server took longer than expected. Your entered data is saved safely in this browser—please click Submit again."
        );
      } else {
        setSubmissionError(
          error.message ||
            "Unable to submit right now. Your data has been preserved—please try again."
        );
      }
    }
  }

  if (existingSubmission) {
    return (
      <Navigate
        to="/recruitment/success"
        replace
        state={existingSubmission}
      />
    );
  }

  return (
    <main className="relative isolate min-h-screen bg-[#090909] text-white">
      <FluidParticlesBackground />
      <section className="relative z-10 flex min-h-screen items-center overflow-hidden px-6 sm:px-10 lg:px-20">
        <img
          src="/edcHome.jpg"
          alt="The EDC-BITM team at E-Summit"
          className="absolute inset-0 h-full w-full origin-bottom scale-[1.25] object-cover object-center sm:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/80 to-black/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/85 via-black/20 to-black/35" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center sm:items-start">
          <h1 className="mb-6 max-w-sm text-center text-4xl font-extrabold leading-tight tracking-tight text-white sm:hidden">
            EDC Recruitment Drive 2026
          </h1>
          <p className="mb-8 max-w-xl text-center text-base leading-7 text-white/80 sm:hidden">
            Join the Entrepreneurship Development Cell at BIT Mesra. Build, lead,
            and create real entrepreneurial impact.
          </p>
          <div className="hidden max-w-2xl sm:block">
            <span className="inline-block rounded-full border border-[#FED853]/40 bg-[#FED853]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#FED853]">
              Recruitment Drive 2026
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn your ideas into{" "}
              <span className="text-[#FED853]">impact.</span>
            </h1>
            <p className="mt-4 text-lg leading-8 text-white/75">
              Be part of the team driving entrepreneurship, innovation, and
              leadership at BIT Mesra. Applications are open across all branches.
            </p>
          </div>

          <a
            href="#application"
            className="group mt-2 inline-flex items-center gap-3 rounded-full bg-[#FED853] px-7 py-3.5 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853]"
          >
            Start your application
            <ArrowDown
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:translate-y-1"
            />
          </a>
        </div>
      </section>

      <section
        id="application"
        className="relative z-10 scroll-mt-0 px-4 pt-2 pb-12 sm:scroll-mt-8 sm:px-10 sm:py-20"
      >
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-9 lg:p-10">
          <form
            id="recruitment-application-form"
            className="space-y-12 sm:space-y-7"
            style={{
              paddingBottom: keyboardInset ? `${keyboardInset + 24}px` : undefined,
            }}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          >
            {/* Hidden honeypot field for bot spam detection */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none" }}
              aria-hidden="true"
            />

            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-6">
              <Field
                label="1. Your Full Name *"
                name="fullName"
                autoComplete="name"
                placeholder="Your name"
                defaultValue={draft.fullName || ""}
                required
              />
              <label className={labelClassName}>
                2. Branch *
                <select
                  className={inputClassName}
                  name="branch"
                  defaultValue={draft.branch || ""}
                  required
                >
                  <option value="" disabled className="bg-[#171717]">
                    Select your branch
                  </option>
                  {[
                    "CSE",
                    "AIML",
                    "ECE",
                    "EEE",
                    "MECH",
                    "CHEM",
                    "PROD",
                    "CIVIL",
                    "BIOTECH",
                    "FOODTECH",
                    "B.PHARM",
                    "I.Msc (MNC)",
                    "I.Msc (PHY)",
                    "I.Msc (QEDS)",
                    "MCA",
                    "I.MBA",
                    "MBA",
                    "B.ARCH",
                  ].map((branch) => (
                    <option
                      key={branch}
                      value={branch}
                      className="bg-[#171717]"
                    >
                      {branch}
                    </option>
                  ))}
                </select>
              </label>
              <Field
                label="3. Institute E-Mail ID *"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@bitmesra.ac.in"
                defaultValue={draft.email || ""}
                required
              />
              <Field
                label="4. Roll Number *"
                name="rollNumber"
                placeholder="e.g. BTECH/12345/26 or MCA/10001/26"
                defaultValue={draft.rollNumber || ""}
                required
              />
              <div className="space-y-4">
                <Field
                  label="5. WhatsApp Number *"
                  name="whatsappNumber"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="WhatsApp number must be exactly 10 digits with no letters, spaces, or special characters"
                  placeholder="10-digit WhatsApp number (numbers only)"
                  defaultValue={draft.whatsappNumber || ""}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10);
                  }}
                  required
                />
                <Field
                  label="Calling Number (Optional)"
                  name="callingNumber"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  title="Calling number must be exactly 10 digits with no letters, spaces, or special characters"
                  placeholder="10-digit calling number if different (numbers only)"
                  defaultValue={draft.callingNumber || ""}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10);
                  }}
                />
                <p className="text-xs leading-5 text-white/50">
                  Mention both numbers if your WhatsApp and calling numbers are different. Enter digits only (no spaces, dashes, or +91).
                </p>
              </div>
            </div>

            <label className={labelClassName}>
              6. Why Join EDC, and What Makes It the Perfect Place to Turn
              Your Ideas into Impact? *
              <textarea
                className={`${inputClassName} min-h-32 resize-y`}
                name="whyJoin"
                placeholder="Share what motivates you to join EDC * (Required)"
                defaultValue={draft.whyJoin || ""}
                minLength={10}
                required
              />
            </label>

            <label className={labelClassName}>
              7. Share your previous experiences, leadership roles, or
              Positions of Responsibility (PORs) held at school, college, or
              any other organisation. Briefly describe your role and key
              contributions in bullet points. *
              <textarea
                className={`${inputClassName} min-h-32 resize-y`}
                name="experience"
                placeholder={"• Role or position\n• Key contribution * (Required)"}
                defaultValue={draft.experience || ""}
                minLength={5}
                required
              />
            </label>

            <label className={labelClassName}>
              8. Other Student Bodies/Societies you are a part of as of now
              (Optional)
              <textarea
                className={`${inputClassName} min-h-32 resize-y`}
                name="otherSocieties"
                placeholder="List your current student bodies or societies"
                defaultValue={draft.otherSocieties || ""}
              />
            </label>

            <label className={labelClassName}>
              9. Great ideas demand greater commitment. If selected, how
              would you balance your responsibilities across different
              campus organisations while ensuring meaningful contributions
              to EDC? *
              <textarea
                className={`${inputClassName} min-h-32 resize-y`}
                name="commitment"
                placeholder="Tell us how you would manage your commitments * (Required)"
                defaultValue={draft.commitment || ""}
                minLength={10}
                required
              />
            </label>

            <fieldset
              id="subTeams"
              aria-describedby={teamError ? "subTeams-error" : undefined}
              aria-invalid={teamError ? "true" : undefined}
              className="space-y-3"
            >
              <legend className={labelClassName}>
                10. Sub Teams you wish to be a part of (at most 2)
              </legend>
              <p className="text-xs leading-5 text-white/50">
                Choose one or two sub-teams.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Tech",
                  "Design",
                  "Video-Editing",
                  "Outreach",
                  "Sponsorship",
                  "Media & Marketing",
                ].map((team) => (
                  <label
                    key={team}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition hover:border-[#FED853]/50"
                  >
                    <input
                      className="h-4 w-4 accent-[#FED853]"
                      type="checkbox"
                      name="subTeams"
                      value={team}
                      defaultChecked={
                        Array.isArray(draft.subTeams) &&
                        draft.subTeams.includes(team)
                      }
                      onChange={(event) => {
                        const selectedCount = event.currentTarget.form.querySelectorAll(
                          'input[name="subTeams"]:checked',
                        ).length;

                        if (
                          event.currentTarget.checked &&
                          selectedCount > 2
                        ) {
                          event.currentTarget.checked = false;
                          setTeamError("You can select at most two sub-teams.");
                          return;
                        }

                        setTeamError("");
                      }}
                    />
                    {team}
                  </label>
                ))}
              </div>
              {teamError && (
                <p
                  id="subTeams-error"
                  className="text-sm text-red-300"
                  role="alert"
                >
                  {teamError}
                </p>
              )}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className={labelClassName}>
                11. How did you get to know about EDC? *
              </legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Friends",
                  "Through Events (Innovate-A-Thon / E-Summit)",
                  "Instagram/LinkedIn Pages",
                  "Seniors",
                  "Newsrooms/other college communities",
                ].map((source) => (
                  <label
                    key={source}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition hover:border-[#FED853]/50"
                  >
                    <input
                      className="h-4 w-4 accent-[#FED853]"
                      type="radio"
                      name="discoverySource"
                      value={source}
                      defaultChecked={draft.discoverySource === source}
                      required
                    />
                    {source}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="space-y-3">
              <label className={labelClassName}>
                12. Show us what you&apos;ve got! Share a link to your best
                work, portfolio, or projects (Optional).
                <input
                  className={inputClassName}
                  name="portfolioLink"
                  type="url"
                  placeholder="https://drive.google.com/... or https://github.com/..."
                  defaultValue={draft.portfolioLink || ""}
                />
              </label>
              <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-6 text-white/60">
                <p className="font-medium text-white/80">
                  Share your work using:
                </p>
                <ul className="mt-2 list-inside list-disc space-y-1">
                  <li>
                    <strong className="text-white/75">Designers</strong> /
                    <strong className="text-white/75"> Video Editors:</strong>{" "}
                    Google Drive link
                  </li>
                  <li>
                    <strong className="text-white/75">Tech:</strong> GitHub
                    or portfolio site
                  </li>
                  <li>
                    <strong className="text-white/75">
                      Content &amp; Media:
                    </strong>{" "}
                    Drive link with articles/blogs and screenshots
                  </li>
                </ul>
                <p className="mt-3">
                  Submit anything that best showcases your skills,
                  creativity, and potential for your preferred subteam(s).
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <Field
                label="13. Submit your Resume (Optional)"
                name="resumeLink"
                type="url"
                placeholder="Paste an accessible Google Drive link to your resume"
                defaultValue={draft.resumeLink || ""}
              />
              <p className="text-xs leading-5 text-white/50">
                Upload your resume to Google Drive, enable link access, and
                paste the shareable link here.
              </p>
            </div>

            <div className="space-y-1">
              <label className={labelClassName}>
                14. Having spent two months at BIT Mesra, 
                what inefficiencies or overlooked problems have you noticed in campus life? 
                If given the chance, how would you solve them with practical, creative ideas? *
                <textarea
                  className={`${inputClassName} min-h-36 resize-y`}
                  name="campusIdeas"
                  placeholder="Share an observation and how you would address it * (Required)"
                  defaultValue={draft.campusIdeas || ""}
                  minLength={10}
                  required
                  onFocus={(event) => {
                    const textarea = event.currentTarget;
                    const viewport = window.visualViewport;
                    const keepVisible = () => {
                      const visibleBottom =
                        (viewport?.offsetTop || 0) +
                        (viewport?.height || window.innerHeight);
                      const bottom = textarea.getBoundingClientRect().bottom;
                      if (bottom > visibleBottom - 16) {
                        window.scrollBy({
                          top: bottom - visibleBottom + 16,
                          behavior: "smooth",
                        });
                      }
                    };

                    textarea.scrollIntoView({
                      block: "center",
                      behavior: "smooth",
                    });
                    viewport?.addEventListener("resize", keepVisible);
                    textarea.addEventListener(
                      "blur",
                      () =>
                        viewport?.removeEventListener("resize", keepVisible),
                      { once: true },
                    );
                    window.setTimeout(keepVisible, 250);
                  }}
                />
              </label>
            </div>

            {submissionError && (
              <div
                className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
                role="alert"
              >
                {submissionError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#FED853] px-7 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853] sm:w-auto ${
                isSubmitting ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              {isSubmitting ? "Submitting application..." : "Submit application"}
              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
