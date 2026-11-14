// g6 example: Zoom canvas: pinch only with ctrlKey
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Zoom canvas: pinch only with ctrlKey',
  summary: 'enable as a function of the wheel event limits zoom-canvas to events with ctrlKey set, which is how touchpads report a pinch, so a swipe can scroll with scroll-canvas. The card sends both kinds.',
  section: 'Behavior',
  tags: ['zoom-canvas', 'enable', 'ctrlKey', 'scroll-canvas'],
  docs: ['repo/packages/site/docs/manual/behavior/ZoomCanvas.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
