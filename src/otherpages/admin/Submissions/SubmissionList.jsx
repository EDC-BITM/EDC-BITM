import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { auth } from "@/utils/api";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import {
  Eye,
  Loader2,
  AlertCircle,
  Filter,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useSubmissions, useDeleteSubmission } from "@/hooks/useSubmissions";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const SubmissionList = () => {
  const navigate = useNavigate();
  const user = auth.getUser();
  const [filterStage, setFilterStage] = useState("all");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // React Query hooks - disable caching for debugging
  const { data, isLoading, error, refetch } = useSubmissions();
  const deleteSubmissionMutation = useDeleteSubmission();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await auth.logout();
    navigate("/admin/auth");
  };

  const handleDelete = async (submissionId) => {
    toast.error("Are you sure you want to delete this submission?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteSubmissionMutation.mutateAsync(submissionId);
            toast.success("Submission deleted successfully!");
          } catch (error) {
            toast.error("Failed to delete submission. Please try again.");
            console.error(error);
          }
        },
      },
    });
  };

  // Extract submissions from response
  console.log("Full data object:", data);
  console.log("data.data:", data?.data);
  console.log("Is data.data an array?", Array.isArray(data?.data));

  const submissions = data?.data || [];
  const total = data?.pagination?.total || submissions.length;

  console.log("Extracted submissions:", submissions);
  console.log("Total:", total);

  // Filter submissions based on stage
  const filteredSubmissions = submissions.filter((submission) => {
    if (filterStage === "all") return true;
    return submission.currentStage === filterStage;
  });

  // Count by stage
  const stageCount = {
    IDEA: submissions.filter((s) => s.currentStage === "IDEA").length,
    PROTOTYPE: submissions.filter((s) => s.currentStage === "PROTOTYPE").length,
    EARLY_CUSTOMERS: submissions.filter(
      (s) => s.currentStage === "EARLY_CUSTOMERS"
    ).length,
    REVENUE: submissions.filter((s) => s.currentStage === "REVENUE").length,
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading submissions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to load submissions
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center border border-yellow-200">
              <span className="text-yellow-600 font-bold text-lg">
                <img src={EDCLogo.src} alt="EDC Logo" className="w-8 h-8" />
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Startup Submissions
              </h1>
              <p className="text-sm text-gray-600">EDC - BITM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Dashboard
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
        {/* Welcome Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 flex items-center gap-2">
                Startup Submissions 🚀
              </h2>
              <p className="text-gray-600">
                Review and manage all startup idea submissions from students
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-3 py-1.5 bg-white rounded-lg border border-gray-200 font-semibold">
                Total: {total}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-900">All Submissions</h3>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setFilterStage("all")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStage === "all"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All ({total})
                </button>
                <button
                  onClick={() => setFilterStage("IDEA")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStage === "IDEA"
                      ? "bg-gray-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Idea ({stageCount.IDEA})
                </button>
                <button
                  onClick={() => setFilterStage("PROTOTYPE")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStage === "PROTOTYPE"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Prototype ({stageCount.PROTOTYPE})
                </button>
                <button
                  onClick={() => setFilterStage("EARLY_CUSTOMERS")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStage === "EARLY_CUSTOMERS"
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Early Customers ({stageCount.EARLY_CUSTOMERS})
                </button>
                <button
                  onClick={() => setFilterStage("REVENUE")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStage === "REVENUE"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Revenue ({stageCount.REVENUE})
                </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <DataTable columns={columns} data={filteredSubmissions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubmissionList;
