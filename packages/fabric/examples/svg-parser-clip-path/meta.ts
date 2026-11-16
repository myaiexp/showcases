// fabric example: SVG: parsing clipPath
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: parsing clipPath',
  summary:
    'A clip-path attribute pointing at a clipPath element is parsed into the clipPath property of the object, so the square is cut to a circle on the canvas just as in the browser.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'clipPath', 'clip-path'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
