// g6 example: Export image: toDataURL type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Export image: toDataURL type',
  summary: 'graph.toDataURL({ type }) as image/png, image/jpeg or image/webp, shown in an img element with the MIME prefix and the payload size. A button downloads it.',
  section: 'API',
  tags: ['toDataURL', 'DataURLOptions', 'type'],
  docs: [
    'repo/packages/site/docs/api/export-image.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
