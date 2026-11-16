// fabric example: SVG: toSVG reviver rewrites each element
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: toSVG reviver rewrites each element',
  summary:
    'canvas.toSVG(options, reviver) passes the markup string of each object to the reviver and uses what it returns. The choices add an attribute, flatten the fills or thin the strokes in the exported text.',
  section: 'SVG',
  tags: ['toSVG', 'reviver'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
