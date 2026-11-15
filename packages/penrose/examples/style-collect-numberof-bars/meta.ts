// penrose example: Counting a collection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Collect elements per set into a bar chart',
  summary:
    '`collect Element e into es where In(e, s) foreach Set s` runs once per set with every member gathered in `es`. The bar height comes from `numberof es`, from `count(listof w from es)` (the long way round) or from `sum(listof w from es)` where two members weigh 2, so the third tab grows the bars of the sets that hold them.',
  section: 'Style: Collectors',
  tags: ['collect', 'foreach', 'numberof', 'listof', 'count', 'sum', 'Rectangle'],
  docs: ['repo/packages/docs-site/docs/ref/style/collectors.md', 'repo/packages/core/src/lib/Functions.ts'],
  provenance: 'pure',
  added: '2026-11-15',
});
