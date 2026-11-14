// g6 example: Scroll canvas: onFinish and preventDefault
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scroll canvas: onFinish and preventDefault',
  summary: 'onFinish runs when a burst of scrolling ends; preventDefault decides whether the page may also scroll under the graph. The card sends bursts of wheel events and counts them.',
  section: 'Behavior',
  tags: ['scroll-canvas', 'onFinish', 'preventDefault'],
  docs: ['repo/packages/site/docs/manual/behavior/ScrollCanvas.en.md', 'repo/packages/site/common/api/behaviors/scroll-canvas.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
