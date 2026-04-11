import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  LogOut, 
  GraduationCap,
  Menu,
  X, 
  UserRoundPlus,
  ClipboardList
} from 'lucide-react';
const apiUrl = `${import.meta.env.VITE_API_URL}` || "http://localhost:8080";


const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include", 
      });

      if (response.ok) {
        localStorage.removeItem("isAdmin");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Add Student', path: '/dashboard/student/add', icon: <UserRoundPlus size={20} /> },
    { name: 'Assign Task', path: '/dashboard/assign-tasks', icon: <CheckSquare size={20} /> },
    { name: 'View Task', path: '/dashboard/tasks/all', icon: <ClipboardList size={20} /> },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* Mobile Overlay -*/}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm
        transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Section */}
        <div className="p-8 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              Gridaan Edu
            </span>
          </div>
          {/* Mobile Close Button */}
          <button onClick={toggleSidebar} className="lg:hidden text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom / Logout Section */}
        <div className="p-6 mt-auto border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-500 font-semibold hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header for Mobile */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 lg:hidden">
          <button onClick={toggleSidebar} className="text-slate-600">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-slate-800">Dashboard</span>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;