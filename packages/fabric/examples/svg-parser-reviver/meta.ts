// fabric example: SVG: parser reviver edits each parsed object
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SVG: parser reviver edits each parsed object',
  summary:
    'The reviver of loadSVGFromString(svg, reviver) is called with each svg element and the fabric object made from it. This one reads data-locked and id attributes that fabric ignores and locks the marked objects.',
  section: 'SVG',
  tags: ['loadSVGFromString', 'reviver', 'selectable'],
  docs: [
    'repo/src/content/docs/api/functions/loadSVGFromString.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-3.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});
