// penrose example: sum, count, average, maxList and minList
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'sum, count, average, maxList and minList',
  summary:
    'Five sampled heights form a list. `count` spaces the bars, `maxList` and `minList` draw the top and bottom lines, and `average` and `sum(xs) / count(xs)` give the same dashed mean line, one in green and one in orange, lying on top of each other.',
  section: 'Computation: Math',
  tags: ['sum', 'count', 'average', 'maxList', 'minList'],
  docs: ['repo/packages/docs-site/docs/ref/style/functions.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
