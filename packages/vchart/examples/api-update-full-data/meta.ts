// vchart example: API: updateFullData with fields
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: updateFullData with fields',
  summary:
    'updateFullData replaces a whole data entry, values and fields together. Here the fields config pins the value domain to 0-100 so the bars keep one scale as the values change; a button sends it with and without that lock.',
  section: 'API',
  tags: ['updateFullData', 'fields', 'domain', 'lockStatisticsByDomain', 'data'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
    'repo/docs/assets/option/en/common/data.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
