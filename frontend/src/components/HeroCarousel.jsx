import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";
import exploreTagline from "../assets/explore_northeast.png";

const slides = [
  {
    image: hero1,
    location: "Kaziranga National Park",
    region: "Assam",
  },
  {
    image: hero2,
    location: "Dawki",
    region: "Meghalaya",
  },
  {
    image: hero3,
    location: "Tawang",
    region: "Arunachal Pradesh",
  },
  {
    image: hero4,
    location: "Cherrapunji",
    region: "Meghalaya",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const slide = slides[currentSlide];

  return (
    <section
      aria-label={t("hero.carouselLabel")}
      className="relative h-[560px] w-full overflow-hidden sm:h-[620px] md:h-[680px] lg:h-[620px] xl:h-[680px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((item, index) => (
        <img
          key={item.location}
          src={item.image}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
      />

      <img
        src={exploreTagline}
        alt=""
        aria-hidden="true"
        className="absolute right-8 top-10 z-10 hidden w-[180px] object-contain opacity-90 md:block lg:right-14 lg:top-14 lg:w-[220px] xl:right-20 xl:w-[250px]"
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] items-center px-5 sm:px-8 md:px-10 lg:px-16 xl:px-20">
        <div className="max-w-[680px] pt-4 text-white">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold sm:text-sm">
            {t("hero.eyebrow")}
          </p>

          <h1 className="max-w-[650px] font-serif text-5xl font-semibold leading-[0.92] text-white sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px]">
            {t("hero.title")}
          </h1>

          <div
            aria-hidden="true"
            className="my-5 h-[5px] w-28 -rotate-1 rounded-[100%] bg-brand-orange sm:w-36"
          />

          <p className="max-w-[570px] text-sm leading-6 text-white/90 sm:text-base sm:leading-7 md:text-lg">
            {t("hero.description")}
          </p>

          <Link
            to="/destinations"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-brand-orange px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:px-7 sm:text-base"
          >
            {t("hero.button")}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={previousSlide}
        aria-label={t("hero.previousSlide")}
        className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-5 md:h-12 md:w-12"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label={t("hero.nextSlide")}
        className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-5 md:h-12 md:w-12"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>

      <div
        aria-label={t("hero.slideNavigation")}
        className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
      >
        {slides.map((item, index) => (
          <button
            key={item.location}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={t("hero.goToSlide", {
              number: index + 1,
            })}
            aria-current={index === currentSlide ? "true" : undefined}
            className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === currentSlide
                ? "h-3 w-3 bg-white shadow-[0_0_8px_rgba(255,255,255,0.65)]"
                : "h-2.5 w-2.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-16 right-4 z-20 hidden min-w-[220px] rounded-2xl border border-white/20 bg-black/45 px-4 py-3 text-white backdrop-blur-md sm:block md:right-8 lg:right-12">
        <div className="flex items-start gap-3">
          <MapPin
            size={20}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-brand-gold"
          />

          <div>
            <p className="text-sm font-semibold">{slide.location}</p>
            <p className="mt-0.5 text-xs text-white/70">{slide.region}</p>
          </div>

          <span className="ml-auto text-xs text-white/70">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        <div
          aria-label={t("hero.slideNavigation")}
          className="mt-3 flex gap-1.5"
        >
          {slides.map((item, index) => (
            <button
              key={item.location}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={t("hero.goToLocation", {
                location: item.location,
              })}
              aria-current={index === currentSlide ? "true" : undefined}
              className={`h-[3px] flex-1 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                index === currentSlide ? "bg-white" : "bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
