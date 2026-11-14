// vchart example: API: convertDatumToPosition pins an HTML badge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: convertDatumToPosition pins an HTML badge',
  summary:
    'convertDatumToPosition turns a datum into the pixel position of its mark, so an absolutely positioned HTML badge can follow the tallest bar. The badge re-pins after each data update and layout, here from the chart\'s own \'layoutEnd\' event, and the card updates the data.',
  section: 'API',
  tags: ['convertDatumToPosition', 'isRelativeToCanvas', 'updateData', 'layoutEnd', 'HTML overlay'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
