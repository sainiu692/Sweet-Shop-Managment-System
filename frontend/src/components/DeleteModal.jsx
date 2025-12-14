import { X, Trash2, AlertTriangle } from "lucide-react";


export default function DeleteModal({
  onClose,
  onDelete,
  title = "Delete Item",
  description = "Are you sure you want to delete this item? This action cannot be undone.",
  loading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-rose-500 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <Trash2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-rose-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
