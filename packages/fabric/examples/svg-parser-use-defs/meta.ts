// fabric example: SVG: parsing use and defs
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: parsing use and defs',
  summary:
    'Elements inside defs are skipped, and each use element that references one becomes a copy of it with its own position, fill and transform. Three uses of one flower give three groups of circles.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'use', 'defs'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
