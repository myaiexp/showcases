// vchart example: Legend with custom item data and values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Legend with custom item data and values',
  summary:
    'A pie chart whose legend `data` callback adds the percentage share to every legend item as its value, aligned right with item.value. The card replaces the data every few seconds, which rebuilds the callback\'s percentages.',
  section: 'Concepts: Components',
  tags: ['legends.data', 'item.value', 'alignRight', 'item.width'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
    'repo/docs/assets/option/en/component/legend-common/base-legend.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
