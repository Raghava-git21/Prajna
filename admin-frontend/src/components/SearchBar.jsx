import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value = '', onChange, placeholder = 'Search' }) => {
  const [text, setText] = useState(value);

  useEffect(() => setText(value), [value]);
  useEffect(() => {
    const timer = setTimeout(() => onChange?.(text), 300);
    return () => clearTimeout(timer);
  }, [text, onChange]);

  return (
    <label className="relative block">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-saffron-500" size={18} />
      <input className="input-field pl-11" value={text} onChange={(event) => setText(event.target.value)} placeholder={placeholder} />
    </label>
  );
};

export default SearchBar;
