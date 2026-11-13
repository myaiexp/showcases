// echarts example: Click on blank area with getZr
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Click on blank area with getZr',
  summary:
    'ECharts events fire only on graphic elements; zrender events fire everywhere. Click a bar to pick it, click empty space inside the plot or outside it to reset: the getZr click handler tells the three cases apart with event.target and containPixel.',
  section: 'Concepts',
  tags: ['getZr', 'zrender event', 'event.target', 'containPixel', 'on click', 'dispatchAction'],
  docs: ['repo/contents/en/concepts/event.md', 'repo/en/api/echarts-instance.md', 'repo/en/api/events.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
