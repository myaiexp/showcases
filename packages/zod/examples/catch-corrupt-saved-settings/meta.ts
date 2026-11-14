// Zod example: Replace a bad value instead of failing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Replace a bad value instead of failing',
  summary:
    'A saved settings file is partly corrupted. Without .catch() the whole file is rejected; with a fallback on the damaged fields it loads, the bad values are swapped for safe ones, and the good ones stay.',
  section: 'Defaults, catch and more',
  tags: ['catch', 'z.object'],
  docs: ['repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});
