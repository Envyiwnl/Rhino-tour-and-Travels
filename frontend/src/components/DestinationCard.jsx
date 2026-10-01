import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function DestinationCard({ destination, exploreLabel }) {
  const { name, state, image, description, path } = destination;

  return (
    <Link
      to={path}
      className="group h-full overflow-hidden rounded-2xl border border-brand-border/60 bg-white shadow-[0_8px_25px_rgba(11,47,42,0.06)] transform-gpu will-change-transform transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.015] hover:shadow-[0_15px_35px_rgba(11,47,42,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
    >
      <div className="relative h-[220px] overflow-hidden sm:h-[240px]">
        <img src={image} alt="" className="h-full w-full object-cover" />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
        />

        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} aria-hidden="true" />
            {state}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h2 className="font-serif text-2xl font-semibold leading-tight text-brand-dark">
          {name}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-brand-muted">
          {description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-brand-orange">
            {exploreLabel}
          </span>

          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-orange text-brand-orange transition-colors duration-200 group-hover:bg-brand-orange group-hover:text-white"
          >
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
