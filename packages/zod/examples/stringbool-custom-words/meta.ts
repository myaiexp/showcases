// Zod example: z.stringbool with custom truthy and falsy lists
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Your own yes and no words',
  summary:
    "A form in another language sends si and nada, not yes and no. Giving z.stringbool() its own truthy and falsy lists replaces the defaults entirely, so the English words stop working unless you list them.",
  section: 'Numbers, dates and enums',
  tags: ['z.stringbool', 'truthy', 'falsy'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
