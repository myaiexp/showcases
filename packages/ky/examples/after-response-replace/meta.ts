// ky example: after-response-replace
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'afterResponse: swap the answer',
  summary:
    'Sometimes the server speaks a format your page does not want. An afterResponse hook can return a different Response, and that is what your code receives: here a hook converts a temperature from Fahrenheit to Celsius before anyone sees it.',
  section: 'Hooks',
  tags: ['afterResponse', 'Response', 'transform'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
