// tanstack-charts example: Keys inferred from the category
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keys inferred from the category',
  summary:
    'No key option is set. barX infers identity from its unique y value, so when the ranking re-sorts each bar keeps its element and glides to its new row. Rows without a stable key would be matched by array position instead.',
  section: 'Dynamic Data and Animation',
  tags: ['key inference', 'barX', 'svgAnimation'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
