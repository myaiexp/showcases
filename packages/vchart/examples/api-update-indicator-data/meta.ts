// vchart example: API: updateIndicatorDataById
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: updateIndicatorDataById',
  summary:
    'updateIndicatorDataById feeds a datum to an indicator component that has an id in the spec, so the donut\'s centre text can show any row without a hover. Buttons pick a slice; the card steps through them and the indicator follows.',
  section: 'API',
  tags: ['updateIndicatorDataById', 'updateIndicatorDataByIndex', 'indicator', 'pie'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
