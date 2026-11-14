// playcanvas example: Particle rate, lifetime and loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle rate, lifetime and loop",
  summary: "A fountain whose timing is live: rate and rate2 bound the gap between births, lifetime and numParticles size the pool, loop and preWarm shape the start, and play, pause, reset and stop drive it.",
  section: "Components",
  tags: ["rate","rate2","lifetime","numParticles","loop","preWarm","autoPlay","play"],
  docs: ["repo/docs/user-manual/editor/scenes/components/particlesystem.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
