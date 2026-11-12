import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "react-router-dom";
import { FluidParticlesBackground } from "../../../components/ui/fluid-particles-background.jsx";
import {
  readRecruitmentSubmission,
  saveRecruitmentSubmission,
} from "./recruitmentSubmission.js";

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
  const [existingSubmission] = useState(readRecruitmentSubmission);
  const [keyboardInset, setKeyboardInset] = useState(0);
  const navigate = useNavigate();

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

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subTeams = formData.getAll("subTeams");

    if (subTeams.length < 2) {
      setTeamError("Please select at least two sub-teams.");
      return;
    }

    setTeamError("");
    const submission = {
      name: String(formData.get("fullName") || ""),
      subTeams: subTeams.map(String),
    };

    try {
      saveRecruitmentSubmission(submission);
    } catch {
      setSubmissionError(
        "Your application could not be finalized in this browser. Please try again.",
      );
      return;
    }

    event.currentTarget.reset();
    navigate(
      "/recruitment/success",
      {
        replace: true,
        state: submission,
      },
    );
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
            Bring your ideas.
            <span className="block text-[#FED853]">Find your people.</span>
          </h1>
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#FED853] sm:mb-6 sm:text-left sm:text-sm">
            EDC · BIT Mesra · Recruitment
          </p>
          <h1 className="hidden max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:block sm:text-6xl lg:text-8xl">
            Bring your ideas.
            <span className="mt-2 block text-[#FED853]">
              Find your people.
            </span>
          </h1>
          <p className="mt-4 max-w-sm text-center text-sm leading-6 text-white/75 sm:mt-7 sm:max-w-2xl sm:text-left sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
            Join a community of curious builders and help make entrepreneurship
            happen at BIT Mesra.
          </p>
          <a
            href="#application"
            onClick={(event) => {
              event.preventDefault();
              const application = document.getElementById("application");
              if (!application) return;

              window.history.pushState(null, "", "#application");
              application.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
                block: "start",
              });
            }}
            className="group mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[#FED853] px-7 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853] sm:mt-9"
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
            onSubmit={handleSubmit}
          >
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-6">
                  <Field
                    label="1. Your Full Name *"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                  <label className={labelClassName}>
                    2. Branch *
                    <select
                      className={inputClassName}
                      name="branch"
                      defaultValue=""
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
                    required
                  />
                  <Field
                    label="4. Roll Number *"
                    name="rollNumber"
                    placeholder="BTECH/12345/26"
                    pattern="BTECH/[0-9]{5}/26"
                    title="Enter your roll number in the format BTECH/12345/26"
                    required
                  />
                  <div className="space-y-4">
                    <Field
                      label="5. WhatsApp Number *"
                      name="whatsappNumber"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter your WhatsApp number"
                      required
                    />
                    <Field
                      label="Calling Number (Optional)"
                      name="callingNumber"
                      type="tel"
                      autoComplete="tel"
                      placeholder="Enter a different calling number"
                    />
                    <p className="text-xs leading-5 text-white/50">
                      Mention both cell numbers above if your WhatsApp and
                      calling numbers are different.
                    </p>
                  </div>
                </div>

                <label className={labelClassName}>
                  6. Why Join EDC, and What Makes It the Perfect Place to Turn
                  Your Ideas into Impact?
                  <textarea
                    className={`${inputClassName} min-h-32 resize-y`}
                    name="whyJoin"
                    placeholder="Share what motivates you to join EDC"
                  />
                </label>

                <label className={labelClassName}>
                  7. Share your previous experiences, leadership roles, or
                  Positions of Responsibility (PORs) held at school, college, or
                  any other organisation. Briefly describe your role and key
                  contributions in bullet points.
                  <textarea
                    className={`${inputClassName} min-h-32 resize-y`}
                    name="experience"
                    placeholder={"• Role or position\n• Key contribution"}
                  />
                </label>

                <label className={labelClassName}>
                  8. Other Student Bodies/Societies you are a part of as of now
                  (Optional)
                  <textarea
                    className={`${inputClassName} min-h-32 resize-y`}
                    name="otherSocieties"
                    placeholder="List your current student bodies or societies"
                  />
                </label>

                <label className={labelClassName}>
                  9. Great ideas demand greater commitment. If selected, how
                  would you balance your responsibilities across different
                  campus organisations while ensuring meaningful contributions
                  to EDC?
                  <textarea
                    className={`${inputClassName} min-h-32 resize-y`}
                    name="commitment"
                    placeholder="Tell us how you would manage your commitments"
                  />
                </label>

                <fieldset
                  id="subTeams"
                  aria-describedby={teamError ? "subTeams-error" : undefined}
                  aria-invalid={teamError ? "true" : undefined}
                  className="space-y-3"
                >
                  <legend className={labelClassName}>
                    10. Sub Teams you wish to be a part of (atmost 2)
                  </legend>
                  <p className="text-xs leading-5 text-white/50">
                    Choose up to two sub-teams.
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
                      placeholder="https://drive.google.com/..."
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
                    If given the chance, how would you solve them with practical, creative ideas?
                    <textarea
                      className={`${inputClassName} min-h-36 resize-y`}
                      name="campusIdeas"
                      placeholder="Share an observation and how you would address it"
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
                  <p className="text-xs leading-5 text-white/45">
                    This is a frontend-only form preview. Submissions are not
                    stored or sent anywhere until a backend is connected.
                  </p>
                </div>

                {submissionError && (
                  <p className="text-sm text-red-300" role="alert">
                    {submissionError}
                  </p>
                )}

                <button
                  type="submit"
                  className="group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#FED853] px-7 text-sm font-bold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FED853] sm:w-auto"
                >
                  Submit application
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
