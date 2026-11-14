// observable-plot example: Stack: order methods
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stack: order methods',
  summary:
    'Recording revenue stacked as areas. Pick the order option (null, appearance, inside-out, sum, group, z) to see how layers are arranged.',
  section: 'Transform: Stack',
  tags: ['areaY', 'stackY', 'order'],
  docs: ['repo/docs/transforms/stack.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
