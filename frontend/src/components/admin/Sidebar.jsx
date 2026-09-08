import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  GraduationCap,
  MessageSquare,
  Users,
  Mail,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const menuItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Courses", path: "/admin/courses", icon: GraduationCap },
    { label: "Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { label: "Founders", path: "/admin/founders", icon: Users },
    { label: "Contacts", path: "/admin/contacts", icon: Mail },
  ];

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-40
        ${expanded ? "w-60" : "w-16"}`}
    >
      {/* Logo Header */}
      <div className="h-16 flex items-center px-3 border-b border-gray-100 overflow-hidden">
        <img
          src="https://res.cloudinary.com/of49cdto/image/upload/e_background_removal/f_png/v1788856648/favicon.jpg"
          alt="Karthika"
          className="w-10 h-10 object-contain flex-shrink-0"
        />
        <span
          className={`font-serif font-bold text-xl text-[#111] ml-3 transition-all duration-200 whitespace-nowrap
      ${expanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
        >
          Karthika
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 space-y-1 overflow-hidden">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 px-3 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-[#c9a074]/20 text-[#8a5a2b]"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span
                className={`whitespace-nowrap transition-all duration-200
                  ${expanded ? "opacity-100" : "opacity-0"}`}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Admin Profile & Logout */}
      <div className="border-t border-gray-100 p-2 space-y-1">
        <div className="flex items-center gap-3 mx-1 px-2 py-2.5 rounded-xl overflow-hidden">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold text-sm flex-shrink-0">
            {admin?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div
            className={`transition-all duration-200 min-w-0
              ${expanded ? "opacity-100" : "opacity-0"}`}
          >
            <p className="text-sm font-medium text-gray-900 truncate">
              {admin?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 truncate">{admin?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 mx-1 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span
            className={`whitespace-nowrap transition-all duration-200
              ${expanded ? "opacity-100" : "opacity-0"}`}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
