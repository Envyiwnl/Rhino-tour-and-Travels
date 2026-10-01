import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import SEO from "../components/SEO";

export default function TermsConditions() {
  const { t } = useTranslation();

  const sections = t("terms.sections", {
    returnObjects: true,
  });

  return (
    <>
      <SEO
        title="Terms & Conditions | Rhino Tours & Travels"
        description="Read the Terms and Conditions for using the Rhino Tours & Travels website, enquiry services, accounts, reviews and travel information."
        path="/terms"
      />

      <section
        aria-labelledby="terms-title"
        className="bg-brand-cream px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-10 text-center sm:mb-12">
            <div
              aria-hidden="true"
              className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange"
            >
              <FileText size={22} strokeWidth={1.8} />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
              {t("terms.eyebrow")}
            </p>

            <h1
              id="terms-title"
              className="mt-3 font-serif text-4xl font-semibold leading-tight text-brand-dark sm:text-5xl"
            >
              {t("terms.title")}
            </h1>

            <p className="mx-auto mt-4 max-w-[700px] text-sm leading-7 text-brand-muted sm:text-base">
              {t("terms.intro")}
            </p>

            <p className="mt-3 text-xs text-brand-muted">
              {t("terms.lastUpdated")}
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <section
                key={section.title}
                aria-labelledby={`terms-section-${index}`}
                className="rounded-[24px] border border-brand-border bg-white p-5 shadow-sm sm:p-7"
              >
                <h2
                  id={`terms-section-${index}`}
                  className="font-serif text-2xl font-semibold text-brand-dark"
                >
                  {section.title}
                </h2>

                <div className="mt-4 space-y-3">
                  {section.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-sm leading-7 text-brand-muted sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {section.items?.length > 0 && (
                    <ul className="space-y-2 pl-5 text-sm leading-7 text-brand-muted sm:text-[15px]">
                      {section.items.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] bg-[#E8EFE9] p-5 sm:p-7">
            <h2 className="font-serif text-2xl font-semibold text-brand-dark">
              {t("terms.contact.title")}
            </h2>

            <p className="mt-3 text-sm leading-7 text-brand-muted sm:text-[15px]">
              {t("terms.contact.description")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
