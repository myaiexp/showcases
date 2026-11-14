// motion example: Rapid clicks queued or interrupting
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rapid clicks queued or interrupting',
  summary: 'Hammer a button that slides a ball along a track. By default animateView lines the moves up so none snaps, which is smooth but can lag behind your clicks; with interrupt set to immediate, each new click cuts in at once.',
  section: 'animateView',
  tags: ['animateView', 'interrupt', 'queue', 'add'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
