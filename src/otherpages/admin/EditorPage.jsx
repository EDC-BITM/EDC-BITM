import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import Editor from "@/components/admin/Editor";
import {
  useNotice,
  useCreateNotice,
  useUpdateNotice,
  useNotices,
} from "@/hooks/useNotices";
import { clearEditorContent } from "@/otherpages/admin/editorUtils";

const EditorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNewArticle = id === "new";

  // Fetch existing article if editing
  const { data, isLoading, error } = useNotice(id);
  const { data: allArticles = [] } = useNotices();
  const createMutation = useCreateNotice();
  const updateMutation = useUpdateNotice();

  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState(null);
  const [status, setStatus] = useState("draft");
  const [isSaving, setIsSaving] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [pendingSaveStatus, setPendingSaveStatus] = useState(null);

  // Load article data when editing
  useEffect(() => {
    if (data && !isNewArticle) {
      console.log("Loaded article for editing:", data.article.content);
      setTitle(data.article.title || "");
      setEditorContent(data.article.content || "");
      setStatus(data.article.status || "draft");
    }
  }, [data, isNewArticle]);

  const handleSave = async (saveStatus = status) => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!editorContent) {
      toast.error("Please add some content");
      return;
    }

    // Check if trying to publish and another article is already published
    const currentlyPublished = allArticles.find(
      (a) => a.status === "published" && a.id !== id
    );

    if (saveStatus === "published" && currentlyPublished) {
      setPendingSaveStatus(saveStatus);
      setShowPublishConfirm(true);
      return;
    }

    // Proceed with save
    await performSave(saveStatus);
  };

  const performSave = async (saveStatus) => {
    setIsSaving(true);

    try {
      const articleData = {
        title: title.trim(),
        content: editorContent,
        status: saveStatus,
      };

      if (isNewArticle) {
        // Create new article
        await createMutation.mutateAsync(articleData);
        clearEditorContent();
        toast.success(
          saveStatus === "published"
            ? "Article published successfully!"
            : "Article created successfully!"
        );
        navigate("/admin/dashboard");
      } else {
        // Update existing article
        await updateMutation.mutateAsync({
          id,
          data: articleData,
        });
        clearEditorContent();
        toast.success(
          saveStatus === "published"
            ? "Article published successfully!"
            : "Article updated successfully!"
        );
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error(`Failed to save article: ${error.message}`);
    } finally {
      setIsSaving(false);
      setShowPublishConfirm(false);
      setPendingSaveStatus(null);
    }
  };

  const confirmPublishAndSave = async () => {
    await performSave(pendingSaveStatus);
  };

  const cancelPublish = () => {
    setShowPublishConfirm(false);
    setPendingSaveStatus(null);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  // Extract title from content if empty
  const extractTitleFromContent = (content) => {
    if (!content || title.trim()) return;

    try {
      const contentObj =
        typeof content === "string" ? JSON.parse(content) : content;
      const firstNode = contentObj?.root?.children?.[0];

      // Check if first node is a heading
      if (firstNode?.type === "heading" && firstNode?.children?.[0]?.text) {
        setTitle(firstNode.children[0].text);
      } else if (firstNode?.children?.[0]?.text) {
        // Use first text as title if no heading
        const text = firstNode.children[0].text;
        setTitle(text.substring(0, 100));
      }
    } catch (e) {
      // Ignore parsing errors
    }
  };

  // Loading state
  if (isLoading && !isNewArticle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !isNewArticle) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Failed to load article
          </h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const currentlyPublished = allArticles.find(
    (a) => a.status === "published" && a.id !== id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Publish Confirmation Dialog */}
      {showPublishConfirm && currentlyPublished && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="text-orange-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Confirm Publishing
                </h3>
                <p className="text-gray-600 text-sm">
                  ⚠️ Only one article can be published at a time.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 mb-3">
                <span className="font-semibold">Currently Published:</span>
                <br />
                <span className="text-green-700">
                  "{currentlyPublished.title}"
                </span>
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Will be Published:</span>
                <br />
                <span className="text-blue-700">"{title}"</span>
              </p>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Publishing this article will automatically unpublish the current
              live article. Do you want to continue?
            </p>

            <div className="flex gap-3">
              <button
                onClick={cancelPublish}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmPublishAndSave}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Publishing...
                  </>
                ) : (
                  "Publish Article"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title..."
              className="flex-1 text-xl font-semibold px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Current Status Indicator */}
              {!isNewArticle && data?.article && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-xs text-gray-500">Current:</span>
                  {data.article.status === "published" ? (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                      <Eye size={12} />
                      Published
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-700">
                      Draft
                    </span>
                  )}
                </div>
              )}

              {/* Status Selector */}
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium ${
                  status === "published"
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-700"
                }`}
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Live</option>
              </select>

              {/* Save Button */}
              <button
                onClick={() => handleSave(status)}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span className="hidden sm:inline">Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span className="hidden sm:inline">Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Editor */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Only render Editor after content is loaded for editing, or immediately for new articles */}
          {(isNewArticle || editorContent !== null) && (
            <Editor
              key={id} // Force re-render when switching articles
              initialContent={editorContent}
              onChange={(content) => {
                handleEditorChange(content);
                extractTitleFromContent(content);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default EditorPage;
