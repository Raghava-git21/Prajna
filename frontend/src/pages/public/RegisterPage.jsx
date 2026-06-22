import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/temples');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-4 py-14">
      <form onSubmit={submit} className="rounded-lg border border-saffron-100 bg-white p-6 shadow-temple">
        <h1 className="font-heading text-3xl font-bold text-maroon-700">Create Account</h1>
        <label className="mt-6 block text-sm font-semibold">Name</label>
        <input className="input-field mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <label className="mt-4 block text-sm font-semibold">Email</label>
        <input className="input-field mt-2" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <label className="mt-4 block text-sm font-semibold">Password</label>
        <input className="input-field mt-2" type="password" minLength="6" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button className="btn-primary mt-6 w-full" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
        <p className="mt-4 text-center text-sm text-gray-600">Already registered? <Link to="/login" className="font-semibold text-saffron-700">Login</Link></p>
      </form>
    </section>
  );
};

export default RegisterPage;
