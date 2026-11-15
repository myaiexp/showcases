// vega example: Locale: Combined Locale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Locale: Combined Locales per View',
  summary:
    'Two views side by side, each constructed with its own vega.locale object through the View locale option: English on the left, and on the right a German, French or half-default locale you pick, with the locale methods called directly under each chart.',
  section: 'Locale',
  tags: ['locale.locale', 'locale.defaultLocale', 'view.locale'],
  docs: ['repo/docs/docs/api/locale.md', 'repo/docs/docs/api/view.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
