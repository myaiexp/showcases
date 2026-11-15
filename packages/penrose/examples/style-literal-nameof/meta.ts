// penrose example: nameof a literal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'nameof gives a literal as text',
  summary:
    'For a literal, `nameof n` returns its string form, so a number can be glued to words with `+`. Each circle is sized by its Number and captioned "radius 40", "radius 65" and so on, built from the same value.',
  section: 'Style: Literals',
  tags: ['literal', 'nameof', 'string', 'Number', 'Text'],
  docs: ['repo/packages/docs-site/docs/ref/style/literals.md', 'repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
