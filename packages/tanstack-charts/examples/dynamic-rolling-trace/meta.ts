// tanstack-charts example: Scrolling trace with a rolling path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scrolling trace with a rolling path',
  summary:
    'A live trace appends a sample and moves the visible window. With path update rolling the retained line is shifted left as one piece and the new sample slides in from the right edge, so a trace that updates every 700 ms scrolls instead of rewriting. Margins are fixed and clipping is on.',
  section: 'Dynamic Data and Animation',
  tags: ['motion', 'path', 'rolling', 'clip', 'streaming'],
  docs: ['repo/docs/guides/dynamic-data-and-animation.md', 'repo/docs/reference/motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
