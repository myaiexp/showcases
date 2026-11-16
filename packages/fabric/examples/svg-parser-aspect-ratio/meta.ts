// fabric example: SVG: viewBox and preserveAspectRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: viewBox and preserveAspectRatio',
  summary:
    'A 200 x 100 SVG with a square viewBox is parsed with each preserveAspectRatio value: meet and slice with different alignments, and none. The parser applies the viewBox transform to the objects.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'viewBox', 'preserveAspectRatio'],
  docs: [
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
    'repo/CHANGELOG.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
