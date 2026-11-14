// Chart.js example: Numbers written the local way
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Numbers written the local way',
  summary:
    'The locale option sets how axis numbers are grouped and punctuated. The same revenue and conversion figures read differently in en-US, de-DE, fi-FI, hi-IN and ar-EG.',
  section: 'Configuration',
  tags: ['locale', 'Intl', 'ticks', 'number format'],
  docs: ['repo/docs/configuration/locale.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
