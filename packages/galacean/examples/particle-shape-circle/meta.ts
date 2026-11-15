// galacean example: Particle circle shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle circle shape",
  summary:
    "CircleShape with radius, arc and arcMode: Random scatters particles over the arc, Loop sweeps the emission round it at arcSpeed. The card switches mode; the full view has sliders and a select.",
  section: "Particle",
  tags: ['CircleShape', 'ParticleShapeArcMode', 'arc', 'arcSpeed'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
