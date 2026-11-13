// mermaid example: Quadrant chart with drifting points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quadrant chart with drifting points',
  summary:
    'A prioritisation quadrant whose points move on a timer; each step rewrites the point coordinates and re-renders. Pause to inspect, or step by hand.',
  section: 'Quadrant Chart',
  tags: ['quadrantChart', 'points', 'live', 'timer'],
  docs: ['repo/packages/mermaid/src/docs/syntax/quadrantChart.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
