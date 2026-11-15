// Zod example: optional vs nullable vs nullish on the same inputs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Optional, nullable, nullish: who accepts what',
  summary:
    "The same four values go through one schema wrapped three ways. optional() lets undefined in, nullable() lets null in, nullish() lets in both. A wrong type, like the word vader or the number 42, is still rejected by all three.",
  section: 'Optional and nullable',
  tags: ['z.optional', 'z.nullable', 'z.nullish', 'z.literal'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
