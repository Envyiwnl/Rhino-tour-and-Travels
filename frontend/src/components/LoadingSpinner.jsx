export default function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-brand-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-brand-green/15" />
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-orange border-r-brand-orange" />
        </div>

        <p className="text-sm font-medium tracking-wide text-brand-muted">
          Loading...
        </p>
      </div>
    </div>
  );
}
