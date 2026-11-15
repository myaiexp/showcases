// cosmos-gl example: On-demand rendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'On-demand rendering',
  summary:
    'cosmos.gl only draws when something can change: while the layout runs, during a zoom or a hover, or after a data or config change. Once a small layout settles the counter of GPU passes drops to zero, and start() or zoom() brings frames back. showFPSMonitor keeps the loop running, so turning it on stops the idling.',
  section: 'Performance',
  tags: ['start', 'zoom', 'showFPSMonitor', 'simulationDecay', 'setConfigPartial'],
  docs: ['repo/history/2026/2026-07-07-on-demand-rendering.md', 'repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
