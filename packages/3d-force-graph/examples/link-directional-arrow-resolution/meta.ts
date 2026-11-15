// 3d-force-graph example: Link styling: arrow resolution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link styling: arrow resolution',
  summary:
    'linkDirectionalArrowResolution is how many slice segments divide the circumference of the cone. The default is 8; down at 3 the arrow is a triangular pyramid, up at 32 it is round. Big arrows and a close camera make the steps visible.',
  section: 'Link styling',
  tags: ['linkDirectionalArrowResolution', 'linkDirectionalArrowLength'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
