// galacean example: Particle scaling mode
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle scaling mode",
  summary:
    "Three emitters under parents whose scale pulses, with scalingMode Local, World and Hierarchy: only the modes that read the parent scale make the particles grow and spread. A slider sets the scale in the full view.",
  section: "Particle",
  tags: ['main.scalingMode', 'ParticleScaleMode'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
