// echarts example: Coarse pointer snapping
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Coarse pointer snapping',
  summary:
    'Two charts of tiny points side by side, one initialised with useCoarsePointer: true and a pointerSize radius: hovering near a point picks it there but not on the exact chart.',
  section: 'Interaction',
  tags: ['useCoarsePointer', 'pointerSize', 'echarts.init'],
  docs: ['repo/contents/en/how-to/interaction/coarse-pointer.md', 'repo/en/api/echarts.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
