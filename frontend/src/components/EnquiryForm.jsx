import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Mail,
  MapPin,
  Mountain,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import enquiryDecoration from "../assets/enquiry_leaf.png";

const initialForm = {
  tripType: "",
  destination: "",
  startDate: "",
  endDate: "",
  travellers: "2",
  name: "",
  email: "",
  phone: "",
  message: "",
  whatsappConsent: false,
};

export default function EnquiryForm() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/enquiries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit enquiry.");
      }

      setSuccess(t("enquiry.submitSuccess"));
      setFormData(initialForm);
    } catch (error) {
      console.error(error);
      setError(t("enquiry.submitError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      aria-labelledby="enquiry-title"
      className="relative z-20 -mt-10 px-4 sm:-mt-12 sm:px-6 lg:-mt-14"
    >
      <div className="mx-auto max-w-[1380px] overflow-hidden rounded-[28px] border border-brand-border/60 bg-[#FAF8F2] shadow-[0_18px_50px_rgba(11,47,42,0.12)]">
        <div className="grid lg:grid-cols-[300px_1fr] xl:grid-cols-[320px_1fr]">
          <div className="relative min-h-[220px] overflow-hidden border-b border-brand-border/50 px-7 py-8 sm:px-9 lg:min-h-full lg:border-b-0 lg:border-r">
            <img
              src={enquiryDecoration}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -left-2 w-[300px] opacity-90 sm:w-[340px] lg:-left-4 lg:w-[360px]"
            />

            <div className="relative z-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand-orange">
                {t("enquiry.eyebrow")}
              </p>

              <h2
                id="enquiry-title"
                className="max-w-[230px] font-serif text-4xl font-semibold leading-[0.95] text-brand-green lg:text-[42px]"
              >
                {t("enquiry.title")}
              </h2>

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                {t("enquiry.freeEnquiry")}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            aria-labelledby="enquiry-title"
            className="p-5 sm:p-7 lg:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label
                  htmlFor="enquiry-trip-type"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.tripType")}
                </label>

                <div className="relative">
                  <Mountain
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <select
                    id="enquiry-trip-type"
                    name="tripType"
                    value={formData.tripType}
                    onChange={handleChange}
                    required
                    className="h-12 w-full appearance-none rounded-xl border border-brand-border bg-white pl-10 pr-4 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  >
                    <option value="">{t("enquiry.tripTypePlaceholder")}</option>

                    <option value="leisure">
                      {t("enquiry.tripTypes.leisure")}
                    </option>

                    <option value="adventure">
                      {t("enquiry.tripTypes.adventure")}
                    </option>

                    <option value="wildlife">
                      {t("enquiry.tripTypes.wildlife")}
                    </option>

                    <option value="cultural">
                      {t("enquiry.tripTypes.cultural")}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-destination"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.destination")}
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <select
                    id="enquiry-destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="h-12 w-full appearance-none rounded-xl border border-brand-border bg-white pl-10 pr-4 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  >
                    <option value="">
                      {t("enquiry.destinationPlaceholder")}
                    </option>

                    <option value="assam">
                      {t("enquiry.destinations.assam")}
                    </option>

                    <option value="meghalaya">
                      {t("enquiry.destinations.meghalaya")}
                    </option>

                    <option value="arunachal-pradesh">
                      {t("enquiry.destinations.arunachalPradesh")}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-start-date"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.startDate")}
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="enquiry-start-date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-white pl-10 pr-3 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-end-date"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.endDate")}
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="enquiry-end-date"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    min={
                      formData.startDate ||
                      new Date().toISOString().split("T")[0]
                    }
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-white pl-10 pr-3 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10 [&::-webkit-calendar-picker-indicator]:opacity-0"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div>
                <label
                  htmlFor="enquiry-travellers"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.travellers")}
                </label>

                <div className="relative">
                  <Users
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <select
                    id="enquiry-travellers"
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleChange}
                    className="h-12 w-full appearance-none rounded-xl border border-brand-border bg-white pl-10 pr-4 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                      <option key={number} value={number}>
                        {t("enquiry.travellerCount", { count: number })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-name"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.name")}
                </label>

                <div className="relative">
                  <User
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="enquiry-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("enquiry.namePlaceholder")}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-white pl-10 pr-3 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-email"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.email")}
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="enquiry-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("enquiry.emailPlaceholder")}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-white pl-10 pr-3 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry-phone"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.phone")}
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted"
                  />

                  <input
                    id="enquiry-phone"
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("enquiry.phonePlaceholder")}
                    required
                    className="h-12 w-full rounded-xl border border-brand-border bg-white pl-10 pr-3 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_auto]">
              <div>
                <label
                  htmlFor="enquiry-message"
                  className="mb-2 block text-xs font-semibold text-brand-dark"
                >
                  {t("enquiry.message")}
                </label>

                <div className="relative">
                  <MessageSquare
                    size={17}
                    aria-hidden="true"
                    className="absolute left-3.5 top-4 text-brand-muted"
                  />

                  <textarea
                    id="enquiry-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("enquiry.messagePlaceholder")}
                    rows={3}
                    className="w-full resize-none rounded-xl border border-brand-border bg-white py-3 pl-10 pr-4 text-sm text-brand-dark transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-end gap-3 xl:w-[220px]">
                <label
                  htmlFor="whatsapp-consent"
                  className="flex cursor-pointer items-start gap-2"
                >
                  <input
                    id="whatsapp-consent"
                    type="checkbox"
                    name="whatsappConsent"
                    checked={formData.whatsappConsent}
                    onChange={handleChange}
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-brand-green"
                  />

                  <FaWhatsapp
                    size={15}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-[#25D366]"
                  />

                  <span className="text-[11px] leading-4 text-brand-muted">
                    {t("enquiry.whatsappConsent")}
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-brand-orange px-7 text-sm font-semibold text-white transition hover:bg-brand-orange-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && (
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                  )}

                  {t("enquiry.submit")}

                  {!loading && <ArrowRight size={18} aria-hidden="true" />}
                </button>
              </div>
            </div>

            {success && (
              <p
                role="status"
                aria-live="polite"
                className="mt-4 text-center text-sm font-medium text-brand-green"
              >
                {success}
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="mt-4 text-center text-sm font-medium text-red-500"
              >
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
