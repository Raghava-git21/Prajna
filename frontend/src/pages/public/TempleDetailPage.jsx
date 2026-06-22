import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Calendar, Clock, Globe, MapPin, Phone, Route, Shirt, Sparkles } from 'lucide-react';
import ImageGallery from '../../components/ImageGallery';
import LeafletMap from '../../components/LeafletMap';
import LoadingSpinner from '../../components/LoadingSpinner';
import StarRating from '../../components/StarRating';
import { useTemple } from '../../hooks/useTemples';
import { createReview, getReviews, UPLOADS_URL } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const fallback = 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1800&h=900&fit=crop';
const imageUrl = (img) => (img?.startsWith('http') ? img : `${UPLOADS_URL}${img || ''}`);

const InfoList = ({ title, items = [], icon: Icon }) => (
  <div className="rounded-lg border border-saffron-100 bg-white p-5">
    <h3 className="mb-3 flex items-center gap-2 font-heading text-xl font-semibold text-maroon-700"><Icon size={20} />{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => <span key={item} className="badge-saffron">{item}</span>)}
      {!items.length && <span className="text-sm text-gray-500">Not available</span>}
    </div>
  </div>
);

const TempleDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const { data: temple, isLoading } = useTemple(id);
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => (await getReviews(id)).data.data,
    enabled: Boolean(id)
  });

  const mutation = useMutation({
    mutationFn: () => createReview(id, review),
    onSuccess: () => {
      toast.success('Review saved');
      setReview({ rating: 5, comment: '' });
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      queryClient.invalidateQueries({ queryKey: ['temple', id] });
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Could not save review')
  });

  if (isLoading) return <LoadingSpinner label="Loading temple" />;
  if (!temple) return <div className="mx-auto max-w-7xl px-4 py-14">Temple not found.</div>;

  return (
    <article>
      <section className="relative min-h-[360px] overflow-hidden bg-temple-dark text-white">
        <img src={imageUrl(temple.bannerImage)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" onError={(e) => { e.currentTarget.src = fallback; }} />
        <div className="absolute inset-0 bg-gradient-to-r from-temple-dark via-temple-dark/75 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="badge-gold mb-4">{temple.deity}</span>
          <h1 className="max-w-4xl font-heading text-5xl font-bold">{temple.name}</h1>
          <p className="mt-4 flex items-center gap-2 text-lg text-gray-100"><MapPin size={20} />{temple.address || `${temple.city}, ${temple.state}`}</p>
          <div className="mt-4 flex items-center gap-3">
            <StarRating rating={Number(temple.rating)} />
            <span className="text-sm text-gray-200">{Number(temple.rating || 0).toFixed(1)} from {temple.reviewCount || 0} reviews</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="space-y-8">
          <ImageGallery images={temple.images || []} bannerImage={temple.bannerImage} />

          <div className="rounded-lg border border-saffron-100 bg-white p-6">
            <h2 className="font-heading text-2xl font-bold text-maroon-700">History</h2>
            <p className="mt-3 leading-7 text-gray-700">{temple.history || 'No history has been added yet.'}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InfoList title="Facilities" items={temple.facilities || []} icon={Sparkles} />
            <InfoList title="Festivals" items={temple.festivals || []} icon={Calendar} />
          </div>

          <div className="rounded-lg border border-saffron-100 bg-white p-6">
            <h2 className="font-heading text-2xl font-bold text-maroon-700">Location</h2>
            <div className="mt-4"><LeafletMap lat={temple.lat} lng={temple.lng} name={temple.name} city={temple.city} /></div>
          </div>

          <div className="rounded-lg border border-saffron-100 bg-white p-6">
            <h2 className="font-heading text-2xl font-bold text-maroon-700">Reviews</h2>
            {user ? (
              <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="mt-4 rounded-lg bg-saffron-50 p-4">
                <StarRating interactive rating={review.rating} onChange={(rating) => setReview({ ...review, rating })} />
                <textarea className="input-field mt-3" rows="3" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} placeholder="Share your experience" />
                <button className="btn-primary mt-3 !py-2" disabled={mutation.isPending}>Submit Review</button>
              </form>
            ) : <p className="mt-3 text-sm text-gray-600">Login to add a review.</p>}
            <div className="mt-5 space-y-3">
              {reviews.map((item) => (
                <div key={item.id} className="rounded border border-saffron-100 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <strong>{item.User?.name || 'Devotee'}</strong>
                    <StarRating rating={item.rating} size={15} />
                  </div>
                  {item.comment && <p className="mt-2 text-sm text-gray-700">{item.comment}</p>}
                </div>
              ))}
              {!reviews.length && <p className="text-sm text-gray-500">No reviews yet.</p>}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-lg border border-saffron-100 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-maroon-700">Darshan Info</h2>
            <p className="mt-3 flex items-center gap-2 text-sm"><Clock size={16} className="text-saffron-600" />{temple.openTime || 'N/A'} - {temple.closeTime || 'N/A'}</p>
            <div className="mt-4 space-y-2">
              {(temple.darshanSlots || []).map((slot) => <p key={slot} className="rounded bg-saffron-50 px-3 py-2 text-sm">{slot}</p>)}
            </div>
          </div>
          <div className="rounded-lg border border-saffron-100 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-maroon-700">Visitor Notes</h2>
            <p className="mt-3 flex gap-2 text-sm"><Shirt size={16} className="mt-1 shrink-0 text-saffron-600" />{temple.dressCode || 'Modest attire recommended.'}</p>
            <p className="mt-3 flex gap-2 text-sm"><Route size={16} className="mt-1 shrink-0 text-saffron-600" />{temple.howToReach || 'Travel details not available.'}</p>
          </div>
          <div className="rounded-lg border border-saffron-100 bg-white p-5 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-maroon-700">Contact</h2>
            {temple.contact && <p className="mt-3 flex items-center gap-2 text-sm"><Phone size={16} className="text-saffron-600" />{temple.contact}</p>}
            {temple.website && <a className="mt-3 flex items-center gap-2 text-sm font-semibold text-saffron-700" href={temple.website} target="_blank" rel="noreferrer"><Globe size={16} />Official website</a>}
          </div>
        </aside>
      </section>
    </article>
  );
};

export default TempleDetailPage;
