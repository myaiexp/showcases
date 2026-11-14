// echarts example: Pie emphasis scale and blur
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pie emphasis scale and blur',
  summary:
    'Hover a doughnut sector. Toggle emphasis.scale, change scaleSize, choose whether focus fades the other sectors and how far (blur opacity), and resize the emphasis label.',
  section: 'Option: series.pie',
  tags: ['pie', 'emphasis.scale', 'emphasis.scaleSize', 'emphasis.focus', 'blur', 'emphasis.label'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/emphasis-common.md', 'repo/en/api/action.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
