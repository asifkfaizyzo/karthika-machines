import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  MessageSquare,
  GraduationCap,
  Mail,
  Users,
  Image as ImageIcon,
  BookOpen,
  Plus,
  ArrowRight,
} from "lucide-react";
import api from "../../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    courses: 0,
    testimonials: 0,
    founders: 0,
    contacts: 0,
    consultations: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [products, courses, testimonials, founders, contacts, consultations] =
        await Promise.all([
          api.get("/products").catch(() => ({ data: { data: [] } })),
          api.get("/courses").catch(() => ({ data: { data: [] } })),
          api.get("/testimonials").catch(() => ({ data: { data: [] } })),
          api.get("/founders").catch(() => ({ data: { data: [] } })),
          api.get("/contacts").catch(() => ({ data: { data: [] } })),
          api.get("/consultations").catch(() => ({ data: { data: [] } })),
        ]);

      setStats({
        products: products.data?.data?.length || 0,
        courses: courses.data?.data?.length || 0,
        testimonials: testimonials.data?.data?.length || 0,
        founders: founders.data?.data?.length || 0,
        contacts: contacts.data?.data?.length || 0,
        consultations: consultations.data?.data?.length || 0,
      });
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  const mainCards = [
    {
      label: "Products",
      value: stats.products,
      subtitle: `${stats.products} published`,
      icon: Package,
      color: "bg-[#c9a074]",
      link: "/admin/products",
    },
    {
      label: "Testimonials",
      value: stats.testimonials,
      subtitle: `${stats.testimonials} published`,
      icon: MessageSquare,
      color: "bg-emerald-500",
      link: "/admin/testimonials",
    },
    {
      label: "Courses",
      value: stats.courses,
      subtitle: `${stats.courses} published`,
      icon: BookOpen,
      color: "bg-purple-500",
      link: "/admin/courses",
    },
    {
      label: "Contact Messages",
      value: stats.contacts,
      subtitle: `${stats.contacts} total submissions`,
      icon: Mail,
      color: "bg-gray-500",
      link: "/admin/contacts",
    },
  ];

  const smallCards = [
    { label: "Founders", value: stats.founders, icon: Users, link: "/admin/founders" },
    { label: "Consultations", value: stats.consultations, icon: MessageSquare, link: "/admin/consultations" },
    { label: "Gallery Items", value: 0, icon: ImageIcon, link: "#" },
  ];

  const quickActions = [
    { label: "Add New Product", desc: "Create a new product listing", icon: Package, link: "/admin/products/new" },
    { label: "Add Testimonial", desc: "Add a client review", icon: MessageSquare, link: "/admin/testimonials/new" },
    { label: "Add New Course", desc: "Create a new course", icon: BookOpen, link: "/admin/courses/new" },
    { label: "Add Founder", desc: "Add team member", icon: Users, link: "/admin/founders/new" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-[#111]">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here's an overview of your website.
        </p>
      </div>

      {/* Main stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {mainCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              to={c.link}
              className="bg-white/70 backdrop-blur rounded-2xl p-6 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-3xl font-bold text-[#111] mb-1">{c.value}</p>
              <p className="text-sm font-medium text-gray-800">{c.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{c.subtitle}</p>
            </Link>
          );
        })}
      </div>

      {/* Small stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {smallCards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.label}
              to={c.link}
              className="bg-white/70 backdrop-blur rounded-2xl p-5 hover:shadow-md transition-all group flex items-center gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-[#111]">{c.value}</p>
                <p className="text-xs text-gray-500">{c.label}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-all" />
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur rounded-2xl p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[#111]">Quick Actions</h2>
          <p className="text-xs text-gray-500">Jump to common tasks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.label}
                to={a.link}
                className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-300 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#111]">{a.label}</p>
                  <p className="text-xs text-gray-500">{a.desc}</p>
                </div>
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-gray-800 transition-colors" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;