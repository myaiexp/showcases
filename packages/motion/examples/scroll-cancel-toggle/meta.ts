// motion example: Header that shrinks on scroll, with an off switch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Header that shrinks on scroll, with an off switch',
  summary: 'A sticky site header that starts tall and shrinks over the first 100 px of scrolling. scroll() returns a function that detaches the animation; a button calls it, and a second press attaches a fresh one. In the card, the effect switches itself off and on every few seconds.',
  section: 'scroll',
  tags: ['scroll', 'cancel', 'offset', 'container', 'animate', 'sticky'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/delay.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
