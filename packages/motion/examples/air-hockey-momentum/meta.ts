// motion example: Air hockey puck with tunable momentum
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Air hockey puck with tunable momentum',
  summary: 'Flick a puck around a rink and it keeps sliding, bouncing off the walls. Sliders change how far it glides and how bouncy the walls are; switch momentum off to stop it dead.',
  section: 'Gestures',
  tags: ['drag', 'momentum', 'transition', 'power', 'timeConstant', 'bounceStiffness', 'bounceDamping'],
  docs: ['pages/motion-dev/docs/drag.md', 'pages/motion-dev/docs/scope-motion.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
