// motion example: Prize wheel with inertia
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prize wheel that coasts to a stop',
  summary: 'Flick the wheel and it spins fast, then slows by itself and lands on a prize. An inertia animation needs only a starting speed; power and timeConstant decide how far and how long it coasts, and a snap rule can make it settle in the middle of a slice.',
  section: 'animate',
  tags: ['animate', 'inertia', 'velocity', 'power', 'timeConstant', 'modifyTarget', 'objects'],
  // power, timeConstant and modifyTarget are documented in the type definitions (InertiaOptions);
  // drag.md names the first two as the options of the inertia animation.
  docs: ['pages/motion-dev/docs/animate.md', 'pages/motion-dev/docs/drag.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
