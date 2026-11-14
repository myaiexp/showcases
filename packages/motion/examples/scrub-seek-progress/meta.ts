// motion example: Mini animation player with scrub and seek
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Mini animation player with scrub and seek",
  summary: "A tiny video-player for one animation: play and pause, a scrubber, jump buttons for named moments, reverse and speed. Timeline progress, seek(), reverse() and speed are the whole player.",
  section: 'Timeline sequences',
  tags: ['progress', 'seek', 'reverse', 'speed', 'label', 'onUpdate'],
  docs: ['pages/motion-dev/docs/timeline-sequences.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
