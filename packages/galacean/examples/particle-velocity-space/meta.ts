// galacean example: Particle velocity space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle velocity space",
  summary:
    "Two spinning emitters add a velocityX of 2: with VelocityOverLifetimeModule.space Local the push turns with the emitter, with World it keeps pointing the same way. A select changes the left one.",
  section: "Particle",
  tags: ['velocityOverLifetime.space', 'ParticleSimulationSpace'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-velocity-module.mdx',
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
