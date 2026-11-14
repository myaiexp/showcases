// motion example: Rubber-band pull tab that snaps home
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rubber-band pull tab that snaps home',
  summary: 'Pull a knob on a stretchy band and let go: it springs back to the middle. Choose whether both directions, only sideways or only up and down snap back.',
  section: 'Gestures',
  tags: ['drag', 'snapToOrigin', 'transition'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
