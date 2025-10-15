function PosterGrid({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default PosterGrid;
