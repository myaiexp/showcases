// Zod example: Trim and change case
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Trim and change case',
  summary:
    'Zod can clean text on the way through: .trim() strips stray spaces, .toLowerCase() and .toUpperCase() change the case. The output marks what changed from what you sent in.',
  section: 'Strings and formats',
  tags: ['.trim', '.toLowerCase', '.toUpperCase'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
