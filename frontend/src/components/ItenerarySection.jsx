import {
  BedDouble,
  Binoculars,
  Camera,
  Car,
  Coffee,
  MapPin,
  Mountain,
  Snowflake,
  Trees,
  UtensilsCrossed,
  Waves,
  Footprints,
  Landmark,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const iconMap = {
  pickup: Car,
  drive: Car,
  breakfast: Coffee,
  lunch: UtensilsCrossed,
  dinner: UtensilsCrossed,
  stay: BedDouble,
  sightseeing: Camera,
  safari: Binoculars,
  nature: Trees,
  location: MapPin,
  boating: Waves,
  mountain: Mountain,
  snow: Snowflake,
  lake: Waves,
  trekking: Footprints,
  heritage: Landmark,
};

export default function ItinerarySection({ itinerary }) {
  const { t } = useTranslation();

  if (!itinerary?.length) return null;

  return (
    <section
      aria-labelledby="itinerary-title"
      className="border-y border-brand-border/60 bg-[#F5F1E8] px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="max-w-[700px]">
          <div className="mb-3 flex items-center gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              {t("destinationDetails.itinerary.eyebrow")}
            </p>

            <span aria-hidden="true" className="h-[2px] w-8 bg-brand-orange" />
          </div>

          <h2
            id="itinerary-title"
            className="font-serif text-4xl font-semibold text-brand-dark sm:text-5xl"
          >
            {t("destinationDetails.itinerary.title")}
          </h2>

          <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
            {t("destinationDetails.itinerary.description")}
          </p>
        </div>

        <div className="mt-10 space-y-7">
          {itinerary.map((day) => (
            <div
              key={day.day}
              className="rounded-[24px] border border-brand-border/70 bg-white p-5 shadow-[0_8px_25px_rgba(11,47,42,0.05)] sm:p-7 lg:p-8"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="inline-flex w-fit rounded-full bg-brand-orange px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                  {t("destinationDetails.itinerary.day", {
                    count: day.day,
                  })}
                </span>

                <h3 className="font-serif text-2xl font-semibold text-brand-dark sm:text-[28px]">
                  {day.title}
                </h3>
              </div>

              <div className="relative ml-[18px] mt-7 border-l-2 border-dashed border-brand-orange/30">
                {day.stops.map((stop, index) => {
                  const Icon = iconMap[stop.icon] || MapPin;

                  return (
                    <div
                      key={`${day.day}-${index}`}
                      className="relative pb-7 pl-10 last:pb-0 sm:pl-12"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute -left-[19px] top-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-brand-orange text-white shadow-sm"
                      >
                        <Icon size={16} />
                      </div>

                      <div className="rounded-xl bg-[#FAF8F2] px-4 py-3 sm:px-5 sm:py-4">
                        {stop.time && (
                          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-orange">
                            {stop.time}
                          </p>
                        )}

                        <h4 className="font-serif text-lg font-semibold text-brand-dark">
                          {stop.title}
                        </h4>

                        {stop.description && (
                          <p className="mt-1 text-sm leading-6 text-brand-muted">
                            {stop.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
