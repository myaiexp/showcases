// tanstack-charts example: The entrance animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The entrance animation',
  summary:
    'The first client paint animates: bars and areas grow from their baseline and lines draw from it. initial: false paints the final state at once, and initial: always also replays the entrance for server-rendered SVG. The chart is mounted again every few seconds so you can see each setting.',
  section: 'Motion',
  tags: ['motion', 'initial', 'entrance'],
  docs: ['repo/docs/reference/motion.md', 'repo/docs/concepts/marks-and-layering.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
