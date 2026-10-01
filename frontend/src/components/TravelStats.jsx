import { Leaf, Mountain, ShieldCheck, UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import mountainDecoration from "../assets/mountain-bg.png";

const stats = [
  {
    key: "travelers",
    icon: UsersRound,
    iconClass: "text-brand-orange",
  },
  {
    key: "destinations",
    icon: Mountain,
    iconClass: "text-brand-orange",
  },
  {
    key: "experience",
    icon: ShieldCheck,
    iconClass: "text-brand-orange",
  },
  {
    key: "sustainable",
    icon: Leaf,
    iconClass: "text-[#527443]",
  },
];

export default function TravelStats() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden border-y border-brand-border/60 bg-[#F5F1E8] px-4 py-7 sm:px-6 lg:py-8">
      <img
        src={mountainDecoration}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-0 hidden w-[420px] opacity-45 lg:block xl:w-[520px]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1380px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {stats.map(({ key, icon: Icon, iconClass }, index) => (
          <div
            key={key}
            className={`flex items-center gap-4 px-2 sm:px-5 lg:px-8 ${
              index !== 0 ? "lg:border-l lg:border-brand-border" : ""
            }`}
          >
            <Icon
              size={38}
              strokeWidth={1.8}
              className={`shrink-0 ${iconClass}`}
              aria-hidden="true"
            />

            <div>
              <p className="font-serif text-[24px] font-semibold leading-none text-brand-dark">
                {t(`stats.${key}.value`)}
              </p>

              <p className="mt-1 text-sm text-brand-muted">
                {t(`stats.${key}.label`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
