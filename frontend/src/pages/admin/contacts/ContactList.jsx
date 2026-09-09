import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  MessageSquare,
  X,
  Search,
  RefreshCw,
} from "lucide-react";
import api from "../../../api/axios";

const ContactList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await api.get("/contacts");
      setInquiries(res.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete message from "${name}"?`)) return;
    try {
      await api.delete(`/contacts/${id}`);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    } catch {
      alert("Failed to delete inquiry");
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.phone?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
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
            Contact Inquiries
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Customer messages and lead inquiries submitted from your website
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchInquiries}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-4 py-3 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, phone, or message..."
          className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-gray-800 text-sm placeholder:text-gray-400 shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            Loading customer inquiries...
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            {searchTerm
              ? "No inquiries matching your search."
              : "No customer inquiries received yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Customer Details
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Message Preview
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Received Date
                  </th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredInquiries.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/40 transition-colors cursor-pointer"
                    onClick={() => setSelectedInquiry(item)}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#c9a074]/15 text-[#8a5a2b] flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {item.name?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                        <div>
                          <p className="font-semibold text-[#111] text-sm">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {item.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              {item.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-xs text-gray-600 line-clamp-2 max-w-xs">
                        {item.message}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(item.createdAt)}
                    </td>
                    <td
                      className="py-4 px-6 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedInquiry(item)}
                          className="p-2 text-gray-500 hover:text-[#c9a074] hover:bg-[#c9a074]/10 rounded-lg transition-colors"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
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
      {selectedInquiry && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity"
          onClick={() => setSelectedInquiry(null)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          selectedInquiry ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedInquiry && (
          <>
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-serif font-bold text-[#111]">
                Inquiry Details
              </h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="p-4 bg-gray-50/80 rounded-2xl border border-gray-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#c9a074]/20 text-[#8a5a2b] flex items-center justify-center font-bold text-base">
                    {selectedInquiry.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111] text-base">
                      {selectedInquiry.name}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      Received {formatDate(selectedInquiry.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200/60 grid grid-cols-1 gap-2 text-sm">
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#8a5a2b] transition-colors p-2 bg-white rounded-xl border border-gray-100"
                  >
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedInquiry.email}</span>
                  </a>
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="flex items-center gap-2 text-gray-700 hover:text-[#8a5a2b] transition-colors p-2 bg-white rounded-xl border border-gray-100"
                  >
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedInquiry.phone}</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" />
                  Customer Message
                </h4>
                <div className="p-5 bg-white rounded-2xl border border-gray-200 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <button
                onClick={() =>
                  handleDelete(selectedInquiry.id, selectedInquiry.name)
                }
                className="inline-flex items-center gap-2 text-xs font-medium text-red-600 hover:bg-red-50 p-2.5 rounded-xl transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Inquiry
              </button>

              <div className="flex gap-2">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-sm font-medium transition-colors"
                >
                  Call
                </a>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="px-4 py-2.5 bg-[#18181b] hover:bg-black text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactList;