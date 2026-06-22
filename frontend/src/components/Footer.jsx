import { Link } from 'react-router-dom';
import { Heart, Landmark, MapPin } from 'lucide-react';

const Footer = () => (
  <footer className="bg-temple-dark text-gray-300">
    <div className="h-1 bg-gradient-to-r from-saffron-500 via-gold-500 to-maroon-500" />
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
      <div className="md:col-span-2">
        <div className="mb-3 flex items-center gap-3">
          <Landmark className="text-gold-400" />
          <div>
            <h3 className="font-heading text-xl font-bold text-gold-400">Prajna</h3>
            <p className="text-xs uppercase tracking-[0.18em] text-saffron-200">Discover Divine India</p>
          </div>
        </div>
        <p className="max-w-md text-sm leading-6 text-gray-400">
          A full-stack temple directory for browsing sacred places, planning darshan, reading facilities, and managing temple records.
        </p>
      </div>
      <div>
        <h4 className="mb-3 font-heading text-lg font-semibold text-gold-400">Explore</h4>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/" className="hover:text-saffron-300">Home</Link>
          <Link to="/temples" className="hover:text-saffron-300">Temples</Link>
          <Link to="/login" className="hover:text-saffron-300">Login</Link>
        </div>
      </div>
      <div>
        <h4 className="mb-3 font-heading text-lg font-semibold text-gold-400">Popular States</h4>
        {['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Uttar Pradesh'].map((state) => (
          <Link key={state} to={`/temples?state=${encodeURIComponent(state)}`} className="mb-2 flex items-center gap-1 text-sm hover:text-saffron-300">
            <MapPin size={13} /> {state}
          </Link>
        ))}
      </div>
    </div>
    <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-gray-500">
      Made with <Heart size={12} className="mx-1 inline fill-red-500 text-red-500" /> for Bharat. {new Date().getFullYear()} Prajna.
    </div>
  </footer>
);

export default Footer;
