import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import NotificationBell from "./NotificationBell"; // 👈 ADD
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { admin } = useAuth();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#FAF6F0] to-[#EFE4D6]">
      {/* Sidebar — width controlled by expanded */}
      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      {/* Main content — always takes remaining space */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen transition-all duration-300">
        {/* Top bar */}
        <header className="px-6 md:px-8 py-5 flex items-center justify-end gap-6 flex-shrink-0">
          <NotificationBell />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#111]">
                {admin?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500">{admin?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-6 md:px-8 pb-8 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;