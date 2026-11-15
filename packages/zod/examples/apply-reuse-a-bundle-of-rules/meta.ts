// Zod example: .apply() reuses a bundle of rules
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '.apply() reuses a bundle of rules',
  summary:
    'A small function holds the rules for a percentage (0 to 100). .apply() runs it inside the schema chain, so a discount, a battery level and a whole-number progress all share it without repeating the rules.',
  section: 'Defaults, catch and more',
  tags: ['apply', 'min', 'max', 'nullable'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
