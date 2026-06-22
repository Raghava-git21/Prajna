import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/temples" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/temples');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-14">
      <form onSubmit={submit} className="rounded-lg border border-saffron-100 bg-white p-6 shadow-temple">
        <h1 className="font-heading text-3xl font-bold text-maroon-700">User Login</h1>
        <p className="mt-1 text-sm text-gray-600">Login to save your profile and write temple reviews.</p>
        <label className="mt-6 block text-sm font-semibold">Email</label>
        <input className="input-field mt-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <label className="mt-4 block text-sm font-semibold">Password</label>
        <input className="input-field mt-2" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        <p className="mt-4 text-center text-sm text-gray-600">No account? <Link to="/register" className="font-semibold text-saffron-700">Register</Link></p>
      </form>
    </section>
  );
};

export default LoginPage;
