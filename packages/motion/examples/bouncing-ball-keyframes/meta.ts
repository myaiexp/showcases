// motion example: Bouncing ball with keyframes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bouncing ball with squash and stretch',
  summary: 'A ball drops, bounces lower each time and squashes on every landing. A list of keyframes sets the heights, times places each bounce, and an array of easings speeds it up on the way down and slows it at the top.',
  section: 'animate',
  tags: ['animate', 'keyframes', 'times', 'ease', 'ease array', 'scaleY', 'repeat'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
