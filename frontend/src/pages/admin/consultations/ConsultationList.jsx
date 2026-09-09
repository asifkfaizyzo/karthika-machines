import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  X,
  Search,
  RefreshCw,
  Building2,
  MapPin,
  Tag,
  PhoneCall,
  Briefcase,
} from "lucide-react";
import api from "../../../api/axios";

const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const res = await api.get("/consultations");
      setConsultations(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch consultations", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete consultation from "${name}"?`)) return;
    try {
      await api.delete(`/consultations/${id}`);
      setConsultations((prev) => prev.filter((item) => item.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch {
      alert("Delete failed");
    }
  };

  const filtered = consultations.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.fullName?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.phone?.toLowerCase().includes(term) ||
      item.businessName?.toLowerCase().includes(term) ||
      item.interest?.toLowerCase().includes(term)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#111]">
            Consultation Bookings
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Customers requesting a free consultation with our team
          </p>
        </div>
        <button
          onClick={fetchConsultations}
          className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-3 rounded-xl text-sm font-medium shadow-sm transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, phone, business..."
          className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm shadow-sm transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            {searchTerm ? "No results match your search." : "No consultation bookings yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Business Details
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Interest
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/40 cursor-pointer transition-colors"
                    onClick={() => setSelected(item)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#c9a074]/15 text-[#8a5a2b] flex items-center justify-center font-bold text-sm">
                          {item.fullName?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#111]">
                            {item.fullName}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.email} • {item.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {item.businessName || "—"}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-xs font-medium">
                        {item.interest || "—"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td
                      className="py-4 px-6 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleDelete(item.id, item.fullName)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Drawer Overlay */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setSelected(null)}
        />
      )}

      {/* Detail Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          selected ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selected && (
          <>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-[#111]">
                Booking Details
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Customer Profile Card */}
              <div className="p-5 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#c9a074]/20 text-[#8a5a2b] flex items-center justify-center text-xl font-bold shadow-sm">
                    {selected.fullName?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111]">
                      {selected.fullName}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      Booked {formatDate(selected.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/60 grid gap-2.5 text-sm">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:text-[#8a5a2b] transition-colors shadow-sm"
                  >
                    <Mail className="w-4 h-4 text-gray-400" /> {selected.email}
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:text-[#8a5a2b] transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-gray-400" /> {selected.phone}
                  </a>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-700">
                    <Building2 className="w-4 h-4 text-gray-400" /> {selected.businessName || "Not provided"}
                  </div>
                  {selected.role && (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-700">
                      <Briefcase className="w-4 h-4 text-gray-400" /> {selected.role}
                    </div>
                  )}
                  {selected.city && (
                    <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" /> {selected.city}
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-gray-700 font-medium">
                    <Tag className="w-4 h-4 text-gray-400" /> {selected.interest}
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Preferred Contact Methods
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selected.connectionMethods || []).map((method, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg text-xs text-gray-700 flex items-center gap-1.5 shadow-sm"
                    >
                      <PhoneCall className="w-3 h-3 text-gray-400" /> {method}
                    </span>
                  ))}
                  {(!selected.connectionMethods || selected.connectionMethods.length === 0) && (
                    <span className="text-xs text-gray-400">—</span>
                  )}
                </div>
              </div>

              {/* Additional Info Box */}
              {selected.additionalInfo && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Additional Notes
                  </h4>
                  <div className="p-4 bg-white rounded-2xl border border-gray-200 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap shadow-sm">
                    {selected.additionalInfo}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <button
                onClick={() => handleDelete(selected.id, selected.fullName)}
                className="inline-flex items-center gap-2 text-xs font-medium text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <div className="flex gap-2">
                <a
                  href={`tel:${selected.phone}`}
                  className="px-4 py-2.5 bg-gray-100 border border-gray-200 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors"
                >
                  Call Now
                </a>
                <a
                  href={`mailto:${selected.email}`}
                  className="px-4 py-2.5 bg-[#18181b] hover:bg-black text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Email Reply
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultationList;