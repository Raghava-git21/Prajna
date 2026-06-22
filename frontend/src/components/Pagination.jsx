import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page = 1, totalPages = 1, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(0, 7);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button className="grid h-10 w-10 place-items-center rounded border bg-white disabled:opacity-40" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
        <ChevronLeft size={18} />
      </button>
      {pages.map((item) => (
        <button
          key={item}
          className={`h-10 min-w-10 rounded border px-3 text-sm font-semibold ${item === page ? 'bg-saffron-500 text-white' : 'bg-white text-gray-700'}`}
          onClick={() => onPageChange(item)}
        >
          {item}
        </button>
      ))}
      <button className="grid h-10 w-10 place-items-center rounded border bg-white disabled:opacity-40" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
