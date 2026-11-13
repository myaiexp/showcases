// echarts example: Funnel item height and label lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Funnel item height and label lines',
  summary:
    'A funnel whose layers are not equally tall: pick a height preset set through data itemStyle.height, and restyle the guide lines to the left labels with labelLine length and lineStyle.',
  section: 'Option: series.funnel',
  tags: ['funnel', 'data.itemStyle.height', 'labelLine', 'label.position'],
  docs: ['repo/en/option/series/funnel.md', 'repo/en/option/partial/line-style.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
