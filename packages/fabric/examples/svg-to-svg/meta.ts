// fabric example: SVG: canvas.toSVG markup and its picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: canvas.toSVG markup and its picture',
  summary:
    'canvas.toSVG() returns a whole SVG document as a string: a viewBox taken from the canvas, the background as a rect and one element per object. The right pane loads that string as an <img>.',
  section: 'SVG',
  tags: ['toSVG', 'backgroundColor', 'Rect', 'Circle', 'Triangle'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/StaticCanvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
