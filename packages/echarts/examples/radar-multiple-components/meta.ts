// echarts example: Several radars in one chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Several radars in one chart',
  summary:
    'Two radar components, each with its own indicators, centre and radius, and one radar series bound to each through radarIndex. Change either shape; the values redraw on their own.',
  section: 'Option: series.radar',
  tags: ['radar', 'radarIndex', 'center', 'radius', 'indicator', 'shape'],
  docs: ['repo/en/option/component/radar.md', 'repo/en/option/series/radar.md', 'repo/en/option/partial/circular-layout.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
