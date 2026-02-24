import { Outlet, NavLink } from "react-router";
import { LayoutDashboard, ShoppingBag, LogOut, Package, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItem = ({ to, icon: Icon, label, end = false }: { to: string, icon: any, label: string, end?: boolean }) => (
    <NavLink 
      to={to} 
      end={end}
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) => 
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
          isActive 
            ? 'bg-red-600 text-white shadow-md shadow-red-200 font-medium' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <Icon size={20} />
      {label}
    </NavLink>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-20 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="bg-red-600 text-white p-2 rounded-xl shadow-lg shadow-red-200">
            <ShoppingBag size={24} />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">Admin<span className="text-red-600">Panel</span></span>
        </div>
        
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" end />
          <NavItem to="/admin/products" icon={Package} label="Products" />
        </nav>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@foodmake.com</p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full rounded-lg transition-colors text-sm font-medium">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header & Overlay */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:hidden z-30 flex-shrink-0">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <div className="bg-red-600 text-white p-1.5 rounded-lg">
              <ShoppingBag size={20} />
            </div>
            AdminPanel
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-64 bg-white z-30 md:hidden flex flex-col shadow-2xl"
              >
                 <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                  <div className="bg-red-600 text-white p-2 rounded-xl">
                    <ShoppingBag size={24} />
                  </div>
                  <span className="font-bold text-xl text-gray-900">AdminPanel</span>
                </div>
                <nav className="flex-1 p-6 space-y-2">
                  <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" end />
                  <NavItem to="/admin/products" icon={Package} label="Products" />
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 scroll-smooth">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
