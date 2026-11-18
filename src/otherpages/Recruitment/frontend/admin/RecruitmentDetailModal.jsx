import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  X,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Calendar,
  BookOpen,
  Award,
  Users,
  Clock,
  Lightbulb,
  Trash2,
} from "lucide-react";

export default function RecruitmentDetailModal({
  application,
  onClose,
  onDeleteRequest,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!application) return null;

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    try {
      const d = new Date(isoString);
      return d.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const whatsappLink = application.whatsappNumber
    ? `https://wa.me/91${application.whatsappNumber.replace(/\D/g, "")}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-[#111111] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white animate-fade-in-up"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-white/10 bg-[#161616]">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FED853]/15 text-[#FED853] border border-[#FED853]/30">
                {application.branch}
              </span>
              <span className="text-xs text-white/50 font-mono">
                {application.rollNumber}
              </span>
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(application.createdAt)}
              </span>
            </div>
            <h2 id="modal-title" className="text-xl font-bold text-white">
              {application.fullName}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm divide-y divide-white/5">
          {/* Contact & Links Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <a
              href={`mailto:${application.email}`}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FED853]/50 hover:bg-white/[0.05] transition text-xs text-white/90 group"
            >
              <Mail className="w-4 h-4 text-[#FED853] flex-shrink-0" />
              <div className="truncate">
                <p className="text-[10px] text-white/40 uppercase">Email</p>
                <p className="truncate font-medium group-hover:text-white">
                  {application.email}
                </p>
              </div>
            </a>

            {whatsappLink ? (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition text-xs text-white/90 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/40 uppercase">WhatsApp</p>
                  <p className="font-medium group-hover:text-emerald-300">
                    +91 {application.whatsappNumber}
                  </p>
                </div>
              </a>
            ) : null}

            {application.callingNumber && (
              <a
                href={`tel:${application.callingNumber}`}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition text-xs text-white/90"
              >
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-white/40 uppercase">Calling</p>
                  <p className="font-medium">+91 {application.callingNumber}</p>
                </div>
              </a>
            )}
          </div>

          {/* Sub-teams & Discovery Source */}
          <div className="pt-5 space-y-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50 mb-2 font-semibold">
                Applied Sub-Teams
              </p>
              <div className="flex flex-wrap gap-2">
                {application.subTeams && application.subTeams.length > 0 ? (
                  application.subTeams.map((team) => (
                    <span
                      key={team}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#FED853]/10 text-[#FED853] border border-[#FED853]/25"
                    >
                      {team}
                    </span>
                  ))
                ) : (
                  <span className="text-white/40 text-xs">None specified</span>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
              <div>
                <span className="text-white/50">Discovered via: </span>
                <span className="text-white font-medium">
                  {application.discoverySource || "N/A"}
                </span>
              </div>
              {application.portfolioLink && (
                <a
                  href={application.portfolioLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#FED853] hover:underline font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Portfolio / Projects
                </a>
              )}
              {application.resumeLink && (
                <a
                  href={application.resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#FED853] hover:underline font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Resume Link
                </a>
              )}
            </div>
          </div>

          {/* Detailed Responses Section */}
          <div className="pt-5 space-y-6">
            {/* 1. Why Join */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FED853] uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>1. Motivation: Why Join EDC</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/85 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {application.whyJoin || (
                  <span className="italic text-white/40">No response provided</span>
                )}
              </div>
            </div>

            {/* 2. Past Experience / PORs */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FED853] uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>2. Past Experience / PORs</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/85 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {application.experience || (
                  <span className="italic text-white/40">No response provided</span>
                )}
              </div>
            </div>

            {/* 3. Other Societies */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>3. Other Societies / Student Bodies</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/80 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {application.otherSocieties || (
                  <span className="italic text-white/40">None / Not currently in other societies</span>
                )}
              </div>
            </div>

            {/* 4. Commitment */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FED853] uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>4. Commitment & Balancing Responsibilities</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/85 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {application.commitment || (
                  <span className="italic text-white/40">No response provided</span>
                )}
              </div>
            </div>

            {/* 5. Campus Inefficiencies & Solutions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FED853] uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>5. Campus Observations & Solutions</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-white/85 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                {application.campusIdeas || (
                  <span className="italic text-white/40">No response provided</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-[#161616] flex items-center justify-between">
          <button
            type="button"
            onClick={() => onDeleteRequest(application)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Response</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

RecruitmentDetailModal.propTypes = {
  application: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
};
