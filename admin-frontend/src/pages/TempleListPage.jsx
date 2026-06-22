import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Edit, Plus, Trash2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import { deleteTemple, getTemples } from '../services/api';

const TempleListPage = () => {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'temples', search],
    queryFn: async () => (await getTemples({ search, limit: 100, sort: 'createdAt', order: 'DESC' })).data
  });
  const mutation = useMutation({
    mutationFn: deleteTemple,
    onSuccess: () => {
      toast.success('Temple deleted');
      queryClient.invalidateQueries({ queryKey: ['admin', 'temples'] });
    },
    onError: (error) => toast.error(error.response?.data?.message || 'Delete failed')
  });

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-maroon-700">Temples</h1>
          <p className="text-gray-600">Manage temple records from the separate admin app.</p>
        </div>
        <Link to="/temples/new" className="btn-primary inline-flex items-center justify-center gap-2"><Plus size={18} /> Add Temple</Link>
      </div>
      <div className="mb-4"><SearchBar value={search} onChange={setSearch} placeholder="Search temple list" /></div>
      {isLoading ? <LoadingSpinner /> : (
        <div className="overflow-hidden rounded-lg border border-saffron-100 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-saffron-50 text-maroon-700">
                <tr><th className="px-4 py-3">Temple</th><th>Location</th><th>Deity</th><th>Rating</th><th className="text-right pr-4">Actions</th></tr>
              </thead>
              <tbody>
                {(data?.data || []).map((temple) => (
                  <tr key={temple.id} className="border-t border-saffron-100">
                    <td className="px-4 py-3 font-semibold">{temple.name}</td>
                    <td>{temple.city}, {temple.state}</td>
                    <td>{temple.deity}</td>
                    <td>{Number(temple.rating || 0).toFixed(1)}</td>
                    <td className="pr-4 text-right">
                      <Link to={`/temples/${temple.id}/edit`} className="mr-2 inline-grid h-9 w-9 place-items-center rounded border text-saffron-700" title="Edit"><Edit size={16} /></Link>
                      <button onClick={() => window.confirm('Delete this temple?') && mutation.mutate(temple.id)} className="inline-grid h-9 w-9 place-items-center rounded border text-red-600" title="Delete"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TempleListPage;
