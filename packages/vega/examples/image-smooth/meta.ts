// vega example: Image: Smooth versus Pixelated
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Image: Smooth versus Pixelated",
  summary:
    "An 8 by 8 pixel image, generated in code as a BMP data URL, drawn large twice: smoothed on the left and pixel-exact on the right. The scale slider shows how interpolation hides the pixel grid.",
  section: "Mark Types",
  tags: ['marks.image.smooth','marks.image.url'],
  docs: ['repo/docs/docs/marks/image.md', 'repo/docs/docs/marks/image.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});
