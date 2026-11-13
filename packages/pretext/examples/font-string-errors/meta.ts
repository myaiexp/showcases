// pretext example: font strings and letterSpacing values that make prepare() throw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Font strings Canvas can\'t parse',
  summary:
    'prepare() throws a RangeError for a font string Canvas ignores, such as an empty one, \'16px\' or a var(), and for a letterSpacing that is not finite. Try the cases, and see what getComputedStyle(el).font gives for text styled with font-variant-numeric.',
  section: 'Caveats',
  tags: ['RangeError', 'font string', 'letterSpacing', 'getComputedStyle', 'validation'],
  docs: ['repo/README.md', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
