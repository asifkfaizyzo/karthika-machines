import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Edit3, Trash2, X, UploadCloud, Star, MessageSquare, User } from "lucide-react";
import api from "../../../api/axios";

const emptyForm = {
  name: "",
  role: "",
  text: "",
  image: "",
  rating: 5,
  type: "TEXT",
  showOnHome: true,
  order: 0,
  isActive: true,
};

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);
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
    fetchTestimonials();
  }, []);

 useEffect(() => {
    if (location.state?.openCreate) {
      openCreate();
    }
  }, [location]);

  const fetchTestimonials = async () => {
    try {
      const res = await api.get("/testimonials");
      setTestimonials(res.data?.data || []);
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
      text: item.text || "",
      image: item.image || "",
      rating: item.rating ?? 5,
      type: item.type || "TEXT",
      showOnHome: item.showOnHome ?? true,
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

  // Image Upload handler
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
      rating: Number(formData.rating),
      order: Number(formData.order) || 0,
    };

    try {
      if (editingId) {
        await api.put(`/testimonials/${editingId}`, payload);
      } else {
        await api.post("/testimonials", payload);
      }
      closeDrawer();
      fetchTestimonials();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        "Failed to save testimonial"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete testimonial by "${name}"?`)) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    if (testimonials.length === 0) return;
    const confirm1 = window.confirm(`⚠️ WARNING: Delete ALL ${testimonials.length} testimonials?`);
    if (!confirm1) return;

    const confirm2 = window.prompt(`Type "DELETE ALL" to confirm:`);
    if (confirm2 !== "DELETE ALL") return;

    try {
      await Promise.all(testimonials.map((t) => api.delete(`/testimonials/${t.id}`)));
      setTestimonials([]);
      alert("All testimonials deleted!");
    } catch {
      alert("Failed to delete all testimonials.");
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#111]">Testimonials</h1>
          <p className="text-sm text-gray-500 mt-1">Manage client reviews, student feedback, and homepage features</p>
        </div>

        <div className="flex items-center gap-3">
          {testimonials.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All ({testimonials.length})
            </button>
          )}

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No testimonials yet. Click “Add Testimonial” to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client / Student</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Homepage</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {t.image ? (
                          <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover border border-gray-200" />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 font-bold text-sm">
                            {t.name?.charAt(0) || <User className="w-5 h-5" />}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#111] text-sm">{t.name}</p>
                          <p className="text-xs text-gray-500">{t.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-semibold">
                      <span className={`px-2.5 py-1 rounded-lg ${t.type === "IMAGE" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs">
                      {t.showOnHome ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                          No
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(t)} className="p-2 text-gray-500 hover:text-[#c9a074] hover:bg-[#c9a074]/10 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(t.id, t.name)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
      {isOpen && <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={closeDrawer} />}

      {/* Drawer Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-serif font-bold text-[#111]">{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
          <button onClick={closeDrawer} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">{error}</div>}

          {/* Client Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Client / Student Info</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Dr. Ananya Sharma" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Clinic Title *</label>
                <input type="text" required value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Founder, Skin Care Clinic" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (Stars)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm bg-white"
                >
                  <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                  <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                  <option value={3}>3 Stars ⭐⭐⭐</option>
                  <option value={2}>2 Stars ⭐⭐</option>
                  <option value={1}>1 Star ⭐</option>
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm bg-white"
                >
                  <option value="TEXT">Text Review</option>
                  <option value="IMAGE">Image / Certificate Review</option>
                </select>
              </div>
            </div>

            {/* Show on Home Toggle */}
            <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-800">Feature on Homepage?</p>
                <p className="text-xs text-gray-500">Display this testimonial on the main website homepage</p>
              </div>
              <input
                type="checkbox"
                checked={formData.showOnHome}
                onChange={(e) => setFormData({ ...formData, showOnHome: e.target.checked })}
                className="w-5 h-5 text-gray-900 border-gray-300 rounded focus:ring-gray-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Client Photo / Review Image */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Client Photo / Review Image</h3>

            {formData.image && (
              <div className="relative w-28 h-28 mx-auto bg-gray-50 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="Paste Photo / Cloudinary Image URL (optional)" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />

            <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span>OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

          <label className="flex flex-col items-center justify-center gap-1 px-4 py-3.5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-800 hover:bg-gray-50 transition-colors">
  <div className="flex items-center gap-2">
    <UploadCloud className="w-5 h-5 text-gray-500" />
    <span className="text-sm text-gray-700 font-medium">
      {uploading ? "Uploading to Cloudinary..." : "Upload File from Computer"}
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

          {/* Testimonial Text */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Review Text *</label>
            <textarea
              rows={4}
              required
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
              placeholder="e.g. Karthika Machines provided excellent diode laser equipment with full training support..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm resize-none"
            />
          </div>

        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50/50">
          <button type="button" onClick={closeDrawer} className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100">Cancel</button>
          <button onClick={handleSubmit} disabled={saving || uploading} className="bg-[#18181b] hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60 shadow-sm">
            {saving ? "Saving..." : editingId ? "Update Testimonial" : "Create Testimonial"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialList;