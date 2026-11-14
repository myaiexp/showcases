// motion example: Shader dissolve reveal with animated uniforms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Shader dissolve reveal with animated uniforms",
  summary: "A custom GLSL shader dissolves a 3D shape in and out with a glowing edge. Motion animates the shader's progress and tint uniforms, alone or together with the mesh's own rotation.",
  section: "Integrations",
  tags: ["animate","ShaderMaterial","uniforms","threeEffect"],
  docs: ["pages/motion-dev/docs/three.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
