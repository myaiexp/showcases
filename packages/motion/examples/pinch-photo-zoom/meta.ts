// motion example: Pinch-to-zoom photo viewer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pinch-to-zoom photo viewer',
  summary: 'A photo you zoom with two fingers between 1x and 4x, with a stretchy bounce at the limits, and pan with a drag. On a desktop, Ctrl plus scroll zooms it.',
  section: 'Gestures',
  tags: ['pinch', 'scale', 'elastic', 'drag', 'onPinch'],
  docs: ['pages/motion-dev/docs/pinch.md', 'pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
