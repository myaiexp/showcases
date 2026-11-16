// fabric example: SVG: toSVG viewBox, width, height and preamble
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: toSVG viewBox, width, height and preamble',
  summary:
    'The options object of canvas.toSVG(): viewBox crops or zooms the exported scene, width and height set the document size, and suppressPreamble leaves out the XML and DOCTYPE lines.',
  section: 'SVG',
  tags: ['toSVG', 'viewBox', 'suppressPreamble', 'width', 'height'],
  docs: [
    'repo/src/content/docs/api/classes/StaticCanvas.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
