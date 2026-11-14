// observable-plot example: Dot: frameAnchor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: frameAnchor',
  summary:
    'With no x or y channel, the frameAnchor option places a dot inside the frame. Nine dots show the nine anchors; the slider changes their constant r.',
  section: 'Mark: Dot',
  tags: ['dot', 'frameAnchor', 'r', 'frame'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/marks/frame.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
