// ky example: parseJson with a reviver revives dates
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dates that arrive as real dates',
  summary:
    'JSON has no date type, so a time arrives as plain text that cannot be sorted or added to. Give Ky a parseJson function that calls JSON.parse with a reviver and chosen text turns into Date objects as it is read. Switch the rule to see how a loose one catches a promo code by mistake.',
  section: 'JSON',
  tags: ['parseJson', 'reviver', 'JSON.parse', 'Date'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
