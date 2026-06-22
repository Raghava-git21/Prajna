import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, Landmark, LayoutDashboard, LogOut, Plus, Table2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navClass = ({ isActive }) =>
  `flex items-center gap-2 rounded px-3 py-2 text-sm font-medium ${isActive ? 'bg-saffron-100 text-saffron-800' : 'text-gray-700 hover:bg-saffron-50'}`;

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-temple-cream md:grid md:grid-cols-[260px_1fr]">
      <aside className="border-r border-saffron-100 bg-white p-4">
        <Link to="/" className="mb-6 flex items-center gap-3">
          <Landmark className="text-saffron-600" />
          <div>
            <h1 className="font-heading text-xl font-bold text-maroon-700">Temple Admin</h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </Link>
        <nav className="space-y-1">
          <NavLink end to="/admin" className={navClass}><LayoutDashboard size={18} /> Dashboard</NavLink>
          <NavLink to="/admin/temples" className={navClass}><Table2 size={18} /> Temples</NavLink>
          <NavLink to="/admin/temples/new" className={navClass}><Plus size={18} /> Add Temple</NavLink>
          <Link to="/" className="flex items-center gap-2 rounded px-3 py-2 text-sm font-medium text-gray-700 hover:bg-saffron-50"><Home size={18} /> Public Site</Link>
          <button
            className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            onClick={() => { logout(); navigate('/'); }}
          >
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>
      <main className="p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
