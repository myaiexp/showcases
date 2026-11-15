// cosmos-gl example: Ready
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Ready',
  summary:
    'Setters and render() may be called right after new Graph(): they queue until the device is up. graph.ready resolves, and graph.isReady turns true, once the graph is initialised, and only then do reads such as getPointPositions() return data. The log shows the order, with times.',
  section: 'Simulation control',
  tags: ['ready', 'isReady', 'render', 'getPointPositions'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx', 'repo/history/2026/2026-09-17-init-readiness.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
