import { ArrowLeft, Compass } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

import mountainBg from "../assets/mountain-bg.png";

export default function NotFound() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-brand-cream px-4 py-16 sm:px-6">
      <SEO
        title="Page Not Found | Rhino Tours & Travels"
        description="The page you are looking for could not be found."
        path={location.pathname}
        noIndex
      />

      <img
        src={mountainBg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[520px] opacity-[0.08] sm:w-[700px] lg:w-[900px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1380px]">
        <div className="mx-auto max-w-[720px] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EFEA] text-brand-green">
            <Compass size={28} strokeWidth={1.7} aria-hidden="true" />
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange">
            {t("notFound.eyebrow")}
          </p>

          <p
            aria-hidden="true"
            className="mt-3 font-serif text-[90px] font-semibold leading-none text-brand-dark sm:text-[120px] lg:text-[150px]"
          >
            404
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
            {t("notFound.title")}
          </h1>

          <p className="mx-auto mt-4 max-w-[580px] text-sm leading-7 text-brand-muted sm:text-base">
            {t("notFound.description")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-semibold text-white transition hover:bg-brand-orange-dark hover:shadow-md sm:w-auto"
            >
              <ArrowLeft size={16} strokeWidth={1.8} aria-hidden="true" />
              {t("notFound.home")}
            </Link>

            <Link
              to="/destinations"
              className="inline-flex h-12 w-full items-center justify-center rounded-full border border-brand-green px-7 text-sm font-semibold text-brand-green transition hover:bg-brand-green hover:text-white sm:w-auto"
            >
              {t("notFound.destinations")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
