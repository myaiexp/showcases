// motion example: Share dialog that wipes open and shut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Share dialog that wipes open and shut',
  summary: 'Press Share and a dialog wipes open from its centre over a dimmed photo; Done wipes it closed again. You write the closed shape once, in exit(), and Motion reuses it as the starting point of enter().',
  section: 'animateView',
  tags: ['animateView', 'add', 'enter', 'exit', 'clipPath'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
