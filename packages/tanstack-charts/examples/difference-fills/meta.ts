// tanstack-charts example: One-sided and line-only differences
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One-sided and line-only differences',
  summary:
    'Setting positiveFill or negativeFill to null leaves that lobe out, and setting both to null keeps just the two interactive lines. The select steps through both lobes, one lobe each, and lines only.',
  section: 'Difference Marks',
  tags: ['differenceY', 'positiveFill', 'negativeFill', 'null fills'],
  docs: ['repo/docs/reference/marks/difference.md', 'repo/docs/concepts/scales-and-d3.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
