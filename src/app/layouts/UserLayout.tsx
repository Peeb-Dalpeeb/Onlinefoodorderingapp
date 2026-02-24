import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import CartSidebar from "../components/CartSidebar";

export default function UserLayout() {
  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-8">
            <Outlet />
          </div>
        </main>
        <CartSidebar />
      </div>
    </div>
  );
}
