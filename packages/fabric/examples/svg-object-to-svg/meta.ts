// fabric example: SVG: toSVG on a single object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: toSVG on a single object',
  summary:
    'Every object has its own toSVG(): a <g> element with the object transform and the shape with its style. Select an object to see its markup and the picture it makes inside an svg element.',
  section: 'SVG',
  tags: ['toSVG', 'getActiveObject', 'selection:created'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/classes/FabricObject.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
