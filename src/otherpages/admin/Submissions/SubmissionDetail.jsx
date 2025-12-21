import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { auth } from "@/utils/api";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import {
  Loader2,
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Globe,
  FileText,
  Link as LinkIcon,
  Users,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSubmission } from "@/hooks/useSubmissions";
import { Toaster } from "sonner";

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = auth.getUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data, isLoading, error } = useSubmission(id);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await auth.logout();
    navigate("/admin/auth");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading submission...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <div className="min-h-screen bg-white">
        <Toaster position="top-right" richColors />

        {/* Header */}
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
                <img src={EDCLogo.src} alt="EDC Logo" className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Submission Details
                </h1>
                <p className="text-sm text-gray-600">EDC - BITM</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
          <p className="text-red-500 text-lg mb-4">
            {error?.message || "Submission not found"}
          </p>
          <Button asChild>
            <Link to="/admin/submissions">Go Back</Link>
          </Button>
        </div>
      </div>
    );
  }

  const submission = data.data;
  const {
    title,
    oneLiner,
    problemStatement,
    solution,
    currentStage,
    name,
    email,
    contactNumber,
    batch,
    rollNumber,
    teamMembers,
    techStack,
    competitors,
    uniqueness,
    marketSize,
    targetCustomer,
    businessModel,
    websiteUrl,
    demoUrl,
    pitchDeckUrl,
    otherLinks,
    additionalInfo,
    specificGuidance,
    createdAt,
  } = submission;

  const getStageVariant = (stage) => {
    switch (stage) {
      case "IDEA":
        return "secondary";
      case "PROTOTYPE":
        return "default";
      case "EARLY_CUSTOMERS":
        return "outline";
      case "REVENUE":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
              <img src={EDCLogo.src} alt="EDC Logo" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Submission Details
              </h1>
              <p className="text-sm text-gray-600">EDC - BITM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/submissions")}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg border border-red-200 hover:bg-red-100 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging out...
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-6 py-8 border-b border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {title || "Untitled Submission"}
                    </h1>
                    {currentStage && (
                      <Badge
                        variant={getStageVariant(currentStage)}
                        className="text-sm"
                      >
                        {currentStage.replace(/_/g, " ")}
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 max-w-3xl">
                    {oneLiner || "No description provided"}
                  </p>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                  <Calendar className="h-4 w-4" />
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* The Idea */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                    The Big Idea
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                      <h3 className="text-sm font-semibold text-red-700 mb-2 uppercase tracking-wide">
                        Problem Statement
                      </h3>
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {problemStatement || "No problem statement provided"}
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="text-sm font-semibold text-blue-700 mb-2 uppercase tracking-wide">
                        Proposed Solution
                      </h3>
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {solution || "No solution provided"}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Market & Business */}
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                    Market & Business
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {uniqueness && (
                      <InfoCard label="Uniqueness (USP)" value={uniqueness} />
                    )}
                    {targetCustomer && (
                      <InfoCard
                        label="Target Customer"
                        value={targetCustomer}
                      />
                    )}
                    {marketSize && (
                      <InfoCard label="Market Size" value={marketSize} />
                    )}
                    {businessModel && (
                      <InfoCard label="Business Model" value={businessModel} />
                    )}
                    {competitors && (
                      <InfoCard
                        label="Competitors"
                        value={competitors}
                        fullWidth
                      />
                    )}
                  </div>
                  {!uniqueness &&
                    !targetCustomer &&
                    !marketSize &&
                    !businessModel &&
                    !competitors && (
                      <p className="text-sm text-gray-500 italic">
                        No market/business information provided
                      </p>
                    )}
                </section>

                {/* Technical */}
                {techStack && (
                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                      Technical Details
                    </h2>
                    <InfoCard label="Tech Stack" value={techStack} fullWidth />
                  </section>
                )}

                {/* Additional Information */}
                {(additionalInfo || specificGuidance) && (
                  <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                      Additional Information
                    </h2>
                    <div className="space-y-4">
                      {additionalInfo && (
                        <InfoCard
                          label="Additional Info"
                          value={additionalInfo}
                          fullWidth
                        />
                      )}
                      {specificGuidance && (
                        <InfoCard
                          label="Specific Guidance Needed"
                          value={specificGuidance}
                          fullWidth
                        />
                      )}
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Founder Info */}
                <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-yellow-600" /> Founder
                  </h3>
                  <div className="space-y-3">
                    <div className="font-medium text-lg text-gray-900">
                      {name || "Anonymous"}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <a
                        href={`mailto:${email}`}
                        className="hover:text-yellow-600 transition-colors"
                      >
                        {email || "No email provided"}
                      </a>
                    </div>
                    {contactNumber && (
                      <div className="flex items-center text-sm text-gray-600 gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />{" "}
                        {contactNumber}
                      </div>
                    )}
                    {(batch || rollNumber) && (
                      <div className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100 space-y-1">
                        {batch && (
                          <div>
                            <span className="font-medium">Batch:</span> {batch}
                          </div>
                        )}
                        {rollNumber && (
                          <div>
                            <span className="font-medium">Roll No:</span>{" "}
                            {rollNumber}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Links */}
                {(websiteUrl || demoUrl || pitchDeckUrl || otherLinks) && (
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                      <LinkIcon className="h-5 w-5 text-yellow-600" /> Important
                      Links
                    </h3>
                    <div className="space-y-2">
                      {websiteUrl && (
                        <LinkItem
                          icon={<Globe className="h-4 w-4" />}
                          label="Website"
                          url={websiteUrl}
                        />
                      )}
                      {demoUrl && (
                        <LinkItem
                          icon={<Globe className="h-4 w-4" />}
                          label="Demo"
                          url={demoUrl}
                        />
                      )}
                      {pitchDeckUrl && (
                        <LinkItem
                          icon={<FileText className="h-4 w-4" />}
                          label="Pitch Deck"
                          url={pitchDeckUrl}
                        />
                      )}
                      {otherLinks && (
                        <LinkItem
                          icon={<LinkIcon className="h-4 w-4" />}
                          label="Other Links"
                          url={otherLinks}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* Team Members */}
                {teamMembers && teamMembers.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                      <Users className="h-5 w-5 text-yellow-600" /> Team Members
                    </h3>
                    <div className="space-y-4">
                      {teamMembers.map((member, idx) => (
                        <div
                          key={member.id || idx}
                          className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                        >
                          <div className="font-medium text-gray-900">
                            {member.name}
                          </div>
                          {member.role && (
                            <div className="text-xs text-blue-600 font-medium mt-1">
                              {member.role}
                            </div>
                          )}
                          {member.email && (
                            <div className="text-xs text-gray-500 mt-1">
                              {member.email}
                            </div>
                          )}
                          {member.contactNumber && (
                            <div className="text-xs text-gray-500">
                              {member.contactNumber}
                            </div>
                          )}
                          {(member.batch || member.rollNumber) && (
                            <div className="text-xs text-gray-400 mt-1">
                              {member.batch && (
                                <span>Batch: {member.batch}</span>
                              )}
                              {member.batch && member.rollNumber && (
                                <span> • </span>
                              )}
                              {member.rollNumber && (
                                <span>Roll: {member.rollNumber}</span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoCard = ({ label, value, fullWidth = false }) => {
  if (!value) return null;
  return (
    <div
      className={`p-4 bg-gray-50 rounded-lg border border-gray-100 ${
        fullWidth ? "col-span-1 md:col-span-2" : ""
      }`}
    >
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </h4>
      <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
};

const LinkItem = ({ icon, label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 group"
  >
    <span className="flex items-center gap-2 text-sm text-gray-700">
      <span className="text-gray-400 group-hover:text-yellow-600 transition-colors">
        {icon}
      </span>
      {label}
    </span>
    <ExternalLink className="h-3.5 w-3.5 text-gray-400 group-hover:text-yellow-600 transition-colors" />
  </a>
);

export default SubmissionDetail;
