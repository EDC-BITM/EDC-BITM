import { useEffect } from "react";
import PropTypes from "prop-types";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function DeleteConfirmModal({
  application,
  isOpen,
  isDeleting,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isDeleting) {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDeleting, onCancel]);

  if (!isOpen || !application) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) onCancel();
      }}
    >
      <div
        className="w-full max-w-md bg-[#141414] border border-red-500/30 rounded-2xl p-6 shadow-2xl text-white animate-fade-in-up relative"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-desc"
      >
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="delete-dialog-title" className="text-base font-bold text-white">
              Delete Recruitment Response?
            </h3>
            <p className="text-xs text-white/50">Permanent and irreversible action</p>
          </div>
        </div>

        <p id="delete-dialog-desc" className="text-xs text-white/70 leading-relaxed mb-4">
          Are you sure you want to permanently delete the recruitment submission for{" "}
          <strong className="text-white font-semibold">{application.fullName}</strong>{" "}
          (<span className="font-mono text-[#FED853]">{application.rollNumber}</span>)?
          This will permanently remove the application record from Neon PostgreSQL.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white/80 bg-white/5 hover:bg-white/10 transition disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onConfirm(application.id)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-red-600 hover:bg-red-500 transition flex items-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50 cursor-pointer"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Yes, Delete Permanently</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteConfirmModal.propTypes = {
  application: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
