import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { MapPinned, Plus, Sparkles, Table2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getTempleStats, getTemples } from '../services/api';

const DashboardPage = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => (await getTempleStats()).data.data
  });
  const { data: recent } = useQuery({
    queryKey: ['admin', 'recent'],
    queryFn: async () => (await getTemples({ sort: 'createdAt', order: 'DESC', limit: 5 })).data
  });

  if (isLoading) return <LoadingSpinner label="Loading dashboard" />;

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-heading text-3xl font-bold text-maroon-700">Dashboard</h1>
          <p className="text-gray-600">Admin console running separately on port 5714.</p>
        </div>
        <Link to="/temples/new" className="btn-primary inline-flex items-center justify-center gap-2"><Plus size={18} /> Add Temple</Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow-sm"><Table2 className="text-saffron-600" /><p className="mt-3 font-heading text-3xl font-bold text-maroon-700">{stats?.total || 0}</p><p className="text-sm text-gray-600">Total Temples</p></div>
        <div className="rounded-lg bg-white p-5 shadow-sm"><Sparkles className="text-saffron-600" /><p className="mt-3 font-heading text-3xl font-bold text-maroon-700">{stats?.featured || 0}</p><p className="text-sm text-gray-600">Featured</p></div>
        <div className="rounded-lg bg-white p-5 shadow-sm"><MapPinned className="text-saffron-600" /><p className="mt-3 font-heading text-3xl font-bold text-maroon-700">{stats?.byState?.length || 0}</p><p className="text-sm text-gray-600">States Covered</p></div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-maroon-700">By State</h2>
          <div className="mt-4 space-y-2">
            {(stats?.byState || []).map((item) => (
              <div key={item.state} className="flex items-center justify-between rounded bg-saffron-50 px-3 py-2 text-sm">
                <span>{item.state}</span><strong>{item.count}</strong>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white p-5 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-maroon-700">Recent Temples</h2>
          <div className="mt-4 space-y-2">
            {(recent?.data || []).map((temple) => (
              <Link key={temple.id} to={`/temples/${temple.id}/edit`} className="block rounded border border-saffron-100 px-3 py-2 text-sm hover:bg-saffron-50">
                <strong>{temple.name}</strong><span className="ml-2 text-gray-500">{temple.city}, {temple.state}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
