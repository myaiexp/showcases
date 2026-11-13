// echarts example: renderItem schedule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'renderItem schedule',
  summary:
    'A machine schedule drawn by a custom series renderItem function: api.coord and api.size place each job, clipRectByRect clips it to the grid, and a weakFilter dataZoom pans the day.',
  section: 'Custom Series',
  tags: ['series-custom', 'renderItem', 'api.coord', 'api.size', 'clipRectByRect', 'weakFilter'],
  docs: ['repo/en/option/series/custom.md', 'repo/en/api/graphic.md', 'repo/en/option/component/data-zoom.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
