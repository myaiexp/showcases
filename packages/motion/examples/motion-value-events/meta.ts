// motion example: Motion value event log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Motion value event log',
  summary: 'A ball on a track with a live log of everything its motion value reports: change ticks, animation start, complete and cancel. Interrupt a move, stop it halfway or destroy the value and watch which events fire.',
  section: 'Motion values',
  tags: ['motionValue', 'on', 'animationStart', 'animationComplete', 'animationCancel', 'isAnimating', 'stop', 'destroy'],
  docs: ['pages/motion-dev/docs/motion-value.md', 'pages/motion-dev/docs/style-effect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
