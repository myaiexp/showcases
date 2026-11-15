// force-graph example: Force engine: the center force
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Force engine: the center force',
  summary:
    'The built-in center force keeps the mean node position at the origin. In the right pane d3Force(\'center\', null) removes it: after a drag, that graph stays displaced while the left one drifts back.',
  section: 'Force engine configuration',
  tags: ['d3Force', 'forceCenter', 'onRenderFramePre', 'onRenderFramePost'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
