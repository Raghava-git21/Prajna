import { Link } from 'react-router-dom';
import { Clock, MapPin, Sparkles, Star } from 'lucide-react';
import { UPLOADS_URL } from '../services/api';

const fallback = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&h=600&fit=crop';

const imageUrl = (img) => {
  if (!img) return fallback;
  return img.startsWith('http') ? img : `${UPLOADS_URL}${img}`;
};

const TempleCard = ({ temple }) => (
  <Link to={`/temples/${temple.id}`} className="card-hover group block">
    <div className="relative h-48 overflow-hidden">
      <img
        src={imageUrl(temple.bannerImage)}
        alt={temple.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { e.currentTarget.src = fallback; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {temple.isFeatured && (
        <span className="absolute left-3 top-3 badge-gold gap-1"><Sparkles size={12} /> Featured</span>
      )}
      <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-sm font-semibold text-white">
        <Star size={14} className="fill-gold-400 text-gold-400" /> {Number(temple.rating || 0).toFixed(1)}
      </span>
    </div>
    <div className="p-4">
      <h3 className="line-clamp-1 font-heading text-lg font-semibold text-maroon-700 group-hover:text-saffron-600">{temple.name}</h3>
      <p className="mt-1 flex items-center gap-1 text-sm text-gray-600"><MapPin size={14} className="text-saffron-500" />{temple.city}, {temple.state}</p>
      <p className="mt-1 line-clamp-1 text-sm text-gray-600">{temple.deity}</p>
      {temple.openTime && temple.closeTime && (
        <p className="mt-1 flex items-center gap-1 text-sm text-gray-600"><Clock size={14} className="text-saffron-500" />{temple.openTime} - {temple.closeTime}</p>
      )}
      <div className="mt-3 flex flex-wrap gap-1">
        {(temple.facilities || []).slice(0, 3).map((facility) => (
          <span key={facility} className="badge-saffron text-[10px]">{facility}</span>
        ))}
      </div>
    </div>
  </Link>
);

export default TempleCard;
