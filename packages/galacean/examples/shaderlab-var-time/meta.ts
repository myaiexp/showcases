// galacean example: ShaderLab built-in time variable
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab built-in time variable",
  summary: "scene_ElapsedTime is a vec4 (t, sin t, cos t, 0) the engine fills every frame: the shader uses it to pulse the vertices outward and to cycle the colour, with no script updating anything.",
  section: "ShaderLab",
  tags: ['scene_ElapsedTime','scene_DeltaTime'],
  docs: [
    'repo/docs/en/graphics/material/variables.mdx',
    'repo/docs/en/graphics/material/shader.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
