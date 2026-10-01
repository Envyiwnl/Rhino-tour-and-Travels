import { Star, PenLine } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ReviewSummary({
  averageRating,
  totalReviews,
  canReview = false,
  onPostReview,
}) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-3 flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-orange">
            {t("reviews.eyebrow")}
          </span>

          <span aria-hidden="true" className="h-[2px] w-7 bg-brand-orange" />
        </div>

        <h2
          id="reviews-title"
          className="font-serif text-[38px] font-semibold leading-tight text-brand-dark sm:text-[46px]"
        >
          {t("reviews.title")}
        </h2>

        <p className="mt-3 max-w-[560px] text-sm leading-6 text-brand-muted sm:text-base">
          {t("reviews.description")}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={18}
                className="fill-brand-gold text-brand-gold"
              />
            ))}
          </div>

          <div>
            <p className="font-serif text-2xl font-semibold leading-none text-brand-dark">
              {averageRating}
            </p>

            <p className="mt-1 text-xs text-brand-muted">
              {t("reviews.reviewCount", { count: totalReviews })}
            </p>
          </div>
        </div>

        {canReview && (
          <button
            type="button"
            onClick={onPostReview}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            <PenLine size={16} aria-hidden="true" />
            {t("reviews.postReview")}
          </button>
        )}
      </div>
    </div>
  );
}
