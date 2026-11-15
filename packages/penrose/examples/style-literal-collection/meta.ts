// penrose example: A collection of literals is a vector
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A collection of numbers is already a vector',
  summary:
    'Collecting Number literals with `collect Number n into ns where P(n)` gives `ns` as a vector straight away, with no `listof`. Concentric rings show `minList(ns)`, `average(ns)` and `maxList(ns)` of the numbers 20, 35, 50 and 95.',
  section: 'Style: Literals',
  tags: ['literal', 'collect', 'Number', 'average', 'maxList', 'minList'],
  docs: [
    'repo/packages/docs-site/docs/ref/style/literals.md',
    'repo/packages/docs-site/docs/ref/style/collectors.md',
    'repo/packages/core/src/lib/Functions.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
