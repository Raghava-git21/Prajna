import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Landmark, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [form, setForm] = useState({ email: 'admin@temple.com', password: 'Admin@123' });
  const [loading, setLoading] = useState(false);
  const { login, logout, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (user && isAdmin) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedInUser = await login(form.email, form.password);
      if (loggedInUser.role !== 'admin') {
        logout({ silent: true });
        toast.error('Admin access required.');
        return;
      }
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-temple-dark text-white">
      <div className="grid min-h-screen lg:grid-cols-[1fr_440px]">
        <section className="relative hidden overflow-hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&h=1200&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-temple-dark via-temple-dark/85 to-maroon-900/70" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <Link to="/" className="inline-flex items-center gap-3 text-gold-300">
              <Landmark />
              <span className="font-heading text-2xl font-bold">Prajna</span>
            </Link>
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1 text-sm text-gold-300">
                <ShieldCheck size={16} /> Administrator Console
              </p>
              <h1 className="font-heading text-6xl font-bold leading-tight">Manage temple records with a dedicated admin workspace.</h1>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-4 py-10">
          <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-white/10 bg-white p-6 text-temple-warmGray shadow-temple-lg">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded bg-gradient-saffron text-white">
                <LockKeyhole size={22} />
              </span>
              <div>
                <h1 className="font-heading text-3xl font-bold text-maroon-700">Admin Login</h1>
                <p className="text-sm text-gray-600">Separate administrator access</p>
              </div>
            </div>

            <label className="block text-sm font-semibold">Admin Email</label>
            <input
              className="input-field mt-2"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label className="mt-4 block text-sm font-semibold">Password</label>
            <input
              className="input-field mt-2"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button className="btn-primary mt-6 w-full" disabled={loading}>
              {loading ? 'Checking...' : 'Enter Admin Panel'}
            </button>

            <Link to="/" className="mt-4 block text-center text-sm font-semibold text-saffron-700">
              Back to public site
            </Link>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AdminLoginPage;
