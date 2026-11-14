// playcanvas example: Particle emitter shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle emitter shape",
  summary: "Particles spawn between an inner and an outer volume: a sphere with emitterRadius and emitterRadiusInner, or a box with emitterExtents and emitterExtentsInner. The full view switches shape and moves the sizes.",
  section: "Components",
  tags: ["ParticleSystemComponent","emitterShape","emitterRadius","emitterRadiusInner","emitterExtents","emitterExtentsInner"],
  docs: ["repo/docs/user-manual/editor/scenes/components/particlesystem.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
