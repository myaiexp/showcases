// Errors kit: a tiny hand-made translation table keyed by issue code, like the docs' t(iss.code, iss)

export type Lang = 'en' | 'de' | 'fr' | 'es';

export const LANGS: readonly Lang[] = ['en', 'de', 'fr', 'es'];

/** One template per issue code; {name} is filled from the issue's own property of that name. */
const TEMPLATES: Record<Lang, Record<string, string>> = {
  en: { invalid_type: 'Expected {expected}', too_small: 'At least {minimum} characters', invalid_format: 'Not a valid {format}' },
  de: { invalid_type: 'Erwartet: {expected}', too_small: 'Mindestens {minimum} Zeichen', invalid_format: 'Keine gültige {format}' },
  fr: { invalid_type: 'Attendu : {expected}', too_small: 'Au moins {minimum} caractères', invalid_format: '{format} invalide' },
  es: { invalid_type: 'Se esperaba {expected}', too_small: 'Al menos {minimum} caracteres', invalid_format: '{format} no válido' },
};

/** The few words that fill the templates, per language. */
const WORDS: Record<Lang, Record<string, string>> = {
  en: { number: 'number', string: 'text', email: 'email' },
  de: { number: 'Zahl', string: 'Text', email: 'E-Mail-Adresse' },
  fr: { number: 'nombre', string: 'texte', email: 'adresse e-mail' },
  es: { number: 'número', string: 'texto', email: 'correo electrónico' },
};

/** The message for an issue: its code picks the template, its other properties fill it. */
export function t(lang: Lang, code: string, props: object): string {
  const template = TEMPLATES[lang][code] ?? TEMPLATES.en[code] ?? code;
  return template.replace(/\{(\w+)\}/g, (_m, key: string) => {
    const value = String((props as Record<string, unknown>)[key]);
    return WORDS[lang][value] ?? value;
  });
}
