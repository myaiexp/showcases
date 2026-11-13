// Perspective example: group_rollup_mode rollup, flat and total
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group rollup modes',
  summary:
    'group_rollup_mode chooses how grouped rows render: the full hierarchy with subtotals, leaf rows only (no double counting in charts), or the grand total row alone. Switch the plugin to Y Bar to see why flat exists.',
  section: 'Grouping and Pivots',
  tags: ['group_rollup_mode', 'rollup', 'flat', 'total', 'group_by'],
  docs: ['repo/docs/md/explanation/view/config/grouping_and_pivots.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
