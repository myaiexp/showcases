// g6 example: Edge state with a halo
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edge state with a halo',
  summary:
    'A custom focus state in edge.state adds an orange halo. One edge starts in it from its data; the full view toggles it on click.',
  section: 'Edge',
  tags: ['edge.state', 'halo', 'states', 'setElementState'],
  docs: [
    'repo/packages/site/docs/manual/element/edge/BaseEdge.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
