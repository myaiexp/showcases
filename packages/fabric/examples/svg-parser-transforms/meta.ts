// fabric example: SVG: parsing transform attributes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: parsing transform attributes',
  summary:
    'transform attributes (rotate, skewX, translate, scale, matrix) on shapes and groups are parsed into each object transform matrix, so the canvas shows what the browser draws.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'transform', 'rotate', 'skewX', 'matrix'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
