// vchart example: API: exportCanvas with a watermark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: exportCanvas with a watermark',
  summary:
    'exportCanvas returns the canvas the chart is drawn on. The example copies it into a second canvas, stamps a text watermark on the copy and shows that canvas as an image, the secondary processing the docs mention; the live chart is untouched.',
  section: 'API',
  tags: ['exportCanvas', 'getCanvas', 'watermark'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
