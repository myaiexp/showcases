// playcanvas example: Particle blend type, sort and depth write
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particle blend type, sort and depth write",
  summary: "A cloud of overlapping particles before a bright slab, composited with alpha, additive or multiply blending, with the sort order and depthWrite as options.",
  section: "Components",
  tags: ["blendType","BLEND_ADDITIVEALPHA","BLEND_MULTIPLICATIVE","sort","PARTICLESORT_DISTANCE","depthWrite"],
  docs: ["repo/docs/user-manual/editor/scenes/components/particlesystem.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
