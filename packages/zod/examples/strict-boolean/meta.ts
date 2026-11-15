// Zod example: z.boolean accepts only true and false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'z.boolean() is strict',
  summary:
    "A checkbox sends true or false, but a query string or a config file sends text. z.boolean() only accepts the real booleans: the text 'true', the number 1 and 'yes' are all rejected rather than guessed at.",
  section: 'Numbers, dates and enums',
  tags: ['z.boolean'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
