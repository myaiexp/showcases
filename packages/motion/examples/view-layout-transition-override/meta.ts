// motion example: Dashboard widget with its own move timing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dashboard widget with its own move timing',
  summary: 'Rearrange a small dashboard and three widgets hop quickly into place while the highlighted Revenue card drifts slowly. Each element can have its own layout duration, set with .layout(), on top of the default for the whole update.',
  section: 'animateView',
  tags: ['animateView', 'add', 'layout', 'transition override'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
