import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Trash2,
  Eye,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  User,
} from "lucide-react";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import {
  adminLogout,
  fetchRecruitmentApplications,
  deleteRecruitmentApplication,
} from "./adminApi.js";
import RecruitmentDetailModal from "./RecruitmentDetailModal.jsx";
import DeleteConfirmModal from "./DeleteConfirmModal.jsx";

const BRANCHES = [
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
];

const SUB_TEAMS = [
  "Tech",
  "Design",
  "Video-Editing",
  "Outreach",
  "Sponsorship",
  "Media & Marketing",
];

export default function RecruitmentAdminDashboard({ user }) {
  const navigate = useNavigate();

  // Data states
  const [applications, setApplications] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedSubTeam, setSelectedSubTeam] = useState("all");

  // Modal states
  const [inspectingApp, setInspectingApp] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load applications
  const loadApplications = useCallback(
    async (showRefreshIndicator = false) => {
      if (showRefreshIndicator) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError("");

      try {
        const result = await fetchRecruitmentApplications({
          search: searchQuery,
          branch: selectedBranch,
          subTeam: selectedSubTeam,
        });

        setApplications(result.applications || []);
        setTotalCount(result.totalCount ?? result.applications?.length ?? 0);
      } catch (err) {
        if (err.isAuthError) {
          navigate("/recruitment/admin/login", { replace: true });
          return;
        }
        setError(err.message || "Failed to load applications");
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [searchQuery, selectedBranch, selectedSubTeam, navigate]
  );

  // Debounced load when search/filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      loadApplications();
    }, 250);

    return () => clearTimeout(timer);
  }, [loadApplications]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch {
      // Proceed to login even if logout request fails
    }
    navigate("/recruitment/admin/login", { replace: true });
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = async (applicationId) => {
    setIsDeleting(true);
    try {
      await deleteRecruitmentApplication(applicationId);

      // Close modals
      setDeletingApp(null);
      if (inspectingApp && inspectingApp.id === applicationId) {
        setInspectingApp(null);
      }

      setToastMessage({
        type: "success",
        text: "Recruitment application deleted permanently.",
      });

      // Refetch latest
      loadApplications();
    } catch (err) {
      setToastMessage({
        type: "error",
        text: err.message || "Failed to delete application.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedBranch("all");
    setSelectedSubTeam("all");
  };

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedBranch !== "all" ||
    selectedSubTeam !== "all";

  // Auto clear toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const formatDate = (iso) => {
    if (!iso) return "N/A";
    try {
      return new Date(iso).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white flex flex-col selection:bg-[#FED853] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-fade-in-up">
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm backdrop-blur-md ${
              toastMessage.type === "error"
                ? "bg-red-950/90 border-red-500/40 text-red-200"
                : "bg-emerald-950/90 border-emerald-500/40 text-emerald-200"
            }`}
          >
            {toastMessage.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span className="font-medium text-xs sm:text-sm">
              {toastMessage.text}
            </span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-white/40 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src={EDCLogo}
              alt="EDC BIT Mesra"
              className="w-9 h-9 object-contain"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-white">
                  EDC BIT Mesra
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider text-[#FED853] bg-[#FED853]/15 border border-[#FED853]/30 px-2 py-0.5 rounded-full">
                  Recruitment Admin
                </span>
              </div>
              <p className="text-[11px] text-white/50">Responses Dashboard</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/recruitment"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#FED853] px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#FED853]/40 transition"
            >
              <span>View Form</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {user?.username && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white/70">
                <User className="w-3.5 h-3.5 text-[#FED853]" />
                <span className="font-mono">{user.username}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/15 text-white/80 hover:text-red-300 border border-white/10 hover:border-red-500/30 transition cursor-pointer"
              title="Log out of Recruitment Admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* Title & Metrics Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>Recruitment Applications</span>
            </h1>
            <p className="text-xs text-white/50 mt-1">
              Live responses received for the EDC BIT Mesra recruitment drive.
            </p>
          </div>

          {/* Stats Badges & Refresh */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
              <span className="text-white/50">Total Applications:</span>
              <span className="font-bold text-[#FED853] text-sm">
                {totalCount}
              </span>
            </div>

            {hasActiveFilters && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#FED853]/10 border border-[#FED853]/25 text-xs text-[#FED853]">
                <span>Showing:</span>
                <span className="font-bold">{applications.length}</span>
              </div>
            )}

            <button
              onClick={() => loadApplications(true)}
              disabled={isRefreshing || isLoading}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition disabled:opacity-50 cursor-pointer"
              title="Refresh applications"
              aria-label="Refresh applications"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin text-[#FED853]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, roll no, or email..."
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-xs sm:text-sm text-white placeholder:text-white/30 focus:border-[#FED853] focus:ring-1 focus:ring-[#FED853]/30 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Branch Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-[#141414] text-xs sm:text-sm text-white focus:border-[#FED853] outline-none transition"
            >
              <option value="all">All Branches</option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Team Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedSubTeam}
              onChange={(e) => setSelectedSubTeam(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-white/10 bg-[#141414] text-xs sm:text-sm text-white focus:border-[#FED853] outline-none transition"
            >
              <option value="all">All Sub-Teams</option>
              {SUB_TEAMS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          <div className="lg:col-span-1 flex items-center justify-end">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl text-xs font-semibold text-white/60 hover:text-[#FED853] hover:bg-white/5 border border-white/10 transition cursor-pointer"
                title="Reset active filters"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-between text-red-300 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => loadApplications()}
              className="text-xs font-semibold underline hover:text-white"
            >
              Retry
            </button>
          </div>
        )}

        {/* Applications View */}
        {isLoading ? (
          <div className="p-16 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-white/50 gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#FED853]" />
            <p className="text-xs tracking-wide">Loading recruitment responses...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="p-16 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-white/40">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-white">
              No applications found
            </h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              {hasActiveFilters
                ? "No recruitment responses matched your active filters. Try modifying your search query or reset filters."
                : "No recruitment applications have been submitted through the form yet."}
            </p>
            {hasActiveFilters && (
              <div className="pt-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#FED853] text-black hover:bg-[#ffe580] transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            {/* Desktop Table View */}
            <div className="hidden md:block rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-white/60 uppercase tracking-wider text-[11px] font-semibold">
                      <th className="py-3.5 px-4">Applicant</th>
                      <th className="py-3.5 px-3">Branch</th>
                      <th className="py-3.5 px-4">Sub-Teams</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-3">Submitted</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-white/90">
                    {applications.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-white/[0.03] transition-colors group"
                      >
                        {/* Name & Roll Number */}
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => setInspectingApp(app)}
                            className="text-left group-hover:text-[#FED853] transition cursor-pointer"
                          >
                            <div className="font-semibold text-white group-hover:text-[#FED853] text-sm">
                              {app.fullName}
                            </div>
                            <div className="font-mono text-[11px] text-white/50">
                              {app.rollNumber}
                            </div>
                          </button>
                        </td>

                        {/* Branch */}
                        <td className="py-3 px-3">
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white/5 border border-white/10 text-white/80">
                            {app.branch}
                          </span>
                        </td>

                        {/* Sub-Teams */}
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {app.subTeams && app.subTeams.length > 0 ? (
                              app.subTeams.map((team) => (
                                <span
                                  key={team}
                                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FED853]/10 text-[#FED853] border border-[#FED853]/20"
                                >
                                  {team}
                                </span>
                              ))
                            ) : (
                              <span className="text-white/30 text-[10px]">—</span>
                            )}
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="py-3 px-4 text-white/70">
                          <div className="truncate max-w-[200px]" title={app.email}>
                            {app.email}
                          </div>
                          <div className="text-[11px] text-white/50 font-mono">
                            +91 {app.whatsappNumber}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-3 px-3 text-white/50 whitespace-nowrap text-[11px]">
                          {formatDate(app.createdAt)}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setInspectingApp(app)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-[#FED853]/15 text-white/80 hover:text-[#FED853] border border-white/10 hover:border-[#FED853]/30 transition cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingApp(app)}
                              className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition cursor-pointer"
                              title={`Delete ${app.fullName}`}
                              aria-label={`Delete ${app.fullName}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        onClick={() => setInspectingApp(app)}
                        className="font-bold text-white text-sm cursor-pointer hover:text-[#FED853]"
                      >
                        {app.fullName}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-white/50 font-mono">
                        <span>{app.rollNumber}</span>
                        <span>•</span>
                        <span className="text-[#FED853]">{app.branch}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/40">
                      {formatDate(app.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {app.subTeams?.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FED853]/10 text-[#FED853] border border-[#FED853]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs text-white/60 space-y-0.5">
                    <p className="truncate">{app.email}</p>
                    <p className="font-mono text-white/40">
                      WhatsApp: +91 {app.whatsappNumber}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setInspectingApp(app)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-[#FED853] border border-white/10"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Full Responses</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingApp(app)}
                      className="p-1.5 rounded-lg text-red-400 bg-red-500/10 border border-red-500/20"
                      aria-label="Delete response"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Detail Inspection Modal */}
      {inspectingApp && (
        <RecruitmentDetailModal
          application={inspectingApp}
          onClose={() => setInspectingApp(null)}
          onDeleteRequest={(app) => {
            setDeletingApp(app);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingApp && (
        <DeleteConfirmModal
          application={deletingApp}
          isOpen={Boolean(deletingApp)}
          isDeleting={isDeleting}
          onCancel={() => setDeletingApp(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}

RecruitmentAdminDashboard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
};
