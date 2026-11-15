// zephyr3d example: Impulses: the same kick on different masses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Impulses: the same kick on different masses',
  summary:
    'applyImpulse changes velocity by impulse divided by mass, so the same kick sends a 1 kg ball far faster than a 16 kg one. The readout shows each ball\'s speed from getLinearVelocity.',
  section: 'Physics',
  tags: ['applyImpulse', 'mass', 'RigidBody', 'getLinearVelocity'],
  docs: ['repo/apps/doc/web/en/physics-scripting.md', 'repo/apps/doc/src/tut-78/main.js', 'repo/apps/doc/web/en/physics-intro.md', 'repo/apps/doc/src/tut-76/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
