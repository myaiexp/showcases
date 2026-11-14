// echarts example: dataZoom filterMode compared on four scatters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'dataZoom filterMode compared on four scatters',
  summary:
    'Four connected scatter charts, each windowed on both axes by dataZoom, differing only in filterMode: filter, weakFilter, empty and none. Drag a window in one and watch how the points and the other axis react in all four.',
  section: 'Option: Components',
  tags: ['dataZoom', 'filterMode', 'weakFilter', 'empty', 'none', 'echarts.connect', 'group'],
  docs: [
    'repo/en/option/component/data-zoom.md',
    'repo/en/option/component/data-zoom-slider.md',
    'repo/en/api/echarts.md',
    'repo/en/api/action.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
