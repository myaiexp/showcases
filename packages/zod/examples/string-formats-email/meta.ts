// Zod example: z.email() sorts addresses into valid and invalid
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Is this an email address?',
  summary:
    'z.email() checks text against a strict, Gmail-like email pattern. Type an address, or watch a list of near misses (no @, two dots, a missing domain ending) get sorted, each failure with Zod\'s reason.',
  section: 'Strings and formats',
  tags: ['z.email', 'string formats', 'safeParse'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
