// force-graph example: Force engine: warmupTicks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: warmupTicks',
  summary:
    'warmupTicks runs that many layout ticks before the first frame. Two panes load the same data: the left unfolds from a heap, the right with warmupTicks(200) shows an almost settled graph at once.',
  section: 'Force engine configuration',
  tags: ['warmupTicks', 'graphData', 'cooldownTime'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
