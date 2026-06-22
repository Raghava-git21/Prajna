const LoadingSpinner = ({ label = 'Loading' }) => (
  <div className="grid min-h-48 place-items-center">
    <div className="text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-saffron-200 border-t-saffron-600" />
      <p className="mt-3 text-sm font-medium text-gray-600">{label}</p>
    </div>
  </div>
);

export default LoadingSpinner;
