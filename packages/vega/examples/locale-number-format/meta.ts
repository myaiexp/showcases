// vega example: Locale: Number Format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Locale: Number Formats',
  summary:
    'The same sales bars and six format specifiers rendered under four number locales (US, German, French, Swiss): decimal marks, thousands separators and currency symbols change with the formatLocale definition.',
  section: 'Locale',
  tags: ['locale.formatLocale', 'locale.resetDefaultLocale', 'axis.format', 'expression.format'],
  docs: ['repo/docs/docs/api/locale.md', 'repo/docs/docs/api/view.md', 'repo/docs/docs/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
