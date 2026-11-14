// motion example: Whole-page reading progress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Whole-page reading progress',
  summary: 'The classic bar across the top of a long page, using scroll() on its own: with no container option it tracks the window. The page lives in an iframe so it has a window of its own to track, and the gallery you are scrolling is left alone.',
  section: 'scroll',
  tags: ['scroll', 'window', 'animate', 'iframe'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
