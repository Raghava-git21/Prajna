import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value = '', onChange, placeholder = 'Search temples, deity, city, or state' }) => {
  const [text, setText] = useState(value);

  useEffect(() => setText(value), [value]);
  useEffect(() => {
    const id = setTimeout(() => onChange?.(text), 350);
    return () => clearTimeout(id);
  }, [text, onChange]);

  return (
    <label className="relative block">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-saffron-500" size={18} />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-11"
      />
    </label>
  );
};

export default SearchBar;
