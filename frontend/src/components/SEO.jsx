import { useEffect } from "react";

export default function SEO({
  title,
  description,
  path = "/",
  image = "/og-image.png",
  noIndex = false,
}) {
  useEffect(() => {
    const siteName = "Rhino Tours & Travels";
    const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

    const canonicalUrl = new URL(path, siteUrl).href;
    const imageUrl = new URL(image, siteUrl).href;

    document.title = title;

    const setMeta = (attribute, key, content) => {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    setMeta("name", "description", description);

    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta(
      "property",
      "og:image:alt",
      `${siteName} - Explore Northeast India`,
    );
    setMeta("property", "og:site_name", siteName);

    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", canonicalUrl);
  }, [title, description, path, image, noIndex]);

  return null;
}
