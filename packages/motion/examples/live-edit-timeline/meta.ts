// motion example: Edit a timeline while it plays
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Edit a timeline while it plays",
  summary: "A row of tiles hops in a loop while you add, move, remove and clear a gold highlight segment. The timeline changes without restarting, and getLabelTime() reports where its label sits.",
  section: 'Timeline sequences',
  tags: ['add', 'move', 'remove', 'clear', 'getLabelTime', 'label'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
