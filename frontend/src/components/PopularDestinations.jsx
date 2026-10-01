import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import kaziranga from "../assets/destination_kaziranga.png";
import dawki from "../assets/destination_dawki.png";
import selaPass from "../assets/destination_sela_pass.png";
import nongriat from "../assets/destination_nongriat.png";

import decoration from "../assets/enquiry_leaf.png";

const destinations = [
  {
    key: "kaziranga",
    image: kaziranga,
    path: "/destinations?search=kaziranga",
  },
  {
    key: "dawki",
    image: dawki,
    path: "/destinations?search=dawki",
  },
  {
    key: "selaPass",
    image: selaPass,
    path: "/destinations?search=sela-pass",
  },
  {
    key: "nongriat",
    image: nongriat,
    path: "/destinations?search=nongriat",
  },
];

export default function PopularDestinations() {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="popular-destinations-title"
      className="relative overflow-hidden bg-brand-cream px-4 pb-16 pt-14 sm:px-6 sm:pt-16 lg:pb-20 lg:pt-20"
    >
      <img
        src={decoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 left-0 hidden w-[250px] opacity-75 lg:block xl:w-[290px]"
      />

      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="grid gap-8 xl:grid-cols-[270px_repeat(4,minmax(0,1fr))] xl:gap-4">
          <div className="max-w-[430px] xl:max-w-none">
            <div className="mb-3 flex items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-orange">
                {t("destinations.eyebrow")}
              </p>

              <span
                aria-hidden="true"
                className="h-[2px] w-7 bg-brand-orange"
              />
            </div>

            <h2
              id="popular-destinations-title"
              className="max-w-[290px] font-serif text-[36px] font-semibold leading-[0.95] text-brand-green sm:text-[42px]"
            >
              {t("destinations.title")}
            </h2>

            <p className="mt-4 max-w-[290px] text-sm leading-6 text-brand-muted">
              {t("destinations.description")}
            </p>

            <Link
              to="/destinations"
              className="mt-5 inline-flex items-center gap-3 rounded-full border border-brand-orange px-5 py-2.5 text-sm font-medium text-brand-orange transition hover:bg-brand-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
            >
              {t("destinations.viewAll")}

              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid items-start gap-4 sm:grid-cols-2 xl:col-span-4 xl:grid-cols-4">
            {destinations.map((destination) => (
              <Link
                key={destination.key}
                to={destination.path}
                className="group h-fit self-start overflow-hidden rounded-xl bg-white shadow-[0_8px_24px_rgba(11,47,42,0.08)] transform-gpu will-change-transform transition-[transform,box-shadow] duration-300 ease-out hover:scale-[1.015] hover:shadow-[0_14px_30px_rgba(11,47,42,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
              >
                <div className="h-[210px] overflow-hidden sm:h-[220px] xl:h-[165px]">
                  <img
                    src={destination.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 px-4 py-2">
                  <div className="min-w-0">
                    <h3 className="whitespace-nowrap font-serif text-[15px] font-semibold leading-tight tracking-tight text-brand-dark sm:text-[16px] xl:text-[15px] 2xl:text-[16px]">
                      {t(`destinations.items.${destination.key}.name`)}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-brand-muted">
                      <MapPin
                        size={14}
                        aria-hidden="true"
                        className="shrink-0 text-brand-orange"
                      />

                      <span>
                        {t(`destinations.items.${destination.key}.state`)}
                      </span>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-orange text-brand-orange transition-colors duration-200 group-hover:bg-brand-orange group-hover:text-white"
                  >
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
