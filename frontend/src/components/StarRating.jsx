import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, size = 18, interactive = false, onChange, className = '' }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(star)}
          className={`${interactive ? 'cursor-pointer hover:scale-125' : 'cursor-default'} transition-transform`}
        >
          <Star
            size={size}
            className={
              star <= Math.round(rating)
                ? 'text-gold-500 fill-gold-500'
                : star - 0.5 <= rating
                  ? 'text-gold-400 fill-gold-200'
                  : 'text-gray-300'
            }
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
