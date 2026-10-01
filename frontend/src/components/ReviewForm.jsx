import { useState } from "react";
import { MapPin, Send, Star, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const initialForm = {
  rating: 0,
  location: "",
  comment: "",
};

export default function ReviewForm({ isOpen, onClose, onSubmit }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(initialForm);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.rating || !formData.comment.trim()) return;

    try {
      setSubmitting(true);
      setSubmitError("");

      await onSubmit(formData);

      setFormData(initialForm);
      setHoveredRating(0);
      onClose();
    } catch (error) {
      console.error("Review submission failed:", error);
      setSubmitError(t("reviews.form.submitError"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-form-title"
        aria-describedby="review-form-description"
        className="relative w-full max-w-[520px] rounded-2xl bg-[#FAF8F2] p-5 shadow-2xl sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          aria-label={t("reviews.form.close")}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-cream-dark hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={19} aria-hidden="true" />
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
          {t("reviews.form.eyebrow")}
        </p>

        <h3
          id="review-form-title"
          className="mt-2 pr-10 font-serif text-3xl font-semibold text-brand-dark"
        >
          {t("reviews.form.title")}
        </h3>

        <p
          id="review-form-description"
          className="mt-2 text-sm leading-6 text-brand-muted"
        >
          {t("reviews.form.description")}
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <fieldset disabled={submitting}>
            <legend className="mb-2 block text-xs font-semibold text-brand-dark">
              {t("reviews.form.rating")}
            </legend>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      rating: star,
                    }))
                  }
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  aria-label={t("reviews.form.ratingOption", {
                    rating: star,
                  })}
                  aria-pressed={formData.rating === star}
                  className="rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
                >
                  <Star
                    size={26}
                    aria-hidden="true"
                    className={
                      star <= (hoveredRating || formData.rating)
                        ? "fill-brand-gold text-brand-gold"
                        : "text-brand-border"
                    }
                  />
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5">
            <label
              htmlFor="review-location"
              className="mb-2 block text-xs font-semibold text-brand-dark"
            >
              {t("reviews.form.location")}
              <span className="ml-1 font-normal text-brand-muted">
                ({t("reviews.form.optional")})
              </span>
            </label>

            <div className="relative">
              <MapPin
                size={17}
                aria-hidden="true"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
              />

              <input
                id="review-location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={submitting}
                placeholder={t("reviews.form.locationPlaceholder")}
                className="h-12 w-full rounded-xl border border-brand-border bg-white pl-10 pr-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="review-comment"
              className="mb-2 block text-xs font-semibold text-brand-dark"
            >
              {t("reviews.form.comment")}
            </label>

            <textarea
              id="review-comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              disabled={submitting}
              placeholder={t("reviews.form.commentPlaceholder")}
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-brand-border bg-white p-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {submitError && (
            <p role="alert" className="mt-4 text-center text-sm text-red-500">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={
              submitting || !formData.rating || !formData.comment.trim()
            }
            className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
          >
            {submitting && (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              />
            )}

            {submitting
              ? t("reviews.form.submitting")
              : t("reviews.form.submit")}

            {!submitting && <Send size={16} aria-hidden="true" />}
          </button>
        </form>
      </div>
    </div>
  );
}
