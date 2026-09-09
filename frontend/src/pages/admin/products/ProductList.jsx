import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  Edit3,
  Trash2,
  Image as ImageIcon,
  X,
  UploadCloud,
} from "lucide-react";
import api from "../../../api/axios";

const emptyForm = {
  title: "",
  slug: "",
  price: "",
  shortDescription: "",
  longDescription: "",
  mainImage: "",
  features: [{ text: "" }],
  specs: [{ label: "", value: "" }],
};

// Helper function to safely format any price string/number into Indian Rupees
const formatPrice = (price) => {
  if (!price && price !== 0) return "—";

  // Strip out commas, spaces, or currency symbols (e.g. "85,000" -> "85000")
  const numericOnly = String(price).replace(/[^0-9.]/g, "");
  const num = parseFloat(numericOnly);

  if (isNaN(num)) return "—";

  return `₹${num.toLocaleString("en-IN")}`;
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
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
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.openCreate) {
      openCreate();
    }
  }, [location]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data?.data || []);
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

  const openEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title || "",
      slug: product.slug || "",
      price: product.price || "",
      shortDescription: product.shortDescription || "",
      longDescription: product.longDescription || "",
      mainImage: product.mainImage || "",
      features: product.features?.length ? product.features : [{ text: "" }],
      specs: product.specs?.length ? product.specs : [{ label: "", value: "" }],
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

  const handleTitleChange = (e) => {
    const title = e.target.value;
    if (!editingId) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData({ ...formData, title, slug });
    } else {
      setFormData({ ...formData, title });
    }
  };

  // Specs handlers
  const handleSpecChange = (index, field, value) => {
    const updated = [...formData.specs];
    updated[index][field] = value;
    setFormData({ ...formData, specs: updated });
  };

  const addSpecField = () => {
    setFormData({
      ...formData,
      specs: [...formData.specs, { label: "", value: "" }],
    });
  };

  const removeSpecField = (index) => {
    const updated = formData.specs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      specs: updated.length ? updated : [{ label: "", value: "" }],
    });
  };

  // Features handlers
  const handleFeatureChange = (index, value) => {
    const updated = [...formData.features];
    updated[index].text = value;
    setFormData({ ...formData, features: updated });
  };

  const addFeatureField = () => {
    setFormData({
      ...formData,
      features: [...formData.features, { text: "" }],
    });
  };

  const removeFeatureField = (index) => {
    const updated = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: updated.length ? updated : [{ text: "" }],
    });
  };

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
      setFormData((prev) => ({ ...prev, mainImage: res.data.url }));
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

    // Clean up empty spec and feature rows before submitting
    const cleanSpecs = (formData.specs || []).filter(
      (s) => s.label?.trim() !== "" && s.value?.trim() !== "",
    );
    const cleanFeatures = (formData.features || []).filter(
      (f) => f.text?.trim() !== "",
    );

    // Clean price string (strip commas/symbols)
    const cleanPrice = String(formData.price || "").replace(/[^0-9.]/g, "");

    const payload = {
      ...formData,
      price: cleanPrice,
      longDescription:
        formData.longDescription ||
        formData.shortDescription ||
        "Detailed product description.",
      specs: cleanSpecs,
      features: cleanFeatures,
      whyChoose: [],
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      closeDrawer();
      fetchProducts();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to save product",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    if (products.length === 0) return;
    const confirm1 = window.confirm(
      `⚠️ WARNING: Delete ALL ${products.length} products?`,
    );
    if (!confirm1) return;

    const confirm2 = window.prompt(`Type "DELETE ALL" to confirm:`);
    if (confirm2 !== "DELETE ALL") return;

    try {
      await Promise.all(products.map((p) => api.delete(`/products/${p.id}`)));
      setProducts([]);
      alert("All products deleted!");
    } catch {
      alert("Failed to delete all products.");
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#111]">
            Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage machine listings and specifications
          </p>
        </div>

        <div className="flex items-center gap-3">
          {products.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All ({products.length})
            </button>
          )}

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No products yet. Click “Add New Product” to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-gray-50/40 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {p.mainImage ? (
                          <img
                            src={p.mainImage}
                            alt={p.title}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#111] text-sm">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-[220px]">
                            {p.shortDescription || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-gray-500">
                      {p.slug}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-[#111]">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 text-gray-500 hover:text-[#c9a074] hover:bg-[#c9a074]/10 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        className={`fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-xl font-serif font-bold text-[#111]">
            {editingId ? "Edit Product" : "Add New Product"}
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
              Basic Information
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Diode Laser Machine"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm font-mono "
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="e.g. 45000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description *
              </label>
              <textarea
                rows={2}
                required
                value={formData.shortDescription}
                onChange={(e) =>
                  setFormData({ ...formData, shortDescription: e.target.value })
                }
                placeholder="Brief overview for product card..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detailed / Long Description
              </label>
              <textarea
                rows={4}
                value={formData.longDescription}
                onChange={(e) =>
                  setFormData({ ...formData, longDescription: e.target.value })
                }
                placeholder="Detailed product description (optional)..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm resize-none"
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main Product Image *
            </h3>

            {formData.mainImage && (
              <div className="relative w-full h-40 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={formData.mainImage}
                  alt="Preview"
                  className="w-full h-full object-contain p-2"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, mainImage: "" })}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <input
              type="text"
              required
              value={formData.mainImage}
              onChange={(e) =>
                setFormData({ ...formData, mainImage: e.target.value })
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

          {/* Technical Specifications */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Machine Specifications
              </h3>
              <button
                type="button"
                onClick={addSpecField}
                className="text-xs font-semibold text-[#8a5a2b] hover:underline flex items-center gap-1"
              >
                + Add Spec
              </button>
            </div>

            {formData.specs.map((spec, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={spec.label}
                  onChange={(e) =>
                    handleSpecChange(index, "label", e.target.value)
                  }
                  placeholder="e.g. Wavelength"
                  className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <input
                  type="text"
                  value={spec.value}
                  onChange={(e) =>
                    handleSpecChange(index, "value", e.target.value)
                  }
                  placeholder="e.g. 808nm / 755nm"
                  className="w-1/2 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeSpecField(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Key Features
              </h3>
              <button
                type="button"
                onClick={addFeatureField}
                className="text-xs font-semibold text-[#8a5a2b] hover:underline flex items-center gap-1"
              >
                + Add Feature
              </button>
            </div>

            {formData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature.text}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="e.g. Painless cooling sapphire tip"
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeFeatureField(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
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
                ? "Update Product"
                : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
