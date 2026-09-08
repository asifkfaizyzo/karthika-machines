import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { admin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF6F0] to-[#EFE4D6]">
      <Sidebar />

      {/* Content area — offset by 64px for collapsed sidebar */}
      <div className="ml-16 min-h-screen">
        {/* Top bar */}
        <header className="bg-transparent px-8 py-6 flex items-center justify-end">
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

        <main className="px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;