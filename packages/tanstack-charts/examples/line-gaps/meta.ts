// tanstack-charts example: Null values leave gaps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Null values leave gaps',
  summary:
    'A row whose y is null flushes the current segment, so the line breaks instead of bridging the missing readings. The checkbox fills the holes in, and the line becomes one piece again.',
  section: 'Line and Area Marks',
  tags: ['lineY', 'null gaps', 'points'],
  docs: ['repo/docs/reference/marks/line-and-area.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
