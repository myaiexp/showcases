// d2 example: Styles: fill and stroke on tables
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Styles: fill and stroke on tables',
  summary:
    'On `sql_table` and `class` shapes `fill` paints the header and `stroke` paints the body, since `fill` is already taken by the header. The second variant sets both.',
  section: 'Styles',
  tags: ['style', 'fill', 'stroke', 'sql_table', 'class'],
  docs: ['repo/docs/tour/style.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
