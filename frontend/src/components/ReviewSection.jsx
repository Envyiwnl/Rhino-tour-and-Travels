import { useEffect, useState, useCallback } from "react";
import ReviewCard from "./ReviewCard";
import ReviewSummary from "./ReviewSummary";
import ReviewForm from "./ReviewForm";
import { useAuth } from "../customHooks/useAuth";
import { useTranslation } from "react-i18next";

const formatReview = (review) => ({
  id: review._id,
  name: review.user?.name || "",
  location: review.location || null,
  rating: review.rating,
  comment: review.comment,
  avatar: review.user?.photoURL || null,
  date: review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "",
});

export default function ReviewsSection() {
  const { t } = useTranslation();
  const { user, isAuthenticated, authLoading } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState("");
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState("0.0");

  const fetchReviews = useCallback(
    async (signal, showLoading = true) => {
      try {
        if (showLoading) {
          setReviewsLoading(true);
        }

        setReviewsError("");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/reviews`,
          {
            signal,
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load reviews.");
        }

        setReviews((data.reviews || []).map(formatReview));
        setTotalReviews(data.totalReviews || 0);
        setAverageRating(Number(data.averageRating || 0).toFixed(1));
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Unable to load reviews:", error);
        setReviewsError(t("reviews.loadError"));
      } finally {
        if (showLoading && !signal?.aborted) {
          setReviewsLoading(false);
        }
      }
    },
    [t],
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setIsReviewFormOpen(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchReviews(signal);

    return () => {
      controller.abort();
    };
  }, [fetchReviews]);

  const handleReviewSubmit = async (formData) => {
    if (!user) {
      throw new Error("Authentication required.");
    }

    const token = await user.getIdToken();

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: formData.rating,
          location: formData.location,
          comment: formData.comment,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to submit review.");
    }

    await fetchReviews(undefined, false);
  };

  return (
    <>
      <section
        aria-labelledby="reviews-title"
        className="bg-[#FAF8F2] px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[1380px]">
          <ReviewSummary
            averageRating={averageRating}
            totalReviews={totalReviews}
            canReview={!authLoading && isAuthenticated}
            onPostReview={() => setIsReviewFormOpen(true)}
          />

          {reviewsLoading ? (
            <p
              role="status"
              className="mt-9 text-center text-sm text-brand-muted"
            >
              {t("reviews.loading")}
            </p>
          ) : reviewsError ? (
            <p role="alert" className="mt-9 text-center text-sm text-red-500">
              {reviewsError}
            </p>
          ) : (
            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ReviewForm
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </>
  );
}
