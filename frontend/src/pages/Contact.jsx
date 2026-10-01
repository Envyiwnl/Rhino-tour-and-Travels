import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  Send,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import mountainBg from "../assets/mountain-bg.png";
import enquiryLeaf from "../assets/enquiry_leaf.png";
import SEO from "../components/SEO";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setSubmitStatus({
        type: "",
        message: "",
      });

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setForm(initialForm);

      setSubmitStatus({
        type: "success",
        message: t("contact.form.success"),
      });
    } catch (error) {
      console.error("Contact form failed:", error);

      setSubmitStatus({
        type: "error",
        message: t("contact.form.error"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: Phone,
      title: t("contact.info.phone.title"),
      description: t("contact.info.phone.description"),
      value: t("contact.info.pending"),
    },
    {
      icon: Mail,
      title: t("contact.info.email.title"),
      description: t("contact.info.email.description"),
      value: t("contact.info.pending"),
    },
    {
      icon: MapPin,
      title: t("contact.info.office.title"),
      description: t("contact.info.office.description"),
      value: t("contact.info.pending"),
    },
  ];

  return (
    <div className="overflow-hidden bg-brand-cream">
      <SEO
        title="Contact Rhino Tours & Travels | Plan Your Northeast India Trip"
        description="Contact Rhino Tours & Travels to plan your journey across Assam, Meghalaya, Arunachal Pradesh and Northeast India."
        path="/contact"
      />
      <section className="relative border-b border-brand-border/60 bg-[#F2EEE5] px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <img
          src={mountainBg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-[420px] opacity-[0.08] sm:w-[560px] lg:w-[720px]"
        />

        <div className="relative z-10 mx-auto max-w-[1380px]">
          <div className="max-w-[760px]">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-orange">
                {t("contact.hero.eyebrow")}
              </p>
              <span className="h-[2px] w-9 bg-brand-orange" />
            </div>

            <h1 className="max-w-[700px] font-serif text-4xl font-semibold leading-[1.08] text-brand-dark sm:text-5xl lg:text-6xl">
              {t("contact.hero.title")}
            </h1>

            <p className="mt-5 max-w-[650px] text-sm leading-7 text-brand-muted sm:text-base">
              {t("contact.hero.description")}
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
        <img
          src={enquiryLeaf}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -left-12 hidden w-[280px] opacity-40 lg:block"
        />

        <div className="relative z-10 mx-auto grid max-w-[1380px] gap-7 lg:grid-cols-[0.8fr_1.2fr] xl:gap-10">
          <div className="rounded-[28px] bg-[#E9EFEA] p-6 sm:p-8 lg:p-9">
            <div className="max-w-[480px]">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
                {t("contact.info.eyebrow")}
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
                {t("contact.info.title")}
              </h2>

              <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
                {t("contact.info.description")}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-brand-border/60 bg-white/70 p-4 sm:p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                      <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-semibold text-brand-dark">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-brand-muted">
                        {item.description}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-brand-green">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex gap-4 rounded-2xl bg-brand-green p-5 text-white sm:p-6">
              <Clock3
                size={21}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />

              <div>
                <h3 className="font-serif text-lg font-semibold">
                  {t("contact.hours.title")}
                </h3>

                <p className="mt-1 text-sm leading-6 text-white/75">
                  {t("contact.hours.description")}
                </p>
              </div>
            </div>
          </div>

          <div
            id="contact-form"
            className="scroll-mt-24 rounded-[28px] border border-brand-border/70 bg-white p-6 shadow-[0_10px_30px_rgba(11,47,42,0.06)] sm:p-8 lg:p-9"
          >
            <div className="mb-7">
              <div className="mb-3 flex items-center gap-3">
                <MessageCircleMore
                  size={18}
                  strokeWidth={1.8}
                  className="text-brand-orange"
                  aria-hidden="true"
                />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
                  {t("contact.form.eyebrow")}
                </p>
              </div>

              <h2
                id="contact-form-title"
                className="font-serif text-3xl font-semibold text-brand-dark sm:text-4xl"
              >
                {t("contact.form.title")}
              </h2>

              <p className="mt-3 max-w-[650px] text-sm leading-7 text-brand-muted">
                {t("contact.form.description")}
              </p>
            </div>

            <form
              aria-labelledby="contact-form-title"
              onSubmit={handleSubmit}
              className="grid gap-5 sm:grid-cols-2"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  {t("contact.form.name")}
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.namePlaceholder")}
                  className="h-12 w-full rounded-xl border border-brand-border bg-[#FCFBF8] px-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  {t("contact.form.email")}
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="h-12 w-full rounded-xl border border-brand-border bg-[#FCFBF8] px-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  {t("contact.form.phone")}
                </label>

                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[0-9+() -]{7,20}"
                  maxLength={20}
                  title="Enter a valid phone number"
                  placeholder={t("contact.form.phonePlaceholder")}
                  className="h-12 w-full rounded-xl border border-brand-border bg-[#FCFBF8] px-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  {t("contact.form.subject")}
                </label>

                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-brand-border bg-[#FCFBF8] px-4 text-sm text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                >
                  <option value="">
                    {t("contact.form.subjectPlaceholder")}
                  </option>

                  <option value="general">
                    {t("contact.form.subjects.general")}
                  </option>

                  <option value="trip">
                    {t("contact.form.subjects.trip")}
                  </option>

                  <option value="booking">
                    {t("contact.form.subjects.booking")}
                  </option>

                  <option value="feedback">
                    {t("contact.form.subjects.feedback")}
                  </option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-brand-dark"
                >
                  {t("contact.form.message")}
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="w-full resize-none rounded-xl border border-brand-border bg-[#FCFBF8] px-4 py-3 text-sm leading-6 text-brand-dark outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/10"
                />
              </div>

              <div className="sm:col-span-2">
                {submitStatus.message && (
                  <p
                    role={submitStatus.type === "error" ? "alert" : "status"}
                    aria-live={
                      submitStatus.type === "success" ? "polite" : undefined
                    }
                    className={`text-sm ${
                      submitStatus.type === "success"
                        ? "text-brand-green"
                        : "text-red-500"
                    }`}
                  >
                    {submitStatus.message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-7 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-orange-dark hover:shadow-md sm:w-auto"
                >
                  {submitting
                    ? t("contact.form.sending")
                    : t("contact.form.submit")}

                  {!submitting && (
                    <Send size={16} strokeWidth={1.8} aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:pb-24">
        <div className="mx-auto flex max-w-[1380px] flex-col items-start justify-between gap-6 rounded-[28px] bg-[#E9EFEA] px-6 py-9 sm:px-9 lg:flex-row lg:items-center lg:px-12 lg:py-10">
          <div className="max-w-[720px]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
              {t("contact.cta.eyebrow")}
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-brand-dark sm:text-4xl">
              {t("contact.cta.title")}
            </h2>

            <p className="mt-3 text-sm leading-7 text-brand-muted sm:text-base">
              {t("contact.cta.description")}
            </p>
          </div>

          <a
            href="#contact-form"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-orange-dark"
          >
            {t("contact.cta.button")}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
