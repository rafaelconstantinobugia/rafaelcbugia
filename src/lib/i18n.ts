// i18n Configuration and Utilities

export const LOCALES = ['pt-PT', 'en', 'es'] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'pt-PT';

export const LOCALE_NAMES: Record<Locale, string> = {
  'pt-PT': 'PT',
  'en': 'EN',
  'es': 'ES',
};

export const LOCALE_FULL_NAMES: Record<Locale, string> = {
  'pt-PT': 'Português',
  'en': 'English',
  'es': 'Español',
};

// Cookie name for language preference
export const LANG_COOKIE = 'rcb_lang';

// Get locale from pathname
export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (firstSegment === 'en' || firstSegment === 'es') {
    return firstSegment;
  }
  
  return DEFAULT_LOCALE;
}

// Get path without locale prefix
export function getPathWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale === DEFAULT_LOCALE) return pathname;
  
  return pathname.replace(`/${locale}`, '') || '/';
}

// Add locale prefix to path
export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  
  // Remove trailing slash
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  
  return `/${locale}${cleanPath}`;
}

// Detect browser language
export function detectBrowserLanguage(): Locale | null {
  if (typeof window === 'undefined') return null;
  
  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  if (browserLang.startsWith('en')) return 'en';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('pt')) return 'pt-PT';
  
  return null;
}

// Get stored language preference
export function getStoredLanguage(): Locale | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(LANG_COOKIE);
  if (stored && LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }
  
  return null;
}

// Set language preference
export function setStoredLanguage(locale: Locale): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANG_COOKIE, locale);
}

// Slug translations (will be extended via CMS)
export const SLUG_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  '/': {
    'pt-PT': '/',
    'en': '/en',
    'es': '/es',
  },
  '/bio': {
    'pt-PT': '/bio',
    'en': '/en/bio',
    'es': '/es/bio',
  },
  '/projectos': {
    'pt-PT': '/projectos',
    'en': '/en/projects',
    'es': '/es/proyectos',
  },
  '/media': {
    'pt-PT': '/media',
    'en': '/en/media',
    'es': '/es/media',
  },
  '/contacto': {
    'pt-PT': '/contacto',
    'en': '/en/contact',
    'es': '/es/contacto',
  },
  '/kitdigital': {
    'pt-PT': '/kitdigital',
    'en': '/en/kitdigital',
    'es': '/es/kitdigital',
  },
};

// Get translated slug
export function getTranslatedSlug(basePath: string, locale: Locale): string {
  const translations = SLUG_TRANSLATIONS[basePath];
  if (translations && translations[locale]) {
    return translations[locale];
  }
  
  return getLocalizedPath(basePath, locale);
}

// Get all alternate URLs for a path
export function getAlternateUrls(basePath: string, baseUrl: string = 'https://rafaelcbugia.com'): Record<Locale | 'x-default', string> {
  const alternates: Record<string, string> = {};
  
  LOCALES.forEach(locale => {
    const translatedPath = getTranslatedSlug(basePath, locale);
    alternates[locale] = `${baseUrl}${translatedPath}`;
  });
  
  // x-default points to pt-PT
  alternates['x-default'] = alternates['pt-PT'];
  
  return alternates;
}
