import { ShoppingBag, Search, Menu } from "lucide-react";
import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-red-600 text-white p-2 rounded-xl group-hover:scale-110 transition-transform">
                <ShoppingBag size={24} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Food<span className="text-red-600">Make</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
            <Search className="text-gray-400 w-5 h-5 mr-3" />
            <input
              type="text"
              placeholder="Search for food..."
              className="bg-transparent border-none focus:outline-none text-gray-600 w-full placeholder-gray-400"
            />
          </div>

          <div className="flex items-center gap-4">
             {/* Admin Link for demo purposes */}
            <Link to="/admin" className="text-gray-500 hover:text-red-600 font-medium text-sm transition-colors">
              Admin View
            </Link>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
