// fabric example: SVG: parsing text elements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: parsing text elements',
  summary:
    'Each text element in the SVG becomes a FabricText on the canvas, carrying its font family, size, weight, style, fill, stroke and text-anchor.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'Text', 'font-family', 'text-anchor'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
