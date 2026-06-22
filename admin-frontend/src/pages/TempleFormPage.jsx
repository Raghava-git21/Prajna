import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Save, Upload } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { createTemple, getTempleById, updateTemple } from '../services/api';

const emptyForm = {
  name: '',
  deity: '',
  state: '',
  city: '',
  address: '',
  pincode: '',
  lat: '',
  lng: '',
  openTime: '',
  closeTime: '',
  darshanSlots: '',
  aartiTimings: '',
  festivalTimings: '',
  history: '',
  festivals: '',
  dressCode: '',
  facilities: '',
  contact: '',
  website: '',
  bannerImage: '',
  bestTimeToVisit: '',
  howToReach: '',
  isFeatured: false
};

const toLines = (value) => Array.isArray(value) ? value.join('\n') : value || '';
const fromLines = (value) => value.split('\n').map((item) => item.trim()).filter(Boolean);

const TempleFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const { data: temple, isLoading } = useQuery({
    queryKey: ['temple', id],
    queryFn: async () => (await getTempleById(id)).data.data,
    enabled: isEdit
  });

  useEffect(() => {
    if (temple) {
      setForm({
        ...emptyForm,
        ...temple,
        darshanSlots: toLines(temple.darshanSlots),
        aartiTimings: toLines(temple.aartiTimings),
        festivals: toLines(temple.festivals),
        facilities: toLines(temple.facilities),
        isFeatured: Boolean(temple.isFeatured)
      });
    }
  }, [temple]);

  const mutation = useMutation({
    mutationFn: async () => {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (['darshanSlots', 'aartiTimings', 'festivals', 'facilities'].includes(key)) {
          payload.append(key, JSON.stringify(fromLines(value || '')));
        } else {
          payload.append(key, value ?? '');
        }
      });
      if (isEdit && temple?.images) payload.append('existingImages', JSON.stringify(temple.images));
      images.forEach((file) => payload.append('images', file));
      return isEdit ? updateTemple(id, payload) : createTemple(payload);
    },
    onSuccess: () => {
      toast.success(isEdit ? 'Temple updated' : 'Temple created');
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      navigate('/temples');
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Save failed')
  });

  const previewNames = useMemo(() => Array.from(images).map((file) => file.name).join(', '), [images]);
  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  if (isEdit && isLoading) return <LoadingSpinner label="Loading temple" />;

  return (
    <form onSubmit={(event) => { event.preventDefault(); mutation.mutate(); }} className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-maroon-700">{isEdit ? 'Edit Temple' : 'Add Temple'}</h1>
          <p className="text-gray-600">Create or update temple details.</p>
        </div>
        <button className="btn-primary inline-flex items-center justify-center gap-2" disabled={mutation.isPending}>
          <Save size={18} /> {mutation.isPending ? 'Saving...' : 'Save Temple'}
        </button>
      </div>

      <section className="rounded-lg border border-saffron-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-maroon-700">Core Details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-field" placeholder="Temple name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          <input className="input-field" placeholder="Deity" value={form.deity} onChange={(e) => set('deity', e.target.value)} required />
          <input className="input-field" placeholder="State" value={form.state} onChange={(e) => set('state', e.target.value)} required />
          <input className="input-field" placeholder="City" value={form.city} onChange={(e) => set('city', e.target.value)} required />
          <input className="input-field md:col-span-2" placeholder="Address" value={form.address || ''} onChange={(e) => set('address', e.target.value)} />
          <input className="input-field" placeholder="Pincode" value={form.pincode || ''} onChange={(e) => set('pincode', e.target.value)} />
          <input className="input-field" placeholder="Contact" value={form.contact || ''} onChange={(e) => set('contact', e.target.value)} />
          <input className="input-field" placeholder="Latitude" value={form.lat || ''} onChange={(e) => set('lat', e.target.value)} />
          <input className="input-field" placeholder="Longitude" value={form.lng || ''} onChange={(e) => set('lng', e.target.value)} />
          <input className="input-field md:col-span-2" placeholder="Website" value={form.website || ''} onChange={(e) => set('website', e.target.value)} />
        </div>
      </section>

      <section className="rounded-lg border border-saffron-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-maroon-700">Timings and Visitor Notes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-field" placeholder="Open time, e.g. 05:00" value={form.openTime || ''} onChange={(e) => set('openTime', e.target.value)} />
          <input className="input-field" placeholder="Close time, e.g. 22:00" value={form.closeTime || ''} onChange={(e) => set('closeTime', e.target.value)} />
          <textarea className="input-field" rows="4" placeholder="Darshan slots, one per line" value={form.darshanSlots || ''} onChange={(e) => set('darshanSlots', e.target.value)} />
          <textarea className="input-field" rows="4" placeholder="Aarti timings, one per line" value={form.aartiTimings || ''} onChange={(e) => set('aartiTimings', e.target.value)} />
          <textarea className="input-field md:col-span-2" rows="3" placeholder="Festival timings" value={form.festivalTimings || ''} onChange={(e) => set('festivalTimings', e.target.value)} />
          <textarea className="input-field" rows="4" placeholder="Festivals, one per line" value={form.festivals || ''} onChange={(e) => set('festivals', e.target.value)} />
          <textarea className="input-field" rows="4" placeholder="Facilities, one per line" value={form.facilities || ''} onChange={(e) => set('facilities', e.target.value)} />
          <textarea className="input-field" rows="4" placeholder="Dress code" value={form.dressCode || ''} onChange={(e) => set('dressCode', e.target.value)} />
          <textarea className="input-field" rows="4" placeholder="How to reach" value={form.howToReach || ''} onChange={(e) => set('howToReach', e.target.value)} />
          <input className="input-field md:col-span-2" placeholder="Best time to visit" value={form.bestTimeToVisit || ''} onChange={(e) => set('bestTimeToVisit', e.target.value)} />
        </div>
      </section>

      <section className="rounded-lg border border-saffron-100 bg-white p-5 shadow-sm">
        <h2 className="mb-4 font-heading text-xl font-bold text-maroon-700">Story and Media</h2>
        <textarea className="input-field" rows="6" placeholder="History" value={form.history || ''} onChange={(e) => set('history', e.target.value)} />
        <input className="input-field mt-4" placeholder="Banner image URL" value={form.bannerImage || ''} onChange={(e) => set('bannerImage', e.target.value)} />
        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-saffron-200 bg-saffron-50 p-6 text-center">
          <Upload className="text-saffron-600" />
          <span className="mt-2 text-sm font-semibold text-saffron-800">Upload temple images</span>
          <span className="mt-1 text-xs text-gray-500">{previewNames || 'JPG, PNG, WEBP up to 5MB each'}</span>
          <input type="file" className="hidden" multiple accept="image/png,image/jpeg,image/webp" onChange={(e) => setImages(Array.from(e.target.files || []))} />
        </label>
        <label className="mt-4 flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => set('isFeatured', e.target.checked)} />
          Feature this temple on the home page
        </label>
      </section>
    </form>
  );
};

export default TempleFormPage;
