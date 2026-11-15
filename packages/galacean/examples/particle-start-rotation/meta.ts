// galacean example: Particle start rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle start rotation",
  summary:
    "Arrow particles that start with startRotationZ 0, 90 and a random range, with flipRotation making some turn the opposite way. Sliders in the full view.",
  section: "Particle",
  tags: ['main.startRotationZ', 'main.flipRotation', 'ParticleRenderMode.Billboard'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
