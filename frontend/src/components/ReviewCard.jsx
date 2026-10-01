import { MapPin, Star, UserRound } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReviewCard({ review }) {
  const { t } = useTranslation();
  const { name, location, rating, comment, avatar, date } = review;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-brand-border/70 bg-white p-5 shadow-[0_8px_25px_rgba(11,47,42,0.06)] sm:p-6">
      <div
        aria-label={t("reviews.ratingLabel", { rating })}
        className="flex items-center gap-1"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            size={17}
            strokeWidth={1.8}
            aria-hidden="true"
            className={
              index < rating
                ? "fill-brand-gold text-brand-gold"
                : "text-brand-border"
            }
          />
        ))}
      </div>

      <p className="mt-5 flex-1 text-sm leading-7 text-brand-muted">
        “{comment}”
      </p>

      <div className="mt-6 border-t border-brand-border/60 pt-4">
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt=""
              referrerPolicy="no-referrer"
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-cream-dark text-brand-orange">
              <UserRound size={20} aria-hidden="true" />
            </div>
          )}

          <div className="min-w-0">
            <p className="font-medium text-brand-dark">{name}</p>

            {location && (
              <div className="mt-0.5 flex items-center gap-1 text-xs text-brand-muted">
                <MapPin
                  size={12}
                  aria-hidden="true"
                  className="text-brand-orange"
                />
                <span>{location}</span>
              </div>
            )}
          </div>

          {date && (
            <span className="ml-auto shrink-0 text-[11px] text-brand-muted/70">
              {date}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
