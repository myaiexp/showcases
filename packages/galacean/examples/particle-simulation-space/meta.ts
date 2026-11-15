// galacean example: Particle simulation space
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle simulation space",
  summary:
    "Two emitters sweep left and right: with ParticleSimulationSpace.Local the particles travel with the emitter, with World they are left in place and trail behind. A select flips the top one in the full view.",
  section: "Particle",
  tags: ['main.simulationSpace', 'ParticleSimulationSpace'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
