import { Compass, HeartHandshake, Leaf, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import aboutImage from "../assets/about_us.png";

const values = [
  { key: "local", icon: MapPin },
  { key: "personal", icon: Compass },
  { key: "responsible", icon: Leaf },
  { key: "care", icon: HeartHandshake },
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-cream">
      <SEO
        title="About Rhino Tours & Travels | Northeast India Travel Experts"
        description="Learn about Rhino Tours & Travels and our passion for creating memorable journeys across Northeast India, including Assam, Meghalaya and Arunachal Pradesh."
        path="/about"
      />
      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1380px] items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative overflow-hidden rounded-[28px]">
            <img
              src={aboutImage}
              alt={t("about.imageAlt")}
              className="h-[350px] w-full object-cover sm:h-[430px] lg:h-[520px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-white backdrop-blur-md sm:bottom-6 sm:left-6">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-gold">
                {t("about.badgeEyebrow")}
              </p>
              <p className="mt-1 font-serif text-xl font-semibold">
                {t("about.badgeTitle")}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
                {t("about.eyebrow")}
              </p>
              <span className="h-[2px] w-8 bg-brand-orange" />
            </div>

            <h1 className="max-w-[620px] font-serif text-[42px] font-semibold leading-[0.98] text-brand-dark sm:text-[52px] lg:text-[60px]">
              {t("about.title")}
            </h1>

            <p className="mt-6 max-w-[620px] text-sm leading-7 text-brand-muted sm:text-base">
              {t("about.descriptionOne")}
            </p>

            <p className="mt-4 max-w-[620px] text-sm leading-7 text-brand-muted sm:text-base">
              {t("about.descriptionTwo")}
            </p>

            <div className="mt-8 border-l-2 border-brand-orange pl-5">
              <p className="font-serif text-xl font-semibold leading-7 text-brand-green sm:text-2xl">
                {t("about.quote")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border/60 bg-[#F5F1E8] px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1380px]">
          <div className="mx-auto max-w-[680px] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
              {t("about.values.eyebrow")}
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold text-brand-dark sm:text-5xl">
              {t("about.values.title")}
            </h2>

            <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
              {t("about.values.description")}
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-2xl border border-brand-border/70 bg-white p-6 shadow-[0_8px_24px_rgba(11,47,42,0.05)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-cream-dark text-brand-orange">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 font-serif text-xl font-semibold text-brand-dark">
                  {t(`about.values.items.${key}.title`)}
                </h3>

                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  {t(`about.values.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
            {t("about.closing.eyebrow")}
          </p>

          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-brand-dark sm:text-5xl">
            {t("about.closing.title")}
          </h2>

          <p className="mx-auto mt-4 max-w-[700px] text-sm leading-7 text-brand-muted sm:text-base">
            {t("about.closing.description")}
          </p>
        </div>
      </section>
    </div>
  );
}
