// fabric example: Colors: Parsing hex, rgb, hsl and names
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colors: Parsing hex, rgb, hsl and names',
  summary:
    'new Color(text) reads shorthand hex, hex without #, rgb(a), hsl and CSS names, and flags text it cannot read with isUnrecognised; try your own colour.',
  section: 'Colors',
  tags: ['Color', 'toRgba', 'isUnrecognised'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/api/classes/Color.md'],
  provenance: 'pure',
  added: '2026-11-16',
});
