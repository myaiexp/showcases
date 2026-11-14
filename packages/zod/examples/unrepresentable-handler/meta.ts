// Zod example: a function handles unrepresentable types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'unrepresentable as a function',
  summary:
    'A handler decides case by case: turn a Date into a date-time string, and refuse the rest in your own words with the path of the culprit. Compared with the default and with "any" on the same schema.',
  section: 'JSON Schema',
  tags: ['z.toJSONSchema', 'unrepresentable', 'z.date', 'z.bigint', '.omit()'],
  docs: ['repo/packages/docs/content/json-schema.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
