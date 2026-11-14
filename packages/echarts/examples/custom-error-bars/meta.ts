// echarts example: Error bars from api.coord and api.size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Error bars from api.coord and api.size',
  summary:
    'A bar series with a custom series on top that draws a whisker and two caps per bar. renderItem reads the low and high values with api.value, converts them with api.coord and sizes the caps with api.size. Change the spread and the cap width, or hover for the tooltip.',
  section: 'Option: series.custom',
  tags: ['custom', 'renderItem', 'api.value', 'api.coord', 'api.size', 'encode', 'dimensions'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/partial/zr-graphic.md',
    'repo/en/tutorial/custom-series.md',
    'repo/contents/en/how-to/custom-series.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
