// penrose example: Literals as style variables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Number and String literals in a selector',
  summary:
    '`forall Number n where P(n)` runs once per number that Substance passes to P, and inside the block `n` is the value itself, so `r : n` draws circles of radius 30, 55 and 80. `forall String s where Q(s)` does the same for text, drawing each word as a Text shape.',
  section: 'Style: Literals',
  tags: ['literal', 'Number', 'String', 'forall', 'Circle', 'Text'],
  docs: ['repo/packages/docs-site/docs/ref/style/literals.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
