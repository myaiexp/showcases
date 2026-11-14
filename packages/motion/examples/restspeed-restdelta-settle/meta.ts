// motion example: Gauge needle with restSpeed and restDelta
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gauge needle that settles early or late',
  summary: 'Two gauge needles swing to the same reading with the same wobbly spring. One uses the defaults and quivers for a long time; the other is allowed to stop as soon as it is slow and close enough, and says how long it took. restSpeed and restDelta set what counts as at rest.',
  section: 'animate',
  tags: ['animate', 'spring', 'restSpeed', 'restDelta', 'rotate', 'await'],
  docs: ['pages/motion-dev/docs/animate.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
