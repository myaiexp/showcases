// vchart example: API: getDataURL into an img
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: getDataURL into an img',
  summary:
    'getDataURL resolves to a data URI of the chart\'s current pixels. The example shows it in an img beside the chart, never as a download, so the thumbnail is a snapshot taken after each data change; a button takes one on demand.',
  section: 'API',
  tags: ['getDataURL', 'updateData', 'img'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
