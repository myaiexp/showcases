// galacean example: Particle playback control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle playback control",
  summary:
    "generator.play(), stop() with each ParticleStopMode, emit(count) and main.simulationSpeed. The card runs through the calls by itself; the full view has a button for each and a speed slider.",
  section: "Particle",
  tags: ['generator.play', 'generator.stop', 'ParticleStopMode', 'emit', 'simulationSpeed'],
  docs: [
    'repo/docs/en/graphics/particle/renderer.mdx',
    'repo/docs/en/graphics/particle/renderer-main-module.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
