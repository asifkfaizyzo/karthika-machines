import { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, X, UploadCloud, Users, User } from "lucide-react";
import api from "../../../api/axios";
import { useLocation } from "react-router-dom";

const emptyForm = {
  name: "",
  role: "",
  image: "",
  order: 0,
  isActive: true,
};

const FounderList = () => {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drawer state
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();

  useEffect(() => {
    fetchFounders();
  }, []);

  // Auto-open drawer when coming from Dashboard Quick Action
  useEffect(() => {
    if (location.state?.openCreate) {
      openCreate();
    }
  }, [location]);

  const fetchFounders = async () => {
    try {
      const res = await api.get("/founders");
      setFounders(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setIsOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || "",
      role: item.role || "",
      image: item.image || "",
      order: item.order ?? 0,
      isActive: item.isActive ?? true,
    });
    setError("");
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("image", file);

    setUploading(true);
    setError("");
    try {
      const res = await api.post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, image: res.data.url }));
    } catch {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...formData,
      order: Number(formData.order) || 0,
    };

    try {
      if (editingId) {
        await api.put(`/founders/${editingId}`, payload);
      } else {
        await api.post("/founders", payload);
      }
      closeDrawer();
      fetchFounders();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to save founder",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete founder "${name}"?`)) return;
    try {
      await api.delete(`/founders/${id}`);
      setFounders((prev) => prev.filter((f) => f.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    if (founders.length === 0) return;

    const confirm1 = window.confirm(
      `⚠️ WARNING: Delete ALL ${founders.length} founders?`,
    );
    if (!confirm1) return;

    const confirm2 = window.prompt(`Type "DELETE ALL" to confirm:`);
    if (confirm2 !== "DELETE ALL") return;

    try {
      // Prefer bulk delete if route exists, else loop
      await api.delete("/founders/all").catch(async () => {
        await Promise.all(founders.map((f) => api.delete(`/founders/${f.id}`)));
      });
      setFounders([]);
      alert("All founders deleted!");
    } catch {
      alert("Failed to delete all founders.");
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#111]">
            Founders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage team members and founders shown on the About page
          </p>
        </div>

        <div className="flex items-center gap-3">
          {founders.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All ({founders.length})
            </button>
          )}

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Founder
          </button>
        </div>
      </div>

      {/* Table / Cards */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            Loading founders...
          </div>
        ) : founders.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No founders yet. Click “Add Founder” to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Founder
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {founders.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-gray-50/40 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {f.image ? (
                          <img
                            src={f.image}
                            alt={f.name}
                            className="w-12 h-12 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                            <User className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#111] text-sm">
                            {f.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {f.role}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 font-mono">
                      {f.order ?? 0}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(f)}
                          className="p-2 text-gray-500 hover:text-[#c9a074] hover:bg-[#c9a074]/10 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(f.id, f.name)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
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
        )}
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-serif font-bold text-[#111]">
            {editingId ? "Edit Founder" : "Add Founder"}
          </h2>
          <button
            onClick={closeDrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Founder Details
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Dr. Karthika Rajan"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role / Designation *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                placeholder="e.g. Founder & CEO"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: e.target.value })
                }
                placeholder="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                Lower number appears first (0, 1, 2...)
              </p>
            </div>
          </div>

          {/* Photo */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Profile Photo *
            </h3>

            {formData.image && (
              <div className="relative w-28 h-28 mx-auto bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <input
              type="text"
              required
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              placeholder="Paste Cloudinary Image URL *"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
            />

            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span>OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <label className="flex flex-col items-center justify-center gap-1 px-4 py-3.5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-800 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium">
                  {uploading
                    ? "Uploading to Cloudinary..."
                    : "Upload File from Computer"}
                </span>
              </div>
              <span className="text-[11px] text-gray-400 font-normal">
                Supported formats: JPG, PNG, WEBP, GIF, SVG (Max 10MB)
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button
            type="button"
            onClick={closeDrawer}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || uploading}
            className="bg-[#18181b] hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60 shadow-sm"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Founder"
                : "Create Founder"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FounderList;
