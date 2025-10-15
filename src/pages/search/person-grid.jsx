function PersonGrid({ items }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {items.map((item) => (
        <div key={item.id} className="poster-card text-center">
          <div
            className="aspect-3/4 w-full rounded-xl bg-surface-2 bg-cover bg-center ring-1 ring-white/5"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w300${item.profile_path})`,
            }}
          />
          <div className="mt-3 text-sm font-medium truncate">{item.name}</div>
        </div>
      ))}
    </div>
  );
}

export default PersonGrid;
