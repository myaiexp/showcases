// playcanvas example: Particle local space and wrap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle local space and wrap",
  summary: "An emitter circles the scene. In world space its particles trail behind it; with localSpace they ride along; wrap and wrapBounds teleport particles that leave a box around the emitter.",
  section: "Components",
  tags: ["localSpace","wrap","wrapBounds"],
  docs: ["repo/docs/user-manual/editor/scenes/components/particlesystem.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
