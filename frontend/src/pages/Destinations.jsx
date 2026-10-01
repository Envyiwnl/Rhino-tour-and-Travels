import { useMemo } from "react";
import { SearchX } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import DestinationCard from "../components/DestinationCard";

import kaziranga from "../assets/destination_kaziranga.png";
import dawki from "../assets/destination_dawki.png";
import selaPass from "../assets/destination_sela_pass.png";
import nongriat from "../assets/destination_nongriat.png";
import tawang from "../assets/hero3.png";
import cherrapunji from "../assets/hero4.png";
import decoration from "../assets/mountain-bg.png";

const destinationData = [
  {
    key: "kaziranga",
    slug: "kaziranga",
    state: "assam",
    image: kaziranga,
  },
  {
    key: "dawki",
    slug: "dawki",
    state: "meghalaya",
    image: dawki,
  },
  {
    key: "selaPass",
    slug: "sela-pass",
    state: "arunachalPradesh",
    image: selaPass,
  },
  {
    key: "nongriat",
    slug: "nongriat",
    state: "meghalaya",
    image: nongriat,
  },
  {
    key: "tawang",
    slug: "tawang",
    state: "arunachalPradesh",
    image: tawang,
  },
  {
    key: "cherrapunji",
    slug: "cherrapunji",
    state: "meghalaya",
    image: cherrapunji,
  },
];

const filters = ["all", "assam", "meghalaya", "arunachalPradesh"];

export default function Destinations() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeState = searchParams.get("state") || "all";
  const searchTerm = searchParams.get("search")?.trim().toLowerCase() || "";

  const destinations = useMemo(() => {
    return destinationData.map((destination) => ({
      ...destination,
      name: t(`destinations.items.${destination.key}.name`),
      stateName: t(`destinations.items.${destination.key}.state`),
      description: t(`destinations.items.${destination.key}.description`),
      path: `/destinations/${destination.slug}`,
    }));
  }, [t]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesState =
        activeState === "all" || destination.state === activeState;

      const matchesSearch =
        !searchTerm ||
        destination.slug.includes(searchTerm) ||
        destination.name.toLowerCase().includes(searchTerm) ||
        destination.stateName.toLowerCase().includes(searchTerm);

      return matchesState && matchesSearch;
    });
  }, [destinations, activeState, searchTerm]);

  const handleFilter = (state) => {
    const params = new URLSearchParams(searchParams);

    if (state === "all") {
      params.delete("state");
    } else {
      params.set("state", state);
    }

    setSearchParams(params);
  };

  return (
    <div className="bg-brand-cream">
      <SEO
        title="Northeast India Destinations | Rhino Tours & Travels"
        description="Discover beautiful destinations across Northeast India with Rhino Tours & Travels, including Assam, Meghalaya and Arunachal Pradesh."
        path="/destinations"
      />
      <section className="relative overflow-hidden border-b border-brand-border/60 bg-[#F5F1E8] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <img
          src={decoration}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 right-0 hidden w-[520px] opacity-35 lg:block xl:w-[620px]"
        />

        <div className="relative z-10 mx-auto max-w-[1380px]">
          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
                {t("destinationPage.eyebrow")}
              </p>
              <span className="h-[2px] w-8 bg-brand-orange" />
            </div>

            <h1 className="font-serif text-[46px] font-semibold leading-[0.95] text-brand-dark sm:text-[58px] lg:text-[68px]">
              {t("destinationPage.title")}
            </h1>

            <p className="mt-5 max-w-[680px] text-sm leading-7 text-brand-muted sm:text-base">
              {t("destinationPage.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilter(filter)}
                aria-pressed={activeState === filter}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                  activeState === filter
                    ? "border-brand-orange bg-brand-orange text-white"
                    : "border-brand-border bg-white text-brand-dark hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {t(`destinationPage.filters.${filter}`)}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-brand-muted">
              {t("destinationPage.resultCount", {
                count: filteredDestinations.length,
              })}
            </p>
          </div>

          {filteredDestinations.length > 0 ? (
            <div className="mt-8 grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.key}
                  destination={{
                    ...destination,
                    state: destination.stateName,
                  }}
                  exploreLabel={t("destinationPage.explore")}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-cream-dark text-brand-orange">
                <SearchX size={25} />
              </div>

              <h2 className="mt-4 font-serif text-2xl font-semibold text-brand-dark">
                {t("destinationPage.noResults.title")}
              </h2>

              <p className="mt-2 max-w-[420px] text-sm leading-6 text-brand-muted">
                {t("destinationPage.noResults.description")}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
        <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-6 rounded-[28px] bg-[#E9EFEA] px-6 py-9 sm:px-9 lg:flex-row lg:items-center lg:px-12 lg:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              {t("destinationPage.cta.eyebrow")}
            </p>

            <h2 className="mt-2 max-w-[650px] font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
              {t("destinationPage.cta.title")}
            </h2>

            <p className="mt-2 max-w-[620px] text-sm leading-6 text-brand-muted">
              {t("destinationPage.cta.description")}
            </p>
          </div>

          <Link
            to="/"
            className="shrink-0 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-orange-dark"
          >
            {t("destinationPage.cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
