import { browser } from '$app/environment';
import { derived, writable } from "svelte/store";
import translations from "./translations";

const defaultLocale = "en"
const initialLocale = browser ? window.localStorage.getItem("locale") ?? defaultLocale : defaultLocale
export const locale = writable<string>(initialLocale);
export const locales = Object.keys(translations);

locale.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("locale", value);
  }
});

function translate(locale: string, key: string, vars: Record<string, string> = {}) {
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // @ts-expect-error required
  let text = translations[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key: string, vars = {}) =>
  translate($locale, key, vars)
);
