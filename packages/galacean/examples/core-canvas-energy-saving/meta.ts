// galacean example: Canvas: energy-saving mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas: energy-saving mode",
  summary:
    "Render at two-thirds resolution and let the browser scale the canvas back up: width and height are cut by the scale and setScale(scale, scale) keeps pointer maths right.",
  section: "Core",
  tags: ['WebCanvas', 'setScale', 'resizeByClientSize'],
  docs: [
    'repo/docs/en/core/canvas.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
