// Chart.js example: A chart that follows its box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A chart that follows its box',
  summary:
    'The chart redraws whenever its container changes size. Drag the width slider or press Animate to resize the box, watch onResize report the new size, and add resizeDelay to wait until the resizing settles.',
  section: 'Configuration',
  tags: ['responsive', 'onResize', 'resizeDelay', 'resize'],
  docs: ['repo/docs/configuration/responsive.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
