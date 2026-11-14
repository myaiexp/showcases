// motion example: Pause and slow down a view transition
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pause and slow down a view transition',
  summary: 'Swap four tiles around, then hit Pause mid-flight, resume, or drop the speed to a crawl to study the move. Awaiting animateView hands back playback controls, and finished tells you when it is done.',
  section: 'animateView',
  tags: ['animateView', 'controls', 'pause', 'speed', 'finished'],
  docs: ['pages/motion-dev/docs/animate-view.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
