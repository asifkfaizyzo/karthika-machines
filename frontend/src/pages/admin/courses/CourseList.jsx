import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Plus,
  Edit3,
  Trash2,
  Image as ImageIcon,
  X,
  UploadCloud,
  BookOpen,
} from "lucide-react";
import api from "../../../api/axios";

const emptyForm = {
  title: "",
  slug: "",
  duration: "",
  qualification: "Open to all / 10th Pass",
  students: "135 Students",
  shortDescription: "",
  longDescription: "",
  mainImage: "",
  keyPoints: [{ text: "" }],
  lessons: [{ title: "", detail: "" }],
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
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
    fetchCourses();
  }, []);

   useEffect(() => {
    if (location.state?.openCreate) {
      openCreate();
    }
  }, [location]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses");
      setCourses(res.data?.data || []);
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

  // Open Edit - fetches full detail to load nested keyPoints & lessons
  const openEdit = async (courseSummary) => {
    setEditingId(courseSummary.id);
    setError("");
    setIsOpen(true);

    try {
      const res = await api.get(`/courses/${courseSummary.id}`);
      const data = res.data?.data;
      if (data) {
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          duration: data.duration || "",
          qualification: data.qualification || "",
          students: data.students || "135 Students",
          shortDescription: data.shortDescription || "",
          longDescription: data.longDescription || "",
          mainImage: data.mainImage || "",
          keyPoints: data.keyPoints?.length ? data.keyPoints : [{ text: "" }],
          lessons: data.lessons?.length
            ? data.lessons
            : [{ title: "", detail: "" }],
        });
      }
    } catch (err) {
      setError("Failed to load course details");
    }
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

  // KeyPoints handlers
  const handleKeyPointChange = (index, value) => {
    const updated = [...formData.keyPoints];
    updated[index].text = value;
    setFormData({ ...formData, keyPoints: updated });
  };

  const addKeyPoint = () => {
    setFormData({
      ...formData,
      keyPoints: [...formData.keyPoints, { text: "" }],
    });
  };

  const removeKeyPoint = (index) => {
    const updated = formData.keyPoints.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      keyPoints: updated.length ? updated : [{ text: "" }],
    });
  };

  // Lessons handlers
  const handleLessonChange = (index, field, value) => {
    const updated = [...formData.lessons];
    updated[index][field] = value;
    setFormData({ ...formData, lessons: updated });
  };

  const addLesson = () => {
    setFormData({
      ...formData,
      lessons: [...formData.lessons, { title: "", detail: "" }],
    });
  };

  const removeLesson = (index) => {
    const updated = formData.lessons.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      lessons: updated.length ? updated : [{ title: "", detail: "" }],
    });
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

    const cleanKeyPoints = formData.keyPoints.filter(
      (k) => k.text.trim() !== "",
    );
    const cleanLessons = formData.lessons.filter(
      (l) => l.title.trim() !== "" && l.detail.trim() !== "",
    );

    const payload = {
      ...formData,
      longDescription:
        formData.longDescription ||
        formData.shortDescription ||
        "Detailed course description.",
      keyPoints: cleanKeyPoints,
      lessons: cleanLessons,
    };

    try {
      if (editingId) {
        await api.put(`/courses/${editingId}`, payload);
      } else {
        await api.post("/courses", payload);
      }
      closeDrawer();
      fetchCourses();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.[0]?.message ||
          "Failed to save course",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await api.delete(`/courses/${id}`);
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    if (courses.length === 0) return;
    const confirm1 = window.confirm(
      `⚠️ WARNING: Delete ALL ${courses.length} courses?`,
    );
    if (!confirm1) return;

    const confirm2 = window.prompt(`Type "DELETE ALL" to confirm:`);
    if (confirm2 !== "DELETE ALL") return;

    try {
      await api.delete("/courses/all").catch(async () => {
        await Promise.all(courses.map((c) => api.delete(`/courses/${c.id}`)));
      });
      setCourses([]);
      alert("All courses deleted!");
    } catch {
      alert("Failed to delete all courses.");
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#111]">Courses</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage training courses and curriculum details
          </p>
        </div>

        <div className="flex items-center gap-3">
          {courses.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete All ({courses.length})
            </button>
          )}

          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Course
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            Loading courses...
          </div>
        ) : courses.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            No courses yet. Click “Add New Course” to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Qualification
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50/40 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        {c.mainImage ? (
                          <img
                            src={c.mainImage}
                            alt={c.title}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                            <BookOpen className="w-5 h-5" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-[#111] text-sm">
                            {c.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1 max-w-[220px]">
                            {c.shortDescription || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600 font-medium">
                      {c.duration}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-600">
                      {c.qualification}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(c)}
                          className="p-2 text-gray-500 hover:text-[#c9a074] hover:bg-[#c9a074]/10 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id, c.title)}
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
            {editingId ? "Edit Course" : "Add New Course"}
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
                Course Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g. Advanced Laser & Cosmetology Training"
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
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="e.g. 3 Months / 100 Hours"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualification *
                </label>
                <input
                  type="text"
                  required
                  value={formData.qualification}
                  onChange={(e) =>
                    setFormData({ ...formData, qualification: e.target.value })
                  }
                  placeholder="e.g. 10th / 12th Pass or Open"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students Enrolled
                </label>
                <input
                  type="text"
                  value={formData.students}
                  onChange={(e) =>
                    setFormData({ ...formData, students: e.target.value })
                  }
                  placeholder="e.g. 135 Students"
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
                placeholder="Brief summary for course card..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Detailed Description
              </label>
              <textarea
                rows={4}
                value={formData.longDescription}
                onChange={(e) =>
                  setFormData({ ...formData, longDescription: e.target.value })
                }
                placeholder="Full course details & objectives..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm resize-none"
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Course Main Image *
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

          {/* Key Points */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Key Highlights / Points
              </h3>
              <button
                type="button"
                onClick={addKeyPoint}
                className="text-xs font-semibold text-[#8a5a2b] hover:underline flex items-center gap-1"
              >
                + Add Key Point
              </button>
            </div>

            {formData.keyPoints.map((kp, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={kp.text}
                  onChange={(e) => handleKeyPointChange(index, e.target.value)}
                  placeholder="e.g. 100% Practical Hands-on Training on Live Machines"
                  className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeKeyPoint(index)}
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Lessons / Curriculum Modules */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Curriculum / Modules
              </h3>
              <button
                type="button"
                onClick={addLesson}
                className="text-xs font-semibold text-[#8a5a2b] hover:underline flex items-center gap-1"
              >
                + Add Module
              </button>
            </div>

            {formData.lessons.map((lesson, index) => (
              <div
                key={index}
                className="space-y-2 p-3 bg-gray-50 rounded-xl border border-gray-200 relative"
              >
                <button
                  type="button"
                  onClick={() => removeLesson(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={lesson.title}
                  onChange={(e) =>
                    handleLessonChange(index, "title", e.target.value)
                  }
                  placeholder="Module Title (e.g. Module 1: Laser Physics & Safety)"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white font-medium"
                />
                <textarea
                  rows={2}
                  value={lesson.detail}
                  onChange={(e) =>
                    handleLessonChange(index, "detail", e.target.value)
                  }
                  placeholder="Module Details..."
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white resize-none"
                />
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
                ? "Update Course"
                : "Create Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
