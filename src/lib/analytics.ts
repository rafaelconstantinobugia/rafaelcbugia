// Google Analytics 4 Helper
// Only fires events after user consent

import type { Locale } from './i18n';

interface GAEvent {
  event: string;
  [key: string]: any;
}

export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  (window as any).gtag = gtag;
};

export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined' || !(window as any).gtag) return;

  // Check if user has given analytics consent
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) return;

  const consentData = JSON.parse(consent);
  if (!consentData.analytics) return;

  // Get current locale from document
  const locale = document.documentElement.lang || 'pt-PT';

  // Add language to all events
  const eventParams = {
    ...params,
    page_language: locale,
  };

  (window as any).gtag('event', eventName, eventParams);
};

// Predefined event helpers
export const analytics = {
  // CTA events
  ctaHomeProjectosClick: () => trackEvent('cta_home_projectos_click'),
  ctaHomeContactoClick: () => trackEvent('cta_home_contacto_click'),
  kitDigitalCtaClick: () => trackEvent('kitdigital_cta_click'),
  
  // Form events
  newsletterSubmitted: (email: string) => trackEvent('newsletter_submitted', { email_domain: email.split('@')[1] }),
  contactFormSubmitted: () => trackEvent('contact_form_submitted'),
  
  // Book pre-reservation
  track: (eventName: string, params?: Record<string, any>) => trackEvent(eventName, params),
  
  // Downloads
  pressKitDownload: () => trackEvent('presskit_download'),
  
  // Language switching
  languageChanged: (from: Locale, to: Locale) => trackEvent('language_changed', { from_language: from, to_language: to }),
};

// TypeScript declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
