// motion example: Reading progress bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reading progress bar',
  summary: 'The thin bar across the top of an article that fills as you read down it. An ordinary animation of the bar from empty to full is handed to scroll(), which plays it by scroll position instead of by time. In the card, the article scrolls itself.',
  section: 'scroll',
  tags: ['scroll', 'container', 'animate', 'scaleX'],
  docs: ['pages/motion-dev/docs/scroll.md', 'pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
