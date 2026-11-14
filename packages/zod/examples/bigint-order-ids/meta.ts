// Zod example: z.bigint takes only bigints and range-checks them
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bigints: ids too big for a number',
  summary:
    "Numbers lose exactness past 9007199254740991, so a 19-digit order id has to travel as a bigint. z.bigint() takes only real bigints (a number or a string is rejected) and offers the same range rules as numbers: gte, multipleOf and the rest.",
  section: 'Numbers, dates and enums',
  tags: ['z.bigint', 'gte', 'lt', 'multipleOf', 'positive'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
