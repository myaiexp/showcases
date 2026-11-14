// g6 example: Export image: encoderOptions quality
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Export image: encoderOptions quality',
  summary: "graph.toDataURL({ type: 'image/jpeg', encoderOptions }) trades quality for size; the payload size and the image change as the 0 to 1 slider moves. PNG ignores it.",
  section: 'API',
  tags: ['toDataURL', 'encoderOptions', 'image/jpeg'],
  docs: [
    'repo/packages/site/docs/api/export-image.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
