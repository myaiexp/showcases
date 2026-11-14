// vchart example: API: legend data and selection by id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: legend data and selection by id',
  summary:
    'getLegendDataById, getLegendSelectedDataById and setLegendSelectedDataById read and drive a legend that has an id in the spec. Buttons select one series, all of them or none while a readout lists the legend items and the selected keys; the card steps the selection.',
  section: 'API',
  tags: ['getLegendDataById', 'getLegendDataByIndex', 'getLegendSelectedDataById', 'setLegendSelectedDataById', 'legends id'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
