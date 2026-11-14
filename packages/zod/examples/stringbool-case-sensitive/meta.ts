// Zod example: z.stringbool case-insensitive by default, case: sensitive option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Case matters, if you ask for it',
  summary:
    "By default z.stringbool() lowercases the text before comparing, so TRUE and True count. Passing case: sensitive makes it compare exactly, and only the spellings in the lists are accepted.",
  section: 'Numbers, dates and enums',
  tags: ['z.stringbool', 'case'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
