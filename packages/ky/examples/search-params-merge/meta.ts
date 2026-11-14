// ky example: searchParams merges with the input URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Query options add to the address',
  summary:
    'If the address you pass already has a query, Ky keeps it and adds your searchParams after it. That is handy for a saved link plus one extra filter, but a parameter that appears in both is sent twice (page=1&page=2), and the server decides which wins. Use undefined to remove one instead.',
  section: 'URLs',
  tags: ['searchParams', 'merge', 'ky.extend'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
