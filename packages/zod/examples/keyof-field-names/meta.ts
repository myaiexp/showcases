// Zod example: validate a column name against the keys of an object schema
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Allowed field names with .keyof()",
  summary:
    ".keyof() turns an object schema into an enum of its own field names. It is the quickest way to validate a \"sort by\" or \"column\" query parameter, and omitting a secret field first keeps it off the list.",
  section: 'Objects',
  tags: ['.keyof', '.omit', 'z.enum', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
