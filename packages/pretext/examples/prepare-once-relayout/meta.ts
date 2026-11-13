// Pretext example: prepare() once, then only layout() on every resize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prepare once, lay out on resize',
  summary:
    'Twelve paragraphs are prepared a single time; dragging the width re-runs only layout(). The readout compares the one-off prepare pass with a layout pass over all twelve.',
  section: 'Measure height',
  tags: ['prepare', 'layout', 'resize', 'performance'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
