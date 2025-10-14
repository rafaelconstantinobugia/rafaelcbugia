import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAlternateUrls, getPathWithoutLocale } from "@/lib/i18n";
import { useLocale } from "@/contexts/LocaleContext";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  noindex?: boolean;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage = "https://rafaelcbugia.com/opengraph/home.png",
  ogType = "website",
  noindex = false,
}: SEOProps) {
  const { locale } = useLocale();
  const location = useLocation();
  
  // Get base path without locale
  const basePath = getPathWithoutLocale(location.pathname);
  
  // Generate alternates
  const alternates = getAlternateUrls(basePath);
  
  // Set canonical to current locale version if not provided
  const canonicalUrl = canonical || alternates[locale];

  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update html lang attribute
    document.documentElement.lang = locale;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, attribute = "name") => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("author", "Rafael Constantino Bugia");

    // Open Graph
    updateMetaTag("og:title", title, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", ogType, "property");
    updateMetaTag("og:url", canonicalUrl, "property");
    updateMetaTag("og:image", ogImage, "property");
    updateMetaTag("og:locale", locale, "property");

    // Twitter Card
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:site", "@rafaelcbugia");
    updateMetaTag("twitter:creator", "@rafaelcbugia");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", ogImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);
    
    // Remove old hreflang links
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
    
    // Add hreflang links
    Object.entries(alternates).forEach(([lang, url]) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", lang);
      link.setAttribute("href", url);
      document.head.appendChild(link);
    });

    // Robots
    if (noindex) {
      updateMetaTag("robots", "noindex, nofollow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.remove();
      }
    }
  }, [title, description, canonicalUrl, ogImage, ogType, noindex, locale, alternates]);

  return null;
}
