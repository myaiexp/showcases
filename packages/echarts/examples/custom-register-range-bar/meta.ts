// echarts example: Registered custom series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Registered custom series',
  summary:
    'A range bar written once as a renderItem, registered with echarts.registerCustomSeries and then used by name with renderItem: "rangeBar", configured through itemPayload and encode.',
  section: 'Custom Series',
  tags: ['registerCustomSeries', 'renderItem', 'itemPayload', 'encode', 'api.coord'],
  docs: [
    'repo/contents/en/how-to/custom-series.md',
    'repo/en/api/echarts.md',
    'repo/en/option/series/custom.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
