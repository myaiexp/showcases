// fabric example: SVG: loadSVGFromString, grouped or separate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: loadSVGFromString, grouped or separate',
  summary:
    'loadSVGFromString(svg) resolves to the parsed objects and the document options. util.groupSVGElements(objects, options) turns them into one selectable Group; adding the array directly gives separate objects.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'groupSVGElements', 'Group'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/api/namespaces/util/functions/groupSVGElements.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
