// fabric example: SVG: parsing a style element and classes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: parsing a style element and classes',
  summary:
    'Rules in an SVG style element (class, tag.class and id selectors) are matched against the elements and become fill, stroke and dash properties of the parsed objects.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'style', 'CSS', 'class'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
