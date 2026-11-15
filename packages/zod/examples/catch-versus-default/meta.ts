// Zod example: Catch is for wrong, default is for missing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Catch is for wrong, default is for missing',
  summary:
    'Three schemas get a missing value, a wrong value and a good one. A default fixes only the missing one, a catch fixes only the wrong one (a missing value counts as wrong), and both together cover everything.',
  section: 'Defaults, catch and more',
  tags: ['catch', 'default'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
