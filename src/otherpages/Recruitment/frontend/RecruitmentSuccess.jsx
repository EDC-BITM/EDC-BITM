import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Copy,
  Download,
  Instagram,
  Linkedin,
  MessageCircle,
  Share2,
  Users,
} from "lucide-react";
import { Navigate, useLocation } from "react-router-dom";
import { createApplicationStory } from "./applicationStory.js";
import { downloadApplicationLetter } from "./applicationLetter.js";
import edcLetterhead from "../../../assets/EDC_LOGO.png";
import storyTemplateSrc from "../../../assets/story-template.png";
import {
  isRecruitmentSubmission,
  readRecruitmentSubmission,
} from "./recruitmentSubmission.js";

export default function RecruitmentSuccess() {
  const { state } = useLocation();
  const [submission] = useState(() =>
    isRecruitmentSubmission(state) ? state : readRecruitmentSubmission(),
  );
  const [storyImage, setStoryImage] = useState("");
  const [isDownloadingLetter, setIsDownloadingLetter] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const selectedRoles = submission?.subTeams.join(", ");
  const firstName =
    submission?.firstName ||
    submission?.name?.trim().split(/\s+/)[0] ||
    "Applicant";
  const recruitmentUrl = `${window.location.origin}/recruitment`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Know someone who'd fit in at EDC? Apply here: ${recruitmentUrl}`,
  )}`;

  useEffect(() => {
    let isMounted = true;
    if (submission) {
      createApplicationStory(submission)
        .then((dataUrl) => {
          if (isMounted && dataUrl) {
            setStoryImage(dataUrl);
          }
        })
        .catch((err) => {
          console.error("Failed to generate application story:", err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [submission]);

  if (!submission) {
    return <Navigate to="/recruitment" replace />;
  }

  async function handleShareStory() {
    let imageToShare = storyImage;
    if (!imageToShare) {
      try {
        imageToShare = await createApplicationStory(submission);
        setStoryImage(imageToShare);
      } catch (err) {
        console.error("Could not generate story image for sharing:", err);
      }
    }

    if (!imageToShare) {
      setShareMessage("Generating story image, please try again in a second.");
      return;
    }

    if (!navigator.share || !navigator.canShare) {
      // Direct download fallback
      const link = document.createElement("a");
      link.href = imageToShare;
      link.download = `edc-application-story-${firstName}.png`;
      link.click();
      setShareMessage(
        "Story image downloaded! Share it on your Instagram Story or WhatsApp Status.",
      );
      return;
    }

    try {
      const base64 = imageToShare.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (character) =>
        character.charCodeAt(0),
      );
      const file = new File([bytes], "edc-application-story.png", {
        type: "image/png",
      });

      if (!navigator.canShare({ files: [file] })) {
        const link = document.createElement("a");
        link.href = imageToShare;
        link.download = `edc-application-story-${firstName}.png`;
        link.click();
        setShareMessage(
          "Story image downloaded! Share it on your Instagram Story or WhatsApp Status.",
        );
        return;
      }

      await navigator.share({
        files: [file],
        title: "EDC BIT Mesra",
        text: "Big ideas start here. #EDCBITMesra",
      });
      setShareMessage("The image was shared using your device’s share menu.");
    } catch (error) {
      if (error.name !== "AbortError") {
        setShareMessage(
          "Could not open the share menu. Image downloaded to share manually.",
        );
        const link = document.createElement("a");
        link.href = imageToShare;
        link.download = `edc-application-story-${firstName}.png`;
        link.click();
      }
    }
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(recruitmentUrl);
      setShareMessage("Recruitment link copied.");
    } catch {
      setShareMessage(
        "Could not copy the link. You can share the recruitment page directly: " +
          recruitmentUrl,
      );
    }
  }

  async function handleDownloadLetter() {
    try {
      setIsDownloadingLetter(true);
      setShareMessage("");
      await downloadApplicationLetter(submission, edcLetterhead);
    } catch (error) {
      console.error("Failed to generate application acknowledgement letter:", error);
      setShareMessage(
        "Could not generate letter right now. Please try again.",
      );
    } finally {
      setIsDownloadingLetter(false);
    }
  }

  const previewImage = storyImage || storyTemplateSrc;

  return (
    <main className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-x-hidden bg-[#090909] px-4 py-5 text-white sm:px-5 sm:py-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.035),transparent_55%)]" />
      <section
        className="relative z-10 mx-auto min-h-[calc(100dvh-2.5rem)] w-full max-w-[390px] rounded-2xl border border-white/10 bg-[#111114] p-3 sm:min-h-0 sm:max-w-6xl sm:rounded-3xl sm:bg-white/[0.035] sm:p-5 lg:border-white/10 lg:p-5"
        aria-labelledby="submission-success-title"
      >
        <div className="flex min-h-[calc(100dvh-4.25rem)] flex-col sm:min-h-0 sm:grid sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-[minmax(230px,0.38fr)_minmax(0,1fr)] lg:items-center lg:gap-10 lg:rounded-[inherit] lg:bg-[#121217] lg:px-10 lg:py-8">
          <img
            src={previewImage}
            alt="EDC application story letter preview"
            className="hidden w-full self-center rounded-xl border border-white/10 shadow-2xl sm:mt-1 sm:block lg:mt-0"
          />
          <div className="flex min-w-0 flex-1 flex-col justify-between text-lg leading-[1.55] text-white/75 sm:justify-start sm:text-xs sm:leading-[1.45] lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-3 lg:text-sm">
            <header className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 lg:col-span-2 lg:border-0 lg:pb-1">
              <div>
                <div className="flex items-center gap-1.5 text-[#FED853]">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  <h1
                    id="submission-success-title"
                    className="text-2xl font-bold text-white sm:text-lg"
                  >
                    You&apos;re in, {firstName}!
                  </h1>
                </div>
                <p className="mt-1">
                  Your application has reached the EDC team.
                </p>
              </div>
            </header>

            <section className="border-b border-white/10 py-3 sm:py-4 lg:col-span-2 lg:rounded-xl lg:border-0 lg:bg-[#1d1d24] lg:p-4">
              <div className="flex items-start gap-2.5 rounded-xl bg-[#1d1d24] p-2.5 sm:hidden">
                <img
                  src={previewImage}
                  alt="EDC application story preview"
                  className="w-9 shrink-0 rounded-md border border-white/10"
                />
                <div className="min-w-0">
                  <p className="text-sm leading-snug">
                    {selectedRoles}. Keep it for the next rounds.
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <p className="hidden font-medium text-white/65 lg:block">
                  Your selected teams
                </p>
                <p className="mt-1">
                  {selectedRoles}. Keep it for the next rounds.
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 sm:mt-3 lg:mt-4">
                <button
                  type="button"
                  onClick={handleDownloadLetter}
                  disabled={isDownloadingLetter}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-[#FED853] px-3.5 text-base font-semibold text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FED853] disabled:opacity-60 sm:min-h-9 sm:text-xs lg:text-sm"
                >
                  <Download size={14} aria-hidden="true" />
                  {isDownloadingLetter ? "Generating PDF..." : "Download Letter"}
                </button>
                <button
                  type="button"
                  onClick={handleShareStory}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/20 px-3.5 text-base font-semibold text-white transition hover:border-[#FED853] hover:text-[#FED853] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FED853] sm:min-h-9 sm:text-xs lg:text-sm"
                >
                  <Share2 size={14} aria-hidden="true" />
                  Share to Story
                </button>
              </div>
            </section>

            <section className="border-b border-white/10 py-3 sm:py-4 lg:col-start-1 lg:row-start-3 lg:border-0 lg:py-2">
              <h2 className="text-xl font-semibold text-white sm:text-xs lg:text-base">What&apos;s next</h2>
              <p className="mt-1">
                Shortlisted candidates will hear from us on WhatsApp and email.
              </p>
            </section>

            <section className="border-b border-white/10 py-3 sm:py-4 lg:col-start-2 lg:row-start-3 lg:border-0 lg:py-2">
              <h2 className="text-xl font-semibold text-white sm:text-xs lg:text-base">Stay in the loop</h2>
              <div className="mt-2 flex flex-wrap gap-1.5 lg:gap-1">
                <a
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-white/10 px-2 text-sm text-[#FED853] hover:text-white lg:min-h-8 lg:px-3 lg:text-sm"
                  href="https://chat.whatsapp.com/DkNrnobcUFNIfZNw04syzM?mode=gi_t"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle size={13} aria-hidden="true" />
                  <span className="lg:hidden">WhatsApp</span>
                  <span className="hidden lg:inline">WhatsApp</span>
                </a>
                <a
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-white/10 px-2 text-sm text-[#FED853] hover:text-white lg:min-h-8 lg:px-3 lg:text-sm"
                  href="https://www.instagram.com/edcbitmesra?psln=ZTNwNDcxZjN1ZXcy"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={13} aria-hidden="true" />
                  <span className="lg:hidden">Instagram</span>
                  <span className="hidden lg:inline">Instagram</span>
                </a>
                <a
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-white/10 px-2 text-sm text-[#FED853] hover:text-white lg:min-h-8 lg:px-3 lg:text-sm"
                  href="https://www.linkedin.com/company/edcbitmesra/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={13} aria-hidden="true" />
                  <span className="lg:hidden">LinkedIn</span>
                  <span className="hidden lg:inline">LinkedIn</span>
                </a>
              </div>
            </section>

            <section className="mt-3 rounded-xl border border-white/10 bg-[#1d1d24] p-3 sm:mt-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-4 lg:col-span-2 lg:rounded-xl lg:border lg:border-white/10 lg:bg-[#1d1d24]">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ffd13d] text-black lg:h-9 lg:w-9">
                  <Users size={14} aria-hidden="true" className="lg:hidden" />
                  <Users size={18} aria-hidden="true" className="hidden lg:block" />
                </span>
                <div>
                  <h2 className="text-xl font-semibold text-white sm:text-xs lg:text-base">
                Know someone who&apos;d fit in?
                  </h2>
                  <p className="hidden text-[11px] text-white/60 lg:block">
                    Send them your link and bring a friend into EDC.
                  </p>
                </div>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 max-[360px]:gap-1 sm:mt-3 sm:gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-white/20 px-3 text-sm font-semibold text-white transition hover:border-[#FED853] hover:text-[#FED853] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FED853] sm:text-xs lg:text-sm"
                >
                  <Copy size={12} aria-hidden="true" />
                  Copy Link
                </button>
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/20 px-3 text-base font-semibold text-white transition hover:border-[#FED853] hover:text-[#FED853] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FED853] sm:min-h-9 sm:text-xs lg:border-[#f4f2eb] lg:bg-[#f4f2eb] lg:text-black lg:hover:bg-white lg:hover:text-black lg:text-sm"
                >
                  <MessageCircle size={12} aria-hidden="true" />
                  Share on WhatsApp
                </a>
              </div>
              {shareMessage && (
                <p className="mt-1" role="status" aria-live="polite">
                  {shareMessage}
                </p>
              )}
              <p className="mt-2 text-white/80">Keep building. - Team EDC</p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
