// motion example: Seek a playhead: set() versus jump()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Seek a playhead: set() versus jump()',
  summary: 'Two media players play the same track. Seeking the first with set() changes nothing lasting: the running animation overwrites it and playback carries on; seeking the second with jump() breaks continuity: velocity drops to zero and the playback animation ends, so the playhead stays where you put it. Live readouts show isAnimating and velocity for each.',
  section: 'Motion values',
  tags: ['motionValue', 'set', 'jump', 'isAnimating', 'getVelocity', 'mapValue', 'styleEffect'],
  docs: ['pages/motion-dev/docs/motion-value.md', 'pages/motion-dev/docs/map-value.md', 'pages/motion-dev/docs/style-effect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
