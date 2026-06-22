import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Landmark, LogOut, Menu, Search, UserRound, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-gold-400' : 'text-gray-200 hover:text-gold-300'}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-temple-dark/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-gradient-saffron text-white">
            <Landmark size={22} />
          </span>
          <span>
            <span className="block font-heading text-lg font-bold text-gold-400">Prajna</span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-saffron-200">Sacred India</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/temples" className={linkClass}>Temples</NavLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/temples" className="grid h-9 w-9 place-items-center rounded border border-white/10 text-gray-200 hover:text-gold-300" title="Search temples">
            <Search size={18} />
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-200 hover:text-gold-300">Login</Link>
              <Link to="/register" className="btn-primary !px-4 !py-2 text-sm">Register</Link>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2 text-sm text-gray-200"><UserRound size={18} />{user.name}</span>
              <button onClick={handleLogout} className="grid h-9 w-9 place-items-center rounded border border-white/10 text-gray-200 hover:text-red-300" title="Logout">
                <LogOut size={18} />
              </button>
            </>
          )}
        </div>

        <button className="grid h-10 w-10 place-items-center rounded text-gold-300 md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-temple-dark px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>Home</NavLink>
            <NavLink to="/temples" onClick={() => setOpen(false)} className={linkClass}>Temples</NavLink>
            {!user ? (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-gray-200">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-center !py-2 text-sm">Register</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="flex items-center gap-2 text-left text-sm text-red-300"><LogOut size={16} />Logout</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
