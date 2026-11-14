// playcanvas example: Per-instance shader parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Per-instance shader parameters",
  summary:
    "Eighteen mesh instances share one mesh and one custom ShaderMaterial, and each gets its own tint uniform through setParameter, animated around a hue wheel.",
  section: "Graphics: Meshes",
  tags: ["setParameter","MeshInstance","ShaderMaterial"],
  docs: ["repo/docs/user-manual/graphics/meshes/mesh-instances.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
