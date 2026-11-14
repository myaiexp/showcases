// echarts example: Heatmap with visualMap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmap with visualMap",
  summary:
    "A heatmap on a category grid coloured by a continuous visualMap. Values drift over time; the full view switches palettes.",
  section: 'Option: series.heatmap',
  tags: ['heatmap', 'visualMap', 'inRange', 'splitArea'],
  docs: [
    'repo/en/option/series/heatmap.md',
    'repo/en/option/component/visual-map.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/option/component/axis-common.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
