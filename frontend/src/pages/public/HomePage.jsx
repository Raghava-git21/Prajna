import { Link } from 'react-router-dom';
import { ArrowRight, Landmark, MapPin, Search, ShieldCheck, Star } from 'lucide-react';
import TempleCard from '../../components/TempleCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useFeaturedTemples } from '../../hooks/useTemples';
import { useAuth } from '../../context/AuthContext';

const states = ['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Uttar Pradesh', 'Andhra Pradesh', 'Odisha'];

const HomePage = () => {
  const { data: featured = [], isLoading } = useFeaturedTemples();
  const { user } = useAuth();

  return (
    <>
      <section className="relative overflow-hidden bg-temple-dark text-white">
        <img
          src="https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&h=900&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-temple-dark via-temple-dark/80 to-maroon-900/70" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1 text-sm text-gold-300">
              <Landmark size={16} /> Prajna Management System
            </p>
            <h1 className="font-heading text-5xl font-bold leading-tight md:text-7xl">Discover sacred temples across India</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-200">
              Browse temple timings, facilities, festivals, maps, reviews, and rich devotional details from one elegant directory.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/temples" className="btn-primary inline-flex items-center justify-center gap-2">Explore Temples <ArrowRight size={18} /></Link>
              {!user && (
                <Link to="/login" className="btn-outline border-white/40 bg-white/10 text-white hover:bg-white hover:text-maroon-700">User Login</Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['10+', 'Seeded Temples', Star],
            ['28', 'Indian States', MapPin],
            ['Reviews', 'User Accounts', ShieldCheck]
          ].map(([value, label, Icon]) => (
            <div key={label} className="rounded-lg border border-saffron-100 bg-white p-5 shadow-sm">
              <Icon className="mb-3 text-saffron-600" />
              <p className="font-heading text-3xl font-bold text-maroon-700">{value}</p>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title text-left">Featured Temples</h2>
            <p className="mt-2 text-gray-600">Highly visited sacred destinations from the seed data.</p>
          </div>
          <Link to="/temples" className="hidden items-center gap-1 text-sm font-semibold text-saffron-700 md:flex">View all <ArrowRight size={16} /></Link>
        </div>
        {isLoading ? <LoadingSpinner /> : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((temple) => <TempleCard key={temple.id} temple={temple} />)}
          </div>
        )}
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-5 flex items-center gap-2">
            <Search className="text-saffron-600" />
            <h2 className="font-heading text-2xl font-bold text-maroon-700">Browse by State</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {states.map((state) => (
              <Link key={state} to={`/temples?state=${encodeURIComponent(state)}`} className="rounded-full border border-saffron-200 bg-saffron-50 px-4 py-2 text-sm font-semibold text-saffron-800 hover:bg-saffron-100">
                {state}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
