// penrose example: Arithmetic needs spaces around + and -
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arithmetic needs spaces around + and -',
  summary:
    'Scalars support `+`, `-`, `*` and `/`. Four circles take their radius from `20 + 15`, `70 - 20`, `6 * 10` and `240 / 3`. The second tab writes `20+15` without spaces, which the tokenizer reads as the two numbers `20` and `+15` and rejects, the bug the docs warn about.',
  section: 'Style: Expressions',
  tags: ['arithmetic', 'operators', 'tokenizer', 'error'],
  docs: ['repo/packages/docs-site/docs/ref/style/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
