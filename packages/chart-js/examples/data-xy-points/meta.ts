// Chart.js example: Data as x/y pairs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Data as x/y pairs',
  summary:
    'The same six plant measurements as x/y objects, as [x, y] pairs, or as a plain list. The two pair formats put each point at its true x, so uneven gaps show; a plain list spaces its labels evenly, which hides them.',
  section: 'General',
  tags: ['data', 'Object[]', 'Array[]', 'x', 'y'],
  docs: ['repo/docs/general/data-structures.md', 'repo/docs/charts/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
