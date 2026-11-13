// echarts example: Empty pie placeholder circle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Empty pie placeholder circle',
  summary:
    'A pie whose data is an empty array. See the placeholder circle, turn it off with showEmptyCircle, restyle it with emptyCircleStyle, and fill the pie with data to compare.',
  section: 'Option: series.pie',
  tags: ['pie', 'showEmptyCircle', 'emptyCircleStyle'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/item-style.md', 'repo/contents/en/basics/release-note/5-2-0.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
