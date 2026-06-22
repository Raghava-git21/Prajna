import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilterPanel from '../../components/FilterPanel';
import LoadingSpinner from '../../components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import TempleCard from '../../components/TempleCard';
import { useTempleStates, useTemples } from '../../hooks/useTemples';

const TemplesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = useMemo(() => ({
    page: Number(searchParams.get('page') || 1),
    limit: 9,
    search: searchParams.get('search') || '',
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || '',
    deity: searchParams.get('deity') || '',
    sort: searchParams.get('sort') || 'name',
    order: searchParams.get('sort') === 'rating' || searchParams.get('sort') === 'createdAt' ? 'DESC' : 'ASC'
  }), [searchParams]);
  const [filters, setFilters] = useState(initial);
  const { data, isLoading } = useTemples(filters);
  const { data: states = [] } = useTempleStates();

  const updateFilters = useCallback((next) => {
    setFilters(next);
    const entries = Object.entries(next).filter(([, value]) => value && value !== 1 && value !== 9 && value !== 'ASC');
    setSearchParams(Object.fromEntries(entries));
  }, [setSearchParams]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-maroon-700">Explore Temples</h1>
        <p className="mt-2 text-gray-600">Search and filter temples by state, city, deity, rating, and more.</p>
      </div>
      <div className="mb-4">
        <SearchBar value={filters.search} onChange={(search) => updateFilters({ ...filters, search, page: 1 })} />
      </div>
      <FilterPanel
        filters={filters}
        states={states}
        onChange={updateFilters}
        onReset={() => updateFilters({ page: 1, limit: 9, search: '', state: '', city: '', deity: '', sort: 'name', order: 'ASC' })}
      />

      {isLoading ? <LoadingSpinner label="Loading temples" /> : (
        <>
          <p className="my-5 text-sm text-gray-600">{data?.pagination?.total || 0} temples found</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(data?.data || []).map((temple) => <TempleCard key={temple.id} temple={temple} />)}
          </div>
          {!data?.data?.length && <div className="rounded-lg bg-white p-10 text-center text-gray-600">No temples match these filters.</div>}
          <Pagination page={data?.pagination?.page || 1} totalPages={data?.pagination?.totalPages || 1} onPageChange={(page) => updateFilters({ ...filters, page })} />
        </>
      )}
    </section>
  );
};

export default TemplesPage;
