// motion example: FAQ accordion that pushes the rest down
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FAQ accordion that pushes the rest down',
  summary: 'Open a question and its answer unfolds while every row below slides down to make room; open another and the first folds shut as the rest rise. The code only shows and hides the answers, and data-layout does the motion.',
  section: 'animateLayout',
  tags: ['animateLayout', 'data-layout', 'accordion', 'hidden'],
  docs: ['pages/motion-dev/docs/layout-animations.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
