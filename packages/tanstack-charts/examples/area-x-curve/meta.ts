// tanstack-charts example: areaX with d3AreaXCurve
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'areaX with d3AreaXCurve',
  summary:
    'A horizontal area needs the separate d3AreaXCurve bridge instead of d3Curve, because its path runs along y. A smooth basis curve rounds the temperature range band; the select compares it with the straight version.',
  section: 'Line and Area Marks',
  tags: ['areaX', 'curve', 'd3AreaXCurve'],
  docs: ['repo/docs/reference/marks/line-and-area.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
