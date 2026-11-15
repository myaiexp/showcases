// cosmos-gl example: Manual step
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Manual step',
  summary:
    'step() runs exactly one simulation tick, even while the simulation is paused. The layout is paused, then advanced one tick per click, or ten at a time, so you can watch the graph unfold at your own pace.',
  section: 'Simulation control',
  tags: ['step', 'pause', 'start'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
