// vega example: Locale: Time Format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Locale: Time Formats',
  summary:
    'One line chart and a list of date formats rendered under English, French, German and Spanish time locales: the axis labels and the weekday and month names switch with timeFormatLocale.',
  section: 'Locale',
  tags: ['locale.timeFormatLocale', 'locale.resetDefaultLocale', 'expression.timeFormat', 'scale.type'],
  docs: ['repo/docs/docs/api/locale.md', 'repo/docs/docs/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
