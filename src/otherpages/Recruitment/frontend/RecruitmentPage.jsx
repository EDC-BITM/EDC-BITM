import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, HelpCircle, MessageSquare, Phone } from "lucide-react";
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import { FluidParticlesBackground } from "../../../components/ui/fluid-particles-background.jsx";
import { formatApplicationId } from "./applicationLetter.js";
import {
  clearRecruitmentDraft,
  readRecruitmentDraft,
  readRecruitmentSubmission,
  saveRecruitmentDraft,
  saveRecruitmentSubmission,
} from "./recruitmentSubmission.js";

const inputClassName =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#FED853] focus:ring-2 focus:ring-[#FED853]/20";

const labelClassName = "block text-sm font-semibold text-white/90 leading-snug";

function Field({ label, name, ...props }) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input id={name} className={`${inputClassName} h-12`} name={name} {...props} />
    </div>
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
  const [showQueriesPopover, setShowQueriesPopover] = useState(false);
  const navigate = useNavigate();

  // 1. Non-blocking background health check on page open
  useEffect(() => {
    const urlsToTry = [
      import.meta.env.VITE_RECRUITMENT_API_URL,
      "http://127.0.0.1:8081",
      "http://localhost:8081",
    ].filter(Boolean);

    for (const url of [...new Set(urlsToTry)]) {
      fetch(`${url}/health`, { method: "GET" }).catch(() => {
        // Silently ignore background wake-up errors
      });
    }
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

  // Close queries popover on click outside or Escape
  useEffect(() => {
    if (!showQueriesPopover) return undefined;
    const handleClickOutside = (e) => {
      if (!e.target.closest("#queries-poc-container")) {
        setShowQueriesPopover(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowQueriesPopover(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showQueriesPopover]);

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

  // 4. Handle browser validation error cleanly
  const handleFormInvalid = (event) => {
    const target = event.target;
    if (!target) return;

    let fieldTitle = target.name || "A required field";
    const labelElem =
      target.closest("label") ||
      target.parentElement?.querySelector("label") ||
      (target.id ? document.querySelector(`label[for="${target.id}"]`) : null);
    if (labelElem) {
      fieldTitle = labelElem.textContent?.split("\n")[0]?.replace(/\*.*$/, "").trim() || fieldTitle;
    }

    setSubmissionError(
      `Please complete "${fieldTitle}" (${target.validationMessage || "field is required or invalid"}).`
    );

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    try {
      target.focus();
    } catch {
      // ignore
    }
  };

  // 5. Form submission handler
  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const subTeams = formData.getAll("subTeams").map(String);

    // Validation checks
    if (subTeams.length < 1) {
      setTeamError("Please select at least one sub-team.");
      setSubmissionError("Please select at least one sub-team (Question 10) before submitting.");
      const elem = document.getElementById("subTeams");
      if (elem) elem.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (subTeams.length > 2) {
      setTeamError("You can select at most two sub-teams.");
      setSubmissionError("You can select at most two sub-teams (Question 10).");
      const elem = document.getElementById("subTeams");
      if (elem) elem.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const whatsappNumber = String(formData.get("whatsappNumber") || "").trim();
    if (!/^[0-9]{10}$/.test(whatsappNumber)) {
      setSubmissionError("WhatsApp number must contain exactly 10 digits.");
      const elem = form.elements.namedItem("whatsappNumber");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "center" });
        elem.focus();
      }
      return;
    }

    const callingNumber = String(formData.get("callingNumber") || "").trim() || null;
    if (callingNumber && !/^[0-9]{10}$/.test(callingNumber)) {
      setSubmissionError("Calling number must contain exactly 10 digits if provided.");
      const elem = form.elements.namedItem("callingNumber");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "center" });
        elem.focus();
      }
      return;
    }

    setTeamError("");
    setSubmissionError("");
    setIsSubmitting(true);

    let portfolioLink = String(formData.get("portfolioLink") || "").trim() || null;
    if (portfolioLink && !/^https?:\/\//i.test(portfolioLink)) {
      portfolioLink = `https://${portfolioLink}`;
    }

    let resumeLink = String(formData.get("resumeLink") || "").trim() || null;
    if (resumeLink && !/^https?:\/\//i.test(resumeLink)) {
      resumeLink = `https://${resumeLink}`;
    }

    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      branch: String(formData.get("branch") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      rollNumber: String(formData.get("rollNumber") || "").trim(),
      whatsappNumber,
      callingNumber,
      whyJoin: String(formData.get("whyJoin") || "").trim(),
      experience: String(formData.get("experience") || "").trim(),
      otherSocieties: String(formData.get("otherSocieties") || "").trim() || null,
      commitment: String(formData.get("commitment") || "").trim(),
      subTeams,
      discoverySource: String(formData.get("discoverySource") || "").trim(),
      portfolioLink,
      resumeLink,
      campusIdeas: String(formData.get("campusIdeas") || "").trim(),
      _hp: String(formData.get("_hp") || ""),
    };

    // Candidate backend URLs to try: configured env, IPv4 127.0.0.1, and localhost
    const apiUrls = [
      import.meta.env.VITE_RECRUITMENT_API_URL,
      "http://127.0.0.1:8081",
      "http://localhost:8081",
    ].filter(Boolean);

    const uniqueUrls = [...new Set(apiUrls)];
    let response = null;
    let result = null;
    let lastError = null;

    for (const baseUrl of uniqueUrls) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      try {
        response = await fetch(`${baseUrl}/api/recruitment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        result = await response.json().catch(() => null);
        // Successfully contacted backend (status may be 201, 400, 409, etc.)
        break;
      } catch (err) {
        clearTimeout(timeoutId);
        lastError = err;
        console.warn(`Could not reach ${baseUrl}, trying next fallback...`, err);
      }
    }

    if (!response) {
      setIsSubmitting(false);
      console.error("Submission failed across all URLs:", lastError);
      setSubmissionError(
        "Could not connect to the recruitment backend server. Please verify the backend is running on port 8081."
      );
      return;
    }

    if (!response.ok) {
      setIsSubmitting(false);
      let msg = result?.message || "Failed to submit application. Please try again.";
      if (result?.errors && typeof result.errors === "object") {
        const details = Object.entries(result.errors)
          .map(([field, errs]) => `${field}: ${Array.isArray(errs) ? errs.join(", ") : errs}`)
          .join(" | ");
        if (details && (!result?.message || result.message === "Validation failed")) {
          msg = `Validation failed: ${details}`;
        }
      }
      setSubmissionError(msg);
      return;
    }

    // Submission successful
    clearRecruitmentDraft();
    const rawApplicationId = result?.applicationId;
    const formattedAppId = rawApplicationId
      ? formatApplicationId(rawApplicationId)
      : (result?.formattedApplicationId || "EDC-K26-0001");

    const rollYear = (payload.rollNumber || "").split("/")[2] || "";
    const computedYear =
      rollYear === "25" ? "2nd" :
      rollYear === "24" ? "3rd" :
      rollYear === "23" ? "4th" : "1st";

    const submissionInfo = {
      name: payload.fullName,
      fullName: payload.fullName,
      firstName: payload.fullName.split(" ")[0] || "",
      branch: payload.branch,
      rollNumber: payload.rollNumber,
      year: computedYear,
      email: payload.email,
      whatsappNumber: payload.whatsappNumber,
      callingNumber: payload.callingNumber,
      subTeams: payload.subTeams,
      roles: payload.subTeams.map((team, idx) => ({ title: team, rank: idx + 1 })),
      applicationId: formattedAppId,
      date: new Date().toISOString(),
    };
    saveRecruitmentSubmission(submissionInfo);

    navigate("/recruitment/success", {
      replace: true,
      state: submissionInfo,
    });
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
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#090909] text-white">
      <FluidParticlesBackground />
      <section className="relative z-10 flex min-h-screen items-center overflow-hidden px-6 sm:px-10 lg:px-20">
        <img
          src="/edcHome.jpg"
          alt="The EDC-BITM team at E-Summit"
          className="absolute inset-0 h-full w-full origin-bottom scale-[1.25] object-cover object-center sm:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/80 to-black/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/85 via-black/20 to-black/35" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center sm:items-start sm:text-left">
          <span className="inline-block rounded-full border border-[#FED853]/40 bg-[#FED853]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#FED853]">
            EDC | Recruitment 2026
          </span>

          <div className="max-w-2xl">
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Turn your ideas into{" "}
              <span className="text-[#FED853]">impact.</span>
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg sm:leading-8 sm:text-white/75">
              Be part of the team driving entrepreneurship, innovation, and
              leadership at BIT Mesra. Applications are open across all branches.
            </p>
          </div>

          <a
            href="#application"
            className="group mt-8 sm:mt-10 inline-flex items-center gap-3 rounded-full bg-[#FED853] px-7 py-3.5 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853]"
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
            className="space-y-8"
            style={{
              paddingBottom: keyboardInset ? `${keyboardInset + 24}px` : undefined,
            }}
            onChange={handleFormChange}
            onInvalidCapture={handleFormInvalid}
            onSubmit={handleSubmit}
          >
            {/* Hidden honeypot field for bot spam detection */}
            <input
              type="text"
              name="_hp"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <Field
                label="1. Your Full Name *"
                name="fullName"
                autoComplete="name"
                placeholder="Your name"
                defaultValue={draft.fullName || ""}
                required
              />
              <div className="space-y-2">
                <label htmlFor="branch" className={labelClassName}>
                  2. Branch *
                </label>
                <select
                  id="branch"
                  className={`${inputClassName} h-12 bg-[#171717]`}
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
              </div>
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
              <Field
                label="5. WhatsApp Number *"
                name="whatsappNumber"
                type="tel"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="10-digit WhatsApp number"
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
                maxLength={10}
                placeholder="10-digit calling number if different"
                defaultValue={draft.callingNumber || ""}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10);
                }}
              />
              <p className="sm:col-span-2 text-xs leading-relaxed text-white/50 -mt-1">
                Mention both numbers if your WhatsApp and calling numbers are different. Enter digits only (no spaces, dashes, or +91).
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="whyJoin" className={labelClassName}>
                6. Why Join EDC, and What Makes It the Perfect Place to Turn
                Your Ideas into Impact? *
              </label>
              <textarea
                id="whyJoin"
                className={`${inputClassName} min-h-32 resize-y`}
                name="whyJoin"
                placeholder="Share what motivates you to join EDC * (Required)"
                defaultValue={draft.whyJoin || ""}
                minLength={10}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="experience" className={labelClassName}>
                7. Share your previous experiences, leadership roles, or
                Positions of Responsibility (PORs) held at school, college, or
                any other organisation. Briefly describe your role and key
                contributions in bullet points. *
              </label>
              <textarea
                id="experience"
                className={`${inputClassName} min-h-32 resize-y`}
                name="experience"
                placeholder={"• Role or position\n• Key contribution * (Required)"}
                defaultValue={draft.experience || ""}
                minLength={5}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="otherSocieties" className={labelClassName}>
                8. Other Student Bodies/Societies you are a part of as of now
                (Optional)
              </label>
              <textarea
                id="otherSocieties"
                className={`${inputClassName} min-h-28 resize-y`}
                name="otherSocieties"
                placeholder="List your current student bodies or societies"
                defaultValue={draft.otherSocieties || ""}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="commitment" className={labelClassName}>
                9. Great ideas demand greater commitment. If selected, how
                would you balance your responsibilities across different
                campus organisations while ensuring meaningful contributions
                to EDC? *
              </label>
              <textarea
                id="commitment"
                className={`${inputClassName} min-h-32 resize-y`}
                name="commitment"
                placeholder="Tell us how you would manage your commitments * (Required)"
                defaultValue={draft.commitment || ""}
                minLength={10}
                required
              />
            </div>

            <fieldset
              id="subTeams"
              aria-describedby={teamError ? "subTeams-error" : undefined}
              aria-invalid={teamError ? "true" : undefined}
              className="space-y-2.5"
            >
              <legend className={labelClassName}>
                10. Sub Teams you wish to be a part of (at most 2) *
              </legend>
              <p className="text-xs leading-5 text-white/50">
                Choose one or two sub-teams.
              </p>
              <div className="grid gap-3 pt-1 sm:grid-cols-2">
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
                  className="pt-1 text-sm text-red-300"
                  role="alert"
                >
                  {teamError}
                </p>
              )}
            </fieldset>

            <fieldset className="space-y-2.5">
              <legend className={labelClassName}>
                11. How did you get to know about EDC? *
              </legend>
              <div className="grid gap-3 pt-1 sm:grid-cols-2">
                {[
                  "Friends",
                  "Through Events (Innovate-A-Thon / E-Summit)",
                  "Instagram/LinkedIn Pages",
                  "Seniors",
                  "Newsrooms/other college communities",
                ].map((source) => (
                  <label
                    key={source}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 transition hover:border-[#FED853]/50 hover:bg-white/[0.05]"
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

            <div className="space-y-2.5">
              <label htmlFor="portfolioLink" className={labelClassName}>
                12. Show us what you&apos;ve got! Share a link to your best
                work, portfolio, or projects (Optional)
              </label>
              <input
                id="portfolioLink"
                className={`${inputClassName} h-12`}
                name="portfolioLink"
                type="text"
                inputMode="url"
                placeholder="https://drive.google.com/... or https://github.com/..."
                defaultValue={draft.portfolioLink || ""}
              />
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
                <p className="mt-2 text-xs text-white/50">
                  Submit anything that best showcases your skills,
                  creativity, and potential for your preferred subteam(s).
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="resumeLink" className={labelClassName}>
                13. Submit your Resume (Optional)
              </label>
              <input
                id="resumeLink"
                className={`${inputClassName} h-12`}
                name="resumeLink"
                type="text"
                inputMode="url"
                placeholder="Paste an accessible Google Drive link to your resume"
                defaultValue={draft.resumeLink || ""}
              />
              <p className="text-xs leading-5 text-white/50">
                Upload your resume to Google Drive, enable link access, and
                paste the shareable link here.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="campusIdeas" className={labelClassName}>
                14. Having spent two months at BIT Mesra, what inefficiencies
                or overlooked problems have you noticed in campus life? If
                given the chance, how would you solve them with practical,
                creative ideas? *
              </label>
              <textarea
                id="campusIdeas"
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
            </div>

            {submissionError && (
              <div
                className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200"
                role="alert"
              >
                {submissionError}
              </div>
            )}

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#FED853] px-8 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853] sm:w-auto ${
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

              {/* Compact "For Queries" Hover/Click Button with Upward Popover */}
              <div
                id="queries-poc-container"
                className="relative inline-block w-full sm:w-auto"
                onMouseEnter={() => setShowQueriesPopover(true)}
                onMouseLeave={() => setShowQueriesPopover(false)}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowQueriesPopover((prev) => !prev);
                  }}
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white/90 backdrop-blur-sm transition-all hover:border-[#FED853]/60 hover:bg-[#FED853]/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FED853] sm:w-auto"
                  aria-expanded={showQueriesPopover}
                  aria-haspopup="dialog"
                >
                  <HelpCircle
                    size={16}
                    className="text-[#FED853] transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>For Queries? Reach Out</span>
                  <span className="hidden sm:inline-block rounded-full bg-[#FED853]/15 px-2 py-0.5 text-[10px] font-bold text-[#FED853]">
                    Hover
                  </span>
                </button>

                {/* Popover showing POC details (Opens UPWARD with zero layout shift) */}
                {showQueriesPopover && (
                  <div className="absolute bottom-full right-0 z-30 pb-2 w-full sm:w-auto">
                    <div className="w-full sm:w-[320px] rounded-2xl border border-white/15 bg-[#141414] p-4 shadow-2xl shadow-black/95 backdrop-blur-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <HelpCircle size={15} className="text-[#FED853]" />
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            Point of Contacts
                          </span>
                        </div>
                        <span className="text-[10px] text-white/50">Need Help?</span>
                      </div>

                      <div className="mt-3 space-y-3">
                        {/* Technical Queries */}
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-[#FED853]/40">
                          <div className="flex items-center justify-between">
                            <span className="rounded bg-[#FED853]/15 px-2 py-0.5 text-[10px] font-semibold text-[#FED853]">
                              Technical Queries
                            </span>
                            <span className="text-xs font-bold text-white">
                              Hamza Khan
                            </span>
                          </div>
                          <div className="mt-2.5 flex items-center gap-2">
                            <a
                              href="tel:7209125127"
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 py-1.5 text-xs font-medium text-white transition hover:border-[#FED853] hover:text-[#FED853]"
                            >
                              <Phone size={12} aria-hidden="true" />
                              72091 25127
                            </a>
                            <a
                              href="https://wa.me/917209125127"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={12} aria-hidden="true" />
                              WhatsApp
                            </a>
                          </div>
                        </div>

                        {/* Recruitment Queries */}
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-[#FED853]/40">
                          <div className="flex items-center justify-between">
                            <span className="rounded bg-[#FED853]/15 px-2 py-0.5 text-[10px] font-semibold text-[#FED853]">
                              Recruitment Queries
                            </span>
                            <span className="text-xs font-bold text-white">
                              Arpit Agarwal
                            </span>
                          </div>
                          <div className="mt-2.5 flex items-center gap-2">
                            <a
                              href="tel:9334533611"
                              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 py-1.5 text-xs font-medium text-white transition hover:border-[#FED853] hover:text-[#FED853]"
                            >
                              <Phone size={12} aria-hidden="true" />
                              93345 33611
                            </a>
                            <a
                              href="https://wa.me/919334533611"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/20"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={12} aria-hidden="true" />
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
