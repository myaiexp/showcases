// g6 example: Line edge in each built-in state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line edge in each built-in state',
  summary:
    'Line edges in the active, selected, highlight and inactive states, with label, arrow and badge, on a radial layout. A select applies one state to every edge.',
  section: 'Edge',
  tags: ['line', 'active', 'selected', 'highlight', 'inactive', 'radial'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/Line.en.md',
    'repo/packages/site/common/api/elements/edges/line.md',
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
