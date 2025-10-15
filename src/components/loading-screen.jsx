function LoadingScreen({ label = "Loading" }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-6">
        <div className="text-2xl md:text-3xl font-semibold tracking-tight text-fg">
          ShowStopper
        </div>
        <div className="relative h-1 w-40 overflow-hidden rounded-full bg-white/8">
          <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-white animate-[loader_1.4s_ease-in-out_infinite]" />
        </div>
        <div className="text-xs uppercase tracking-[0.25em] text-fg-subtle">
          {label}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
