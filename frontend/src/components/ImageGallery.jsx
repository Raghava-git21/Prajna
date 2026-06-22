import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { UPLOADS_URL } from '../services/api';

const fallback = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&h=600&fit=crop';
const imageUrl = (img) => (img?.startsWith('http') ? img : `${UPLOADS_URL}${img || ''}`);

const ImageGallery = ({ images = [], bannerImage }) => {
  const [active, setActive] = useState(null);
  const gallery = useMemo(() => [...new Set([bannerImage, ...images].filter(Boolean))], [bannerImage, images]);
  if (!gallery.length) return null;

  const step = (delta) => setActive((active + delta + gallery.length) % gallery.length);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {gallery.slice(0, 4).map((img, index) => (
          <button key={img} onClick={() => setActive(index)} className={`relative overflow-hidden rounded-lg ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
            <img src={imageUrl(img)} alt="" className="h-full min-h-36 w-full object-cover transition-transform hover:scale-105" onError={(e) => { e.currentTarget.src = fallback; }} />
            {index === 3 && gallery.length > 4 && <span className="absolute inset-0 grid place-items-center bg-black/55 text-lg font-bold text-white">+{gallery.length - 4}</span>}
          </button>
        ))}
      </div>
      {active !== null && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/90 p-4">
          <button onClick={() => setActive(null)} className="absolute right-4 top-4 text-white"><X size={32} /></button>
          <button onClick={() => step(-1)} className="absolute left-4 text-white"><ChevronLeft size={40} /></button>
          <img src={imageUrl(gallery[active])} alt="" className="max-h-[85vh] max-w-[90vw] rounded object-contain" onError={(e) => { e.currentTarget.src = fallback; }} />
          <button onClick={() => step(1)} className="absolute right-4 text-white"><ChevronRight size={40} /></button>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
