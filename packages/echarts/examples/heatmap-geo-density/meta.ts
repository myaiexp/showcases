// echarts example: Heatmap density on a geo map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Heatmap density on a geo map',
  summary:
    'A heatmap series on a world geo component, weights scattered around 24 cities. Adjust pointSize, blurSize, minOpacity and maxOpacity; the card breathes the blob size.',
  section: 'Option: series.heatmap',
  tags: ['heatmap', 'geo', 'pointSize', 'blurSize', 'minOpacity', 'maxOpacity', 'visualMap'],
  docs: [
    'repo/en/option/series/heatmap.md',
    'repo/en/option/component/geo.md',
    'repo/en/option/component/geo-common.md',
    'repo/en/option/component/visual-map-continuous.md',
    'repo/en/option/partial/coord-sys.md',
    'repo/en/api/echarts.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
