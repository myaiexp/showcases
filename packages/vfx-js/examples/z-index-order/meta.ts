// VFX-JS example: drawing order of overlapping elements with zIndex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'zIndex: draw order in the canvas',
  summary:
    'All elements are drawn on one canvas, so CSS stacking does not apply between them. The zIndex option orders them inside the canvas: lower values draw first, and equal values draw in the order they were added. Swapping the two values swaps which picture is on top.',
  section: 'How it Works',
  tags: ['zIndex', 'draw order', 'canvas'],
  docs: ['pages/amagi-dev/vfx-js/getting-started.md', 'pages/amagi-dev/vfx-js/how-it-works.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
