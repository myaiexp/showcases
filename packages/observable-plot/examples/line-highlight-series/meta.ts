// observable-plot example: Line: highlighting series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: highlighting series',
  summary:
    'Michigan metro lines in red against grey for the rest, using a boolean stroke and a two-colour range. The sort option draws the red series last so it sits on top.',
  section: 'Mark: Line',
  tags: ['line', 'stroke', 'sort', 'z', 'color'],
  docs: ['repo/docs/marks/line.md', 'repo/docs/transforms/sort.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
