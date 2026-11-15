// galacean example: Particle rate over distance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle rate over distance",
  summary:
    "An emitter with rateOverTime 0 and rateOverDistance 8 lays a trail only while it moves, and pauses to show that a still emitter makes none. Sliders in the full view.",
  section: "Particle",
  tags: ['emission.rateOverDistance', 'emission.rateOverTime'],
  docs: [
    'repo/docs/en/graphics/particle/renderer-emission-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
