const FilterPanel = ({ filters, states = [], onChange, onReset }) => {
  const set = (key, value) => onChange({ ...filters, [key]: value, page: 1 });

  return (
    <div className="grid gap-3 rounded-lg border border-saffron-100 bg-white p-4 shadow-sm md:grid-cols-5">
      <select className="input-field" value={filters.state || ''} onChange={(e) => set('state', e.target.value)}>
        <option value="">All states</option>
        {states.map((state) => <option key={state} value={state}>{state}</option>)}
      </select>
      <input className="input-field" value={filters.city || ''} onChange={(e) => set('city', e.target.value)} placeholder="City" />
      <input className="input-field" value={filters.deity || ''} onChange={(e) => set('deity', e.target.value)} placeholder="Deity" />
      <select className="input-field" value={filters.sort || 'name'} onChange={(e) => set('sort', e.target.value)}>
        <option value="name">Sort by name</option>
        <option value="rating">Sort by rating</option>
        <option value="createdAt">Newest first</option>
        <option value="state">Sort by state</option>
      </select>
      <button type="button" className="btn-outline !px-4 !py-3" onClick={onReset}>Reset</button>
    </div>
  );
};

export default FilterPanel;
