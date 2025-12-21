import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { auth } from "@/utils/api";
import EDCLogo from "@assets/edclogo3d.png?url&w=100&format=webp&quality=90&as=meta";
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Clock,
  Bell,
  Loader2,
  AlertCircle,
  Filter,
  AlertTriangle,
} from "lucide-react";
import {
  useNotices,
  useDeleteNotice,
  useToggleNoticeStatus,
} from "@/hooks/useNotices";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.getUser();
  const [filterStatus, setFilterStatus] = useState("all"); // all, published, draft
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingPublish, setPendingPublish] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // React Query hooks
  const { data: articles = [], isLoading, error } = useNotices();
  const deleteNoticeMutation = useDeleteNotice();
  const toggleStatusMutation = useToggleNoticeStatus();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await auth.logout();
    navigate("/admin/auth");
  };

  const handleCreateNew = () => {
    navigate("/admin/editor/new");
  };

  const handleEdit = (articleId) => {
    navigate(`/admin/editor/${articleId}`);
  };

  const handleToggleLive = async (articleId) => {
    const targetArticle = articles.find((n) => n.id === articleId);
    const currentLiveArticle = articles.find((n) => n.status === "published");

    // Always show confirmation dialog when clicking the eye icon
    setPendingPublish({
      articleId,
      targetArticle,
      currentLiveArticle,
      action: targetArticle.status === "published" ? "unpublish" : "publish",
    });
    setShowConfirmDialog(true);
  };

  const confirmPublish = async () => {
    if (!pendingPublish) return;

    try {
      await toggleStatusMutation.mutateAsync({
        id: pendingPublish.articleId,
        currentStatus: pendingPublish.targetArticle.status,
      });

      // Show appropriate success message
      if (pendingPublish.action === "publish") {
        if (pendingPublish.currentLiveArticle) {
          toast.success(
            `Article published successfully. "${pendingPublish.currentLiveArticle.title}" has been unpublished.`
          );
        } else {
          toast.success("Article published successfully!");
        }
      } else {
        toast.success("Article unpublished successfully!");
      }

      setShowConfirmDialog(false);
      setPendingPublish(null);
    } catch (error) {
      toast.error(
        error.response.data?.message || "Failed to update article status."
      );
    }
  };

  const cancelPublish = () => {
    setShowConfirmDialog(false);
    setPendingPublish(null);
  };

  const handleDelete = async (articleId) => {
    toast.error("Are you sure you want to delete this article?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteNoticeMutation.mutateAsync(articleId);
            toast.success("Article deleted successfully!");
          } catch (error) {
            toast.error("Failed to delete article. Please try again.");
            console.error(error);
          }
        },
      },
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Extract excerpt from content JSON
  const getExcerpt = (content) => {
    if (!content) return "No content";
    try {
      const contentObj =
        typeof content === "string" ? JSON.parse(content) : content;
      const firstTextNode = contentObj?.root?.children?.[0];
      if (firstTextNode?.children?.[0]?.text) {
        const text = firstTextNode.children[0].text;
        return text.length > 100 ? text.substring(0, 100) + "..." : text;
      }
      return "No content";
    } catch {
      return "No content";
    }
  };

  const liveArticle = articles.find((n) => n.status === "published");

  // Filter articles based on status
  const filteredArticles = articles.filter((article) => {
    if (filterStatus === "all") return true;
    return article.status === filterStatus;
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading articles...</p>
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
            Failed to load articles
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
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">EDC - BITM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/submissions")}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium"
            >
              View Submissions
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
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 flex items-center gap-2">
                Welcome back, {user?.name}! 👋
              </h2>
              <p className="text-gray-600">
                Manage articles for your organization. Only one article can be
                published at a time.
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 shadow-md"
            >
              <Plus size={18} />
              Create New Article
            </button>
          </div>
        </div>

        {/* Live Article Alert */}
        {liveArticle && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Eye className="text-green-600" size={18} />
              <span className="font-semibold text-green-800">
                Currently Published Article:
              </span>
            </div>
            <p className="text-green-700 text-sm">{liveArticle.title}</p>
          </div>
        )}

        {/* Confirmation Dialog */}
        {showConfirmDialog && pendingPublish && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`p-3 rounded-full ${
                    pendingPublish.action === "publish"
                      ? "bg-orange-100"
                      : "bg-blue-100"
                  }`}
                >
                  <AlertTriangle
                    className={
                      pendingPublish.action === "publish"
                        ? "text-orange-600"
                        : "text-blue-600"
                    }
                    size={24}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {pendingPublish.action === "publish"
                      ? "Confirm Publishing"
                      : "Confirm Unpublishing"}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {pendingPublish.action === "publish"
                      ? "⚠️ Only one article can be published at a time."
                      : "⚠️ This will remove the article from public view."}
                  </p>
                </div>
              </div>

              {pendingPublish.action === "publish" &&
              pendingPublish.currentLiveArticle ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-3">
                    <span className="font-semibold">Currently Published:</span>
                    <br />
                    <span className="text-green-700">
                      "{pendingPublish.currentLiveArticle.title}"
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Will be Published:</span>
                    <br />
                    <span className="text-blue-700">
                      "{pendingPublish.targetArticle.title}"
                    </span>
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">
                      {pendingPublish.action === "publish"
                        ? "Publishing:"
                        : "Unpublishing:"}
                    </span>
                    <br />
                    <span
                      className={
                        pendingPublish.action === "publish"
                          ? "text-blue-700"
                          : "text-orange-700"
                      }
                    >
                      "{pendingPublish.targetArticle.title}"
                    </span>
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-600 mb-6">
                {pendingPublish.action === "publish"
                  ? pendingPublish.currentLiveArticle
                    ? "Publishing this article will automatically unpublish the current live article. Do you want to continue?"
                    : "Do you want to publish this article?"
                  : "This article will be set to draft status and will no longer be visible on the announcement page. Do you want to continue?"}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={cancelPublish}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPublish}
                  disabled={toggleStatusMutation.isPending}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    pendingPublish.action === "publish"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-orange-600 hover:bg-orange-700 text-white"
                  }`}
                >
                  {toggleStatusMutation.isPending ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      {pendingPublish.action === "publish"
                        ? "Publishing..."
                        : "Unpublishing..."}
                    </>
                  ) : pendingPublish.action === "publish" ? (
                    "Publish Article"
                  ) : (
                    "Unpublish Article"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Articles Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <h3 className="text-xl font-bold text-gray-900">All Articles</h3>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <div className="flex gap-1 border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStatus === "all"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  All ({articles.length})
                </button>
                <button
                  onClick={() => setFilterStatus("published")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStatus === "published"
                      ? "bg-green-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Published (
                  {articles.filter((a) => a.status === "published").length})
                </button>
                <button
                  onClick={() => setFilterStatus("draft")}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                    filterStatus === "draft"
                      ? "bg-gray-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Drafts ({articles.filter((a) => a.status === "draft").length})
                </button>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-4">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <Bell className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-500 mb-4">
                  {filterStatus === "all"
                    ? "No articles yet"
                    : `No ${filterStatus} articles`}
                </p>
                {filterStatus === "all" && (
                  <button
                    onClick={handleCreateNew}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium inline-flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Create Your First Article
                  </button>
                )}
              </div>
            ) : (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className={`bg-white border rounded-xl p-5 hover:shadow-md transition-all relative ${
                    article.status === "published"
                      ? "border-green-300 shadow-md ring-2 ring-green-100"
                      : "border-gray-200"
                  }`}
                >
                  {/* Live Indicator Badge */}
                  {article.status === "published" && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                        LIVE
                      </div>
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-4">
                    {/* Article Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {article.title}
                        </h4>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            article.status === "published"
                              ? "bg-green-100 text-green-700 border border-green-300"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {article.status === "published" ? (
                            <span className="flex items-center gap-1">
                              <Eye size={12} />
                              Published
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <EyeOff size={12} />
                              Draft
                            </span>
                          )}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {getExcerpt(article.content)}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          Created: {formatDate(article.created)}
                        </span>
                        {article.updated !== article.created && (
                          <span>Updated: {formatDate(article.updated)}</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(article.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleLive(article.id)}
                        disabled={toggleStatusMutation.isPending}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          article.status === "published"
                            ? "text-orange-600 hover:bg-orange-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={
                          article.status === "published"
                            ? "Unpublish Article"
                            : liveArticle
                            ? `Publish Article (will unpublish "${liveArticle.title}")`
                            : "Publish Article"
                        }
                      >
                        {article.status === "published" ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* User Info Card */}
        <footer className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Your Account</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="font-medium text-gray-900">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Role</p>
              <p className="font-medium text-gray-900">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === "ADMIN"
                      ? "bg-purple-100 text-purple-800 border border-purple-200"
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}
                >
                  {user?.role || "USER"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email Verified</p>
              <p className="font-medium text-gray-900">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.isEmailVerified
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  }`}
                >
                  {user?.isEmailVerified ? "✓ Verified" : "✗ Not Verified"}
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">User Since</p>
              <p className="font-medium text-gray-900">
                {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">User ID</p>
              <p className="font-mono text-sm text-gray-700">{user?.id}</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
