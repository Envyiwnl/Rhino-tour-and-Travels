import SEO from "../components/SEO";
import EnquiryForm from "../components/EnquiryForm";
import HeroCarousel from "../components/HeroCarousel";
import PopularDestinations from "../components/PopularDestinations";
import ReviewsSection from "../components/ReviewSection";
import TravelStats from "../components/TravelStats";

export default function Home() {
  return (
    <>
      <SEO
        title="Rhino Tours & Travels | Explore Northeast India"
        description="Explore Northeast India with Rhino Tours & Travels. Discover unforgettable journeys across Assam, Meghalaya, Arunachal Pradesh and beyond."
        path="/"
      />
      <HeroCarousel />
      <EnquiryForm />
      <PopularDestinations />
      <TravelStats />
      <ReviewsSection />
    </>
  );
}
