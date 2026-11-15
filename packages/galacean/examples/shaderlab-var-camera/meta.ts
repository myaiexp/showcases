// galacean example: ShaderLab camera position and model matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "ShaderLab camera position and model matrix",
  summary: "Using renderer_ModelMat for world position and camera_Position for the view direction, the shader paints a fresnel rim that follows the orbiting camera around two spheres.",
  section: "ShaderLab",
  tags: ['camera_Position','renderer_ModelMat','renderer_NormalMat'],
  docs: [
    'repo/docs/en/graphics/material/variables.mdx',
    'repo/docs/en/graphics/material/shaderAPI.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
