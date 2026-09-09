import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Plus, Edit3, Trash2, X, HelpCircle } from "lucide-react";
import api from "../../../api/axios";

const emptyForm = {
  question: "",
  answer: "",
  order: 0,
  isActive: true,
};

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();

  useEffect(() => {
    fetchFaqs();
  }, []);

  // Auto-open drawer when coming from Dashboard Quick Action
  useEffect(() => {
    if (location.state?.openCreate) {
      openCreate();
    }
  }, [location]);

  const fetchFaqs = async () => {
    try {
      const res = await api.get("/faqs");
      setFaqs(res.data?.data || []);
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
      question: item.question || "",
      answer: item.answer || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      question: formData.question.trim(),
      answer: formData.answer.trim(),
      order: Number(formData.order) || 0,
      isActive: formData.isActive ?? true,
    };

    try {
      if (editingId) {
        await api.put(`/faqs/${editingId}`, payload);
      } else {
        await api.post("/faqs", payload);
      }
      closeDrawer();
      fetchFaqs();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to save FAQ"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, question) => {
    if (!window.confirm(`Delete FAQ:\n"${question}"?`)) return;
    try {
      await api.delete(`/faqs/${id}`);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    if (faqs.length === 0) return;
    const ok = window.confirm(`⚠️ Delete ALL ${faqs.length} FAQs?`);
    if (!ok) return;
    const typed = window.prompt(`Type "DELETE ALL" to confirm:`);
    if (typed !== "DELETE ALL") return;

    try {
      await api.delete("/faqs/all").catch(async () => {
        await Promise.all(faqs.map((f) => api.delete(`/faqs/${f.id}`)));
      });
      setFaqs([]);
      alert("All FAQs deleted!");
    } catch {
      alert("Failed to delete all FAQs.");
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#111]">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage Q&amp;A items shown on your website
          </p>
        </div>

        <div className="flex items-center gap-3">
          {faqs.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All ({faqs.length})
            </button>
          )}

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add FAQ
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No FAQs yet. Click “Add FAQ” to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Answer Preview
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
                {faqs.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50/40 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-4 h-4" />
                        </div>
                        <p className="font-semibold text-[#111] text-sm max-w-xs">
                          {f.question}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 line-clamp-2 max-w-sm">
                      {f.answer}
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
                          onClick={() => handleDelete(f.id, f.question)}
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

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-serif font-bold text-[#111]">
            {editingId ? "Edit FAQ" : "Add FAQ"}
          </h2>
          <button
            onClick={closeDrawer}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question *
            </label>
            <input
              type="text"
              required
              value={formData.question}
              onChange={(e) =>
                setFormData({ ...formData, question: e.target.value })
              }
              placeholder="e.g. What warranty do Karthika machines include?"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer *
            </label>
            <textarea
              rows={6}
              required
              value={formData.answer}
              onChange={(e) =>
                setFormData({ ...formData, answer: e.target.value })
              }
              placeholder="Write a clear, detailed answer..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm resize-none"
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
              Lower number appears first (0, 1, 2…)
            </p>
          </div>
        </form>

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
            disabled={saving}
            className="bg-[#18181b] hover:bg-black text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-60 shadow-sm"
          >
            {saving ? "Saving..." : editingId ? "Update FAQ" : "Create FAQ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaqList;