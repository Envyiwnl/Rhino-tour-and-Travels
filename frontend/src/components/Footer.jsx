import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import logo from "../assets/rhino_logo.png";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-[1380px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-8">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              <img src={logo} alt="" className="h-16 w-16 object-contain" />

              <div>
                <p className="font-serif text-xl font-semibold leading-tight text-white">
                  Rhino Tours & Travels
                </p>

                <p className="mt-1 text-xs tracking-[0.16em] text-white/55">
                  EXPLORE NORTHEAST INDIA
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-[330px] text-sm leading-6 text-white/65">
              {t("footer.description")}
            </p>

            <div
              aria-label="Social media"
              className="mt-6 flex items-center gap-3"
            >
              <a
                href="https://www.instagram.com/travels.rhino?stkn=NXdiY2IweGNiOWtl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <FaInstagram size={17} aria-hidden="true" />
              </a>

              <a
                href="https://www.facebook.com/share/1LgJKPnK95/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-orange hover:bg-brand-orange hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <FaFacebookF size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-labelledby="footer-quick-links">
            <h3
              id="footer-quick-links"
              className="font-serif text-lg font-semibold text-white"
            >
              {t("footer.quickLinks")}
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <Link
                to="/"
                className="transition hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange"
              >
                {t("navbar.home")}
              </Link>

              <Link
                to="/about"
                className="transition hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange"
              >
                {t("navbar.about")}
              </Link>

              <Link
                to="/destinations"
                className="transition hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange"
              >
                {t("navbar.destinations")}
              </Link>
            </div>
          </nav>

          <nav aria-labelledby="footer-explore">
            <h3
              id="footer-explore"
              className="font-serif text-lg font-semibold text-white"
            >
              {t("footer.explore")}
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/65">
              <Link
                to="/destinations?search=assam"
                className="transition hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange"
              >
                {t("enquiry.destinations.assam")}
              </Link>

              <Link
                to="/destinations?search=meghalaya"
                className="transition hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange"
              >
                {t("enquiry.destinations.meghalaya")}
              </Link>

              <Link
                to="/destinations?search=arunachal-pradesh"
                className="transition hover:text-brand-orange focus-visible:outline-none focus-visible:text-brand-orange"
              >
                {t("enquiry.destinations.arunachalPradesh")}
              </Link>
            </div>
          </nav>

          <div>
            <h3 className="font-serif text-lg font-semibold text-white">
              {t("footer.contact")}
            </h3>

            <address className="mt-5 space-y-4 text-sm not-italic text-white/65">
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-brand-orange"
                />

                <span>{t("footer.address")}</span>
              </div>

              <a
                href="tel:+919854699300"
                className="flex items-center gap-3 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
              >
                <Phone
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-brand-orange"
                />

                <span>+91 9854699300</span>
              </a>

              <a
                href="mailto:info@rhinotoursandtravels.com"
                className="flex items-center gap-3 transition hover:text-white focus-visible:outline-none focus-visible:text-white"
              >
                <Mail
                  size={17}
                  aria-hidden="true"
                  className="shrink-0 text-brand-orange"
                />

                <span className="break-all">rhinotoursandtravel@gmail.com</span>
              </a>
            </address>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-orange transition hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            >
              {t("footer.contactUs")}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-3 px-4 py-5 text-xs text-white/45 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Rhino Tours & Travels.
            {t("footer.rights")}
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              {t("footer.privacy")}
            </Link>

            <Link
              to="/terms"
              className="transition hover:text-white focus-visible:outline-none focus-visible:text-white"
            >
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
