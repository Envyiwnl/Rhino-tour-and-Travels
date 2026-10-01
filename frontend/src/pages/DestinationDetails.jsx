import {
  ArrowRight,
  CalendarDays,
  Car,
  Clock3,
  MapPin,
  Plane,
  TrainFront,
  Trees,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ItinerarySection from "../components/ItenerarySection";
import SEO from "../components/SEO";

import kaziranga from "../assets/destination_kaziranga.png";
import dawki from "../assets/destination_dawki.png";
import selaPass from "../assets/destination_sela_pass.png";
import nongriat from "../assets/destination_nongriat.png";
import tawang from "../assets/hero3.png";
import cherrapunji from "../assets/hero4.png";

const destinationConfig = {
  kaziranga: {
    key: "kaziranga",
    image: kaziranga,
    highlights: ["safari", "wildlife", "birdWatching", "localCulture"],

    itinerary: [
      {
        day: 1,
        key: "day1",
        stops: [
          { key: "pickup", icon: "pickup" },
          { key: "breakfast", icon: "breakfast" },
          { key: "arrival", icon: "location" },
          { key: "lunch", icon: "lunch" },
          { key: "culture", icon: "sightseeing" },
          { key: "stay", icon: "stay" },
        ],
      },
      {
        day: 2,
        key: "day2",
        stops: [
          { key: "safari", icon: "safari" },
          { key: "breakfast", icon: "breakfast" },
          { key: "explore", icon: "nature" },
          { key: "lunch", icon: "lunch" },
          { key: "evening", icon: "sightseeing" },
          { key: "stay", icon: "stay" },
        ],
      },
    ],
  },

  dawki: {
    key: "dawki",
    image: dawki,
    highlights: ["boating", "river", "nature", "photography"],

    itinerary: [
      {
        day: 1,
        key: "day1",
        stops: [
          { key: "pickup", icon: "pickup" },
          { key: "breakfast", icon: "breakfast" },
          { key: "arrival", icon: "location" },
          { key: "boating", icon: "boating" },
          { key: "lunch", icon: "lunch" },
          { key: "explore", icon: "nature" },
          { key: "return", icon: "drive" },
        ],
      },
    ],
  },

  "sela-pass": {
    key: "selaPass",
    image: selaPass,
    highlights: ["mountains", "snow", "lake", "roadJourney"],

    itinerary: [
      {
        day: 1,
        key: "day1",
        stops: [
          { key: "pickup", icon: "pickup" },
          { key: "breakfast", icon: "breakfast" },
          { key: "drive", icon: "mountain" },
          { key: "arrival", icon: "snow" },
          { key: "lake", icon: "lake" },
          { key: "lunch", icon: "lunch" },
          { key: "tawang", icon: "drive" },
        ],
      },
    ],
  },

  nongriat: {
    key: "nongriat",
    image: nongriat,
    highlights: ["rootBridges", "trekking", "rainforest", "waterfalls"],

    itinerary: [
      {
        day: 1,
        key: "day1",
        stops: [
          { key: "pickup", icon: "pickup" },
          { key: "breakfast", icon: "breakfast" },
          { key: "trailhead", icon: "location" },
          { key: "trek", icon: "trekking" },
          { key: "bridge", icon: "nature" },
          { key: "lunch", icon: "lunch" },
          { key: "explore", icon: "sightseeing" },
          { key: "return", icon: "trekking" },
        ],
      },
    ],
  },

  tawang: {
    key: "tawang",
    image: tawang,
    highlights: ["monastery", "mountains", "culture", "nature"],

    itinerary: [
      {
        day: 1,
        key: "day1",
        stops: [
          { key: "arrival", icon: "location" },
          { key: "checkin", icon: "stay" },
          { key: "lunch", icon: "lunch" },
          { key: "monastery", icon: "heritage" },
          { key: "evening", icon: "sightseeing" },
          { key: "stay", icon: "stay" },
        ],
      },
      {
        day: 2,
        key: "day2",
        stops: [
          { key: "breakfast", icon: "breakfast" },
          { key: "drive", icon: "mountain" },
          { key: "lake", icon: "lake" },
          { key: "lunch", icon: "lunch" },
          { key: "viewpoints", icon: "nature" },
          { key: "return", icon: "drive" },
          { key: "stay", icon: "stay" },
        ],
      },
      {
        day: 3,
        key: "day3",
        stops: [
          { key: "breakfast", icon: "breakfast" },
          { key: "heritage", icon: "heritage" },
          { key: "local", icon: "sightseeing" },
          { key: "lunch", icon: "lunch" },
          { key: "leisure", icon: "nature" },
          { key: "departure", icon: "drive" },
        ],
      },
    ],
  },

  cherrapunji: {
    key: "cherrapunji",
    image: cherrapunji,
    highlights: ["waterfalls", "caves", "nature", "rootBridges"],

    itinerary: [
      {
        day: 1,
        key: "day1",
        stops: [
          { key: "pickup", icon: "pickup" },
          { key: "breakfast", icon: "breakfast" },
          { key: "waterfall", icon: "nature" },
          { key: "lunch", icon: "lunch" },
          { key: "cave", icon: "mountain" },
          { key: "viewpoint", icon: "sightseeing" },
          { key: "stay", icon: "stay" },
        ],
      },
      {
        day: 2,
        key: "day2",
        stops: [
          { key: "breakfast", icon: "breakfast" },
          { key: "nature", icon: "nature" },
          { key: "bridge", icon: "trekking" },
          { key: "lunch", icon: "lunch" },
          { key: "explore", icon: "sightseeing" },
          { key: "return", icon: "drive" },
        ],
      },
    ],
  },
};

export default function DestinationDetails() {
  const { slug } = useParams();
  const { t } = useTranslation();

  const destination = destinationConfig[slug];

  if (!destination) {
    return (
      <div className="flex min-h-[500px] items-center justify-center bg-brand-cream px-4 text-center">
        <SEO
          title={`${t("destinationDetails.notFound.title", {
            lng: "en",
          })} | Rhino Tours & Travels`}
          description={t("destinationDetails.notFound.description", {
            lng: "en",
          })}
          path={`/destinations/${slug}`}
          noIndex
        />

        <div>
          <h1 className="font-serif text-4xl font-semibold text-brand-dark">
            {t("destinationDetails.notFound.title")}
          </h1>

          <p className="mt-3 text-sm text-brand-muted">
            {t("destinationDetails.notFound.description")}
          </p>

          <Link
            to="/destinations"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white"
          >
            {t("destinationDetails.notFound.button")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const base = `destinationDetails.items.${destination.key}`;

  const destinationName = t(`${base}.name`);
  const destinationState = t(`${base}.state`);
  const destinationTagline = t(`${base}.tagline`);

  const seoName = t(`${base}.name`, { lng: "en" });
  const seoState = t(`${base}.state`, { lng: "en" });
  const seoTagline = t(`${base}.tagline`, { lng: "en" });

  const seoTitle = `${seoName} Travel Guide | Rhino Tours & Travels`;

  const seoDescription = `Explore ${seoName}, ${seoState} with Rhino Tours & Travels. ${seoTagline}`;

  const itinerary = destination.itinerary?.map((day) => ({
    day: day.day,
    title: t(`${base}.itinerary.${day.key}.title`),

    stops: day.stops.map((stop) => ({
      icon: stop.icon,
      time: t(`${base}.itinerary.${day.key}.stops.${stop.key}.time`),
      title: t(`${base}.itinerary.${day.key}.stops.${stop.key}.title`),
      description: t(
        `${base}.itinerary.${day.key}.stops.${stop.key}.description`,
      ),
    })),
  }));

  return (
    <div className="bg-brand-cream">
      <SEO
        title={seoTitle}
        description={seoDescription}
        path={`/destinations/${slug}`}
        image={destination.image}
      />

      <section className="relative h-[420px] overflow-hidden sm:h-[500px] lg:h-[560px]">
        <img
          src={destination.image}
          alt={destinationName}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1380px] items-end px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
          <div className="max-w-[760px] text-white">
            <div className="mb-3 flex items-center gap-2 text-sm text-white/80">
              <MapPin size={17} className="text-brand-gold" />
              <span>{destinationState}</span>
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">
              {destinationName}
            </h1>

            <p className="mt-4 max-w-[650px] text-sm leading-7 text-white/80 sm:text-base">
              {destinationTagline}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
                {t("destinationDetails.aboutEyebrow")}
              </p>

              <span className="h-[2px] w-8 bg-brand-orange" />
            </div>

            <h2 className="font-serif text-4xl font-semibold text-brand-dark sm:text-5xl">
              {t(`${base}.aboutTitle`)}
            </h2>

            <p className="mt-5 text-sm leading-7 text-brand-muted sm:text-base">
              {t(`${base}.descriptionOne`)}
            </p>

            <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
              {t(`${base}.descriptionTwo`)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-brand-border/70 bg-white p-5">
              <div className="flex items-center gap-3">
                <CalendarDays size={21} className="text-brand-orange" />

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-brand-muted">
                    {t("destinationDetails.bestTime")}
                  </p>

                  <p className="mt-1 font-serif text-xl font-semibold text-brand-dark">
                    {t(`${base}.bestTime`)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-border/70 bg-white p-5">
              <div className="flex items-center gap-3">
                <Clock3 size={21} className="text-brand-orange" />

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-brand-muted">
                    {t("destinationDetails.duration")}
                  </p>

                  <p className="mt-1 font-serif text-xl font-semibold text-brand-dark">
                    {t(`${base}.duration`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border/60 bg-[#F5F1E8] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1380px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
            {t("destinationDetails.highlightsEyebrow")}
          </p>

          <h2 className="mt-2 font-serif text-4xl font-semibold text-brand-dark">
            {t("destinationDetails.highlightsTitle")}
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destination.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-brand-border/60 bg-white p-5"
              >
                <Trees size={22} className="text-brand-orange" />

                <p className="mt-4 font-serif text-xl font-semibold text-brand-dark">
                  {t(`destinationDetails.highlights.${highlight}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1380px]">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
            {t("destinationDetails.reachEyebrow")}
          </p>

          <h2 className="mt-2 font-serif text-4xl font-semibold text-brand-dark">
            {t("destinationDetails.reachTitle")}
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-brand-border/70 bg-white p-6">
              <Plane size={23} className="text-brand-orange" />

              <h3 className="mt-4 font-serif text-xl font-semibold text-brand-dark">
                {t("destinationDetails.air")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-brand-muted">
                {t(`${base}.reach.air`)}
              </p>
            </div>

            <div className="rounded-2xl border border-brand-border/70 bg-white p-6">
              <TrainFront size={23} className="text-brand-orange" />

              <h3 className="mt-4 font-serif text-xl font-semibold text-brand-dark">
                {t("destinationDetails.rail")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-brand-muted">
                {t(`${base}.reach.rail`)}
              </p>
            </div>

            <div className="rounded-2xl border border-brand-border/70 bg-white p-6">
              <Car size={23} className="text-brand-orange" />

              <h3 className="mt-4 font-serif text-xl font-semibold text-brand-dark">
                {t("destinationDetails.road")}
              </h3>

              <p className="mt-2 text-sm leading-6 text-brand-muted">
                {t(`${base}.reach.road`)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ItinerarySection itinerary={itinerary} />

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
        <div className="mx-auto flex max-w-[1380px] flex-col justify-between gap-6 rounded-[28px] bg-[#E9EFEA] px-6 py-9 sm:px-9 lg:flex-row lg:items-center lg:px-12 lg:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              {t("destinationDetails.tours.eyebrow")}
            </p>

            <h2 className="mt-2 max-w-[650px] font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
              {t("destinationDetails.tours.title")}
            </h2>

            <p className="mt-3 max-w-[650px] text-sm leading-6 text-brand-muted">
              {t("destinationDetails.tours.description")}
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
          >
            {t("destinationDetails.tours.button")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
