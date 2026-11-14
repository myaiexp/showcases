// motion example: Colour picker that retargets mid-fade
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Colour picker that retargets mid-fade',
  summary: 'A theme picker where clicking another swatch while the colour is still fading simply turns it around. When you animate a motion value, any animation already running on it ends automatically, and a counter shows how many fades were started and cut short.',
  section: 'Motion values',
  tags: ['motionValue', 'animate', 'animationCancel', 'animationStart', 'styleEffect', 'on'],
  docs: ['pages/motion-dev/docs/motion-value.md', 'pages/motion-dev/docs/style-effect.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
